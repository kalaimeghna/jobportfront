import React, { forwardRef } from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseClasses}
          ${variants[variant]}
          ${fullWidth ? "w-full" : ""}
          ${
            disabled || isLoading
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span
            className={`h-4 w-4 animate-spin rounded-full border-2 ${
              variant === "outline" || variant === "secondary"
                ? "border-gray-500 border-t-transparent"
                : "border-white border-t-transparent"
            }`}
          />
        ) : (
          leftIcon
        )}

        <span>{children}</span>

        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;