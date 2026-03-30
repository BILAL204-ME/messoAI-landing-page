import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
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
import { PasswordStrengthIndicator } from "@/components/ui/password-strength";

const registerSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().regex(/^[+]?[\d\s\-\(\)]+$/, "Phone number can only contain digits, +, spaces, hyphens and parentheses").min(8, "Phone number must be at least 8 characters").max(20, "Phone number must be less than 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLoginClick?: () => void;
}

const RegisterModal = ({ trigger, open, onOpenChange, onLoginClick }: RegisterModalProps) => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, { message: string; value?: any }>>({});

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
      // Handle field-specific validation errors from backend
      if (error.errors && typeof error.errors === 'object') {
        setFieldErrors(error.errors);
      }
      
      toast({
        variant: "destructive",
        title: t("auth.registerError"),
        description: error.message || "An error occurred during registration",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
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
                  <FormLabel>{t("auth.fullname")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
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
                  <FormLabel>{t("auth.email")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
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
                    <Input 
                      placeholder="+123456789" 
                      {...field}
                      className={fieldErrors.phone_number ? "border-red-500" : ""}
                      onChange={(e) => {
                        field.onChange(e);
                        clearFieldError('phone_number');
                      }}
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
                  <FormLabel>{t("auth.password")}</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="******" 
                      {...field}
                      className={fieldErrors.password ? "border-red-500" : ""}
                      onChange={(e) => {
                        field.onChange(e);
                        clearFieldError('password');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <PasswordStrengthIndicator password={field.value || ""} />
                </FormItem>
              )}
            />
            <FormErrors errors={fieldErrors} onClearField={clearFieldError} />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("auth.register")}
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
