import React from 'react';

interface ExamFormatSelectorProps {
  onSelect: (formatId: string) => void;
}

const formats = [
  { id: 'mcq', label: 'MCQ' },
  { id: 'one-word', label: 'One Word' },
  { id: 'qa', label: 'Q&A' },
  { id: 'fill-gaps', label: 'Fill in the Gaps' },
];

export const ExamFormatSelector: React.FC<ExamFormatSelectorProps> = ({ onSelect }) => {
  return (
    <div className="bg-black p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">
        Select Exam Format
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {formats.map((format) => (
          <button
            key={format.id}
            onClick={() => onSelect(format.id)}
            className="aspect-square flex items-center justify-center p-4 bg-black text-white border-2 border-[#CCFF00] font-mono text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#CCFF00]/10 hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] active:scale-95 text-center"
            style={{ fontFamily: '"Geist Mono", monospace' }}
          >
            {format.label}
          </button>
        ))}
      </div>
    </div>
  );
};
