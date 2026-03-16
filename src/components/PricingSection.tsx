import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfecto para empezar tu presencia digital.",
    features: ["1 página web", "Diseño responsive", "Hosting incluido", "Soporte por email"],
    highlighted: false,
    cta: "Empezar",
  },
  {
    name: "Profesional",
    price: "$299",
    description: "Para negocios que necesitan más potencia.",
    features: ["Hasta 5 páginas", "SEO optimizado", "Formularios & integraciones", "Soporte prioritario", "Dominio personalizado"],
    highlighted: true,
    cta: "Elegir Plan",
  },
  {
    name: "Proyecto Custom",
    price: "A medida",
    description: "Soluciones a la medida de tu visión.",
    features: ["Páginas ilimitadas", "Funcionalidades avanzadas", "Desarrollador dedicado", "Soporte 24/7", "Estrategia digital"],
    highlighted: false,
    cta: "Contactar",
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 lg:py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Precios flexibles
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
            Tú defines tu presupuesto
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige la opción que mejor se adapte a tu negocio. Sin sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-8 border-2 ${
                tier.highlighted
                  ? "border-primary bg-primary/5 shadow-xl scale-[1.02]"
                  : "border-border bg-card shadow-lg"
              }`}
            >
              {tier.highlighted && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold mb-4">
                  Más popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-foreground">{tier.name}</h3>
              <div className="mt-3 mb-2">
                <span className="font-display text-4xl font-extrabold text-foreground">{tier.price}</span>
                {tier.price !== "A medida" && <span className="font-body text-muted-foreground ml-1">/proyecto</span>}
              </div>
              <p className="font-body text-sm text-muted-foreground mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-foreground">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-xl font-body font-bold text-sm transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(var(--terracotta-dark))] hover:shadow-[0_2px_0_0_hsl(var(--terracotta-dark))] hover:translate-y-[2px]"
                    : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
