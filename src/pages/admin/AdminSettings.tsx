import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";
import AdminLayout from "@/components/layouts/AdminLayout";

interface SiteSetting {
  value: any;
  description: string;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

interface SettingsResponse {
  settings: Record<string, SiteSetting>;
}

const AdminSettings = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  // State for new setting
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fetch settings
  const { data: settingsData, isLoading, error } = useQuery<SettingsResponse>({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      return await apiPost(API_ENDPOINTS.ADMIN_SETTINGS);
    },
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value, description }: { key: string; value: any; description?: string }) => {
      return await apiPost(API_ENDPOINTS.ADMIN_SETTING_UPDATE(key), { value, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success(t("admin.settings.settingUpdated", "Setting updated successfully"));
    },
    onError: () => {
      toast.error(t("admin.settings.settingUpdateFailed", "Failed to update setting"));
    },
  });

  // Add new setting mutation
  const addSettingMutation = useMutation({
    mutationFn: async ({ key, value, description }: { key: string; value: any; description?: string }) => {
      return await apiPost(API_ENDPOINTS.ADMIN_SETTING_UPDATE(key), { value, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success(t("admin.settings.settingAdded", "Setting added successfully"));
      setNewKey("");
      setNewValue("");
      setNewDescription("");
    },
    onError: () => {
      toast.error(t("admin.settings.settingAddFailed", "Failed to add setting"));
    },
  });

  const handleUpdateSetting = (key: string, value: string, description: string) => {
    try {
      const parsedValue = value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value;
      updateSettingMutation.mutate({ key, value: parsedValue, description });
    } catch (error) {
      toast.error(t("admin.settings.invalidJson", "Invalid JSON format"));
    }
  };

  const handleAddSetting = () => {
    if (!newKey || !newValue) {
      toast.error(t("admin.settings.keyValueRequired", "Key and value are required"));
      return;
    }

    try {
      const parsedValue = newValue.startsWith('{') || newValue.startsWith('[') ? JSON.parse(newValue) : newValue;
      addSettingMutation.mutate({ 
        key: newKey, 
        value: parsedValue, 
        description: newDescription 
      });
    } catch (error) {
      toast.error(t("admin.settings.invalidJson", "Invalid JSON format"));
    }
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
          <p className="text-red-600">{t("admin.settings.loadFailed", "Failed to load settings")}</p>
        </div>
      </AdminLayout>
    );
  }

  const settings = settingsData?.settings || {};

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("admin.settings.title", "Site Settings")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("admin.settings.subtitle", "Configure application settings and preferences")}
          </p>
        </div>

        {/* Add New Setting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {t("admin.settings.addNew", "Add New Setting")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-key">{t("admin.settings.key", "Key")}</Label>
                <Input
                  id="new-key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder={t("admin.settings.keyPlaceholder", "setting_key")}
                />
              </div>
              <div>
                <Label htmlFor="new-description">{t("admin.settings.description", "Description")}</Label>
                <Input
                  id="new-description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={t("admin.settings.descriptionPlaceholder", "Setting description")}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-value">{t("admin.settings.value", "Value")}</Label>
              <Textarea
                id="new-value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={t("admin.settings.valuePlaceholder", "Setting value (JSON or text)")}
                rows={3}
              />
            </div>
            <Button onClick={handleAddSetting} disabled={addSettingMutation.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              {addSettingMutation.isPending 
                ? t("admin.settings.adding", "Adding...")
                : t("admin.settings.addSetting", "Add Setting")
              }
            </Button>
          </CardContent>
        </Card>

        {/* Existing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {t("admin.settings.existingSettings", "Existing Settings")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(settings).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(settings).map(([key, setting]) => (
                  <div key={key} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{key}</h3>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateSetting(key, JSON.stringify(setting.value), setting.description)}
                        disabled={updateSettingMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {t("admin.settings.save", "Save")}
                      </Button>
                    </div>
                    
                    <div>
                      <Label>{t("admin.settings.description", "Description")}</Label>
                      <Input
                        value={setting.description}
                        onChange={(e) => {
                          const newSettings = { ...settings };
                          newSettings[key].description = e.target.value;
                          // This would need proper state management in a real app
                        }}
                        placeholder={t("admin.settings.descriptionPlaceholder", "Setting description")}
                      />
                    </div>

                    <div>
                      <Label>{t("admin.settings.value", "Value")}</Label>
                      <Textarea
                        defaultValue={JSON.stringify(setting.value, null, 2)}
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {t("admin.settings.lastUpdated", "Last updated")}: {new Date(setting.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t("admin.settings.noSettings", "No settings configured yet")}</p>
                <p className="text-sm mt-2">
                  {t("admin.settings.addFirst", "Add your first setting above to get started")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
