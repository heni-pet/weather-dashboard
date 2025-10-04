import WeatherIcon from "./WeatherIcon";
export default function ForecastList({ data }) {
  // Show next 5 days (every 8th item = 24h in 3h intervals)
  const daily = data.filter((_, idx) => idx % 8 === 0).slice(0, 5);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {daily.map((day, idx) => (
        <div key={idx} className="bg-blue-100 rounded-lg p-4 text-center">
          <p className="font-semibold">
            {new Date(day.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <p>{day.main.temp}°C</p>
          <p>{day.weather[0].main}</p>
          <WeatherIcon code={day.weather[0].icon} className="w-12 h-12 mx-auto" />
        </div>
      ))}
    </div>
  );
}