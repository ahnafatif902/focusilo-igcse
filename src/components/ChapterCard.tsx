import React, { useState } from 'react';
import { Download, CheckCircle, AlertTriangle, Play } from 'lucide-react';
import { ExamFormatSelector } from './ExamFormatSelector';

interface ChapterCardProps {
  topic: any;
  index: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ topic, index }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showFormatSelector, setShowFormatSelector] = useState(false);

  // Calculate mastery
  let totalPoints = 0;
  let totalMastery = 0;
  const commandWords = new Set<string>();

  topic.subTopics.forEach((subTopic: any) => {
    subTopic.specPoints.forEach((point: any) => {
      totalPoints++;
      totalMastery += point.masteryLevel;
      if (point.commandWord) {
        commandWords.add(point.commandWord);
      }
    });
  });

  const progress = totalPoints === 0 ? 0 : Math.round((totalMastery / (totalPoints * 3)) * 100);
  const isHighYield = index % 2 === 0; // Simulate high-yield for alternating chapters

  const handleDownload = () => {
    if (isDownloaded) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 1500);
  };

  if (showFormatSelector) {
    return (
      <div className="bg-surface neo-border p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-tighter leading-tight">
            {topic.name}
          </h2>
          <button 
            onClick={() => setShowFormatSelector(false)}
            className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white"
          >
            Cancel
          </button>
        </div>
        <ExamFormatSelector onSelect={(format) => {
          alert(`Selected format: ${format}`);
          setShowFormatSelector(false);
        }} />
      </div>
    );
  }

  return (
    <div className="bg-surface neo-border p-6 flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-2">
            {topic.name}
          </h2>
          {isHighYield && (
            <div className="inline-flex items-center gap-1 bg-accent-red text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 neo-border border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <AlertTriangle size={12} />
              High-Yield
            </div>
          )}
        </div>
      </div>

      {/* Mastery Progress */}
      <div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
          <span className="text-white/60">Chapter Mastery</span>
          <span className="text-accent-green">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/10 neo-border overflow-hidden">
          <div 
            className="h-full bg-accent-green transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Required Command Words */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
          Required Command Words
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(commandWords).map((word, i) => (
            <span 
              key={i} 
              className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 neo-border border-black"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Take Exam Button */}
        <button 
          onClick={() => setShowFormatSelector(true)}
          className="flex-1 neo-button flex items-center justify-center gap-2 bg-[#CCFF00] text-black neo-border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm"
        >
          <Play size={16} />
          Take Exam
        </button>

        {/* Download Button */}
        <button 
          onClick={handleDownload}
          disabled={isDownloading || isDownloaded}
          className={`flex-1 neo-button flex items-center justify-center gap-2 text-sm ${
            isDownloaded 
              ? 'bg-white/10 text-white/40 border-white/20 shadow-none' 
              : isDownloading
              ? 'bg-accent-blue text-black neo-border border-black animate-pulse'
              : 'bg-surface text-accent-blue neo-border-accent'
          }`}
        >
          {isDownloaded ? (
            <>
              <CheckCircle size={16} />
              Saved
            </>
          ) : isDownloading ? (
            <>
              <Download size={16} className="animate-bounce" />
              Saving...
            </>
          ) : (
            <>
              <Download size={16} />
              Offline
            </>
          )}
        </button>
      </div>
    </div>
  );
};
