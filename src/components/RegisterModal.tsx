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
import { Link } from "react-router-dom";
import { FormErrors } from "@/components/ui/field-error";
import { PasswordInput } from "@/components/ui/password-input";
import PhoneInput from "@/components/ui/phone-input";
import { AnimatedInput } from "@/components/ui/animated-input";
import LoadingSpinner from "@/components/ui/loading-spinner";

const registerSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(8, "Phone number must be at least 8 characters").max(20, "Phone number must be less than 20 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLoginClick?: () => void;
}

const RegisterModal = ({ trigger, open, onOpenChange, onLoginClick }: RegisterModalProps) => {
  const { t, i18n } = useTranslation();
  const { register } = useAuth();
  const { toast } = useToast();
  const { handleAuthError } = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, { message: string; value?: any }>>({});

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

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setFieldErrors({});
    try {
      await register(values);
      toast({
        title: t("auth.registerSuccess"),
        description: t("auth.welcomeMessage"),
      });
      if (onOpenChange) onOpenChange(false);
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
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>{t("auth.createAccount")}</DialogTitle>
          <DialogDescription>
            {t("auth.registerDescription")}
          </DialogDescription>
        </DialogHeader>
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
                  <FormLabel>{t("auth.phoneNumber")}</FormLabel>
                  <FormControl>
                    <PhoneInput 
                      placeholder={t("password.enterPhoneNumber")} 
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
            <div className="text-center text-sm">
              {t("auth.alreadyHaveAccount")}{" "}
              <button
                type="button"
                onClick={() => {
                  if (onLoginClick) onLoginClick();
                  if (onOpenChange) onOpenChange(false);
                }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {t("auth.signIn")}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
