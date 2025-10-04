const API_KEY = "YOUR_API_KEY"; // from OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("Failed to fetch current weather");

  return await res.json();
}

export async function getForecast(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("Failed to fetch forecast");

  return await res.json();
}
