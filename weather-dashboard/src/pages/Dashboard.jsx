  import { useState,useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import  ForecastList from "../components/Forecastlist";
import Loader from "../components/loader";
import SearchBar from "../components/SearchBar";
import Weathercard from "../components/Weathercard";

export default function Dashboard() {
  const [city, setCity] = useState("Addis Ababa");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

    const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        ); 
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
        );
        if (!geoRes.ok) throw new Error("Geocoding failed");
        const geoData = await geoRes.json();
        if (geoData.length === 0) throw new Error("Location not found");
        const { lat, lon } = geoData[0];

        // Fetch forecast using lat/lon

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ); console.log(forecastRes);
        if (!forecastRes.ok) throw new Error("Forecast unavailable");
        const forecastData = await forecastRes.json();
        setForecast(forecastData.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city, API_KEY]);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Weather Dashboard
      </h1>

      <SearchBar setCity={setCity} />

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {weather && <Weathercard data={weather} />}
      
      {forecast.length > 0 && <ForecastList data={forecast} />}
    </main>
  );
}
