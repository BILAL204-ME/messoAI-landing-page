import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-secondary text-secondary-foreground font-body text-sm hover:bg-secondary/80 transition-colors">
        <Globe size={16} />
        <span>{languages.find((l) => l.code === i18n.language)?.flag || "🇸🇦"}</span>
      </button>
      <div className="absolute top-full end-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-card rounded-xl border border-border shadow-xl p-1.5 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm transition-colors ${
                i18n.language === lang.code
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
