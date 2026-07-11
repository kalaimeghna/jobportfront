import React, { FC, ReactNode, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  children: ReactNode;
  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
          z-10
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-800"
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;