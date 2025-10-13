// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from "react";

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const initialized = useRef(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
// Load saved search history from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("searchHistory");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    try {
      if (Array.isArray(history) && history.length > 0) {
        localStorage.setItem("searchHistory", JSON.stringify(history));
      } else {
        localStorage.removeItem("searchHistory");
      }
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  }, [history]);
// Fetch suggestions from OpenWeather API
  const fetchSuggestions = async (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${trimmed}&limit=5&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setSuggestions([]);
    }
  };
 // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
  };
  // Handle selecting a suggestion or history item
  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setInput(cityName);
    setSuggestions([]);
    setHistory((prev) => {
      const updated = [cityName, ...prev.filter((c) => c !== cityName)].slice(0, 10); //Update local search history (max 10)
      return updated;
    });
  };
 // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      handleSelectCity(trimmed);
    }
  };
// clear search history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4 mb-8">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center shadow-2xl rounded-lg overflow-hidden bg-gray-200">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-3 mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Recent Searches</span>
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:underline"
            >
              Clear
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {history.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
