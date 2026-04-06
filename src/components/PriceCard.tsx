import { TrendingUp, TrendingDown } from "lucide-react";
import { formatINR } from "@/data/goldData";
import { useLanguage } from "@/context/LanguageContext";

interface PriceCardProps {
  label: string;
  price: number;
  change: number;
  changePercent: number;
  isUp: boolean;
}

const PriceCard = ({ label, price, change, changePercent, isUp }: PriceCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{t("per10g")}</span>
      </div>
      <p className="text-3xl font-bold text-foreground mb-2 font-serif">
        {formatINR(price)}
      </p>
      <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? "text-success" : "text-danger"}`}>
        {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>
          {isUp ? "+" : "-"}{formatINR(Math.abs(change))} ({changePercent.toFixed(2)}%)
        </span>
        <span className="text-xs ml-1">
          {isUp ? t("priceUp") : t("priceDown")}
        </span>
      </div>
    </div>
  );
};

export default PriceCard;
