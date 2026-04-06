import { useLanguage } from "@/context/LanguageContext";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { formatINR } from "@/data/goldData";
import InsightCard from "@/components/InsightCard";
import { Brain, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const { t } = useLanguage();
  const { data: prices } = useGoldPrice();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 🔥 safety
  if (!prices) {
    return <div className="text-center mt-20">Loading gold prices...</div>;
  }

  // 🔥 trend logic (basic but effective)
  const isHigh = prices.gold24k > 140000; // adjust if needed
  const isLow = prices.gold24k < 135000;

  // 🔥 market insight (dynamic)
  const generateInsight = () => {
    if (isHigh) {
      return `Gold price today in India is ${formatINR(prices.gold24k)} for 24K and ${formatINR(prices.gold22k)} for 22K. Aaj sone ka bhav high level par hai due to strong global demand, inflation concerns and USD movement.`;
    }

    if (isLow) {
      return `Gold price today in India is ${formatINR(prices.gold24k)} for 24K and ${formatINR(prices.gold22k)} for 22K. Aaj sone ka bhav relatively low hai, jo buyers ke liye achha opportunity ho sakta hai.`;
    }

    return `Gold price today in India is ${formatINR(prices.gold24k)} for 24K and ${formatINR(prices.gold22k)} for 22K. Aaj gold price stable range me hai with minor fluctuations.`;
  };

  // 🔥 prediction logic (simple but smart)
  const generatePrediction = () => {
    if (isHigh) {
      return `Gold price may see slight correction tomorrow as prices are currently high. Investors should wait for dip before buying.`;
    }

    if (isLow) {
      return `Gold price may increase tomorrow as current levels are low and demand can rise. This could be a good buying opportunity.`;
    }

    return `Gold price tomorrow may remain stable with slight fluctuations. Market trend is neutral currently.`;
  };

  return (
    <>
      {/* 🔥 SEO */}
      <Helmet>
        <title>Gold Price Today India – {today} | Aaj Sone Ka Bhav</title>

        <meta
          name="description"
          content={`Gold price today in India ${today}. 24K gold at ${formatINR(
            prices.gold24k
          )}, 22K gold at ${formatINR(
            prices.gold22k
          )}. Aaj sone ka bhav and market prediction.`}
        />

        <meta
          name="keywords"
          content="gold price today india, aaj sone ka bhav, gold rate today, 24k gold price, 22k gold price india"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <article>
            {/* 🔥 Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              Gold Price Today in India – {today}
            </h1>

            <p className="text-sm text-muted-foreground mb-6">
              Last updated: {prices.lastUpdated} IST
            </p>

            {/* 🔥 SEO Content */}
            <p className="text-base text-muted-foreground mb-6">
              Aaj sone ka bhav kya hai? Gold price today in India is{" "}
              {formatINR(prices.gold24k)} for 24K gold and{" "}
              {formatINR(prices.gold22k)} for 22K gold. Check latest gold rate,
              market trend and prediction for tomorrow.
            </p>

            {/* 🔥 Price Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">
                  24K Gold ({t("per10g")})
                </p>
                <p className="text-2xl font-serif font-bold text-foreground">
                  {formatINR(prices.gold24k)}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">
                  22K Gold ({t("per10g")})
                </p>
                <p className="text-2xl font-serif font-bold text-foreground">
                  {formatINR(prices.gold22k)}
                </p>
              </div>
            </div>

            {/* 🔥 Dynamic Insights */}
            <div className="space-y-6">
              <InsightCard
                title="Market Insight"
                text={generateInsight()}
                icon={<TrendingUp className="w-5 h-5 text-gold" />}
              />

              <InsightCard
                title="Prediction for Tomorrow"
                text={generatePrediction()}
                icon={<Brain className="w-5 h-5 text-gold" />}
              />
            </div>

            {/* 🔥 Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: `Gold Price Today in India – ${today}`,
                  description: `24K gold price ${formatINR(
                    prices.gold24k
                  )}, 22K gold price ${formatINR(
                    prices.gold22k
                  )}. Market insights and predictions.`,
                  datePublished: new Date().toISOString(),
                  author: {
                    "@type": "Organization",
                    name: "AI Gold Price Insights",
                  },
                }),
              }}
            />
          </article>
        </div>
      </div>
    </>
  );
};

export default Blog;
