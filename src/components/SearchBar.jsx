import React, { useState } from "react";
import { Search } from "lucide-react"; // optional icon

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity(""); // ✅ Clear input after search
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 transition duration-300"
    >
      {/* 🔍 Icon */}
      <Search className="text-gray-500 dark:text-gray-400 w-5 h-5 ml-2" />

      {/* 🏙️ Input */}
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-transparent outline-none px-2 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      {/* 🔘 Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition duration-150"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
