import { motion } from "framer-motion";
import { Bot, Users, ClipboardList, CalendarClock, DollarSign } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Generador de Sitios IA",
    description: "Crea tu web al instante describiendo tu idea. Nuestra IA se encarga del resto.",
    color: "bg-saffron/10 text-saffron-dark",
  },
  {
    icon: Users,
    title: "Marketplace de Devs",
    description: "Conecta con desarrolladores profesionales verificados en toda Latinoamérica.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ClipboardList,
    title: "Constructor de Requisitos",
    description: "Define tu proyecto paso a paso con nuestra herramienta guiada.",
    color: "bg-emerald/10 text-emerald",
  },
  {
    icon: CalendarClock,
    title: "Agenda Instantánea",
    description: "Reserva una reunión con tu desarrollador en segundos, sin complicaciones.",
    color: "bg-saffron/10 text-saffron-dark",
  },
  {
    icon: DollarSign,
    title: "Precios Transparentes",
    description: "Tú defines tu presupuesto. Sin sorpresas ni costos ocultos.",
    color: "bg-primary/10 text-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 lg:py-32" id="features">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Todo lo que necesitas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground">
            Potencia tu negocio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-xl transition-shadow duration-350 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
