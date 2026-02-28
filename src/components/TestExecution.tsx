import React, { useState, useEffect } from 'react';
import { Target, Clock, AlertCircle } from 'lucide-react';

interface TestExecutionProps {
  config: { format: string, difficulty: string };
  onComplete: (score: number) => void;
}

export const TestExecution: React.FC<TestExecutionProps> = ({ config, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(
    config.difficulty === 'easy' ? 300 :
    config.difficulty === 'medium' ? 600 :
    config.difficulty === 'hard' ? 1200 : 60 // Adaptive mock
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(Math.floor(Math.random() * 40) + 60); // Random score 60-100
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLowTime = timeLeft < 60;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in fade-in duration-500">
      <header className="p-6 md:p-8 flex justify-between items-center border-b border-border bg-bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary tracking-tight uppercase">
              {config.format} Protocol
            </h1>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {config.difficulty} Difficulty
            </p>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-lg font-bold tracking-wider ${
          isLowTime 
            ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : 'bg-bg-surface-hover border-border text-text-primary'
        }`}>
          {isLowTime ? <AlertCircle className="w-5 h-5" /> : <Clock className="w-5 h-5 text-text-secondary" />}
          {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-3xl space-y-8">
          <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-md bg-bg-surface-hover border border-border text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Question 1
                </span>
                <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed">
                  Describe the process of active transport across a cell membrane.
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  Your Response
                </label>
                <textarea 
                  className="w-full h-48 bg-bg-base border border-border rounded-xl p-5 text-sm md:text-base text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors resize-none shadow-inner"
                  placeholder="Enter your detailed response here..."
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => onComplete(Math.floor(Math.random() * 40) + 60)}
              className="btn-primary px-8 py-4 text-base font-bold tracking-wide flex items-center gap-2"
            >
              Submit Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
