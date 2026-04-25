import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormErrors } from "@/components/ui/field-error";
import { PasswordInput } from "@/components/ui/password-input";
import PhoneInput from "@/components/ui/phone-input";
import { AnimatedInput } from "@/components/ui/animated-input";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface RegisterModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLoginClick?: () => void;
}

const RegisterModal = ({ trigger, open, onOpenChange, onLoginClick }: RegisterModalProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, googleLogin, user } = useAuth();
  const { toast } = useToast();
  const { handleAuthError } = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, { message: string; value?: any }>>({});

  // Define schema inside component to access translation function
  const registerSchema = z.object({
    fullname: z.string().min(2, t("errors.fullnameMinLength")).max(50, t("errors.fullnameMaxLength")),
    email: z.string().email(t("errors.invalidEmail")),
    phone_number: z.string().min(8, t("errors.phoneMinLength")).max(20, t("errors.phoneMaxLength")),
    password: z.string().min(8, t("errors.passwordMinLengthRegister")).max(100, t("errors.passwordMaxLength")).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t("errors.passwordRegex")),
  });

  type RegisterFormValues = z.infer<typeof registerSchema>;

  // Check if current language is Arabic to disable animation
  const isArabic = i18n.language === 'ar';

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    setIsSubmitting(true);
    setFieldErrors({});
    try {
      await googleLogin(credentialResponse.credential);
      toast({
        title: t("auth.registerSuccess"),
        description: t("auth.welcomeMessage"),
      });
      if (onOpenChange) onOpenChange(false);
      // Redirect based on user role - check after login completes
      if (user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorResult = handleAuthError(error);
      toast({
        variant: "destructive",
        title: t("auth.registerError"),
        description: errorResult.userMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setFieldErrors({});
    try {
      await registerUser(values);
      toast({
        title: t("auth.registerSuccess"),
        description: t("auth.welcomeMessage"),
      });
      if (onOpenChange) onOpenChange(false);
      // Redirect based on user role - check after registration completes
      if (user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorResult = handleAuthError(error, () => {
        if (onLoginClick) onLoginClick();
        if (onOpenChange) onOpenChange(false);
      });
      
      // Handle field-specific validation errors from backend
      if (errorResult.errors && typeof errorResult.errors === 'object') {
        setFieldErrors(errorResult.errors);
      }
      
      toast({
        variant: "destructive",
        title: t("auth.registerError"),
        description: errorResult.userMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-[95vw] max-w-lg p-0 overflow-hidden max-h-[90vh]">
        <div className="p-6 sm:p-7 overflow-y-auto max-h-[90vh]">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              {t("auth.createAccount")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("auth.registerDescription")}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-5">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast({
                    variant: "destructive",
                    title: t("auth.registerError"),
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput
                          label={t("auth.fullname")}
                          placeholder="John Doe"
                          autoComplete="name"
                          disableAnimation={isArabic}
                          {...field}
                          className={fieldErrors.fullname ? "border-red-500" : ""}
                          onChange={(e) => {
                            field.onChange(e);
                            clearFieldError('fullname');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          className={fieldErrors.email ? "border-red-500" : ""}
                          onChange={(e) => {
                            field.onChange(e);
                            clearFieldError('email');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        {t("auth.phoneNumber")}
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder={t("password.enterPhoneNumber")}
                          autoComplete="tel"
                          value={field.value || ''}
                          onChange={(value) => {
                            field.onChange(value || '');
                            clearFieldError('phone_number');
                          }}
                          defaultCountry="DZ"
                          className={fieldErrors.phone_number ? "border-red-500" : ""}
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
                          autoComplete="new-password"
                          showUnderline={true}
                          {...field}
                          className={fieldErrors.password ? "border-red-500" : ""}
                          onChange={(e) => {
                            field.onChange(e);
                            clearFieldError('password');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormErrors errors={fieldErrors} onClearField={clearFieldError} />
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
                        {t("auth.register")}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {t("auth.register")}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  {t("auth.alreadyHaveAccount")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      if (onLoginClick) onLoginClick();
                      if (onOpenChange) onOpenChange(false);
                    }}
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    {t("auth.signIn")}
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

export default RegisterModal;
