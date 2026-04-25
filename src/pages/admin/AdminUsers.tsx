import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Shield, Trash2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";
import AdminLayout from "@/components/layouts/AdminLayout";

interface User {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  role: 'user' | 'admin';
  status: 'active' | 'disabled';
  created_at: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const AdminUsers = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  // State for filters and pagination
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users
  const { data: usersData, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ["admin-users", page, search, roleFilter, statusFilter],
    queryFn: async () => {
      const params: any = { page, limit: 50 };
      if (search) params.search = search;
      if (roleFilter !== "all") params.role = roleFilter;
      if (statusFilter !== "all") params.status = statusFilter;

      return await apiPost(API_ENDPOINTS.ADMIN_USERS, params);
    },
  });

  // Update user status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: number; status: string }) => {
      return await apiPost(API_ENDPOINTS.ADMIN_USER_STATUS(userId), { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(t("admin.users.statusUpdated", "User status updated successfully"));
    },
    onError: () => {
      toast.error(t("admin.users.statusUpdateFailed", "Failed to update user status"));
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: number; role: string }) => {
      return await apiPost(API_ENDPOINTS.ADMIN_USER_ROLE(userId), { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(t("admin.users.roleUpdated", "User role updated successfully"));
    },
    onError: () => {
      toast.error(t("admin.users.roleUpdateFailed", "Failed to update user role"));
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      return await apiPost(API_ENDPOINTS.ADMIN_USER_DELETE(userId), {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(t("admin.users.userDeleted", "User deleted successfully"));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    },
    onError: () => {
      toast.error(t("admin.users.userDeleteFailed", "Failed to delete user"));
    },
  });

  const handleStatusToggle = (user: User) => {
    const newStatus = user.status === 'active' ? 'disabled' : 'active';
    updateStatusMutation.mutate({ userId: user.id, status: newStatus });
  };

  const handleRoleToggle = (user: User) => {
    const newRole = user.role === 'user' ? 'admin' : 'user';
    updateRoleMutation.mutate({ userId: user.id, role: newRole });
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser.id);
    }
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge variant="destructive" className="bg-red-500">
        <Shield className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="secondary">
        User
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500">
        Disabled
      </Badge>
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
          <p className="text-red-600">{t("admin.users.loadFailed", "Failed to load users")}</p>
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
              {t("admin.users.title", "User Management")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("admin.users.subtitle", "Manage user accounts and permissions")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.users.filters", "Filters")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t("admin.users.searchPlaceholder", "Search users...")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("admin.users.filterByRole", "Filter by role")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.users.allRoles", "All Roles")}</SelectItem>
                  <SelectItem value="user">{t("admin.users.user", "User")}</SelectItem>
                  <SelectItem value="admin">{t("admin.users.admin", "Admin")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("admin.users.filterByStatus", "Filter by status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.users.allStatuses", "All Statuses")}</SelectItem>
                  <SelectItem value="active">{t("admin.users.active", "Active")}</SelectItem>
                  <SelectItem value="disabled">{t("admin.users.disabled", "Disabled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("admin.users.userList", "Users")}
              {usersData?.pagination && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({usersData.pagination.total} total)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.users.name", "Name")}</TableHead>
                  <TableHead>{t("admin.users.email", "Email")}</TableHead>
                  <TableHead>{t("admin.users.phone", "Phone")}</TableHead>
                  <TableHead>{t("admin.users.role", "Role")}</TableHead>
                  <TableHead>{t("admin.users.status", "Status")}</TableHead>
                  <TableHead>{t("admin.users.joined", "Joined")}</TableHead>
                  <TableHead className="w-[100px]">{t("admin.users.actions", "Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone_number || "-"}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusToggle(user)}>
                            {user.status === 'active' ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                {t("admin.users.disable", "Disable")}
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                {t("admin.users.enable", "Enable")}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleToggle(user)}>
                            <Shield className="w-4 h-4 mr-2" />
                            {user.role === 'user' 
                              ? t("admin.users.makeAdmin", "Make Admin")
                              : t("admin.users.makeUser", "Make User")
                            }
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t("admin.users.delete", "Delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {usersData?.pagination && usersData.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  {t("admin.users.showing", "Showing")} {((page - 1) * 50) + 1} - {Math.min(page * 50, usersData.pagination.total)} {t("admin.users.of", "of")} {usersData.pagination.total}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    {t("admin.users.previous", "Previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === usersData.pagination.totalPages}
                  >
                    {t("admin.users.next", "Next")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("admin.users.deleteUserTitle", "Delete User")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("admin.users.deleteUserDesc", "Are you sure you want to delete this user? This action cannot be undone.")}
                {selectedUser && (
                  <div className="mt-2 p-2 bg-muted rounded">
                    <p className="font-medium">{selectedUser.fullname}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("admin.users.cancel", "Cancel")}</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending 
                  ? t("admin.users.deleting", "Deleting...")
                  : t("admin.users.delete", "Delete")
                }
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
