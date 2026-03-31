import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import buildoriaLogo from "@/assets/buildoria-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/hooks/use-auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isLoggedIn, logout } = useAuth();

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
          <img src={buildoriaLogo} alt="massoAI" className="h-10 w-auto" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground">massoAI</span>
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
          
          {isLoggedIn ? (
            <motion.button 
              onClick={logout}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors border border-primary/20"
              title={t("auth.logout")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={20} />
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsRegisterOpen(true)}
                  className="font-body font-semibold text-sm"
                >
                  {t("auth.register")}
                </Button>
              </motion.div>
              <motion.a
                href="#ai-builder"
                className="px-5 py-2.5 rounded-full bg-saffron text-accent-foreground font-body font-semibold text-sm shadow-[0_4px_0_0_hsl(var(--saffron-dark))] hover:shadow-[0_2px_0_0_hsl(var(--saffron-dark))] hover:translate-y-[2px] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("nav.startAI")}
              </motion.a>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          {isLoggedIn && (
             <button 
              onClick={logout}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20"
            >
              <User size={16} />
            </button>
          )}
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
                {!isLoggedIn && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsOpen(false);
                      setIsRegisterOpen(true);
                    }}
                    className="rounded-full py-6"
                  >
                    {t("auth.register")}
                  </Button>
                )}
                <a href="#ai-builder" className="px-5 py-3 rounded-full bg-saffron text-accent-foreground font-body font-semibold text-sm text-center shadow-[0_4px_0_0_hsl(var(--saffron-dark))]">
                  {t("nav.startAI")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegisterModal 
        open={isRegisterOpen} 
        onOpenChange={setIsRegisterOpen}
        onLoginClick={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <LoginModal 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
