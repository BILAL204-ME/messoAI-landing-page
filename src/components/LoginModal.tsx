import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
  const { login } = useAuth();
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
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>{t("auth.signIn")}</DialogTitle>
          <DialogDescription>
            {t("auth.loginDescription")}
          </DialogDescription>
        </DialogHeader>
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
              className="w-full relative overflow-hidden" 
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
            <div className="text-center text-sm">
              {t("auth.dontHaveAccount")}{" "}
              <button
                type="button"
                onClick={() => {
                  if (onRegisterClick) onRegisterClick();
                  if (onOpenChange) onOpenChange(false);
                }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {t("auth.register")}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
