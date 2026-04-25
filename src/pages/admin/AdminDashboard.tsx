import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Shield, Users, UserCheck, FolderOpen, Calendar, Settings, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";
import AdminLayout from "@/components/layouts/AdminLayout";

interface DashboardStats {
  totalUsers: number;
  totalDevelopers: number;
  totalProjects: number;
  totalBookings: number;
  recentActivity: Array<{
    id: number;
    action: string;
    entity_type: string;
    actor_name: string;
    created_at: string;
  }>;
}

const AdminDashboard = () => {
  const { t } = useTranslation();

  // Fetch dashboard stats
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      // In a real implementation, we'd have a dedicated dashboard endpoint
      // For now, we'll fetch individual stats and combine them
      const [usersRes, auditRes] = await Promise.all([
        apiPost(API_ENDPOINTS.ADMIN_USERS, { limit: 1 }),
        apiPost(API_ENDPOINTS.ADMIN_AUDIT_LOGS, { limit: 5 })
      ]);

      return {
        totalUsers: (usersRes as any).pagination?.total || 0,
        totalDevelopers: 0, // Would need developers endpoint
        totalProjects: 0, // Would need projects endpoint  
        totalBookings: 0, // Would need bookings endpoint
        recentActivity: (auditRes as any).logs || []
      };
    }
  });

  const statCards = [
    {
      title: t("admin.stats.totalUsers", "Total Users"),
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      link: "/admin/users"
    },
    {
      title: t("admin.stats.totalDevelopers", "Total Developers"), 
      value: stats?.totalDevelopers || 0,
      icon: UserCheck,
      color: "from-green-500 to-green-600",
      link: "/admin/developers"
    },
    {
      title: t("admin.stats.totalProjects", "Total Projects"),
      value: stats?.totalProjects || 0,
      icon: FolderOpen,
      color: "from-purple-500 to-purple-600", 
      link: "/admin/projects"
    },
    {
      title: t("admin.stats.totalBookings", "Total Bookings"),
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
      link: "/admin/bookings"
    }
  ];

  const quickActions = [
    {
      title: t("admin.actions.manageUsers", "Manage Users"),
      description: t("admin.actions.manageUsersDesc", "View and manage user accounts"),
      icon: Users,
      link: "/admin/users",
      color: "bg-blue-500"
    },
    {
      title: t("admin.actions.viewAudit", "View Audit Logs"),
      description: t("admin.actions.viewAuditDesc", "Monitor system activity"),
      icon: FileText,
      link: "/admin/audit", 
      color: "bg-gray-500"
    },
    {
      title: t("admin.actions.siteSettings", "Site Settings"),
      description: t("admin.actions.siteSettingsDesc", "Configure system settings"),
      icon: Settings,
      link: "/admin/settings",
      color: "bg-green-500"
    }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600">{t("admin.error.loadFailed", "Failed to load dashboard data")}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("admin.dashboard.title", "Admin Dashboard")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("admin.dashboard.subtitle", "Manage your application from here")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("admin.quickActions", "Quick Actions")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("admin.recentActivity", "Recent Activity")}
          </h2>
          <Card>
            <CardContent className="p-0">
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                <div className="divide-y">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.actor_name} • {activity.entity_type}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  {t("admin.noRecentActivity", "No recent activity")}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
