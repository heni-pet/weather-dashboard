import React from "react";
import WeatherIcon from "./Weathericon";

export default function ForecastList({ data = [] }) {
  // Show next 5 days (every 8th item = 24h in 3h intervals)
  const daily = data.filter((_, idx) => idx % 8 === 0).slice(0, 5);

  if (!daily.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {daily.map((day, idx) => (
        <div key={day?.dt ?? idx} className="bg-blue-100 rounded-lg p-4 text-center">
          <p className="font-semibold">
            {new Date((day?.dt ?? 0) * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <p>{day?.main?.temp ?? 'N/A'}°C</p>
          <p>Humidity {day?.main?.humidity ?? 'N/A'}%</p>
          <p>Pressure {day?.main?.pressure ?? 'N/A'} hPa</p>
          <p>Cloudiness {day?.clouds?.all ?? 'N/A'}%</p>
          <p>Visibility {typeof day?.visibility === 'number' ? (day.visibility / 1000) : 'N/A'} km</p>
          <p>Wind {day?.wind?.speed ?? 'N/A'} m/s</p>
          <p>{day?.weather?.[0]?.main ?? 'N/A'}</p>
          <WeatherIcon code={day?.weather?.[0]?.icon} className="w-12 h-12 mx-auto" />
        </div>
      ))}
    </div>
  );
}