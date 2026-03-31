"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

const EnhancedToast = ({ 
  type, 
  message, 
  description, 
  onClose, 
  className = "" 
}: EnhancedToastProps) => {
  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    warning: <AlertCircle size={20} className="text-yellow-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  const colors = {
    success: "border-green-200 bg-green-50 text-green-800",
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm",
        colors[type],
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{message}</p>
        {description && (
          <p className="text-xs mt-1 opacity-90">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default EnhancedToast;
