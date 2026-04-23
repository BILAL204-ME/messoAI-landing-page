import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Plus, Sparkles, Clock, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";

interface Project {
  id: number;
  name: string;
  type: string;
  status: string;
  updated_at: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; className: string }> = {
  draft: {
    label: "Draft",
    variant: "secondary",
    icon: <FileText size={12} />,
    className: "bg-muted text-muted-foreground border-muted",
  },
  in_progress: {
    label: "In Progress",
    variant: "default",
    icon: <Clock size={12} />,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  ready: {
    label: "Ready",
    variant: "default",
    icon: <CheckCircle2 size={12} />,
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
};

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiPost<{ projects: Project[] }>(API_ENDPOINTS.PROJECTS_LIST);
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            {t("dashboard.title", "Dashboard")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("dashboard.subtitle", "Manage your projects and builds")}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Sparkles size={36} className="text-primary" />
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              {t("dashboard.emptyTitle", "No projects yet")}
            </h2>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              {t("dashboard.emptyDesc", "Create your first project to get started. Build with AI or work with a developer.")}
            </p>
            <Button
              onClick={() => navigate("/new")}
              className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
              size="lg"
            >
              <Plus size={18} className="mr-2" />
              {t("dashboard.createFirst", "Create Your First Project")}
            </Button>
          </motion.div>
        )}

        {/* Project Grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => {
              const status = statusConfig[project.status] || statusConfig.draft;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    if (project.type === "ai_build") {
                      navigate(`/builder?projectId=${project.id}`);
                    }
                  }}
                  className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                >
                  {/* Type indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      {project.type === "ai_build" ? (
                        <Sparkles size={18} className="text-primary" />
                      ) : (
                        <FileText size={18} className="text-accent" />
                      )}
                    </div>
                    <Badge variant="outline" className={`text-xs ${status.className}`}>
                      {status.icon}
                      <span className="ml-1">{t(`dashboard.status.${project.status}`, status.label)}</span>
                    </Badge>
                  </div>

                  <h3 className="font-display font-semibold text-foreground mb-1 truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.lastEdited", "Last edited")} {formatDate(project.updated_at)}
                  </p>
                </motion.div>
              );
            })}

            {/* New Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projects.length * 0.05 }}
              onClick={() => navigate("/new")}
              className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer min-h-[176px]"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                <Plus size={20} className="text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("dashboard.newProject", "New Project")}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
