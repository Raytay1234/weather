import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather } from "./hooks/useWeather";

const App = () => {
  const { weather, forecast, loading, error, fetchWeather } = useWeather();
  const [darkMode, setDarkMode] = useState(false);
  const [lastCity, setLastCity] = useState(() => localStorage.getItem("lastCity"));

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // ✅ Auto-refresh at midnight
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        if (lastCity) fetchWeather(lastCity); // refetch for last searched city
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [lastCity, fetchWeather]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between px-4 py-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      }`}
    >
      {/* 🌗 Theme Toggle */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* 🌤 Header */}
      <header className="text-center mt-10">
        <h1 className="text-4xl font-extrabold mb-2">Weather App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View the next 5 days of weather forecasts around the world
        </p>
      </header>

      {/* 🔍 Search & Results */}
      <main className="flex flex-col items-center w-full max-w-lg mt-6">
        <SearchBar
          onSearch={(city) => {
            setLastCity(city);
            fetchWeather(city);
          }}
        />

        {loading && (
          <p className="mt-6 text-gray-500 dark:text-gray-300 animate-pulse">
            Loading weather data...
          </p>
        )}

        {error && <p className="mt-6 text-red-500">{error}</p>}

        {!loading && !error && weather && forecast.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700 dark:text-gray-200">
              🌤 5-Day Forecast (Starting Tomorrow)
            </h2>
            <WeatherCard data={weather} />
            <Forecast forecast={forecast} />
          </>
        )}
      </main>

      {/* ❤️ Footer */}
      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Built with ❤️ by Ryan
      </footer>
    </div>
  );
};

export default App;
