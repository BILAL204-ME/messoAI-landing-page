import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminBookings = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("admin.bookings.title", "Booking Management")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("admin.bookings.subtitle", "View and manage all developer bookings")}
          </p>
        </div>

        {/* Content Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {t("admin.bookings.comingSoon", "Booking Management Coming Soon")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("admin.bookings.placeholder", "Booking management features will be available in the next update.")}
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
