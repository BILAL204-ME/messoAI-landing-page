import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Globe, Rocket, Heart, Target, Lightbulb } from "lucide-react";

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "98%", label: t("hero.satisfaction") },
    { value: "10K+", label: "موقع مبني" },
    { value: "50+", label: "مطور محترف" },
    { value: "24/7", label: "دعم" },
  ];

  const values = [
    { icon: <Target size={24} />, title: "رسالتنا", desc: "جعل بناء المواقع متاحاً للجميع بسهولة وذكاء." },
    { icon: <Lightbulb size={24} />, title: "رؤيتنا", desc: "أن نكون المنصة الأولى في المنطقة لبناء المواقع بالذكاء الاصطناعي." },
    { icon: <Heart size={24} />, title: "قيمنا", desc: " بسهولة وشفافية وجودة." },
  ];

  const team = [
    { name: "كريم مسعود", role: "المؤسس والرئيس التنفيذي", image: "👨‍💼" },
    { name: "أحمد بن علي", role: "مطور Full Stack", image: "👨‍💻" },
    { name: "سارة جميل", role: "مصممة UI/UX", image: "👩‍🎨" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("footer.company")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("footer.about")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="font-display text-3xl lg:text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">قيمنا ورسالتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">فريقنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-4xl">
                    {member.image}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;