import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2, Code, Palette, Zap } from "lucide-react";

const AIBuilderPage = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResponse(t("aiBuilder.simResponse"));
    }, 2000);
  };

  const tags = t("aiBuilder.tags", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("aiBuilder.badge")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("aiBuilder.title")}</h1>
            <p className="font-body text-lg text-muted-foreground">{t("aiBuilder.subtitle")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setPrompt(tag)}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-body text-sm hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("aiBuilder.placeholder")}
                className="w-full h-32 p-4 rounded-xl bg-background border border-border text-foreground font-body resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="absolute bottom-3 left-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {isGenerating ? t("bookDev.submitting") : t("aiBuilder.button")}
              </button>
            </div>
          </motion.div>

          {response && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{t("aiBuilder.chatTitle")}</h3>
              <p className="font-body text-muted-foreground">{response}</p>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("hero.speed")}</h3>
              <p className="font-body text-sm text-muted-foreground">{t("howItWorks.step3Desc")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Palette className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("nav.features")}</h3>
              <p className="font-body text-sm text-muted-foreground">{t("features.aiGeneratorDesc")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Code className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("devMarketplace.dev1Specialty")}</h3>
              <p className="font-body text-sm text-muted-foreground">{t("features.devMarketplaceDesc")}</p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AIBuilderPage;