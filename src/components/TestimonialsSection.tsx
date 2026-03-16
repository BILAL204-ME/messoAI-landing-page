import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "Fundadora, CaféLatino",
    quote: "En 10 minutos tenía mi web lista con el generador IA. Increíble lo rápido que fue. ¡Mi negocio ahora tiene presencia digital!",
    rating: 5,
  },
  {
    name: "Roberto Álvarez",
    role: "CEO, TechMX Startup",
    quote: "Trabajé con un desarrollador de Buildoria para mi plataforma SaaS. Profesional, rápido y a un precio justo. 100% recomendado.",
    rating: 5,
  },
  {
    name: "Lucía Fernández",
    role: "Dueña, Boutique Flores",
    quote: "No sabía nada de tecnología y ahora tengo una tienda en línea hermosa. Buildoria hizo todo el proceso fácil y divertido.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Testimonios
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-7 border border-border shadow-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-saffron text-saffron" />
                ))}
              </div>
              <p className="font-body text-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground">{t.name}</p>
                <p className="font-body text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
