import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Users, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const NewProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const options = [
    {
      id: "ai",
      title: t("newProject.aiTitle", "Build with AI"),
      description: t("newProject.aiDesc", "Describe your idea and let AI generate your website instantly"),
      icon: Sparkles,
      gradient: "from-primary to-orange-400",
      hoverGlow: "hover:shadow-primary/20",
      path: "/builder",
    },
    {
      id: "dev",
      title: t("newProject.devTitle", "Work with a Developer"),
      description: t("newProject.devDesc", "Connect with an expert developer to build your project"),
      icon: Users,
      gradient: "from-accent to-amber-400",
      hoverGlow: "hover:shadow-accent/20",
      path: "/book",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2"
          >
            {t("newProject.title", "Start a New Project")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            {t("newProject.subtitle", "Choose how you'd like to build your website")}
          </motion.p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1, type: "spring", damping: 20 }}
              onClick={() => navigate(option.path)}
              className={`group relative bg-card border border-border rounded-2xl p-8 lg:p-10 cursor-pointer hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${option.hoverGlow}`}
              id={`new-project-${option.id}-card`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <option.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <h2 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {option.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {option.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("newProject.getStarted", "Get started")}
                <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative corner gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${option.gradient} opacity-[0.03] rounded-2xl group-hover:opacity-[0.08] transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewProject;
