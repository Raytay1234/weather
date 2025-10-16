import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur p-6 rounded-2xl shadow-xl text-center mt-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
      <p className="text-gray-500 dark:text-gray-400">{data.weather[0].description}</p>
      <div className="flex justify-center items-center gap-4 mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="icon"
        />
        <p className="text-5xl font-semibold text-gray-900 dark:text-white">
          {Math.round(data.main.temp)}°C
        </p>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Feels like {Math.round(data.main.feels_like)}°C
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Humidity: {data.main.humidity}% | Wind: {data.wind.speed} m/s
      </p>
    </div>
  );
};

export default WeatherCard;
