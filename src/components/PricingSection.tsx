import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const PricingSection = () => {
  const { t } = useTranslation();

  const tiers = [
    {
      name: t("pricing.starter"),
      price: t("pricing.starterPrice"),
      description: t("pricing.starterDesc"),
      features: t("pricing.starterFeatures", { returnObjects: true }) as string[],
      highlighted: false,
      cta: t("pricing.ctaStart"),
      isCustom: false,
    },
    {
      name: t("pricing.pro"),
      price: t("pricing.proPrice"),
      description: t("pricing.proDesc"),
      features: t("pricing.proFeatures", { returnObjects: true }) as string[],
      highlighted: true,
      cta: t("pricing.ctaChoose"),
      isCustom: false,
    },
    {
      name: t("pricing.custom"),
      price: t("pricing.customPrice"),
      description: t("pricing.customDesc"),
      features: t("pricing.customFeatures", { returnObjects: true }) as string[],
      highlighted: false,
      cta: t("pricing.ctaContact"),
      isCustom: true,
    },
  ];

  return (
    <section className="py-24 lg:py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("pricing.badge")}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("pricing.title")}</h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} whileHover={{ y: -6 }}
              className={`rounded-2xl p-8 border-2 ${tier.highlighted ? "border-primary bg-primary/5 shadow-xl scale-[1.02]" : "border-border bg-card shadow-lg"}`}>
              {tier.highlighted && <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold mb-4">{t("pricing.proPopular")}</span>}
              <h3 className="font-display text-2xl font-bold text-foreground">{tier.name}</h3>
              <div className="mt-3 mb-2">
                <span className="font-display text-4xl font-extrabold text-foreground">{tier.price}</span>
                {!tier.isCustom && <span className="font-body text-muted-foreground ms-1">{t("pricing.perProject")}</span>}
              </div>
              <p className="font-body text-sm text-muted-foreground mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-foreground">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-xl font-body font-bold text-sm transition-all duration-300 ${tier.highlighted ? "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(var(--terracotta-dark))] hover:shadow-[0_2px_0_0_hsl(var(--terracotta-dark))] hover:translate-y-[2px]" : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"}`}>
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
