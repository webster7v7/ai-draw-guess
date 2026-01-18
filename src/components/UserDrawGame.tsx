'use client';

import { useState } from 'react';
import CanvasBoard from '@/components/CanvasBoard';
import { Sparkles, Bot, Loader2 } from 'lucide-react';
import { SimpleToast, ToastType } from '@/components/ui/SimpleToast';

export default function UserDrawGame() {
  const [userImage, setUserImage] = useState<string>('');
  const [aiGuess, setAiGuess] = useState<string>('');
  const [isGuessing, setIsGuessing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType; show: boolean }>({ msg: '', type: 'info', show: false });

  const showToast = (msg: string, type: ToastType = 'info') => {
    setToast({ msg, type, show: true });
  };

  const handleUserDrawExport = (base64: string) => {
    setUserImage(base64);
  };

  const handleAiGuess = async () => {
    if (!userImage) {
        showToast("Please draw something first!", "info");
        return;
    }
    
    setIsGuessing(true);
    setAiGuess('');
    showToast("Analyzing your masterpiece...", "loading");
    
    try {
      const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: userImage }),
      });
      const data = await res.json();
      
      if (data.guess) {
        setAiGuess(data.guess);
        setToast(prev => ({ ...prev, show: false })); // Hide loading toast
      } else {
        showToast(data.error || 'AI could not guess that.', 'error');
      }
    } catch (e) {
      showToast('Failed to connect to AI', 'error');
    } finally {
      setIsGuessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full animate-in fade-in duration-500 max-w-2xl mx-auto">
      <SimpleToast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))} 
      />

      <div className="text-center max-w-md mx-auto space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Sparkles className="text-amber-400" />
            Draw & Let AI Guess
        </h2>
        <p className="text-gray-500">Sketch an object below and test the AI's vision.</p>
      </div>
      
      <CanvasBoard onExport={handleUserDrawExport} />
      
      <div className="w-full max-w-md flex flex-col gap-4">
        <button
            onClick={handleAiGuess}
            disabled={isGuessing}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            {isGuessing ? (
                <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Thinking...</span>
                </>
            ) : (
                <>
                    <Bot size={24} className="group-hover:-translate-y-1 transition-transform" />
                    <span>Guess My Drawing!</span>
                </>
            )}
        </button>

        {aiGuess && (
            <div className="mt-4 p-8 bg-white rounded-3xl shadow-xl border border-indigo-100 text-center relative overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full blur-2xl"></div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center justify-center gap-2">
                    <Bot size={16} /> The AI thinks it is...
                </h3>
                <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 leading-tight py-2">
                    {aiGuess.replace(/^["']|["']$/g, '')}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
