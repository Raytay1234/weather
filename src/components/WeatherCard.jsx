
import React from "react";
const WeatherCard = ({ data }) => {
  if (!data) return null;

  const {
    name,
    weather: [details],
    main,
    wind,
  } = data;

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-200/60 via-white/40 to-blue-300/50 dark:from-gray-800/60 dark:via-gray-900/40 dark:to-gray-800/60 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-center mt-10 border border-white/30 dark:border-gray-700/50 transition-transform hover:scale-[1.02] duration-300">
      
      {/* City Name */}
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        {name}
      </h2>
      
      {/* Weather Description */}
      <p className="capitalize text-gray-600 dark:text-gray-400 mt-1 text-sm">
        {details.description}
      </p>

      {/* Temperature + Icon */}
      <div className="flex justify-center items-center gap-3 mt-5">
        <img
          src={`https://openweathermap.org/img/wn/${details.icon}@2x.png`}
          alt="weather icon"
          className="w-20 h-20 drop-shadow-md"
        />
        <p className="text-6xl font-bold text-gray-900 dark:text-white animate-fadeIn">
          {Math.round(main.temp)}°
          <span className="text-3xl align-top">C</span>
        </p>
      </div>

      {/* Divider */}
      <div className="w-16 h-[2px] bg-gray-300 dark:bg-gray-700 mx-auto my-4 rounded-full" />

      {/* Extra Info */}
      <div className="flex justify-center items-center gap-6 text-gray-700 dark:text-gray-300 text-sm">
        <div>
          <p className="font-semibold">Feels Like</p>
          <p>{Math.round(main.feels_like)}°C</p>
        </div>
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
