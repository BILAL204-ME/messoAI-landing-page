import { useTranslation } from "react-i18next";

export interface ApiError {
  message: string;
  status?: number;
  type?: string;
  errors?: Record<string, { message: string; value?: any }>;
}

export const useErrorHandler = () => {
  const { t } = useTranslation();

  const getErrorDetails = (error: any): ApiError => {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (typeof error === 'object' && error.message) {
      return error;
    }
    return { message: error || 'An unexpected error occurred' };
  };

  const getUserFriendlyMessage = (apiError: ApiError): string => {
    const { message, status, type } = apiError;

    // Handle specific backend error messages
    switch (message) {
      case "User already exists":
        return t("errors.userAlreadyExists", "It looks like you already have an account. Please try logging in instead.");
      case "User not found":
        return t("errors.userNotFound", "We couldn't find an account with that email. Please check your email or sign up.");
      case "Invalid password":
        return t("errors.invalidPassword", "That password doesn't look right. Please try again or reset your password.");
      case "Internal server error":
        return t("errors.internalServerError", "Something went wrong on our end. Please try again in a moment.");
      case "No refresh token":
        return t("errors.sessionExpired", "Your session has expired. Please log in again.");
      case "Invalid or expired refresh token":
        return t("errors.sessionExpired", "Your session has expired. Please log in again.");
      default:
        // Handle validation errors
        if (type === 'VALIDATION') {
          return t("errors.validationFailed", "Please check your information and try again.");
        }
        // Return original message if no specific mapping
        return message;
    }
  };

  const shouldSwitchToLogin = (apiError: ApiError): boolean => {
    return apiError.message === "User already exists" || apiError.status === 409;
  };

  const handleAuthError = (error: any, onSwitchToLogin?: () => void) => {
    const apiError = getErrorDetails(error);
    const userFriendlyMessage = getUserFriendlyMessage(apiError);

    // Auto-switch to login if user already exists
    if (shouldSwitchToLogin(apiError) && onSwitchToLogin) {
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500); // Delay to let user see the message
    }

    return {
      ...apiError,
      userMessage: userFriendlyMessage,
      shouldSwitchToLogin: shouldSwitchToLogin(apiError)
    };
  };

  return {
    handleAuthError,
    getErrorDetails,
    getUserFriendlyMessage,
    shouldSwitchToLogin
  };
};
