import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface Translations {
  [key: string]: { en: string; hi: string };
}

const translations: Translations = {
  headerTitle: { en: "Gold Price Today in India", hi: "आज भारत में सोने का भाव" },
  headerSubtitle: { en: "Live gold rates, prediction & insights", hi: "लाइव सोने की दरें, भविष्यवाणी और जानकारी" },
  livePrice: { en: "Live Gold Prices", hi: "लाइव सोने की कीमतें" },
  per10g: { en: "per 10g", hi: "प्रति 10 ग्राम" },
  chartTitle: { en: "7-Day Gold Price Trend", hi: "7 दिन का सोना मूल्य रुझान" },
  predictionTitle: { en: "AI Price Prediction", hi: "AI मूल्य भविष्यवाणी" },
  predictionText: {
    en: "Gold may increase tomorrow due to rising global demand and weakening USD. Analysts expect prices to test ₹73,500 levels for 24K gold.",
    hi: "वैश्विक मांग बढ़ने और USD कमजोर होने के कारण सोने की कीमत कल बढ़ सकती है। विश्लेषकों को उम्मीद है कि 24K सोने की कीमत ₹73,500 के स्तर को छू सकती है।",
  },
  whyChanged: { en: "Why Did Gold Prices Change?", hi: "सोने की कीमतें क्यों बदलीं?" },
  whyChangedText: {
    en: "Gold prices increased due to USD weakness, rising inflation concerns, and increased central bank buying. Geopolitical tensions in the Middle East also contributed to safe-haven demand.",
    hi: "USD की कमजोरी, बढ़ती मुद्रास्फीति की चिंताओं और केंद्रीय बैंक की खरीदारी बढ़ने के कारण सोने की कीमतें बढ़ीं। मध्य पूर्व में भू-राजनीतिक तनाव ने भी सुरक्षित निवेश की मांग बढ़ाई।",
  },
  viewReport: { en: "View Today's Full Gold Report", hi: "आज की पूरी सोने की रिपोर्ट देखें" },
  blogTitle: { en: "Gold Price Today in India", hi: "आज भारत में सोने का भाव" },
  marketInsight: { en: "Market Insight", hi: "बाजार की जानकारी" },
  marketInsightText: {
    en: "The Indian gold market is showing bullish momentum as international prices surge. The rupee's mild depreciation against the dollar has further pushed domestic gold prices higher. Wedding season demand continues to support prices at current levels. MCX gold futures are trading at a premium, indicating strong domestic demand.",
    hi: "अंतरराष्ट्रीय कीमतों में उछाल के साथ भारतीय सोना बाजार तेजी का रुख दिखा रहा है। डॉलर के मुकाबले रुपये की हल्की गिरावट ने घरेलू सोने की कीमतों को और ऊपर धकेल दिया है। शादी के सीजन की मांग मौजूदा स्तरों पर कीमतों को सहारा दे रही है।",
  },
  tomorrowPrediction: { en: "Prediction for Tomorrow", hi: "कल की भविष्यवाणी" },
  tomorrowPredictionText: {
    en: "Based on current global trends, gold prices are expected to remain firm tomorrow. Key factors include the upcoming US Fed meeting minutes and crude oil price movements. We anticipate a range of ₹72,800-₹73,600 for 24K gold per 10 grams.",
    hi: "मौजूदा वैश्विक रुझानों के आधार पर, कल सोने की कीमतें मजबूत रहने की उम्मीद है। प्रमुख कारकों में आगामी US Fed बैठक के मिनट्स और कच्चे तेल की कीमतों में उतार-चढ़ाव शामिल हैं। हम 24K सोने के लिए प्रति 10 ग्राम ₹72,800-₹73,600 की रेंज की उम्मीद करते हैं।",
  },
  disclaimer: { en: "AI-generated insights. Not financial advice.", hi: "AI-जनित जानकारी। वित्तीय सलाह नहीं है।" },
  home: { en: "Home", hi: "होम" },
  blog: { en: "Blog", hi: "ब्लॉग" },
  priceUp: { en: "Up", hi: "बढ़ा" },
  priceDown: { en: "Down", hi: "घटा" },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "hi" : "en"));

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
