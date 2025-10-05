import WeatherIcon from "./WeatherIcon";
export default function Weathercard({ data }) {
   if (!data || !data.weather) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">No weather data available.</p>
      </div>
    );
  }
  return (
    <div className="bg-blue-100 shadow-lg rounded-xl p-6 text-center mb-6">
      <h2 className="text-2xl font-semibold">{data.name}</h2>
                  {/* Pass API icon code */}
      <p className="text-lg">{data.main.temp}°C</p>
      <WeatherIcon code={data.weather[0].icon} className="w-12 h-12" />
        <p>Humidity: {data.main.humidity}%</p>
      {/* <p>UV Index: {data.current.uvi}</p> */}
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Sea Level: {data.main.sea_level} hPa</p>
      <p>Visibility: {data.visibility / 1000} km</p>
      <p>Wind: {data.wind.speed} km/h</p>
      <p>Feels Like: {data.main.feels_like}°C</p>
      <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  
  
  );
}