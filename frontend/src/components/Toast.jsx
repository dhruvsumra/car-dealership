import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl ${
          isError
            ? 'bg-red-950/90 border-red-500/40 text-red-300'
            : 'glass-panel-gold text-slate-100'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        ) : (
          <Sparkles className="w-5 h-5 text-gold-400 shrink-0 animate-spin" />
        )}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {isError ? 'Notification' : 'Aura Motors Concierge'}
          </h4>
          <p className="text-xs text-slate-200 mt-0.5 font-medium">{toast.message}</p>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
