import { useState, useEffect } from "react";

interface GoldPriceData {
  gold24k: number;
  gold22k: number;
  change24k: number;
  changePercent24k: number;
  isUp: boolean;
  lastUpdated: string;
}

export const useGoldPrice = () => {
  const [data, setData] = useState<GoldPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://api.metals.live/v1/spot/gold");
        const json = await res.json();

        const usdPerOunce = json[0]?.price;

        // 🔥 correct conversion
        const usdPerGram = usdPerOunce / 31.1;
        const inrPerGram = usdPerGram * 83;

        const gold24k = Math.round(inrPerGram * 10);
        const gold22k = Math.round(gold24k * 0.92);

        setData({
          gold24k,
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

        // 🔥 realistic fallback
        setData({
          gold24k: 139000,
          gold22k: 128000,
          change24k: 0,
          changePercent24k: 0,
          isUp: true,
          lastUpdated: "Fallback",
        });

      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { data, loading, error };
};
