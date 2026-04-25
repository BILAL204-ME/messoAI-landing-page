import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Users, Mail, ChevronRight } from "lucide-react";

const PrivacyPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: "معلومات是我们 نجمعها",
      content: "نجمع المعلومات التي تقدمها لنا عند التسجيل أو استخدام خدماتنا، بما في ذلك اسمك والبريد الإلكتروني ورقم الهاتف والمعلومات المتعلقة بمشاريعك.",
    },
    {
      title: "كيف نستخدم معلوماتك",
      content: "نستخدم معلوماتك لتقديم خدماتنا وتحسينها والتواصل معك بشأن مشاريعك وتخصيص تجربتك.",
    },
    {
      title: "حماية معلوماتك",
      content: "نستخدم تقنيات تشفير متقدمة لحماية معلوماتك الشخصية ونضمن أمان بياناتك.",
    },
    {
      title: "مشاركة المعلومات",
      content: "لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة except as necessary для تقديم خدماتنا.",
    },
    {
      title: "حقوقك",
      content: "لديك الحق في الوصول إلى معلوماتك الشخصية وتعديلها وحذفها. يمكنك ممارسة هذه الحقوق بالتواصل معنا.",
    },
    {
      title: "التغييرات",
      content: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنخطرك بأي تغييرات جوهرية.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="text-primary" size={40} />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              {t("footer.privacy")}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              آخر تحديث: 25 أبريل 2026
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg max-w-none">
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <p className="font-body text-muted-foreground mb-6">
                في massoAI،我们将您的隐私放在首位。此 سياسة الخصوصية解释了我们如何收集、使用、披露和保护您的个人信息。
              </p>
              <p className="font-body text-muted-foreground">
                使用我们的服务，即表示您同意收集和使用信息的做法 according to this policy.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((section, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">{section.title}</h2>
                  <p className="font-body text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">تواصل معنا</h2>
              <p className="font-body text-muted-foreground mb-4">
                如果您有任何疑问或疑虑，请随时与我们联系。
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

export default PrivacyPage;