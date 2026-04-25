import { useTranslation } from "react-i18next";
import { FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminProjects = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("admin.projects.title", "Project Management")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("admin.projects.subtitle", "View and manage all user projects")}
          </p>
        </div>

        {/* Content Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              {t("admin.projects.comingSoon", "Project Management Coming Soon")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("admin.projects.placeholder", "Project management features will be available in the next update.")}
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
