import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Trash2,
  ExternalLink,
  FileText,
  Clock,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
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

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  draft: {
    label: "Draft",
    icon: <FileText size={12} />,
    className: "bg-muted text-muted-foreground border-muted",
  },
  in_progress: {
    label: "In Progress",
    icon: <Clock size={12} />,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  ready: {
    label: "Ready",
    icon: <CheckCircle2 size={12} />,
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
};

const MyProjects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async (filterType: string) => {
    setIsLoading(true);
    try {
      const data = await apiPost<{ projects: Project[] }>(API_ENDPOINTS.PROJECTS_LIST, {
        filter: filterType === "all" ? null : filterType,
      });
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(filter);
  }, [filter]);

  const handleDelete = async (projectId: number) => {
    try {
      await apiPost(API_ENDPOINTS.PROJECTS_DELETE, { projectId });
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      toast({ title: t("myProjects.deleted", "Project deleted") });
    } catch {
      toast({ variant: "destructive", title: t("myProjects.deleteError", "Failed to delete project") });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              {t("myProjects.title", "My Projects")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("myProjects.subtitle", "All your AI builds and developer meetings")}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="flex items-center gap-1.5">
              <Filter size={14} />
              {t("myProjects.filterAll", "All")}
            </TabsTrigger>
            <TabsTrigger value="ai_build" className="flex items-center gap-1.5">
              <Sparkles size={14} />
              {t("myProjects.filterAI", "AI Built")}
            </TabsTrigger>
            <TabsTrigger value="dev_meeting" className="flex items-center gap-1.5">
              <Users size={14} />
              {t("myProjects.filterDev", "Dev Meetings")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              {t("myProjects.empty", "No projects found")}
            </p>
            <Button onClick={() => navigate("/new")} variant="outline">
              {t("myProjects.createNew", "Create a Project")}
            </Button>
          </div>
        )}

        {/* Project List */}
        {!isLoading && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map((project, index) => {
              const status = statusConfig[project.status] || statusConfig.draft;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* Type Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                      {project.type === "ai_build" ? (
                        <Sparkles size={18} className="text-primary" />
                      ) : (
                        <Users size={18} className="text-accent" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">
                          {project.type === "ai_build"
                            ? t("myProjects.typeAI", "AI Build")
                            : t("myProjects.typeDev", "Dev Meeting")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(project.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <Badge variant="outline" className={`hidden sm:flex text-xs ${status.className}`}>
                      {status.icon}
                      <span className="ml-1">{t(`dashboard.status.${project.status}`, status.label)}</span>
                    </Badge>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (project.type === "ai_build") {
                            navigate(`/builder?projectId=${project.id}`);
                          }
                        }}
                        id={`open-project-${project.id}`}
                      >
                        <ExternalLink size={14} />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            id={`delete-project-${project.id}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("myProjects.deleteConfirmTitle", "Delete this project?")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("myProjects.deleteConfirmDesc", "This action cannot be undone.")}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("settings.cancel", "Cancel")}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              {t("myProjects.confirmDelete", "Delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyProjects;
