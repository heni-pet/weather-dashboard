// src/components/SearchBar.jsx
import { useState, useEffect } from "react";

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Load history on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved); 
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]); console.log(history);

  // Fetch city suggestions from OpenWeather API
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      ); 
      const data = await res.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
      setSuggestions([]);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) fetchSuggestions(value);
    else setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setCity(input);
    setInput("");

    setHistory((prev) => {
      const updated = [input, ...prev.filter((item) => item !== input)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });

    setSuggestions([]);
  };

  // Handle suggestion click
  const handleSelect = (cityObj) => {
    const cityName = cityObj.name || cityObj;
    setCity(cityName);
    setInput("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4 mb-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-4 mb-8">
        <div className="flex items-center shadow-2xl rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter city name, e.g., London"
            className="flex-grow p-4 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions from API */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg w-full mt-[-20px]">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition"
            >
              {city.name}, {city.country}
              {city.state ? ` (${city.state})` : ""}
            </li>
          ))}
        </ul>
      )}

      {/* Search history */}
      {history.length > 0 && suggestions.length === 0 && (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg shadow-inner">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSelect(city)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
