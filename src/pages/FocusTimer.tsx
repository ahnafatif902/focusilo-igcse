import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, Headphones, Flame, CheckCircle2 } from 'lucide-react';

export const FocusTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessions, setSessions] = useState(0);
  const [sound, setSound] = useState<'none' | 'lofi' | 'white-noise'>('none');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'focus') {
        setSessions(s => s + 1);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="p-6 md:p-10 h-full flex flex-col animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
            <Timer className="text-accent w-8 h-8" />
            Focus Timer
          </h1>
          <p className="text-text-secondary font-medium">
            Deep work protocol.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full border border-orange-500/20">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold">12 Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-bold">{sessions} Sessions</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Ambient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${
          mode === 'focus' ? 'bg-accent/10' : 'bg-green-500/10'
        }`} />

        <div className="glass-panel p-8 md:p-12 flex flex-col items-center space-y-12 relative z-10 w-full max-w-md">
          {/* Mode Selector */}
          <div className="flex gap-1 bg-bg-base p-1.5 rounded-2xl border border-border w-full">
            <button 
              onClick={() => { setMode('focus'); setTimeLeft(25 * 60); setIsActive(false); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === 'focus' ? 'bg-accent text-white shadow-[0_0_15px_var(--color-accent-glow)]' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Focus
            </button>
            <button 
              onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === 'break' ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Break
            </button>
          </div>

          {/* Timer Display */}
          <div className="relative flex items-center justify-center">
            {/* Circular Progress */}
            <svg className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" className="stroke-border fill-none stroke-[8]" />
              <circle 
                cx="50%" cy="50%" r="45%" 
                className={`fill-none stroke-[8] transition-all duration-1000 ease-linear ${
                  mode === 'focus' ? 'stroke-accent' : 'stroke-green-500'
                }`}
                strokeDasharray="283%"
                strokeDashoffset={`${283 - (283 * progress) / 100}%`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-6xl md:text-7xl font-bold tracking-tighter text-text-primary tabular-nums">
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button 
              onClick={resetTimer}
              className="w-12 h-12 rounded-full bg-bg-surface-hover border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-all active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTimer}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all active:scale-95 shadow-lg ${
                mode === 'focus' 
                  ? 'bg-accent hover:bg-accent-hover shadow-[0_0_30px_var(--color-accent-glow)]' 
                  : 'bg-green-500 hover:bg-green-600 shadow-[0_0_30px_rgba(34,197,94,0.4)]'
              }`}
            >
              {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
            
            {/* Ambient Sound Toggle */}
            <div className="relative group">
              <button className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-95 ${
                sound !== 'none' 
                  ? 'bg-accent/10 border-accent text-accent shadow-[0_0_15px_var(--color-accent-glow)]' 
                  : 'bg-bg-surface-hover border-border text-text-secondary hover:text-text-primary hover:border-accent/50'
              }`}>
                {sound === 'none' ? <Volume2 className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
              </button>
              
              {/* Sound Menu (Hover/Tap) */}
              <div className="absolute bottom-full right-0 mb-3 w-40 glass-panel p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-20">
                <button onClick={() => setSound('none')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sound === 'none' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}>None</button>
                <button onClick={() => setSound('lofi')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sound === 'lofi' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}>Lo-Fi Beats</button>
                <button onClick={() => setSound('white-noise')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sound === 'white-noise' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}>White Noise</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
