// utils/weatherIcons.js
import React from "react";
import {Sun ,Moon,Cloud,CloudRain,CloudSnow,Wind,CloudLightning,Thermometer} from "lucide-react"

// Map weather code to simplified type
function mapWeatherCodeToType(code) {
  if (!code) return { type: "sunny", isNight: false };

  const isNight = code.endsWith("n");

  if (code.startsWith("01")) return { type: "sunny", isNight }; // clear
  if (code.startsWith("02") || code.startsWith("03") || code.startsWith("04"))
    return { type: "cloudy", isNight }; // clouds
  if (code.startsWith("09") || code.startsWith("10"))
    return { type: "rain", isNight }; // rain
  if (code.startsWith("13")) return { type: "snow", isNight }; // snow
  if (code.startsWith("11")) return { type: "storm", isNight }; // thunderstorm

  return { type: "sunny", isNight }; // fallback
}

export default function WeatherIcon({ className = "", code }) {
  const { type, isNight } = mapWeatherCodeToType(code);
  

  switch (type) {
    case "sunny":
      return isNight ? (
        <Moon className={`text-blue-300 ${className}`} size={48} />
      ) : (
        <Sun className={`text-yellow-400 ${className}`} size={48} />
      );

    case "cloudy":
      return (
        <Cloud
          className={`${
            isNight ? "text-gray-500" : "text-gray-400"
          } ${className}`}
          size={48}
        />
      );

    case "rain":
      return (
        <CloudRain
          className={`${
            isNight ? "text-blue-300" : "text-blue-400"
          } ${className}`}
          size={48}
        />
      );

    case "snow":
      return (
        <CloudSnow
          className={`${
            isNight ? "text-blue-100" : "text-blue-200"
          } ${className}`}
          size={48}
        />
      );

    case "storm":
      return (
        <CloudLightning
          className={`${
            isNight ? "text-purple-400" : "text-purple-500"
          } ${className}`}
          size={48}
        />
      );

    case "wind":
      return <Wind className={`text-gray-500 ${className}`} size={48} />;

    default:
      return <Thermometer className={`text-red-400 ${className}`} size={48} />;
  }
}
