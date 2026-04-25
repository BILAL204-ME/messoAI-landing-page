import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      title: "كيف تبني موقعاً في دقائق باستخدام الذكاء الاصطناعي",
      excerpt: "اكتشف كيف يمكنك إنشاء موقع احترافي في دقائق معدودة باستخدام منحتنا الجديدة للذكاء الاصطناعي.",
      date: "15 أبريل 2026",
      author: "كريم مسعود",
      category: "ذكاء اصطناعي",
    },
    {
      id: 2,
      title: "أفضل الممارسات لتصميم موقعك الإلكتروني",
      excerpt: "نصائح واحترافات من مصممينا المحترفين لجعل موقعك يبرز بين المنافسين.",
      date: "10 أبريل 2026",
      author: "سارة جميل",
      category: "تصميم",
    },
    {
      id: 3,
      title: "مستقبل تطوير المواقع في الجزائر",
      excerpt: "نظرة على مستقبل التقنية في المنطقة وكيف نساهم في تبني هذه التقنية.",
      date: "5 أبريل 2026",
      author: "أحمد بن علي",
      category: "تكنولوجيا",
    },
    {
      id: 4,
      title: "كيف تختار المطور المناسب لمشروعك",
      excerpt: "دليل شامل لاختيار المطور الأمثل بناءً على متطلبات مشروعك وميزانيتك.",
      date: "1 أبريل 2026",
      author: "كريم مسعود",
      category: "أعمال",
    },
  ];

  const categories = ["الكل", "ذكاء اصطناعي", "تصميم", "تكنولوجيا", "أعمال"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("footer.company")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("footer.blog")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              آخر الأخبار والنصائح والمقالات من فريق massoAI
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full bg-card border border-border font-body text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-body text-xs">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar size={14} />
                      <span className="font-body text-xs">{post.date}</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">{post.title}</h2>
                  <p className="font-body text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      <span className="font-body text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <button className="flex items-center gap-1 text-primary font-body text-sm font-bold hover:gap-2 transition-all">
                      اقرأ المزيد <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;