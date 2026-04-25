import { useTranslation } from "react-i18next";
import { UserCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminDevelopers = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("admin.developers.title", "Developer Management")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("admin.developers.subtitle", "Manage developers and their availability")}
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t("admin.developers.addDeveloper", "Add Developer")}
          </Button>
        </div>

        {/* Content Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              {t("admin.developers.comingSoon", "Developer Management Coming Soon")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("admin.developers.placeholder", "Developer management features will be available in the next update.")}
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDevelopers;
