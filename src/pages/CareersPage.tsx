import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Clock, Send, Briefcase, Code, Palette, Megaphone, Heart } from "lucide-react";

const CareersPage = () => {
  const { t } = useTranslation();

  const jobs = [
    {
      title: "مطور Frontend",
      type: "دوام كامل",
      location: "عن بُعد",
      department: "تقنية",
      description: "ابحث عن مطور frontend متمرس لتقليد واجه المستخدم.",
    },
    {
      title: "مطور Backend",
      type: "دوام كامل",
      location: "عن بُعد",
      department: "تقنية",
      description: "ابحث عن مطور backend متخصص بـ Node.js وMySQL.",
    },
    {
      title: "مصمم UI/UX",
      type: "دوام كامل",
      location: "عن بُعد",
      department: "تصميم",
      description: "انضم لفريق التصميم واصمم واجهات مستخدم مبتكرة.",
    },
    {
      title: "مسوق رقمي",
      type: "دوام جزئي",
      location: "عن بُعد",
      department: "تسويق",
      description: "ساعدنا في الوصول لرواد الأعمال في المنطقة.",
    },
  ];

  const benefits = [
    { icon: <Heart size={24} />, title: "بيئة عمل مرنة", desc: "العمل من أي مكان" },
    { icon: <Clock size={24} />, title: "مرونة الوقت", desc: "ساعات عمل مرنة" },
    { icon: <Briefcase size={24} />, title: "تطوير مستمر", desc: "دورات تدريبية" },
    { icon: <Code size={24} />, title: "تقنيات حديثة", desc: "أحدث الأدوات" },
  ];

  const values = [
    "الشغف للتقنية",
    "العمل الجماعي",
    "الإبداع",
    "الالتزام بالجودة",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("footer.company")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("footer.careers")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              انضم لفريق massoAI وساعدنا في إعادة定义 بناء المواقع
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">الوظائف المتاحة</h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">{job.title}</h3>
                      <p className="font-body text-sm text-muted-foreground mb-2">{job.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <Clock size={14} /> {job.type}
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <Briefcase size={14} /> {job.department}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-bold hover:bg-primary/90 transition-colors">
                      تقدم الآن <Send size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">قيمنا في التوظيف</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((value, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm font-bold"
                >
                  {value}
                </span>
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground text-center mt-6">
             نحن نؤمن بالتنوع والشمولية. جميع الطلبات مرحب بها بغض النظر عن الجنس أو العرق أو الديانة.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersPage;