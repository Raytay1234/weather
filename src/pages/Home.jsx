import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ThemeToggle from "../components/ThemeToggle";
import { useWeather } from "../hooks/useWeather";

const Home = () => {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      }`}
    >
      {/* Theme Toggle Button */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Title */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold mb-2">Weather App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get real-time weather updates anywhere in the world
        </p>
      </header>

      {/* Search Input */}
      <SearchBar onSearch={fetchWeather} />

      {/* Loading / Error / Weather Results */}
      <main className="w-full max-w-lg mt-6 flex flex-col items-center">
        {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weather && !loading && !error && <WeatherCard data={weather} />}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Built with ❤️ by Ryan
      </footer>
    </div>
  );
};

export default Home;
