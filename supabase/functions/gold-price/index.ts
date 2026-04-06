import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOLD_API_KEY = Deno.env.get("GOLD_API_KEY");
    if (!GOLD_API_KEY) {
      throw new Error("GOLD_API_KEY is not configured");
    }

    // Fetch XAU/INR from goldapi.io
    const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: {
        "x-access-token": GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GoldAPI error:", response.status, errorText);
      throw new Error(`GoldAPI returned ${response.status}`);
    }

    const data = await response.json();

    // GoldAPI returns price per troy ounce. Convert to per gram, then per 10g.
    // price_gram_24k and price_gram_22k are already per gram if available
    const pricePerGram24k = data.price_gram_24k || data.price / 31.1035;
    const pricePerGram22k = data.price_gram_22k || pricePerGram24k * (22 / 24);

    const result = {
      gold24k: Math.round(pricePerGram24k * 10),
      gold22k: Math.round(pricePerGram22k * 10),
      change24k: Math.round((data.ch || 0) / 31.1035 * 10),
      changePercent24k: Number((data.chp || 0).toFixed(2)),
      isUp: (data.ch || 0) >= 0,
      timestamp: data.timestamp,
      lastUpdated: new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("gold-price error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
