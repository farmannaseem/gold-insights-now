import { useState, useEffect } from "react";

interface GoldPriceData {
  gold24k: number;
  gold22k: number;
  change24k: number;
  changePercent24k: number;
  isUp: boolean;
  lastUpdated: string;
}

const fallbackData: GoldPriceData = {
  gold24k: 139000,
  gold22k: 128000,
  change24k: 0,
  changePercent24k: 0,
  isUp: true,
  lastUpdated: "Fallback",
};

export const useGoldPrice = () => {
  const [data, setData] = useState<GoldPriceData>(fallbackData); // ✅ never null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const res = await fetch("https://api.metals.live/v1/spot/gold");

      if (!res.ok) throw new Error("API failed");

      const json = await res.json();

      const usdPerOunce = json?.[0]?.price;

      // ❗ safety check
      if (!usdPerOunce || isNaN(usdPerOunce)) {
        throw new Error("Invalid API data");
      }

      // 🔥 correct conversion
      const usdPerGram = usdPerOunce / 31.1;
      const inrPerGram = usdPerGram * 83;

      // 🔥 realistic adjustment for India market
      const base24k = Math.round(inrPerGram * 10);
      const adjusted24k = base24k + 2000; // margin adjustment
      const gold22k = Math.round(adjusted24k * 0.92);

      setData({
        gold24k: adjusted24k,
        gold22k,
        change24k: 0,
        changePercent24k: 0,
        isUp: true,
        lastUpdated: new Date().toLocaleTimeString("en-IN"),
      });

      setError(null);

    } catch (err) {
      console.error("Failed to fetch gold price:", err);
      setError("Using fallback data");

      // fallback stays (no crash)
      setData((prev) => prev || fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();

    // 🔁 auto refresh every 5 minutes
    const interval = setInterval(fetchPrice, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
