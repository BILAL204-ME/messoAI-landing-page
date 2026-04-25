import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Star, Calendar, Code, Palette, Server } from "lucide-react";
import { Link } from "react-router-dom";

const MarketplacePage = () => {
  const { t } = useTranslation();

  const developers = [
    {
      name: t("devMarketplace.dev1Name"),
      specialty: t("devMarketplace.dev1Specialty"),
      rate: "800دج/ساعة",
      rating: 4.9,
      projects: 50,
      icon: <Palette size={24} />,
    },
    {
      name: t("devMarketplace.dev2Name"),
      specialty: t("devMarketplace.dev2Specialty"),
      rate: "1000دج/ساعة",
      rating: 4.8,
      projects: 35,
      icon: <Server size={24} />,
    },
    {
      name: "حماني كريم",
      specialty: "مطور Full Stack",
      rate: "900دج/ساعة",
      rating: 4.9,
      projects: 28,
      icon: <Code size={24} />,
    },
    {
      name: "بوبكر محمد",
      specialty: "مطور UI/UX",
      rate: "750دج/ساعة",
      rating: 4.7,
      projects: 20,
      icon: <Palette size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("devMarketplace.badge")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("devMarketplace.title")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("devMarketplace.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((dev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <User className="text-primary" size={32} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground text-center mb-1">{dev.name}</h3>
                <p className="font-body text-sm text-muted-foreground text-center mb-4">{dev.specialty}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-body text-sm font-bold text-foreground">{dev.rating}</span>
                  </div>
                  <span className="font-body text-sm text-muted-foreground">{dev.projects} مشروع</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">{dev.rate}</span>
                  <Link
                    to="/book"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    {t("devMarketplace.scheduleBtn")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-16 bg-card rounded-2xl p-8 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">لماذا تختار السوق؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">مطورون معتمدون</h3>
                <p className="font-body text-sm text-muted-foreground">جميع المطورين يمرون بعملية تدقيق صارمة</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">حجز فوري</h3>
                <p className="font-body text-sm text-muted-foreground">احجز اجتماعاً مع المطور في ثوانٍ</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Code className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">جودة مضمونة</h3>
                <p className="font-body text-sm text-muted-foreground">دعم ما بعد التسليم لضمان رضاك</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MarketplacePage;