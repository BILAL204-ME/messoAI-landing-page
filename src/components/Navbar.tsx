import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import buildoriaLogo from "@/assets/buildoria-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const links = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.aiBuilder"), href: "#ai-builder" },
    { label: t("nav.developers"), href: "#developers" },
    { label: t("nav.pricing"), href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="flex items-center gap-2">
          <img src={buildoriaLogo} alt="Buildoria" className="h-10 w-auto" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground">Buildoria</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a href="#ai-builder" className="px-5 py-2.5 rounded-full bg-saffron text-accent-foreground font-body font-semibold text-sm shadow-[0_4px_0_0_hsl(var(--saffron-dark))] hover:shadow-[0_2px_0_0_hsl(var(--saffron-dark))] hover:translate-y-[2px] transition-all duration-200">
            {t("nav.startAI")}
          </a>
          <a href="#developers" className="px-5 py-2.5 rounded-full border-2 border-primary text-primary font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            {t("nav.scheduleDev")}
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="font-body text-base text-foreground" onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <a href="#ai-builder" className="px-5 py-3 rounded-full bg-saffron text-accent-foreground font-body font-semibold text-sm text-center shadow-[0_4px_0_0_hsl(var(--saffron-dark))]">
                  {t("nav.startAI")}
                </a>
                <a href="#developers" className="px-5 py-3 rounded-full border-2 border-primary text-primary font-body font-semibold text-sm text-center">
                  {t("nav.scheduleDev")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
