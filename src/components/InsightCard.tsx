import { Sparkles } from "lucide-react";

interface InsightCardProps {
  title: string;
  text: string;
  icon?: React.ReactNode;
}

const InsightCard = ({ title, text, icon }: InsightCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon || <Sparkles className="w-5 h-5 text-gold" />}
        <h2 className="text-xl font-serif font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed text-sm">{text}</p>
      <div className="mt-3 flex items-center gap-1">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
          AI Generated
        </span>
      </div>
    </div>
  );
};

export default InsightCard;
