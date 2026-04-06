import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GoldPriceData {
  gold24k: number;
  gold22k: number;
  change24k: number;
  changePercent24k: number;
  isUp: boolean;
  lastUpdated: string;
}

const fallbackData: GoldPriceData = {
  gold24k: 73250,
  gold22k: 67150,
  change24k: 350,
  changePercent24k: 0.48,
  isUp: true,
  lastUpdated: new Date().toLocaleTimeString("en-IN"),
};

export const useGoldPrice = () => {
  const [data, setData] = useState<GoldPriceData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const { data: result, error: fnError } = await supabase.functions.invoke("gold-price");

        if (fnError) throw fnError;
        if (result?.error) throw new Error(result.error);

        setData({
          gold24k: result.gold24k,
          gold22k: result.gold22k,
          change24k: Math.abs(result.change24k),
          changePercent24k: Math.abs(result.changePercent24k),
          isUp: result.isUp,
          lastUpdated: result.lastUpdated,
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch gold price:", err);
        setError("Using cached data");
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { data, loading, error };
};
