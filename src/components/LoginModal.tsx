import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { GoogleLogin } from "@react-oauth/google";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/lib/error-handler";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/ui/animated-input";
import { PasswordInput } from "@/components/ui/password-input";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface LoginModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRegisterClick?: () => void;
}

const LoginModal = ({ trigger, open, onOpenChange, onRegisterClick }: LoginModalProps) => {
  const { t, i18n } = useTranslation();
  const { login, googleLogin } = useAuth();
  const { toast } = useToast();
  const { handleAuthError } = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define schema inside component to access translation function
  const loginSchema = z.object({
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(6, t("errors.passwordMinLength")),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  // Check if current language is Arabic to disable animation
  const isArabic = i18n.language === 'ar';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    setIsSubmitting(true);
    try {
      await googleLogin(credentialResponse.credential);
      toast({
        title: t("auth.loginSuccess"),
        description: t("auth.welcomeBack"),
      });
      if (onOpenChange) onOpenChange(false);
    } catch (error: any) {
      const errorResult = handleAuthError(error);
      toast({
        variant: "destructive",
        title: t("auth.loginError"),
        description: errorResult.userMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values);
      toast({
        title: t("auth.loginSuccess"),
        description: t("auth.welcomeBack"),
      });
      if (onOpenChange) onOpenChange(false);
    } catch (error: any) {
      const errorResult = handleAuthError(error);
      toast({
        variant: "destructive",
        title: t("auth.loginError"),
        description: errorResult.userMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-[95vw] max-w-md p-0 overflow-hidden">
        <div className="p-6 sm:p-7">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              {t("auth.signIn")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("auth.loginDescription")}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-5">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast({
                    variant: "destructive",
                    title: t("auth.loginError"),
                    description: t("auth.googleAuthFailed"),
                  });
                }}
                text="continue_with"
                shape="pill"
                useOneTap
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wide">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("auth.orContinueWithEmail")}
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput
                          label={t("auth.email")}
                          type="email"
                          placeholder="john@example.com"
                          autoComplete="email"
                          disableAnimation={isArabic}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          placeholder={t("password.enterPassword")}
                          autoComplete="current-password"
                          showStrengthIndicator={false}
                          showUnderline={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-11 relative overflow-hidden font-semibold"
                  disabled={isSubmitting}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <LoadingSpinner size="sm" />
                        {t("auth.signIn")}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {t("auth.signIn")}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  {t("auth.dontHaveAccount")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      if (onRegisterClick) onRegisterClick();
                      if (onOpenChange) onOpenChange(false);
                    }}
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    {t("auth.register")}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
