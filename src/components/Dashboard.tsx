import React, { useMemo, useState, useEffect } from 'react';
import { edexcelData } from '../data/edexcelData';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-surface neo-border p-6 flex flex-col items-center">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-4">Focus Timer</h3>
      <div className="text-6xl font-black font-mono mb-6 text-accent-blue tracking-tighter">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-4 w-full">
        <button 
          onClick={toggleTimer}
          className={`flex-1 neo-button flex items-center justify-center gap-2 ${
            isActive ? 'bg-accent-red text-white' : 'bg-accent-green text-black'
          } neo-border border-white`}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="p-3 bg-white text-black neo-border border-black"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const stats = useMemo(() => {
    let totalPoints = 0;
    let totalMastery = 0;
    
    edexcelData.subjects.forEach(subject => {
      subject.topics.forEach(topic => {
        topic.subTopics.forEach(subTopic => {
          subTopic.specPoints.forEach(point => {
            totalPoints++;
            totalMastery += point.masteryLevel;
          });
        });
      });
    });
    
    const maxPossibleMastery = totalPoints * 3;
    const percentage = Math.round((totalMastery / maxPossibleMastery) * 100) || 0;
    
    return {
      totalPoints,
      percentage
    };
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (stats.percentage / 100) * circumference;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-black uppercase tracking-tighter">Dashboard</h1>
      
      {/* Mastery Overview */}
      <section className="bg-surface neo-border p-8 flex flex-col items-center text-center relative overflow-hidden">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8">Mastery Overview</h2>
        
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="square"
              className="text-accent-green transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white tracking-tighter">{stats.percentage}%</span>
            <span className="text-[10px] font-bold uppercase text-accent-green tracking-widest">Mastered</span>
          </div>
        </div>
        
        <p className="text-sm text-white/60 max-w-[200px] leading-relaxed">
          You've covered <span className="text-white font-bold">{stats.totalPoints}</span> specification points so far.
        </p>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Quick Start</h2>
        <button className="w-full neo-button bg-accent-blue text-black neo-border border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3 py-6">
          <Zap size={24} fill="currentColor" />
          <span className="text-xl font-black uppercase italic">Start Daily Session</span>
        </button>
      </section>

      {/* Focus Timer */}
      <FocusTimer />
    </div>
  );
};

export default Dashboard;
