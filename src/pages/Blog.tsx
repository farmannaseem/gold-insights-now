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

  return (
    <>
      <Helmet>
        <title>Gold Price Today India – {today} | Aaj Sone Ka Bhav</title>
        <meta
          name="description"
          content={`Gold price today in India ${today}. 24K gold at ${formatINR(prices.gold24k)}, 22K gold at ${formatINR(prices.gold22k)}. AI predictions and market insights. Aaj sone ka bhav.`}
        />
        <meta name="keywords" content="gold price today india, aaj sone ka bhav, gold rate today, 24k gold price, 22k gold price india" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <article>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              {t("blogTitle")} – {today}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Updated: {prices.lastUpdated} IST
            </p>

            {/* Price Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">24K Gold ({t("per10g")})</p>
                <p className="text-2xl font-serif font-bold text-foreground">{formatINR(prices.gold24k)}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">22K Gold ({t("per10g")})</p>
                <p className="text-2xl font-serif font-bold text-foreground">{formatINR(prices.gold22k)}</p>
              </div>
            </div>

            {/* AI Content */}
            <div className="space-y-6">
              <InsightCard
                title={t("marketInsight")}
                text={t("marketInsightText")}
                icon={<TrendingUp className="w-5 h-5 text-gold" />}
              />
              <InsightCard
                title={t("tomorrowPrediction")}
                text={t("tomorrowPredictionText")}
                icon={<Brain className="w-5 h-5 text-gold" />}
              />
            </div>

            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: `Gold Price Today in India – ${today}`,
                description: `24K gold price ${formatINR(prices.gold24k)}, 22K gold price ${formatINR(prices.gold22k)}. AI-powered market insights and predictions.`,
                datePublished: new Date().toISOString(),
                author: { "@type": "Organization", name: "AI Gold Price Insights" },
              }),
            }} />
          </article>
        </div>
      </div>
    </>
  );
};

export default Blog;
