import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, ChevronRight } from "lucide-react";

const TermsPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: "قبول الشروط",
      content: "باستخدام خدمات massoAI، فأنت توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا.",
    },
    {
      title: "وصف الخدمة",
      content: "مassoAI هي منصة لبناء المواقع باستخدام الذكاء الاصطناعي أو مع مطورين محترفين. نوفر خدمات إنشاء المواقع، سوق المطورين، وأدوات إدارة المشاريع.",
    },
    {
      title: "حسابات المستخدمين",
      content: "أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور. أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك.",
    },
    {
      title: "الملكية الفكرية",
      content: "جميع المحتويات والتصميمات التي تنشئها بمساعدة massoAI هي ملك لك. نحن نمنحك ترخيصاً لاستخدام أدواتنا وخدماتنا.",
    },
    {
      title: "المسؤولية",
      content: "خدماتنا مقدمة كما هي. لا نضمن أن الخدمات ستكون خالية من الأخطاء أو متاحة دائماً.",
    },
    {
      title: "إنهاء الخدمة",
      content: "نreserve ourselves the right to terminate or suspend your account at any time for any reason.",
    },
    {
      title: "تعديل الشروط",
      content: "We may modify these terms at any time. Continued use of the platform after modifications constitutes acceptance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="text-primary" size={40} />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              {t("footer.terms")}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              آخر تحديث: 25 أبريل 2026
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg max-w-none">
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <p className="font-body text-muted-foreground mb-6">
                مرحباً بك في massoAI. These Terms of Service govern your use of our platform and services.
              </p>
              <p className="font-body text-muted-foreground">
                By accessing or using massoAI, you agree to be bound by these terms.
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
              <h2 className="font-display text-xl font-bold text-foreground mb-4">اتصل بنا</h2>
              <p className="font-body text-muted-foreground mb-4">
                If you have questions about these terms, please contact us.
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

export default TermsPage;