import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Target, TrendingUp, AlertTriangle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export const AIDebrief: React.FC<{ score: number, onReturn: () => void }> = ({ score, onReturn }) => {
  const [quote, setQuote] = useState<string>('ANALYZING TELEMETRY...');
  const [tips, setTips] = useState<string[]>(['Processing...', 'Processing...', 'Processing...']);

  useEffect(() => {
    const fetchDebrief = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `You are a "Ruthless Mentor" for Edexcel IGCSE students. The student just scored ${score}% on a test.
          Provide a JSON response with exactly two fields:
          1. "quote": A highly unique, high-energy, ruthless motivational quote (1 sentence). No defaults, no repeats.
          2. "tips": An array of exactly 3 sharp, non-obvious tactical tips to improve Edexcel exam scores. No fluff.
          Return ONLY valid JSON.`,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const data = JSON.parse(response.text || '{}');
        if (data.quote) setQuote(data.quote);
        if (data.tips && data.tips.length === 3) setTips(data.tips);
      } catch (e) {
        setQuote('"Excuses are the nails used to build a house of failure."');
        setTips([
          'For 6-mark "Evaluate" questions, always conclude with a justified judgment.',
          'State the formula before substituting values. Edexcel awards 1 mark for the correct formula.',
          'Watch your significant figures. Match the lowest sig figs given in the question data.'
        ]);
      }
    };
    fetchDebrief();
  }, [score]);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-2 shadow-[0_0_30px_var(--color-accent-glow)]">
          <Target className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          Post-Test Debrief
        </h1>
        <p className="text-text-secondary font-medium flex items-center justify-center gap-2">
          <span>Analysis Complete</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="text-accent font-bold">Score: {score}%</span>
        </p>
      </header>

      {/* The Oracle Quote */}
      <div className="glass-panel p-8 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 text-accent/5 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
          <Zap size={120} />
        </div>
        <div className="relative z-10 flex gap-4 items-start">
          <div className="w-1.5 h-full absolute left-0 top-0 bg-accent rounded-full" />
          <div className="pl-4 space-y-2">
            <p className="text-lg md:text-xl font-medium text-text-primary leading-relaxed italic">
              "{quote}"
            </p>
            <p className="text-sm text-text-secondary font-bold uppercase tracking-wider">
              — Focuslio AI Mentor
            </p>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 md:p-8 space-y-6 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Strengths</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              AO1 Recall Mastery
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              Equation manipulation
            </li>
          </ul>
        </div>
        
        <div className="glass-panel p-6 md:p-8 space-y-6 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Weaknesses</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              Missing units (AO2)
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              "Evaluate" command word
            </li>
          </ul>
        </div>
      </div>

      {/* Tactical Tips */}
      <div className="glass-panel p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Tactical Execution
        </h2>
        <div className="space-y-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-bg-surface-hover border border-border hover:border-accent/30 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-bg-base border border-border flex items-center justify-center text-xs font-bold text-accent shrink-0">
                0{idx + 1}
              </span>
              <p className="text-sm md:text-base font-medium text-text-primary leading-relaxed pt-1">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button 
          onClick={onReturn}
          className="btn-primary px-8 py-4 text-base font-bold tracking-wide flex items-center gap-2"
        >
          Return to Vault
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Branding */}
      <div className="pt-8 text-center">
        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-50">
          [SYSTEM_GEN_AI_VERIFIED]
        </p>
      </div>
    </div>
  );
};
