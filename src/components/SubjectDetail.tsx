import React from 'react';
import { ChevronLeft } from 'lucide-react';

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

      <div className="space-y-8">
        {subject.topics.map((topic: any, tIdx: number) => (
          <div key={tIdx} className="space-y-4">
            <h2 className="text-xl font-black uppercase border-l-4 border-accent-green pl-4">
              {topic.name}
            </h2>
            
            <div className="grid gap-4">
              {topic.subTopics.map((subTopic: any, sIdx: number) => (
                <div key={sIdx} className="bg-surface neo-border p-4">
                  <h3 className="font-bold mb-4 text-accent-blue">{subTopic.name}</h3>
                  
                  <div className="space-y-3">
                    {subTopic.specPoints.map((point: any) => (
                      <div key={point.id} className="text-sm border-l-2 border-white/10 pl-3 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-mono text-[10px] text-white/40">{point.code}</span>
                          <span className="bg-white text-black text-[9px] px-1 font-black uppercase">
                            {point.commandWord}
                          </span>
                        </div>
                        <p className="text-white/80 leading-relaxed">{point.description}</p>
                        
                        <div className="mt-3 flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <div 
                              key={level}
                              className={`h-1 flex-1 ${
                                point.masteryLevel >= level ? 'bg-accent-green' : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetail;
