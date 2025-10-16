import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, sys, main, weather, wind } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.description;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-6 w-full max-w-md text-center transition duration-300 hover:shadow-lg hover:scale-105">
      {/* 📍 Location */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
        {name}, {sys?.country}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 capitalize">
        {description}
      </p>

      {/* 🌤️ Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
        className="w-28 h-28 mx-auto"
      />

      {/* 🌡️ Temperature */}
      <div className="flex justify-center items-baseline mt-4">
        <p className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">
          {Math.round(main.temp)}°C
        </p>
      </div>

      {/* 🌡️ Details */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-gray-700 dark:text-gray-300">
        <div>
          <p className="text-sm">Min</p>
          <p className="text-lg font-semibold">{Math.round(main.temp_min)}°C</p>
        </div>
        <div>
          <p className="text-sm">Max</p>
          <p className="text-lg font-semibold">{Math.round(main.temp_max)}°C</p>
        </div>
        <div>
          <p className="text-sm">Humidity</p>
          <p className="text-lg font-semibold">{main.humidity}%</p>
        </div>
      </div>

      {/* 💨 Wind */}
      <div className="mt-6 text-gray-700 dark:text-gray-300">
        <p className="text-sm">Wind Speed</p>
        <p className="text-lg font-semibold">{Math.round(wind.speed)} m/s</p>
      </div>
    </section>
  );
};

export default WeatherCard;
