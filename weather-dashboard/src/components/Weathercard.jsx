import React from "react";
import WeatherIcon from "./WeatherIcon";

function WeatherCard({ data })  {
  
  return (
    <div className="bg-blue-100 shadow-lg rounded-xl p-6 text-center mb-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">{data.name}</h2>
      <p className="text-lg">{data.main.temp}°C</p>
      <div className="my-4 flex justify-center w-full">
        <WeatherIcon type={data.weather?.[0]?.main || "Clear"} className="mx-auto" />
      </div>
      <p>Humidity: {data.main.humidity}%</p>
      
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Visibility: {data.visibility / 1000} km</p>
      <p>Cloudiness: {data.clouds.all}%</p>
      <p>Wind: {data.wind.speed} km/h</p>
      <p>Feels Like: {data.main.feels_like}°C</p>
      <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
}

export default WeatherCard;