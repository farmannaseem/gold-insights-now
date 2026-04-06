import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { last7Days, formatINR } from "@/data/goldData";
import { useLanguage } from "@/context/LanguageContext";

const GoldChart = () => {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-serif font-bold text-foreground mb-4">{t("chartTitle")}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(30 8% 46%)" />
            <YAxis
              domain={["dataMin - 200", "dataMax + 200"]}
              tick={{ fontSize: 12 }}
              stroke="hsl(30 8% 46%)"
              tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              formatter={(value: number) => [formatINR(value), "24K Gold"]}
              contentStyle={{
                backgroundColor: "hsl(40 30% 97%)",
                border: "1px solid hsl(35 20% 88%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(43 80% 48%)"
              strokeWidth={3}
              dot={{ fill: "hsl(43 90% 35%)", r: 4 }}
              activeDot={{ r: 6, fill: "hsl(43 80% 48%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GoldChart;
