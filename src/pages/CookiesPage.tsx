import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Cookie, Settings, ChevronRight, X } from "lucide-react";

const CookiesPage = () => {
  const { t } = useTranslation();

  const cookieTypes = [
    {
      title: "الكوكيز الضرورية",
      description: "ضرورية لتشغيل الموقع. تتيح لك التنقل واستخدام الميزات الأساسية.",
      essential: true,
    },
    {
      title: "كوكيز التحليلات",
      description: "تساعدنا في فهم كيفية استخدام الموقع وتحسينه.",
      essential: false,
    },
    {
      title: "كوكيز التسويق",
      description: "تستخدم لتتبع نشاطك对你的浏览，以提供 relevan الإعلانات.",
      essential: false,
    },
    {
      title: "كوكيز التفضيلات",
      description: "تذكر إعداداتك المفضلة ولغتك.",
      essential: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Cookie className="text-primary" size={40} />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              {t("footer.cookies")}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              آخر تحديث: 25 أبريل 2026
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">ما هي الكوكيز؟</h2>
              <p className="font-body text-muted-foreground mb-4">
                الكوكيز هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة الموقع. أنها تساعد في تحسين تجربتك.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {cookieTypes.map((cookie, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-bold text-foreground">{cookie.title}</h3>
                        {cookie.essential && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body text-xs">
                            ضروري
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm text-muted-foreground">{cookie.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">كيفية التحكم في الكوكيز</h2>
              <p className="font-body text-muted-foreground mb-4">
                You can control or delete cookies through your browser settings. Note that disabling essential cookies may affect site functionality.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border font-body text-sm hover:border-primary transition-colors">
                  <Settings size={16} /> إعدادات الكوكيز
                </button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">مثال على بياناتي</h2>
              <p className="font-body text-muted-foreground mb-4">
                إذا كنت تريد طلب نسخة من بياناتك أو حذفها، يرجى التواصل معنا.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-primary font-body font-bold hover:gap-3 transition-all">
                {t("footer.contact")} <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CookiesPage;