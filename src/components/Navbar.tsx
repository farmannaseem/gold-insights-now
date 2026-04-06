import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          <span className="font-serif font-bold text-lg text-foreground">AI Gold Insights</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${location.pathname === "/" ? "text-gold-dark" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("home")}
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors ${location.pathname === "/blog" ? "text-gold-dark" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("blog")}
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
