"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { debug } from "@/lib/debug";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  disableAnimation?: boolean;
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "inherit" as const,
  },
  animate: {
    y: "-120%",
    color: "var(--color-zinc-500)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export const AnimatedInput = ({
  label,
  className = "",
  value,
  disableAnimation = false,
  ...props
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || (value && String(value).length > 0);

  // Debug logging
  debug.log('AnimatedInput rendered', { label, value, isFocused, showLabel, disableAnimation });

  // Ensure label is a string to prevent split errors
  const safeLabel = label || "";

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className={cn(
          "absolute pointer-events-none text-zinc-900 dark:text-zinc-50 transition-all duration-200",
          disableAnimation 
            ? (showLabel ? "top-0 left-0 text-xs" : "top-1/2 -translate-y-1/2 left-0 text-sm")
            : "top-1/2 -translate-y-1/2 left-0 text-sm"
        )}
        variants={disableAnimation ? undefined : containerVariants}
        initial="initial"
        animate={disableAnimation ? {} : (showLabel ? "animate" : "initial")}
      >
        {disableAnimation ? (
          <span className="block">
            {safeLabel}
          </span>
        ) : (
          safeLabel.split("").map((char, index) => (
            <motion.span
              key={index}
              className={cn(
                "inline-block text-sm transition-all duration-200",
                showLabel ? "text-xs" : "text-sm"
              )}
              variants={letterVariants}
              style={{ willChange: "transform" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        )}
      </motion.div>

      <input
        {...props}
        onFocus={(e) => {
          debug.log('AnimatedInput focused', { label });
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          debug.log('AnimatedInput blurred', { label });
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "outline-none border-b-2 border-zinc-900 dark:border-zinc-50 py-2 w-full text-base font-medium text-zinc-900 dark:text-zinc-50 bg-transparent placeholder-transparent",
          "sm:text-lg",
          className
        )}
      />
    </div>
  );
};
