import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronRight, RefreshCcw } from 'lucide-react';

export type AOLevel = 'AO1' | 'AO2' | 'AO3';

export interface BaseQuestion {
  id: string;
  type: 'MCQ' | 'ACTIVE_RECALL';
  question: string;
  aoLevel: AOLevel;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'MCQ';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface ActiveRecallQuestion extends BaseQuestion {
  type: 'ACTIVE_RECALL';
  markScheme: {
    id: string;
    point: string;
  }[];
}

export type Question = MCQQuestion | ActiveRecallQuestion;

interface QuizEngineProps {
  questions: Question[];
  onComplete?: (results: any) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqSelectedOption, setMcqSelectedOption] = useState<string | null>(null);
  const [recallRevealed, setRecallRevealed] = useState(false);
  const [recallCheckedPoints, setRecallCheckedPoints] = useState<Set<string>>(new Set());
  
  // Scoring state
  const [scores, setScores] = useState<Record<string, { earned: number; total: number; aoLevel: AOLevel }>>({});

  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const handleMcqSelect = (optionId: string, isCorrect: boolean) => {
    if (mcqSelectedOption !== null) return; // Prevent changing answer
    setMcqSelectedOption(optionId);
    
    setScores(prev => ({
      ...prev,
      [currentQuestion.id]: {
        earned: isCorrect ? 1 : 0,
        total: 1,
        aoLevel: currentQuestion.aoLevel
      }
    }));
  };

  const handleRecallToggle = (pointId: string) => {
    const newChecked = new Set(recallCheckedPoints);
    if (newChecked.has(pointId)) {
      newChecked.delete(pointId);
    } else {
      newChecked.add(pointId);
    }
    setRecallCheckedPoints(newChecked);
  };

  const submitRecall = () => {
    if (currentQuestion.type !== 'ACTIVE_RECALL') return;
    
    setScores(prev => ({
      ...prev,
      [currentQuestion.id]: {
        earned: recallCheckedPoints.size,
        total: currentQuestion.markScheme.length,
        aoLevel: currentQuestion.aoLevel
      }
    }));
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setMcqSelectedOption(null);
      setRecallRevealed(false);
      setRecallCheckedPoints(new Set());
    } else {
      setCurrentIndex(questions.length);
    }
  };

  const renderMCQ = (q: MCQQuestion) => {
    return (
      <div className="space-y-4">
        {q.options.map((opt) => {
          const isSelected = mcqSelectedOption === opt.id;
          const showFeedback = mcqSelectedOption !== null;
          
          let btnClass = "bg-surface text-white neo-border border-white/20";
          if (showFeedback) {
            if (opt.isCorrect) {
              btnClass = "bg-accent-green text-black neo-border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
            } else if (isSelected && !opt.isCorrect) {
              btnClass = "bg-accent-red text-white neo-border border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]";
            } else {
              btnClass = "bg-surface text-white/40 border-2 border-white/10";
            }
          } else if (isSelected) {
            btnClass = "bg-white text-black neo-border border-black";
          }

          return (
            <div key={opt.id} className="space-y-2">
              <button
                onClick={() => handleMcqSelect(opt.id, opt.isCorrect)}
                disabled={showFeedback}
                className={`w-full text-left p-4 font-bold transition-all ${btnClass}`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt.text}</span>
                  {showFeedback && opt.isCorrect && <CheckCircle size={20} />}
                  {showFeedback && isSelected && !opt.isCorrect && <XCircle size={20} />}
                </div>
              </button>
              
              {showFeedback && (isSelected || opt.isCorrect) && (
                <div className={`p-3 text-sm font-medium flex gap-2 items-start ${opt.isCorrect ? 'text-accent-green' : 'text-accent-red'}`}>
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{opt.feedback}</p>
                </div>
              )}
            </div>
          );
        })}

        {mcqSelectedOption !== null && (
          <button 
            onClick={handleNext}
            className="w-full mt-8 neo-button bg-accent-blue text-black neo-border border-black flex justify-center items-center gap-2"
          >
            Next Question <ChevronRight size={20} />
          </button>
        )}
      </div>
    );
  };

  const renderActiveRecall = (q: ActiveRecallQuestion) => {
    if (!recallRevealed) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <button 
            onClick={() => setRecallRevealed(true)}
            className="neo-button bg-accent-blue text-black neo-border border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] text-xl py-6 w-full"
          >
            Reveal Mark Scheme
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-surface neo-border p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-accent-blue mb-4">
            Self-Marking (Be Honest!)
          </h3>
          <div className="space-y-3">
            {q.markScheme.map((ms) => {
              const isChecked = recallCheckedPoints.has(ms.id);
              return (
                <button
                  key={ms.id}
                  onClick={() => handleRecallToggle(ms.id)}
                  className={`w-full text-left p-4 flex gap-4 items-start transition-all ${
                    isChecked 
                      ? 'bg-accent-green text-black neo-border border-black' 
                      : 'bg-black text-white border-2 border-white/20'
                  }`}
                >
                  <div className={`w-6 h-6 shrink-0 flex items-center justify-center border-2 ${isChecked ? 'border-black' : 'border-white/40'}`}>
                    {isChecked && <CheckCircle size={16} />}
                  </div>
                  <span className="font-medium leading-tight pt-0.5">{ms.point}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button 
          onClick={submitRecall}
          className="w-full neo-button bg-white text-black neo-border border-black flex justify-center items-center gap-2"
        >
          Submit & Continue <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderResults = () => {
    type StatsAcc = {
      totalEarned: number;
      totalPossible: number;
      aoStats: Record<AOLevel, { earned: number; total: number }>;
    };

    const stats = Object.values(scores).reduce<StatsAcc>((acc, curr: { earned: number; total: number; aoLevel: AOLevel }) => {
      acc.totalEarned += curr.earned;
      acc.totalPossible += curr.total;
      
      if (!acc.aoStats[curr.aoLevel]) {
        acc.aoStats[curr.aoLevel] = { earned: 0, total: 0 };
      }
      acc.aoStats[curr.aoLevel].earned += curr.earned;
      acc.aoStats[curr.aoLevel].total += curr.total;
      
      return acc;
    }, { 
      totalEarned: 0, 
      totalPossible: 0, 
      aoStats: {} as Record<AOLevel, { earned: number, total: number }> 
    });

    const overallPercentage = Math.round((stats.totalEarned / Math.max(stats.totalPossible, 1)) * 100);

    return (
      <div className="p-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-accent-green">Quiz Complete</h2>
          <p className="text-white/60 font-mono">Mastery Assessment Results</p>
        </div>

        <div className="bg-surface neo-border p-8 text-center">
          <div className="text-6xl font-black text-white mb-2">{overallPercentage}%</div>
          <div className="text-xs font-bold uppercase tracking-widest text-accent-blue">Overall Score</div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest">AO Breakdown</h3>
          {(['AO1', 'AO2', 'AO3'] as AOLevel[]).map(ao => {
            const aoStat = stats.aoStats[ao];
            if (!aoStat || aoStat.total === 0) return null;
            
            const pct = Math.round((aoStat.earned / aoStat.total) * 100);
            return (
              <div key={ao} className="bg-surface neo-border p-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold">{ao}</span>
                  <span className="font-mono text-accent-green">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 neo-border overflow-hidden">
                  <div className="h-full bg-accent-green" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => {
            setCurrentIndex(0);
            setScores({});
            if (onComplete) onComplete(stats);
          }}
          className="w-full neo-button bg-white text-black neo-border border-black flex justify-center items-center gap-2"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </div>
    );
  };

  if (isFinished) {
    return renderResults();
  }

  return (
    <div className="p-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-white/40">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 neo-border border-black">
          {currentQuestion.aoLevel}
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black leading-tight">
          {currentQuestion.question}
        </h2>
      </div>

      {currentQuestion.type === 'MCQ' 
        ? renderMCQ(currentQuestion) 
        : renderActiveRecall(currentQuestion)}
    </div>
  );
};
