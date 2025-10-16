import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather } from "./hooks/useWeather";

const App = () => {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between px-4 py-6 transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
        }`}
    >
      {/* Theme toggle */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Header */}
      <header className="text-center mt-10">
        <h1 className="text-4xl font-extrabold mb-2">Weather App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get real-time weather updates anywhere in the world
        </p>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center w-full max-w-lg mt-6">
        <SearchBar onSearch={fetchWeather} />

        {loading && (
          <p className="mt-6 text-gray-500 dark:text-gray-300 animate-pulse">
            Loading weather data...
          </p>
        )}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {!loading && !error && weather && (
          <WeatherCard data={weather} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Built with ❤️ by Ryan
      </footer>
    </div>
  );
};

export default App;
