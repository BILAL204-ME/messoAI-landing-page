import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";
import buildoriaLogo from "@/assets/buildoria-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background split */}
      <div className="absolute inset-0 hidden lg:flex">
        <div className="w-1/2 bg-gradient-to-br from-saffron/10 to-transparent" />
        <div className="w-1/2 bg-gradient-to-bl from-primary/10 to-transparent" />
      </div>
      <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-saffron/10 via-transparent to-primary/10" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Plataforma de creación web
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] text-foreground text-balance">
                Construye tu sitio web{" "}
                <span className="text-saffron">en minutos.</span>
              </h1>
              <p className="mt-6 font-body text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl" style={{ textWrap: "pretty" as any }}>
                Elige la velocidad de la IA o el toque maestro de un desarrollador experto. Sin complicaciones.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#ai-builder"
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-saffron text-accent-foreground font-body font-bold text-base shadow-[0_6px_0_0_hsl(var(--saffron-dark))] hover:shadow-[0_3px_0_0_hsl(var(--saffron-dark))] hover:translate-y-[3px] transition-all duration-200"
                >
                  <Sparkles size={20} />
                  Empezar con IA
                </motion.a>
                <motion.a
                  href="#developers"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-body font-bold text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Users size={20} />
                  Agendar Desarrollador
                </motion.a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm font-body text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-emerald" />
                  98% satisfacción
                </span>
                <span>⚡ Webs en 0.8s</span>
                <span>🌎 LatAm #1</span>
              </div>
            </motion.div>
          </div>

          {/* Hero illustration */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-saffron/20 via-primary/10 to-transparent rounded-full blur-3xl" />
              <img
                src={buildoriaLogo}
                alt="Buildoria - IA y desarrolladores construyendo la web"
                className="relative w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
