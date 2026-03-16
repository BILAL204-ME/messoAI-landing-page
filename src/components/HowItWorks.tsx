import { motion } from "framer-motion";
import { FileText, GitBranch, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: FileText, number: "01", title: t("howItWorks.step1Title"), description: t("howItWorks.step1Desc") },
    { icon: GitBranch, number: "02", title: t("howItWorks.step2Title"), description: t("howItWorks.step2Desc") },
    { icon: Rocket, number: "03", title: t("howItWorks.step3Title"), description: t("howItWorks.step3Desc") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("howItWorks.badge")}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground">{t("howItWorks.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative bg-card rounded-2xl p-8 border-b-4 border-r-4 border-foreground/10 shadow-lg">
              <span className="font-display text-6xl font-extrabold text-saffron/20 absolute top-4 end-6">{step.number}</span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
