import React from 'react';

export interface AnswerResult {
  questionId: string;
  aoLevel: 'AO1' | 'AO2' | 'AO3';
  score: number;
  maxScore: number;
  missedKeywords: string[];
}

interface ResultsSummaryProps {
  results: AnswerResult[];
}

const MotivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Hard work beats talent when talent doesn't work hard.",
  "The only place where success comes before work is in the dictionary.",
  "Don't watch the clock; do what it does. Keep going.",
  "You have power over your mind - not outside events. Realize this, and you will find strength."
];

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  // Calculate strengths (AOs with >= 70% score)
  const aoStats = results.reduce((acc, curr) => {
    if (!acc[curr.aoLevel]) acc[curr.aoLevel] = { score: 0, max: 0 };
    acc[curr.aoLevel].score += curr.score;
    acc[curr.aoLevel].max += curr.maxScore;
    return acc;
  }, {} as Record<string, { score: number; max: number }>);

  const strengths = Object.entries(aoStats)
    .filter(([_, stats]: [string, any]) => stats.max > 0 && (stats.score / stats.max) >= 0.7)
    .map(([ao]) => ao);

  // Calculate weaknesses (missed keywords)
  const allMissedKeywords = results.flatMap(r => r.missedKeywords);
  const uniqueMissedKeywords = [...new Set(allMissedKeywords)].slice(0, 5); // Top 5

  // Calculate overall grade (1-9)
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalMax = results.reduce((sum, r) => sum + r.maxScore, 0);
  const percentage = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
  
  const calculateGrade = (pct: number) => {
    if (pct >= 85) return 9;
    if (pct >= 75) return 8;
    if (pct >= 65) return 7;
    if (pct >= 55) return 6;
    if (pct >= 45) return 5;
    if (pct >= 35) return 4;
    if (pct >= 25) return 3;
    if (pct >= 15) return 2;
    if (pct >= 5) return 1;
    return 'U';
  };

  const grade = calculateGrade(percentage);
  const randomQuote = MotivationalQuotes[Math.floor(Math.random() * MotivationalQuotes.length)];

  return (
    <div className="bg-black text-white p-6 space-y-8 border-2 border-white max-w-md mx-auto w-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-[#CCFF00]">Results Summary</h2>
        <p className="font-mono text-sm text-white/60">Performance Analysis</p>
      </div>

      {/* Grade Predictor Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="font-bold uppercase tracking-widest text-xs">Grade Predictor</span>
          <span className="text-4xl font-black text-[#CCFF00]">{grade}</span>
        </div>
        <div className="w-full h-4 bg-white/10 border-2 border-white relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#CCFF00] transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/40">
          <span>U</span>
          <span>9</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Strengths */}
        <div className="border-2 border-white p-4 bg-surface">
          <h3 className="font-black uppercase tracking-widest text-sm mb-3 text-accent-blue">Strengths</h3>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map(s => (
                <li key={s} className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2 h-2 bg-[#CCFF00] inline-block" /> High proficiency in {s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-xs text-white/40">Keep practicing to build strengths.</p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="border-2 border-white p-4 bg-surface">
          <h3 className="font-black uppercase tracking-widest text-sm mb-3 text-accent-red">Weaknesses (Missed Keywords)</h3>
          {uniqueMissedKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {uniqueMissedKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-1 border border-white/40 font-mono text-[10px] uppercase bg-black">
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-white/40">No major keyword gaps detected.</p>
          )}
        </div>
      </div>

      {/* Quote */}
      <div className="border-l-4 border-[#CCFF00] pl-4 py-2">
        <p className="font-serif italic text-lg text-white/90">"{randomQuote}"</p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t-2 border-white/20 text-center">
        <p className="font-black uppercase tracking-widest text-xs">Generated via AI</p>
      </div>
    </div>
  );
};
