import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Quote, TrendingUp, Target } from 'lucide-react';
import { ResultsSummary, AnswerResult } from './ResultsSummary';

const MOCK_DATA = [
  { subject: 'AO1 (Knowledge)', A: 85, fullMark: 100 },
  { subject: 'AO2 (Application)', A: 65, fullMark: 100 },
  { subject: 'AO3 (Analysis)', A: 45, fullMark: 100 },
];

const MOCK_RESULTS: AnswerResult[] = [
  { questionId: 'q1', aoLevel: 'AO1', score: 4, maxScore: 4, missedKeywords: [] },
  { questionId: 'q2', aoLevel: 'AO2', score: 2, maxScore: 4, missedKeywords: ['photosynthesis', 'chloroplast'] },
  { questionId: 'q3', aoLevel: 'AO3', score: 1, maxScore: 6, missedKeywords: ['evaluate', 'reliability', 'control variable'] },
  { questionId: 'q4', aoLevel: 'AO1', score: 3, maxScore: 3, missedKeywords: [] },
];

const STOIC_QUOTES = [
  "We suffer more often in imagination than in reality. – Seneca",
  "You have power over your mind - not outside events. Realize this, and you will find strength. – Marcus Aurelius",
  "First say to yourself what you would be; and then do what you have to do. – Epictetus",
  "Waste no more time arguing what a good man should be. Be one. – Marcus Aurelius"
];

export const PostMortem = () => {
  const [accuracy, setAccuracy] = useState(65);
  
  // Edexcel 9-1 grade boundaries (approximate)
  const calculateGrade = (acc: number) => {
    if (acc >= 85) return 9;
    if (acc >= 75) return 8;
    if (acc >= 65) return 7;
    if (acc >= 55) return 6;
    if (acc >= 45) return 5;
    if (acc >= 35) return 4;
    if (acc >= 25) return 3;
    if (acc >= 15) return 2;
    if (acc >= 5) return 1;
    return 'U';
  };

  const randomQuote = STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-accent-red">Post-Mortem</h1>
        <p className="text-white/60 font-mono text-sm">Session Analytics & Reality Check</p>
      </div>

      <ResultsSummary results={MOCK_RESULTS} />

      {/* AO Radar Chart */}
      <div className="bg-surface neo-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="text-accent-blue" size={20} />
          <h2 className="text-lg font-black uppercase tracking-widest">AO Breakdown</h2>
        </div>
        
        <div className="h-[250px] w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_DATA}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#fff', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#39FF14"
                fill="#39FF14"
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          {MOCK_DATA.map(d => (
            <div key={d.subject} className="bg-black neo-border border-white/20 p-2">
              <div className="text-[10px] text-white/40 uppercase font-bold mb-1">
                {d.subject.split(' ')[0]}
              </div>
              <div className="font-mono font-bold text-accent-green">{d.A}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Predictor */}
      <div className="bg-accent-blue text-black neo-border-accent border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} />
          <h2 className="text-lg font-black uppercase tracking-widest">Grade Predictor</h2>
        </div>
        
        <div className="flex items-end gap-4 mb-8">
          <div className="text-7xl font-black tracking-tighter leading-none">
            {calculateGrade(accuracy)}
          </div>
          <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-60">
            Estimated Grade
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
            <span>Accuracy: {accuracy}%</span>
            <span>Target: 9</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={accuracy}
            onChange={(e) => setAccuracy(parseInt(e.target.value))}
            className="w-full h-2 bg-black/20 rounded-none appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white"
          />
          <p className="text-[10px] font-medium italic opacity-80">
            *Slide to see how accuracy impacts your final grade.
          </p>
        </div>
      </div>

      {/* Reality Check */}
      <div className="bg-surface neo-border border-accent-red shadow-[4px_4px_0px_0px_rgba(255,49,49,1)] p-6">
        <div className="flex items-center gap-2 mb-4 text-accent-red">
          <Quote size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Reality Check</h2>
        </div>
        <p className="font-serif text-lg leading-relaxed italic text-white/90">
          "{randomQuote}"
        </p>
      </div>
    </div>
  );
};
