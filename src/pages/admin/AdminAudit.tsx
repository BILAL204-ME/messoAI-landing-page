import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";
import AdminLayout from "@/components/layouts/AdminLayout";

interface AuditLog {
  id: number;
  actor_id: number;
  actor_name: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: number | null;
  metadata: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface AuditResponse {
  logs: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const AdminAudit = () => {
  const { t } = useTranslation();
  
  // State for filters and pagination
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // Fetch audit logs
  const { data: auditData, isLoading, error } = useQuery<AuditResponse>({
    queryKey: ["admin-audit", page, search, actionFilter, entityFilter],
    queryFn: async () => {
      const params: any = { page, limit: 50 };
      if (search) params.action = search;
      if (actionFilter !== "all") params.action = actionFilter;
      if (entityFilter !== "all") params.entityType = entityFilter;

      return await apiPost(API_ENDPOINTS.ADMIN_AUDIT_LOGS, params);
    },
  });

  const getActionBadge = (action: string) => {
    const actionColors: Record<string, string> = {
      'CREATE': 'bg-green-500',
      'UPDATE': 'bg-blue-500',
      'DELETE': 'bg-red-500',
      'LOGIN': 'bg-gray-500',
      'LOGOUT': 'bg-gray-500',
    };

    const color = actionColors[action.split('_')[0]] || 'bg-gray-500';
    
    return (
      <Badge variant="secondary" className={color}>
        {action}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge variant="destructive" className="bg-red-500">Admin</Badge>
    ) : (
      <Badge variant="secondary">User</Badge>
    );
  };

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
          <p className="text-red-600">{t("admin.audit.loadFailed", "Failed to load audit logs")}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("admin.audit.title", "Audit Logs")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("admin.audit.subtitle", "Monitor system activity and changes")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.audit.filters", "Filters")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t("admin.audit.searchPlaceholder", "Search actions...")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("admin.audit.filterByAction", "Filter by action")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.audit.allActions", "All Actions")}</SelectItem>
                  <SelectItem value="CREATE">{t("admin.audit.create", "Create")}</SelectItem>
                  <SelectItem value="UPDATE">{t("admin.audit.update", "Update")}</SelectItem>
                  <SelectItem value="DELETE">{t("admin.audit.delete", "Delete")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("admin.audit.filterByEntity", "Filter by entity")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.audit.allEntities", "All Entities")}</SelectItem>
                  <SelectItem value="user">{t("admin.audit.user", "User")}</SelectItem>
                  <SelectItem value="project">{t("admin.audit.project", "Project")}</SelectItem>
                  <SelectItem value="booking">{t("admin.audit.booking", "Booking")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("admin.audit.recentActivity", "Recent Activity")}
              {auditData?.pagination && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({auditData.pagination.total} total)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.audit.timestamp", "Timestamp")}</TableHead>
                  <TableHead>{t("admin.audit.actor", "Actor")}</TableHead>
                  <TableHead>{t("admin.audit.action", "Action")}</TableHead>
                  <TableHead>{t("admin.audit.entity", "Entity")}</TableHead>
                  <TableHead>{t("admin.audit.details", "Details")}</TableHead>
                  <TableHead>{t("admin.audit.ip", "IP Address")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditData?.logs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">
                            {new Date(log.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(log.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{log.actor_name}</div>
                          <div className="text-xs">{getRoleBadge(log.actor_role)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{log.entity_type}</span>
                        {log.entity_id && (
                          <span className="text-xs text-muted-foreground">
                            #{log.entity_id}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.metadata && (
                        <div className="text-xs text-muted-foreground max-w-xs truncate">
                          {JSON.stringify(log.metadata)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {log.ip_address}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {auditData?.pagination && auditData.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  {t("admin.audit.showing", "Showing")} {((page - 1) * 50) + 1} - {Math.min(page * 50, auditData.pagination.total)} {t("admin.audit.of", "of")} {auditData.pagination.total}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    {t("admin.audit.previous", "Previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === auditData.pagination.totalPages}
                  >
                    {t("admin.audit.next", "Next")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAudit;
