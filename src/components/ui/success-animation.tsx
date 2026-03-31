"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  className?: string;
}

const SuccessAnimation = ({ show, message, className = "" }: SuccessAnimationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200",
            className
          )}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CheckCircle size={20} />
          </motion.div>
          {message && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium"
            >
              {message}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;
