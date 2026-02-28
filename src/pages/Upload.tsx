import React, { useState } from 'react';

interface InjectionModuleProps {
  onParsed: () => void;
}

export const InjectionModule: React.FC<InjectionModuleProps> = ({ onParsed }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [link, setLink] = useState('');

  const handleInject = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      onParsed();
    }, 4000);
  };

  return (
    <div className="p-8 space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="space-y-6">
        <h1 className="text-3xl font-light tracking-tight text-white">
          Source Injection
        </h1>
        <p className="cyber-text">Data Ingestion Protocol</p>
      </header>

      {isParsing ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          {/* Neural Parsing Animation */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border border-accent rounded-full animate-[spin_3s_linear_infinite] opacity-20" />
            <div className="absolute inset-2 border border-accent rounded-full animate-[spin_2s_linear_infinite_reverse] opacity-40" />
            <div className="absolute inset-4 border border-accent rounded-full animate-[spin_1s_linear_infinite] opacity-60" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_15px_#CCFF00]" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="font-light text-xl tracking-widest text-white">
              NEURAL PARSING
            </h2>
            <p className="font-mono text-[10px] text-accent animate-pulse tracking-[0.3em]">
              EXTRACTING EDEXCEL SPEC POINTS...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="cyber-text">Drop-Zone</h2>
            <button className="w-full h-48 border border-white/10 border-dashed hover:border-accent bg-surface flex flex-col items-center justify-center gap-4 group transition-all duration-500">
              <div className="text-center space-y-2">
                <p className="font-light tracking-widest text-sm text-white/80 group-hover:text-accent transition-colors">
                  DRAG & DROP
                </p>
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">PDF / Text Notes</p>
              </div>
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="cyber-text">Paste-Link</h2>
            <input 
              type="text" 
              placeholder="YOUTUBE OR WEBSITE URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-surface text-white p-4 border border-white/10 font-mono text-xs focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
            />
          </div>

          <button 
            onClick={handleInject}
            className="w-full cyber-button text-accent hover:bg-accent hover:text-black"
          >
            Initialize Parsing
          </button>
        </div>
      )}
    </div>
  );
};
