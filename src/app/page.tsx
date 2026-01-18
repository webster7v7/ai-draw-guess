'use client';

import { useState } from 'react';
import { Pencil, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserDrawGame from '@/components/UserDrawGame';
import AiDrawGame from '@/components/AiDrawGame';

export default function Home() {
  const [mode, setMode] = useState<'user-draw' | 'ai-draw'>('user-draw');

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-gray-900 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-6">
        
        {/* Header */}
        <header className="text-center space-y-4 mb-4">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-indigo-50 mb-2">
                <Sparkles className="text-indigo-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                AI Draw & Guess
            </h1>
            <p className="max-w-md mx-auto text-gray-500 font-medium">
                Challenge the visual intelligence of <span className="text-indigo-600 font-bold">GLM-4V-Flash</span> in two exciting modes.
            </p>
        </header>

        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden min-h-[700px] flex flex-col relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Mode Tabs */}
            <div className="flex p-2 gap-2 bg-gray-100/50 m-4 rounded-3xl self-center relative z-10 w-full max-w-md">
                <button
                    onClick={() => setMode('user-draw')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold transition-all duration-300",
                        mode === 'user-draw' 
                        ? "bg-white text-indigo-600 shadow-md scale-100" 
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 scale-95"
                    )}
                >
                    <Pencil size={18} />
                    <span>You Draw</span>
                </button>
                <button
                    onClick={() => setMode('ai-draw')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold transition-all duration-300",
                        mode === 'ai-draw' 
                        ? "bg-white text-indigo-600 shadow-md scale-100" 
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 scale-95"
                    )}
                >
                    <Bot size={18} />
                    <span>AI Draws</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 md:p-8 flex flex-col relative z-10">
                {mode === 'user-draw' ? <UserDrawGame /> : <AiDrawGame />}
            </div>
        </div>
        
        <footer className="text-center text-gray-400 text-sm py-4">
          <p>© {new Date().getFullYear()} webster</p>
        </footer>
      </div>
    </main>
  );
}
