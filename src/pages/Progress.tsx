import React from 'react';
import { TrendingUp, Target, Clock, Zap, BookOpen } from 'lucide-react';

export const Progress: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <TrendingUp className="text-accent w-8 h-8" />
          Progress
        </h1>
        <p className="text-text-secondary font-medium">
          Track your mastery and study habits.
        </p>
      </header>

      {/* Weekly Activity */}
      <div className="glass-panel p-6 md:p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Weekly Activity</h2>
            <p className="text-sm text-text-secondary mt-1">Hours studied per day</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">14.5h</p>
            <p className="text-sm text-text-secondary">This week</p>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-48 md:h-64 gap-2 md:gap-4 mt-6">
          {[
            { day: 'M', value: 40 },
            { day: 'T', value: 65 },
            { day: 'W', value: 45 },
            { day: 'T', value: 80 },
            { day: 'F', value: 55 },
            { day: 'S', value: 90 },
            { day: 'S', value: 30 },
          ].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
              <div className="w-full bg-bg-surface-hover rounded-t-xl relative overflow-hidden h-full flex items-end">
                <div 
                  className="w-full bg-accent/80 group-hover:bg-accent transition-all duration-500 rounded-t-xl"
                  style={{ height: `${d.value}%` }}
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-text-secondary">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Mastery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 md:p-8">
          <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Subject Mastery
          </h2>
          <div className="space-y-6">
            {[
              { name: 'Biology (4BI1)', progress: 78, color: 'bg-green-500' },
              { name: 'Maths A (4MA1)', progress: 62, color: 'bg-blue-500' },
              { name: 'Physics (4PH1)', progress: 85, color: 'bg-orange-500' },
            ].map((sub, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-text-primary">{sub.name}</span>
                  <span className="text-text-secondary font-bold">{sub.progress}%</span>
                </div>
                <div className="h-2 bg-bg-surface-hover rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${sub.color} transition-all duration-1000`}
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
              <Target className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-text-primary">87%</p>
            <p className="text-sm text-text-secondary font-medium">Avg. Quiz Score</p>
          </div>
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-text-primary">12</p>
            <p className="text-sm text-text-secondary font-medium">Day Streak</p>
          </div>
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-accent/30 transition-colors col-span-2">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-text-primary">14.5h</p>
            <p className="text-sm text-text-secondary font-medium">Total Focus Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};
