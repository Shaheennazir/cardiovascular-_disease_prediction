import React, { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm w-full rounded-lg border p-4 shadow-lg transition-all duration-300 ${
              toast.variant === 'success'
                ? 'bg-success-50 border-success-200'
                : toast.variant === 'error'
                ? 'bg-danger-50 border-danger-200'
                : toast.variant === 'warning'
                ? 'bg-warning-50 border-warning-200'
                : 'bg-surface border-border'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                {toast.title && (
                  <h4
                    className={`text-sm font-medium ${
                      toast.variant === 'success'
                        ? 'text-success-800'
                        : toast.variant === 'error'
                        ? 'text-danger-800'
                        : toast.variant === 'warning'
                        ? 'text-warning-800'
                        : 'text-text-primary'
                    }`}
                  >
                    {toast.title}
                  </h4>
                )}
                {toast.description && (
                  <p
                    className={`text-sm mt-1 ${
                      toast.variant === 'success'
                        ? 'text-success-700'
                        : toast.variant === 'error'
                        ? 'text-danger-700'
                        : toast.variant === 'warning'
                        ? 'text-warning-700'
                        : 'text-text-secondary'
                    }`}
                  >
                    {toast.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeToast(toast.id)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};