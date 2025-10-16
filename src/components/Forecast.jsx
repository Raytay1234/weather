import React from "react";

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Group by day
  const daily = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) daily[date] = [];
    daily[date].push(item);
  });

  // Take one forecast per day (e.g. midday)
  const days = Object.keys(daily).slice(0, 5).map((date) => {
    const dayData = daily[date][Math.floor(daily[date].length / 2)];
    return {
      date,
      temp: dayData.main.temp.toFixed(1),
      min: Math.min(...daily[date].map((d) => d.main.temp_min)).toFixed(1),
      max: Math.max(...daily[date].map((d) => d.main.temp_max)).toFixed(1),
      icon: dayData.weather[0].icon,
      desc: dayData.weather[0].description,
    };
  });

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        5-Day Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-32 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.desc}
              className="mx-auto"
            />
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {day.temp}°C
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Min: {day.min}°C | Max: {day.max}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
