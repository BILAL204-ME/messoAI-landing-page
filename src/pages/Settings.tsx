import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";

const Settings = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Profile form
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Notification settings
  const [notifyBooking, setNotifyBooking] = useState(true);
  const [notifyAiReady, setNotifyAiReady] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Delete account
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await apiPost<{
          user: { fullname: string; email: string };
          settings: { notify_booking: boolean; notify_ai_ready: boolean };
        }>(API_ENDPOINTS.PROFILE_GET);
        setFullname(data.user.fullname);
        setEmail(data.user.email);
        setNotifyBooking(data.settings.notify_booking);
        setNotifyAiReady(data.settings.notify_ai_ready);
      } catch {
        // use defaults from auth context
      }
    };
    loadSettings();
  }, []);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      await apiPost(API_ENDPOINTS.PROFILE_UPDATE, { fullname, email });
      // Update local storage
      const storedUser = localStorage.getItem("masso_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.fullname = fullname;
        parsed.email = email;
        localStorage.setItem("masso_user", JSON.stringify(parsed));
      }
      toast({ title: t("settings.profileSaved", "Profile updated successfully") });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("settings.profileError", "Failed to update profile"),
        description: error?.message || "",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: t("settings.passwordMismatch", "Passwords don't match"),
      });
      return;
    }
    setIsSavingPassword(true);
    try {
      await apiPost(API_ENDPOINTS.PROFILE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({ title: t("settings.passwordChanged", "Password changed successfully") });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("settings.passwordError", "Failed to change password"),
        description: error?.message || "",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSavingSettings(true);
    try {
      await apiPost(API_ENDPOINTS.PROFILE_SETTINGS, {
        notify_booking: notifyBooking,
        notify_ai_ready: notifyAiReady,
      });
      toast({ title: t("settings.settingsSaved", "Settings saved") });
    } catch {
      toast({ variant: "destructive", title: t("settings.settingsError", "Failed to save settings") });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await apiPost(API_ENDPOINTS.PROFILE_DELETE, { password: deletePassword });
      logout();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("settings.deleteError", "Failed to delete account"),
        description: error?.message || "",
      });
      setIsDeleting(false);
    }
  };

  const userInitials = user?.fullname
    ? user.fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            {t("settings.title", "Settings")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("settings.subtitle", "Manage your account and preferences")}
          </p>
        </div>

        {/* Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-5">
            <User size={18} className="text-primary" />
            {t("settings.profile", "Profile")}
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
              {userInitials}
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.fullname}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="settings-fullname">{t("settings.fullname", "Full Name")}</Label>
              <Input
                id="settings-fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="settings-email">
                <Mail size={14} className="inline mr-1.5" />
                {t("settings.email", "Email")}
              </Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="bg-primary text-white"
              id="save-profile-btn"
            >
              <Save size={14} className="mr-1.5" />
              {isSavingProfile ? t("settings.saving", "Saving...") : t("settings.saveProfile", "Save Profile")}
            </Button>
          </div>
        </motion.section>

        {/* Password Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-5">
            <Lock size={18} className="text-primary" />
            {t("settings.changePassword", "Change Password")}
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="settings-current-password">{t("settings.currentPassword", "Current Password")}</Label>
              <Input
                id="settings-current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="settings-new-password">{t("settings.newPassword", "New Password")}</Label>
              <Input
                id="settings-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="settings-confirm-password">{t("settings.confirmPassword", "Confirm New Password")}</Label>
              <Input
                id="settings-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword || isSavingPassword}
              variant="outline"
              id="change-password-btn"
            >
              {isSavingPassword ? t("settings.saving", "Saving...") : t("settings.updatePassword", "Update Password")}
            </Button>
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-5">
            <Bell size={18} className="text-primary" />
            {t("settings.notifications", "Notifications")}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("settings.notifyBooking", "Booking notifications")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("settings.notifyBookingDesc", "Get notified when a booking is confirmed")}
                </p>
              </div>
              <Switch
                checked={notifyBooking}
                onCheckedChange={setNotifyBooking}
                id="notify-booking-switch"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("settings.notifyAiReady", "AI build ready")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("settings.notifyAiReadyDesc", "Get notified when your AI build is ready")}
                </p>
              </div>
              <Switch
                checked={notifyAiReady}
                onCheckedChange={setNotifyAiReady}
                id="notify-ai-ready-switch"
              />
            </div>
            <Button
              onClick={handleSaveNotifications}
              disabled={isSavingSettings}
              variant="outline"
              size="sm"
              id="save-notifications-btn"
            >
              {isSavingSettings ? t("settings.saving", "Saving...") : t("settings.saveNotifications", "Save Preferences")}
            </Button>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-destructive/5 border border-destructive/20 rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-destructive flex items-center gap-2 mb-3">
            <AlertTriangle size={18} />
            {t("settings.dangerZone", "Danger Zone")}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t("settings.dangerDesc", "Once you delete your account, there is no going back. Please be certain.")}
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" id="delete-account-btn">
                <Trash2 size={14} className="mr-1.5" />
                {t("settings.deleteAccount", "Delete Account")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("settings.deleteConfirmTitle", "Are you sure?")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("settings.deleteConfirmDesc", "This action cannot be undone. All your projects and data will be permanently deleted.")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-2">
                <Label htmlFor="delete-confirm-password">{t("settings.enterPassword", "Enter your password to confirm")}</Label>
                <Input
                  id="delete-confirm-password"
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("settings.cancel", "Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={!deletePassword || isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? t("settings.deleting", "Deleting...") : t("settings.confirmDelete", "Delete Account")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
