import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useState } from "react";

interface FieldErrorProps {
  field: string;
  message: string;
  onClear?: () => void;
}

export const FieldError = ({ field, message, onClear }: FieldErrorProps) => {
  return (
    <div className="flex items-center justify-between p-2 mt-1 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="text-red-400 hover:text-red-600 transition-colors"
          aria-label="Clear error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

interface FormErrorsProps {
  errors: Record<string, { message: string; value?: any }>;
  onClearField?: (field: string) => void;
}

export const FormErrors = ({ errors, onClearField }: FormErrorsProps) => {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-4">
      {Object.entries(errors).map(([field, error]) => (
        <FieldError
          key={field}
          field={field}
          message={error.message}
          onClear={() => onClearField?.(field)}
        />
      ))}
    </div>
  );
};
