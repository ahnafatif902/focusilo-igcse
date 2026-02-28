import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChapterCard } from './ChapterCard';

interface SubjectDetailProps {
  subject: any;
  onBack: () => void;
}

const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, onBack }) => {
  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-accent-blue mb-6 font-bold uppercase tracking-widest text-xs"
      >
        <ChevronLeft size={16} />
        Back to Subjects
      </button>

      <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{subject.name}</h1>
      <p className="font-mono text-white/40 mb-8">{subject.code}</p>

      <div className="space-y-6">
        {subject.topics.map((topic: any, tIdx: number) => (
          <ChapterCard key={tIdx} topic={topic} index={tIdx} />
        ))}
      </div>
    </div>
  );
};

export default SubjectDetail;
