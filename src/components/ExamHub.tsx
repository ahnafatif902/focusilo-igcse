import React, { useState } from 'react';

interface ExamHubProps {
  onStartExam: (format: string, difficulty: string) => void;
}

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', time: '5m' },
  { id: 'medium', label: 'Medium', time: '10m' },
  { id: 'hard', label: 'Hard', time: '20m' },
  { id: 'hardest', label: 'Hardest', time: 'Adaptive' },
];

const WEAPONS = [
  { id: 'mcq', label: 'MCQ' },
  { id: 'one-word', label: 'One Word' },
  { id: 'qa', label: 'Q&A' },
  { id: 'fill-gaps', label: 'Fill Gaps' },
];

export const ExamHub: React.FC<ExamHubProps> = ({ onStartExam }) => {
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <div className="p-8 space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="space-y-6">
        <h1 className="text-3xl font-light tracking-tight text-white">
          Execution Protocol
        </h1>
        <p className="cyber-text">Select Parameters</p>
      </header>

      <section className="space-y-6">
        <h2 className="cyber-text">Difficulty Protocol</h2>
        <div className="grid grid-cols-1 gap-3">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setDifficulty(diff.id)}
              className={`p-4 border text-left transition-all duration-300 flex justify-between items-center ${
                difficulty === diff.id 
                  ? 'border-accent bg-accent/5' 
                  : 'border-white/10 bg-surface hover:border-white/30'
              }`}
            >
              <span className={`font-light tracking-widest text-sm ${difficulty === diff.id ? 'text-accent' : 'text-white/80'}`}>
                {diff.label}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${difficulty === diff.id ? 'text-accent' : 'text-white/40'}`}>
                {diff.time}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="cyber-text">Weapon Grid</h2>
        <div className="grid grid-cols-2 gap-3">
          {WEAPONS.map((weapon) => (
            <button
              key={weapon.id}
              onClick={() => onStartExam(weapon.id, difficulty)}
              className="aspect-square bg-surface border border-white/10 p-6 flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-all duration-500 group"
            >
              <span className="font-light text-sm tracking-widest text-white/80 group-hover:text-accent transition-colors">
                {weapon.label}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
