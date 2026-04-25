import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      await apiPost(API_ENDPOINTS.CONTACT_SUBMIT, formData, { public: true });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail size={24} />, title: "البريد الإلكتروني", value: "contact@massoai.com" },
    { icon: <Phone size={24} />, title: "الهاتف", value: "+213 555 123 456" },
    { icon: <MapPin size={24} />, title: "الموقع", value: "الجزائر، الجزائر" },
  ];

  const subjects = ["استفسار عام", "دعم فني", "شراكات", "أخرى"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 lg:py-28 pt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">{t("footer.company")}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">{t("footer.contact")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question? We are here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-card rounded-2xl p-8 border border-border">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="text-primary" size={40} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="font-body text-muted-foreground">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send us a message</h2>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-body resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="bg-card p-6 rounded-2xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground">{info.title}</h3>
                        <p className="font-body text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Working Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Monday - Friday</span>
                    <span className="font-body text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Saturday</span>
                    <span className="font-body text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Sunday</span>
                    <span className="font-body text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;