import React from 'react';
import { edexcelData } from '../data/edexcelData';

interface SubjectsProps {
  onSelectSubject: (subject: any) => void;
}

const calculateProgress = (subject: any) => {
  let totalPoints = 0;
  let totalMastery = 0;
  
  subject.topics.forEach((topic: any) => {
    topic.subTopics.forEach((subTopic: any) => {
      subTopic.specPoints.forEach((point: any) => {
        totalPoints++;
        totalMastery += point.masteryLevel;
      });
    });
  });
  
  if (totalPoints === 0) return 0;
  return Math.round((totalMastery / (totalPoints * 3)) * 100);
};

const Subjects: React.FC<SubjectsProps> = ({ onSelectSubject }) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Subjects</h1>
      <div className="grid gap-4">
        {edexcelData.subjects.map((subject) => {
          const progress = calculateProgress(subject);
          
          return (
            <button 
              key={subject.code} 
              onClick={() => onSelectSubject(subject)}
              className="bg-surface neo-border p-4 flex flex-col text-left w-full gap-4"
            >
              <div className="flex justify-between items-start w-full">
                <div>
                  <span className="font-bold block text-lg">{subject.name}</span>
                  <span className="text-xs font-mono text-white/40">{subject.code}</span>
                </div>
                <div className="w-8 h-8 bg-accent-green neo-border flex items-center justify-center text-black shrink-0">
                  →
                </div>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                  <span className="text-white/60">Mastery</span>
                  <span className="text-accent-green">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 neo-border overflow-hidden">
                  <div 
                    className="h-full bg-accent-green" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Subjects;
