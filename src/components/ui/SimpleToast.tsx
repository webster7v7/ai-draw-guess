'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Info, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export function SimpleToast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible && type !== 'loading') {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, type]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300 animate-in slide-in-from-top-4 fade-in max-w-[90vw] whitespace-nowrap",
      type === 'success' && "bg-emerald-50 border-emerald-100 text-emerald-900",
      type === 'error' && "bg-rose-50 border-rose-100 text-rose-900",
      type === 'info' && "bg-white border-gray-100 text-gray-900",
      type === 'loading' && "bg-indigo-50 border-indigo-100 text-indigo-900"
    )}>
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      {type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
      {type === 'info' && <Info className="w-5 h-5 text-gray-500" />}
      {type === 'loading' && <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />}
      <span className="font-semibold text-sm">{message}</span>
    </div>
  );
}
