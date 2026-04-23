import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const AIBuilderSection = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const tags = t("aiBuilder.tags", { returnObjects: true }) as string[];

  const handleGenerate = () => {
    if (prompt.trim()) {
      navigate(`/builder?prompt=${encodeURIComponent(prompt.trim())}`);
    } else {
      navigate("/builder");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-saffron/5 to-transparent" id="ai-builder">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 text-saffron-dark font-body font-semibold text-sm mb-6">
            <Sparkles size={16} />
            {t("aiBuilder.badge")}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("aiBuilder.title")}</h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">{t("aiBuilder.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ scale: 1.02 }} className="relative">
          <div className={`bg-card rounded-3xl border-2 p-2 shadow-2xl transition-all duration-500 ${inputFocused ? "animate-gradient-pulse border-saffron" : "border-border"}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={t("aiBuilder.placeholder")}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-6 py-5 rounded-2xl bg-transparent font-body text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none"
                dir="auto"
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={handleGenerate}
                className="px-8 py-5 rounded-2xl bg-saffron text-accent-foreground font-body font-bold text-base shadow-[0_4px_0_0_hsl(var(--saffron-dark))] hover:shadow-[0_2px_0_0_hsl(var(--saffron-dark))] hover:translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {t("aiBuilder.button")}
                <ArrowIcon size={18} />
              </motion.button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-medium cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIBuilderSection;
