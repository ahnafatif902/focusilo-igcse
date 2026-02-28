import React from 'react';
import { ChevronLeft, Target } from 'lucide-react';

interface MCQPlaceholderProps {
  onBack: () => void;
}

export const MCQPlaceholder: React.FC<MCQPlaceholderProps> = ({ onBack }) => {
  return (
    <div className="p-6 space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-[#CCFF00] font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_10px_rgba(204,255,0,0.5)] transition-all"
      >
        <ChevronLeft size={16} /> Command Center
      </button>
      
      <div className="bg-[#121212] border-2 border-[#CCFF00] p-6 shadow-[0_0_20px_rgba(204,255,0,0.15)] relative overflow-hidden">
        {/* Decorative background element */}
        <Target size={120} className="absolute -right-10 -top-10 text-[#CCFF00] opacity-5" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-1">
                MCQ Session
              </h2>
              <p className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                Neural Network Engaged
              </p>
            </div>
            <div className="text-white/40 font-mono text-sm">01/10</div>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 border-2 border-white/10 bg-black font-mono text-sm text-white/90 leading-relaxed">
              Which of the following cellular structures is primarily responsible for aerobic respiration and energy release?
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'].map((opt, i) => (
                <button 
                  key={i} 
                  className="p-4 border-2 border-white/10 text-left font-bold hover:border-[#CCFF00] hover:text-[#CCFF00] hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:bg-[#CCFF00]/5 transition-all bg-black flex items-center gap-4 group"
                >
                  <span className="text-white/40 font-mono text-xs group-hover:text-[#CCFF00]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
