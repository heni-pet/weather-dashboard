// src/services/geocodeService.js
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GEO_BASE = "https://api.openweathermap.org/geo/1.0";

export async function fetchCitySuggestions(q, limit = 6, signal) {
  if (!q || q.length < 1) return [];
  const url = `${GEO_BASE}/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${API_KEY}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  const data = await res.json();
  // map to a consistent shape
  return data.map((item) => ({
    name: item.name,
    state: item.state || "",
    country: item.country || "",
    lat: item.lat,
    lon: item.lon,
    // Friendly display text: "City, State, Country" or "City, Country"
    displayName: `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`,
  }));
}
