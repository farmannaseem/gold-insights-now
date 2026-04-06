import { Link } from "react-router-dom";
import { TrendingUp, Brain, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { last7Days } from "@/data/goldData";
import PriceCard from "@/components/PriceCard";
import GoldChart from "@/components/GoldChart";
import InsightCard from "@/components/InsightCard";

const Index = () => {
  const { t } = useLanguage();
  const { data: prices, loading } = useGoldPrice();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3">
            {t("headerTitle")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("headerSubtitle")}</p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-8 pb-12">
        {/* Live Prices */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            {t("livePrice")}
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : prices.lastUpdated}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PriceCard
              label="24K Gold"
              price={prices.gold24k}
              change={prices.change24k}
              changePercent={prices.changePercent24k}
              isUp={prices.isUp}
            />
            <PriceCard
              label="22K Gold"
              price={prices.gold22k}
              change={prices.change24k * 0.91}
              changePercent={prices.changePercent24k}
              isUp={prices.isUp}
            />
          </div>
        </section>

        {/* Chart */}
        <GoldChart />

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            title={t("predictionTitle")}
            text={t("predictionText")}
            icon={<Brain className="w-5 h-5 text-gold" />}
          />
          <InsightCard
            title={t("whyChanged")}
            text={t("whyChangedText")}
            icon={<TrendingUp className="w-5 h-5 text-gold" />}
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-all text-sm"
          >
            📄 {t("viewReport")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
