import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    text: 'Which organelle is responsible for cellular respiration?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'],
    correct: 1,
  },
  {
    id: 2,
    text: 'What is the powerhouse of the cell?',
    options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi'],
    correct: 0,
  }
];

export const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = QUESTIONS[currentIdx];
  const progress = ((currentIdx) / QUESTIONS.length) * 100;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
            <Target className="text-accent w-8 h-8" />
            Quiz
          </h1>
          <span className="text-sm font-medium text-text-secondary bg-bg-surface-hover px-4 py-2 rounded-full border border-border">
            {currentIdx + 1} / {QUESTIONS.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-bg-surface-hover rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-accent transition-all duration-500 shadow-[0_0_15px_var(--color-accent-glow)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex-1 glass-panel p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="space-y-10 relative z-10 max-w-2xl mx-auto w-full">
          <h2 className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed text-center">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 gap-4 w-full">
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === question.correct;
              
              let stateClass = 'bg-bg-surface-hover border-border hover:border-accent/50 text-text-secondary hover:text-text-primary';
              let Icon = null;

              if (isAnswered) {
                if (isCorrect) {
                  stateClass = 'bg-green-500/10 border-green-500/50 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.15)]';
                  Icon = CheckCircle2;
                } else if (isSelected) {
                  stateClass = 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]';
                  Icon = XCircle;
                } else {
                  stateClass = 'bg-bg-surface-hover border-border opacity-50 text-text-secondary';
                }
              } else if (isSelected) {
                stateClass = 'bg-accent/10 border-accent text-accent shadow-[0_0_20px_var(--color-accent-glow)]';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-5 rounded-xl border-2 transition-all duration-300 flex justify-between items-center group ${stateClass}`}
                >
                  <span className="font-medium text-base">{opt}</span>
                  {Icon && <Icon className="w-6 h-6 animate-in zoom-in duration-300" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="flex justify-center pt-6 animate-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 px-8 py-4 text-base w-full md:w-auto justify-center"
              >
                {currentIdx === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
