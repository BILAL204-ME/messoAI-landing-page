import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PageLayout = ({ children, title, subtitle, badge }: { children: React.ReactNode; title: string; subtitle: string; badge?: string }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="py-20 lg:py-28 pt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          {badge && <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{badge}</p>}
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{title}</h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
    <Footer />
  </div>
);

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("features.aiGenerator"),
      description: t("features.aiGeneratorDesc"),
      icon: "🤖",
    },
    {
      title: t("features.devMarketplace"),
      description: t("features.devMarketplaceDesc"),
      icon: "👨‍💻",
    },
    {
      title: t("features.reqBuilder"),
      description: t("features.reqBuilderDesc"),
      icon: "📋",
    },
    {
      title: t("features.scheduling"),
      description: t("features.schedulingDesc"),
      icon: "📅",
    },
    {
      title: t("features.pricing"),
      description: t("features.pricingDesc"),
      icon: "💰",
    },
  ];

  const benefits = [
    t("pricing.starterFeatures", { returnObjects: true }),
    t("pricing.proFeatures", { returnObjects: true }),
    t("pricing.customFeatures", { returnObjects: true }),
  ];

  return (
    <PageLayout badge={t("features.badge")} title={t("features.title")} subtitle={t("features.subtitle") || t("features.aiGeneratorDesc")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300"
          >
            <span className="text-4xl mb-4 block">{feature.icon}</span>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="font-body text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">{t("pricing.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((features, i) => (
            <div key={i}>
              <h3 className="font-display text-lg font-bold text-primary mb-4 text-center">
                {i === 0 ? t("pricing.starter") : i === 1 ? t("pricing.pro") : t("pricing.custom")}
              </h3>
              <ul className="space-y-2">
                {(features as string[]).map((f, j) => (
                  <li key={j} className="flex items-center gap-2 font-body text-sm text-foreground">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Features;