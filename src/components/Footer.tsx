import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-muted-foreground">
          ⚠️ {t("disclaimer")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © {new Date().getFullYear()} AI Gold Price Insights (India)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
