"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface EnhancedFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  children: React.ReactNode | ((field: any) => React.ReactNode);
}

const EnhancedFormField = ({ 
  name, 
  label, 
  placeholder, 
  type = "text", 
  className = "",
  children 
}: EnhancedFormFieldProps) => {
  const form = useFormContext();
  const error = form.formState.errors[name];
  const isTouched = form.formState.touchedFields[name];
  const isValid = !error && isTouched;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          <FormLabel className={cn(
            "text-sm font-medium transition-colors",
            error ? "text-destructive" : isValid ? "text-green-600" : "text-foreground"
          )}>
            {label}
          </FormLabel>
          <FormControl>
            <motion.div
              initial={{ scale: 1 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {typeof children === 'function' ? children(field) : children}
            </motion.div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EnhancedFormField;
