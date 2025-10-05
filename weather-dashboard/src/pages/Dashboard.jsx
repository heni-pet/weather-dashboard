import { useState,useEffect } from "react";
import SearchBarWithSuggestions from "../components/SearchBarWithSuggestions";
import ErrorBoundary from "../components/ErrorBoundary";
import  ForecastList from "../components/Forecastlist";
import Loader from "../components/loader";
import SearchBar from "../components/SearchBar";
import  Weathercard   from "../components/WeatherCard";
import Weathericon from "../components/Weathericon";

export default function Dashboard() {
  const [city, setCity] = useState("Addis Ababa");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "b9b064e409bd48dcf12524a8d305159d"; // 🔑 replace with your OpenWeatherMap API key

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

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
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
  }, [city]);

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