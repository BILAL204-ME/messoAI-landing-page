import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    { nameKey: "t1Name", roleKey: "t1Role", quoteKey: "t1Quote" },
    { nameKey: "t2Name", roleKey: "t2Role", quoteKey: "t2Quote" },
    { nameKey: "t3Name", roleKey: "t3Role", quoteKey: "t3Quote" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("testimonials.badge")}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground">{t("testimonials.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tm, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-2xl p-7 border border-border shadow-sm">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className="fill-saffron text-saffron" />
                ))}
              </div>
              <p className="font-body text-foreground leading-relaxed mb-6 italic">
                "{t(`testimonials.${tm.quoteKey}`)}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground">{t(`testimonials.${tm.nameKey}`)}</p>
                <p className="font-body text-sm text-muted-foreground">{t(`testimonials.${tm.roleKey}`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
