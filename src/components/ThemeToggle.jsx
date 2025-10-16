import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ darkMode, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
  >
    {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
  </button>
);

export default ThemeToggle;
