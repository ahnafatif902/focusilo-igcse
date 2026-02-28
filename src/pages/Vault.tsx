import React, { useState } from 'react';
import { Sparkles, Search, Filter, Plus, RotateCcw, ChevronLeft, BookOpen, Target, Brain, Layers, Database } from 'lucide-react';
import { subjectsData, Subject, Flashcard } from '../data/vaultData';

export const Vault: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSubjects = subjectsData.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (sub.code && sub.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedSubject) {
    return (
      <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedSubject(null)}
          className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Vault
        </button>

        <header className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                  {selectedSubject.name}
                </h1>
                {selectedSubject.code && (
                  <span className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wider">
                    {selectedSubject.code}
                  </span>
                )}
              </div>
              <p className="text-text-secondary max-w-3xl leading-relaxed">
                {selectedSubject.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="glass-panel p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">Assessment</h3>
                <p className="text-sm text-text-secondary">{selectedSubject.assessment}</p>
              </div>
            </div>
            <div className="glass-panel p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                <Brain className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">Key Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSubject.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-bg-surface-hover border border-border text-xs text-text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Flashcards ({selectedSubject.flashcards.length})</h2>
            <div className="flex gap-2">
              <button className="btn-secondary px-3 flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </button>
              <button className="btn-secondary px-3 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {selectedSubject.flashcards.length === 0 ? (
            <div className="glass-panel p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2">
              <div className="w-16 h-16 rounded-2xl bg-bg-surface-hover flex items-center justify-center border border-border mb-2">
                <Database className="w-8 h-8 text-text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">No Flashcards Yet</h3>
              <p className="text-text-secondary max-w-md">
                This subject vault is currently empty. Use the Inject AI feature to generate high-yield flashcards based on the Edexcel specification.
              </p>
              <button className="btn-primary mt-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSubject.flashcards.map((card) => {
                const isFlipped = flippedCards[card.id];
                
                return (
                  <div 
                    key={card.id}
                    className="group perspective-[1000px] h-64 cursor-pointer"
                    onClick={() => toggleFlip(card.id)}
                  >
                    <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                      
                      {/* Front */}
                      <div className="absolute w-full h-full backface-hidden glass-panel p-6 flex flex-col hover:border-accent/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-bg-surface-hover border border-border text-text-secondary">
                            {card.topic}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                            card.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                            card.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                            'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {card.difficulty}
                          </span>
                        </div>
                        <div className="flex-1 flex items-center justify-center text-center">
                          <h3 className="text-lg font-medium text-text-primary leading-snug">{card.front}</h3>
                        </div>
                        <div className="text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-text-secondary flex items-center justify-center gap-1">
                            <RotateCcw className="w-3.5 h-3.5" /> Tap to flip
                          </span>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-panel p-6 flex flex-col border-accent/50 shadow-[0_0_30px_var(--color-accent-glow)]">
                        <div className="flex-1 flex items-center justify-center text-center overflow-y-auto hide-scrollbar">
                          <p className="text-base text-text-primary leading-relaxed">{card.back}</p>
                        </div>
                        <div className="text-center mt-4">
                          <span className="text-xs text-accent flex items-center justify-center gap-1">
                            <RotateCcw className="w-3.5 h-3.5" /> Tap to flip back
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
            <BookOpen className="text-accent w-8 h-8" />
            Spec Vault
          </h1>
          <p className="text-text-secondary font-medium">
            Edexcel IGCSE Subject Architecture.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-surface border border-border rounded-xl py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div 
            key={subject.id}
            onClick={() => setSelectedSubject(subject)}
            className="glass-panel p-6 cursor-pointer group hover:border-accent/50 transition-all hover:shadow-[0_0_30px_var(--color-accent-glow)] flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-bg-surface-hover border border-border text-text-secondary">
                {subject.category}
              </span>
              {subject.code && (
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-accent/10 text-accent uppercase tracking-wider">
                  {subject.code}
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
              {subject.name}
            </h3>
            
            <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1">
              {subject.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <span className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                {subject.flashcards.length} Cards
              </span>
              <span className="text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Enter Vault &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
