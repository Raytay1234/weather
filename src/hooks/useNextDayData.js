import { useEffect, useState } from "react";

export const useNextDayData = (fetchData) => {
  const [data, setData] = useState([]);
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check if it's already tomorrow
    const now = new Date();
    const isNextDay =
      now.getDate() === tomorrow.getDate() &&
      now.getMonth() === tomorrow.getMonth();

    setIsTomorrow(isNextDay);

    const fetchTomorrowData = async () => {
      try {
        const formattedTomorrow = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD
        const result = await fetchData(formattedTomorrow);
        setData(result);
      } catch (error) {
        console.error("Error fetching next day data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTomorrowData();
  }, [fetchData]);

  return { data, loading, isTomorrow };
};
