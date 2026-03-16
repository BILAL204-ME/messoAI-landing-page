import { motion } from "framer-motion";
import { Star, Calendar, Code2, ShoppingCart, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

const DevMarketplace = () => {
  const { t } = useTranslation();

  const developers = [
    { 
      nameKey: "dev1Name", 
      specialtyKey: "dev1Specialty", 
      icon: ShoppingCart, 
      rating: 4.5, 
      reviews: 127, 
      rate: "800DA/hr", 
      online: true,
      portfolio: "https://ayybdell.vercel.app/"
    },
    { 
      nameKey: "dev2Name", 
      specialtyKey: "dev2Specialty", 
      icon: Code2, 
      rating: 4.5, 
      reviews: 89, 
      rate: "800DA/hr", 
      online: true 
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" id="developers">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("devMarketplace.badge")}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("devMarketplace.title")}</h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("devMarketplace.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {developers.map((dev, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} whileHover={{ y: -4, rotate: 0.5 }} className="bg-card rounded-2xl p-7 border-b-4 border-r-4 border-foreground/10 shadow-lg">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <dev.icon size={24} className="text-primary" />
                  </div>
                  {dev.online && <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald border-2 border-card animate-pulse-emerald" />}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{t(`devMarketplace.${dev.nameKey}`)}</h3>
                  <p className="font-body text-sm text-muted-foreground">{t(`devMarketplace.${dev.specialtyKey}`)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="fill-saffron text-saffron" />
                  <span className="font-body font-semibold text-foreground">{dev.rating}</span>
                  <span className="font-body text-xs text-muted-foreground">({dev.reviews})</span>
                </div>
                <span className="font-body font-semibold text-primary">{dev.rate}</span>
              </div>

              <div className="flex flex-col gap-3">
                {dev.portfolio && (
                  <motion.a 
                    href={dev.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="w-full px-5 py-3 rounded-xl border-2 border-primary/20 text-foreground font-body font-semibold text-sm hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {t("devMarketplace.viewPortfolio")}
                  </motion.a>
                )}
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  {t("devMarketplace.scheduleBtn")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevMarketplace;
