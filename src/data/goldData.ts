// Mock gold price data for India (per 10g in INR)
export const currentPrices = {
  gold24k: 73250,
  gold22k: 67150,
  change24k: 350,
  change22k: 320,
  changePercent24k: 0.48,
  changePercent22k: 0.48,
  isUp: true,
  lastUpdated: new Date().toLocaleTimeString("en-IN"),
};

export const last7Days = [
  { date: "Mar 31", price: 71800 },
  { date: "Apr 1", price: 72100 },
  { date: "Apr 2", price: 72450 },
  { date: "Apr 3", price: 71950 },
  { date: "Apr 4", price: 72600 },
  { date: "Apr 5", price: 72900 },
  { date: "Apr 6", price: 73250 },
];

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
