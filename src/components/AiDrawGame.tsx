'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Play, Send, AlertCircle, Trophy, RefreshCw, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { SimpleToast, ToastType } from '@/components/ui/SimpleToast';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// Simple mystery words for AI Drawing game
const MYSTERY_WORDS = ['Apple', 'Car', 'Tree', 'House', 'Sun', 'Cat', 'Dog', 'Computer', 'Phone', 'Bicycle', 'Flower', 'Fish', 'Robot', 'Pizza', 'Book', 'Guitar', 'Ice Cream'];

export default function AiDrawGame() {
  const [aiSvg, setAiSvg] = useState<string>('');
  const [mysteryWord, setMysteryWord] = useState<string>('');
  const [userGuessInput, setUserGuessInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'idle' | 'drawing' | 'guessing' | 'success' | 'failed' | 'gave_up'>('idle');
  const [hintLevel, setHintLevel] = useState(0);
  const [toast, setToast] = useState<{ msg: string; type: ToastType; show: boolean }>({ msg: '', type: 'info', show: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: ToastType = 'info') => {
    setToast({ msg, type, show: true });
  };

  const startAiDrawGame = async () => {
    const word = MYSTERY_WORDS[Math.floor(Math.random() * MYSTERY_WORDS.length)];
    setMysteryWord(word);
    setAiSvg('');
    setGameStatus('drawing');
    setUserGuessInput('');
    setHintLevel(0);
    
    try {
      const res = await fetch('/api/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: word }),
      });
      const data = await res.json();
      if (data.svg) {
        setAiSvg(data.svg);
        setGameStatus('guessing');
        // Auto focus input when game starts
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        setGameStatus('idle');
        showToast('AI Failed to draw: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (e) {
      setGameStatus('idle');
      showToast('Network error, please try again.', 'error');
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const submitUserGuess = () => {
    if (!userGuessInput.trim()) return;

    if (userGuessInput.trim().toLowerCase() === mysteryWord.toLowerCase()) {
        setGameStatus('success');
        triggerConfetti();
    } else {
        setGameStatus('failed');
    }
  };

  const getHint = () => {
    if (hintLevel < 2) {
        setHintLevel(prev => prev + 1);
        if (hintLevel === 0) showToast(`Hint: It has ${mysteryWord.length} letters!`, 'info');
        if (hintLevel === 1) showToast(`Hint: Starts with "${mysteryWord.charAt(0)}"!`, 'info');
    }
  };

  const maskedWord = () => {
      if (hintLevel === 0) return '???';
      if (hintLevel === 1) return mysteryWord.split('').map(c => c === ' ' ? ' ' : '_').join(' ');
      return mysteryWord.charAt(0) + mysteryWord.slice(1).split('').map(c => c === ' ' ? ' ' : '_').join(' ');
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto animate-in fade-in duration-500">
      <SimpleToast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))} 
      />

      {gameStatus === 'idle' && (
        <div className="text-center py-12 flex flex-col items-center">
           <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Bot size={48} className="text-indigo-600" />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 mb-3">AI Draws, You Guess</h2>
           <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
             The AI will interpret a secret word and draw it. Can you guess what it is?
           </p>
           <button
            onClick={startAiDrawGame}
            className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/30 active:scale-95 flex items-center gap-3 group"
           >
            <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            Start Game
           </button>
        </div>
      )}

      {gameStatus === 'drawing' && (
        <div className="flex flex-col items-center justify-center py-20">
           <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={32} className="text-indigo-600 animate-pulse" />
                </div>
           </div>
           <h3 className="text-xl font-bold text-gray-800 mt-4">AI is Creating Art...</h3>
           <p className="text-gray-500 animate-pulse">Imagining "{mysteryWord.replace(/./g, '*')}"</p>
        </div>
      )}

      {(gameStatus === 'guessing' || gameStatus === 'success' || gameStatus === 'failed' || gameStatus === 'gave_up') && (
        <div className="flex flex-col items-center w-full gap-6">
            {/* Drawing Container */}
            <div className="w-full aspect-square max-w-[400px] bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-4 flex items-center justify-center relative overflow-hidden group">
                {/* Paper texture effect */}
                <div className="absolute inset-0 bg-[#fafafa] opacity-50 pointer-events-none"></div>
                
                {aiSvg ? (
                     <div 
                        className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:drop-shadow-md transition-transform duration-500 hover:scale-105"
                        dangerouslySetInnerHTML={{ __html: aiSvg }} 
                    />
                ) : (
                    <div className="flex flex-col items-center text-red-400 gap-2">
                        <AlertCircle size={32} />
                        <p>Failed to render image</p>
                    </div>
                )}
            </div>
            
            {/* Guessing Interface */}
            <div className="w-full max-w-md space-y-4">
                {gameStatus === 'guessing' && (
                    <>
                        <div className="flex justify-between items-center text-sm font-medium text-gray-500 px-2">
                             <span>Make a guess!</span>
                             <div className="flex items-center gap-2">
                                <span className="tracking-widest font-mono bg-gray-100 px-2 py-1 rounded">{maskedWord()}</span>
                                <button 
                                    onClick={getHint}
                                    disabled={hintLevel >= 2}
                                    className="p-1 hover:bg-yellow-50 text-yellow-500 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                    title="Get a hint"
                                >
                                    <HelpCircle size={18} />
                                </button>
                             </div>
                        </div>

                        <div className="flex gap-2">
                            <input 
                                ref={inputRef}
                                type="text" 
                                value={userGuessInput}
                                onChange={(e) => setUserGuessInput(e.target.value)}
                                placeholder="Type your guess here..."
                                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-lg transition-all shadow-sm"
                                onKeyDown={(e) => e.key === 'Enter' && submitUserGuess()}
                            />
                            <button 
                                onClick={submitUserGuess}
                                className="px-6 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg hover:shadow-indigo-500/20 active:scale-95 flex items-center justify-center"
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </>
                )}

                {gameStatus === 'success' && (
                    <div className="p-6 bg-emerald-50 text-emerald-900 rounded-3xl text-center border border-emerald-100 animate-in zoom-in duration-300 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-emerald-500">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-3xl font-extrabold mb-2">Correct!</h3>
                        <p className="text-lg text-emerald-700/80 mb-6">
                            The word was <span className="font-bold text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded">{mysteryWord}</span>
                        </p>
                        <button 
                            onClick={startAiDrawGame}
                            className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Play Again
                        </button>
                    </div>
                )}

                {gameStatus === 'failed' && (
                     <div className="p-6 bg-white text-rose-900 rounded-3xl text-center border-2 border-rose-100 animate-in shake duration-300 shadow-sm">
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Not quite...</h3>
                        <p className="mb-6 text-rose-600">Give it another shot?</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => {
                                    setGameStatus('guessing');
                                    setUserGuessInput('');
                                    setTimeout(() => inputRef.current?.focus(), 100);
                                }}
                                className="py-3 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                            >
                                Try Again
                            </button>
                            <button 
                                onClick={() => setGameStatus('gave_up')}
                                className="py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold transition-colors"
                            >
                                Give Up
                            </button>
                        </div>
                    </div>
                )}

                {gameStatus === 'gave_up' && (
                    <div className="p-6 bg-gray-50 text-gray-900 rounded-3xl text-center border border-gray-200 animate-in zoom-in duration-300 shadow-sm relative overflow-hidden">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-500">
                            <Bot size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Game Over</h3>
                        <p className="text-lg text-gray-600 mb-6">
                            The word was <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{mysteryWord}</span>
                        </p>
                        <button 
                            onClick={startAiDrawGame}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}
