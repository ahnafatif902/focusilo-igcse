import React from 'react';
import { edexcelData } from '../data/edexcelData';

interface SubjectsProps {
  onSelectSubject: (subject: any) => void;
}

const Subjects: React.FC<SubjectsProps> = ({ onSelectSubject }) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Subjects</h1>
      <div className="grid gap-4">
        {edexcelData.subjects.map((subject) => (
          <button 
            key={subject.code} 
            onClick={() => onSelectSubject(subject)}
            className="bg-surface neo-border p-4 flex justify-between items-center text-left w-full"
          >
            <div>
              <span className="font-bold block">{subject.name}</span>
              <span className="text-xs font-mono text-white/40">{subject.code}</span>
            </div>
            <div className="w-8 h-8 bg-accent-green neo-border flex items-center justify-center text-black">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
