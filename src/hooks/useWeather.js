import { useState } from "react";
import axios from "axios";

const API_KEY = "f5268f2c702104f6542659fe50cc94e3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      // ✅ Fetch current weather
      const weatherRes = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });

      setWeather(weatherRes.data);

      // ✅ Fetch 5-day forecast
      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });

      // ✅ Filter next 5 days only (skip today)
      const forecastData = forecastRes.data.list
        .filter((item) => {
          const date = new Date(item.dt_txt);
          const today = new Date();
          return date.getDate() !== today.getDate();
        })
        .reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!acc[date]) acc[date] = { temps: [], icons: [], descriptions: [] };
          acc[date].temps.push(item.main.temp);
          acc[date].icons.push(item.weather[0].icon);
          acc[date].descriptions.push(item.weather[0].description);
          return acc;
        }, {});

      const formattedForecast = Object.entries(forecastData)
        .slice(0, 5)
        .map(([date, values]) => ({
          date,
          temp: {
            min: Math.min(...values.temps),
            max: Math.max(...values.temps),
          },
          icon: values.icons[Math.floor(values.icons.length / 2)],
          description:
            values.descriptions[Math.floor(values.descriptions.length / 2)],
        }));

      setForecast(formattedForecast);
    } catch (err) {
      console.error("❌ Weather API error:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "City not found or network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
};
