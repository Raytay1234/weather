import React from "react";

const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="w-full mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 transition duration-300 hover:shadow-lg hover:scale-105"
          >
            {/* 📅 Day */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </h3>

            {/* 🌤️ Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="w-16 h-16"
            />

            {/* 🌡️ Temperatures */}
            <div className="text-center mt-2">
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(day.temp.max)}°C
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(day.temp.min)}°C
              </p>
            </div>

            {/* ☁️ Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 capitalize text-center">
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
