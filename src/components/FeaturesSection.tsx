import { motion } from "framer-motion";
import { Bot, Users, ClipboardList, CalendarClock, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Bot, title: t("features.aiGenerator"), description: t("features.aiGeneratorDesc"), color: "bg-saffron/10 text-saffron-dark" },
    { icon: Users, title: t("features.devMarketplace"), description: t("features.devMarketplaceDesc"), color: "bg-primary/10 text-primary" },
    { icon: ClipboardList, title: t("features.reqBuilder"), description: t("features.reqBuilderDesc"), color: "bg-emerald/10 text-emerald" },
    { icon: CalendarClock, title: t("features.scheduling"), description: t("features.schedulingDesc"), color: "bg-saffron/10 text-saffron-dark" },
    { icon: DollarSign, title: t("features.pricing"), description: t("features.pricingDesc"), color: "bg-primary/10 text-primary" },
  ];

  return (
    <section className="py-24 lg:py-32" id="features">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("features.badge")}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground">{t("features.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.02, rotate: 0.5 }} className="bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-xl transition-shadow cursor-default">
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
