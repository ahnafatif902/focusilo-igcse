import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { edexcelData } from '../data/edexcelData';
import { RefreshCcw, BrainCircuit, Layers } from 'lucide-react';
import { QuizEngine, Question } from './QuizEngine';

interface FlattenedPoint {
  subjectName: string;
  topicName: string;
  subTopicName: string;
  id: string;
  code: string;
  commandWord: string;
  description: string;
  masteryLevel: number;
}

// Mock questions for demonstration
const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: 'MCQ',
    question: 'Which of the following is NOT a characteristic shared by all living organisms?',
    aoLevel: 'AO1',
    options: [
      { id: 'o1', text: 'Respiration', isCorrect: false, feedback: 'All living organisms respire to release energy.' },
      { id: 'o2', text: 'Photosynthesis', isCorrect: true, feedback: 'Only plants and some bacteria/protoctists photosynthesise. Animals and fungi do not.' },
      { id: 'o3', text: 'Excretion', isCorrect: false, feedback: 'All living organisms excrete metabolic waste.' },
      { id: 'o4', text: 'Sensitivity', isCorrect: false, feedback: 'All living organisms respond to their surroundings.' }
    ]
  },
  {
    id: 'q2',
    type: 'ACTIVE_RECALL',
    question: 'Describe the common features shared by organisms within the plant kingdom.',
    aoLevel: 'AO2',
    markScheme: [
      { id: 'm1', point: 'They are multicellular organisms' },
      { id: 'm2', point: 'Their cells contain chloroplasts and are able to carry out photosynthesis' },
      { id: 'm3', point: 'Their cells have cellulose cell walls' },
      { id: 'm4', point: 'They store carbohydrates as starch or sucrose' }
    ]
  },
  {
    id: 'q3',
    type: 'MCQ',
    question: 'Calculate 15% of 240.',
    aoLevel: 'AO2',
    options: [
      { id: 'o1', text: '24', isCorrect: false, feedback: 'That is 10%.' },
      { id: 'o2', text: '36', isCorrect: true, feedback: 'Correct. 10% is 24, 5% is 12. 24 + 12 = 36.' },
      { id: 'o3', text: '40', isCorrect: false, feedback: 'Incorrect calculation.' },
      { id: 'o4', text: '15', isCorrect: false, feedback: 'That is the percentage, not the value.' }
    ]
  }
];

const Study = () => {
  const [mode, setMode] = useState<'FLASHCARDS' | 'QUIZ'>('FLASHCARDS');
  
  const allPoints = useMemo(() => {
    const flattened: FlattenedPoint[] = [];
    edexcelData.subjects.forEach(subject => {
      subject.topics.forEach(topic => {
        topic.subTopics.forEach(subTopic => {
          subTopic.specPoints.forEach(point => {
            flattened.push({
              ...point,
              subjectName: subject.name,
              topicName: topic.name,
              subTopicName: subTopic.name
            });
          });
        });
      });
    });
    return flattened.sort(() => Math.random() - 0.5); // Shuffle
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const currentPoint = allPoints[currentIndex];

  const handleNext = (isCorrect: boolean) => {
    setDirection(isCorrect ? 1 : -1);
    setIsFlipped(false);
    
    setTimeout(() => {
      if (currentIndex < allPoints.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
      setDirection(0);
    }, 200);
  };

  if (mode === 'QUIZ') {
    return (
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Quiz Mode</h1>
          <button 
            onClick={() => setMode('FLASHCARDS')}
            className="text-xs font-bold uppercase tracking-widest text-accent-blue flex items-center gap-2"
          >
            <Layers size={16} /> Back to Cards
          </button>
        </div>
        <QuizEngine questions={mockQuestions} />
      </div>
    );
  }

  if (!currentPoint) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-black uppercase">No points found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-160px)]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Study</h1>
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Card {currentIndex + 1} of {allPoints.length}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('QUIZ')}
            className="p-2 bg-accent-blue text-black neo-border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            title="Switch to Quiz Mode"
          >
            <BrainCircuit size={16} />
          </button>
          <button 
            onClick={() => setCurrentIndex(0)}
            className="p-2 bg-surface neo-border text-white/60"
            title="Restart Flashcards"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoint.id}
            initial={{ x: direction * 100, opacity: 0, rotateY: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full aspect-[3/4] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-surface neo-border p-8 flex flex-col justify-center items-center text-center">
                <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.2em] mb-4">
                  {currentPoint.subjectName}
                </span>
                <h2 className="text-3xl font-black uppercase leading-tight mb-6">
                  {currentPoint.commandWord} <br/>
                  <span className="text-accent-green">{currentPoint.code}</span>
                </h2>
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest animate-pulse">
                  Tap to reveal answer
                </p>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-white text-black neo-border p-8 flex flex-col justify-center items-center text-center rotate-y-180"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <span className="text-black/40 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Specification Detail
                </span>
                <p className="text-lg font-bold leading-relaxed">
                  {currentPoint.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(false); }}
          className="neo-button bg-accent-red text-white neo-border border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-sm"
        >
          Needs Practice
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(true); }}
          className="neo-button bg-accent-green text-black neo-border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

export default Study;
