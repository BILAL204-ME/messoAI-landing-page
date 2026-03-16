import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 via-primary/5 to-primary/10" />
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-6">
            Empieza a construir{" "}
            <span className="text-primary">tu web hoy</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Miles de emprendedores en LatAm ya confían en Buildoria. ¿Qué esperas?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#ai-builder"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-saffron text-accent-foreground font-body font-bold text-base shadow-[0_6px_0_0_hsl(var(--saffron-dark))] hover:shadow-[0_3px_0_0_hsl(var(--saffron-dark))] hover:translate-y-[3px] transition-all duration-200"
            >
              <Sparkles size={20} />
              Construir con IA
            </motion.a>
            <motion.a
              href="#developers"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-bold text-base shadow-[0_6px_0_0_hsl(var(--terracotta-dark))] hover:shadow-[0_3px_0_0_hsl(var(--terracotta-dark))] hover:translate-y-[3px] transition-all duration-200"
            >
              <Users size={20} />
              Encontrar Desarrollador
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
