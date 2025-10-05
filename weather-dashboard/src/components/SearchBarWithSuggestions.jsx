// src/components/SearchBarWithSuggestions.jsx
import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react"; // optional
import useDebounce from "./useDebounce";
import { fetchCitySuggestions } from "../services/geocodeService";

const HISTORY_KEY = "weather_search_history_v1";
const MAX_HISTORY = 6;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveHistory(list) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
}
function addToHistory(item) {
  const cur = loadHistory();
  // dedupe by displayName (or lat/lon)
  const filtered = cur.filter((x) => x.displayName !== item.displayName);
  filtered.unshift(item);
  saveHistory(filtered);
}

export default function SearchBarWithSuggestions({ onSelect, placeholder = "Search for a city..." }) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState(loadHistory());
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const controllerRef = useRef(null);
  const containerRef = useRef(null);

  // fetch suggestions when debounced input changes
  useEffect(() => {
    // if empty, show history (and not query API)
    if (!debouncedInput.trim()) {
      setSuggestions([]);
      setOpen(true); // show history
      return;
    }

    // abort previous request
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    fetchCitySuggestions(debouncedInput.trim(), 6, controller.signal)
      .then((res) => {
        setSuggestions(res);
        setOpen(true);
        setSelectedIndex(-1);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Suggestion error:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [debouncedInput]);

  // click outside to close dropdown
  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleSelect(item) {
    // item can be a string or an object from suggestions/history
    let payload;
    if (typeof item === "string") {
      payload = { displayName: item, name: item };
    } else {
      payload = item;
    }
    addToHistory(payload);
    setHistory(loadHistory());
    setInput(payload.displayName || payload.name);
    setOpen(false);
    onSelect && onSelect(payload);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((idx) => Math.min(idx + 1, (suggestions.length + historyFiltered().length) - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((idx) => Math.max(idx - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const combined = combinedList();
      if (selectedIndex >= 0 && selectedIndex < combined.length) {
        handleSelect(combined[selectedIndex]);
      } else {
        // no selection: accept current input as a city name string
        handleSelect(input.trim());
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function historyFiltered() {
    if (!input.trim()) return history;
    const q = input.trim().toLowerCase();
    return history.filter((h) => h.displayName.toLowerCase().includes(q));
  }

  function combinedList() {
    // suggestions first, then filtered history (avoid duplicates)
    const hist = historyFiltered().filter(h => !suggestions.some(s=>s.displayName === h.displayName));
    return [...suggestions, ...hist];
  }

  return (
    <div className="w-full max-w-md mx-auto relative" ref={containerRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // if user presses submit without selecting suggestion
          if (input.trim()) handleSelect(input.trim());
        }}
        className="flex items-center w-full"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-4 py-3 border rounded-l-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-autocomplete="list"
          aria-expanded={open}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 text-white rounded-r-2xl hover:bg-blue-700 flex items-center gap-2"
          aria-label="Search"
        >
          <SearchIcon size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Dropdown */}
      {open && (suggestions.length > 0 || historyFiltered().length > 0) && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul className="max-h-64 overflow-auto">
            {combinedList().map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const label = item.displayName || item; // if string fallback
              return (
                <li
                  key={label + idx}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 cursor-pointer flex justify-between items-center ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <div className="text-sm text-gray-800">{label}</div>
                  {/* mark items that came from history */}
                  {history.some(h => h.displayName === label) && (
                    <div className="text-xs text-gray-400 italic">recent</div>
                  )}
                </li>
              );
            })}

            {loading && (
              <li className="px-4 py-3 text-sm text-gray-500">Loading...</li>
            )}
          </ul>
        </div>
      )}

      {/* optional: if no open suggestions and no input, show clear history button */}
      {!input && history.length > 0 && !open && (
        <div className="mt-2 text-right">
          <button
            className="text-xs text-gray-500 underline"
            onClick={() => { localStorage.removeItem(HISTORY_KEY); setHistory([]); }}
          >
            Clear recent searches
          </button>
        </div>
      )}
    </div>
  );
}
