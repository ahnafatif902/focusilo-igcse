import React from 'react';
import { Flame, Clock, Layers, Target, Quote } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Welcome back
        </h1>
        <p className="text-text-secondary font-medium">
          Your study overview for this week.
        </p>
      </header>

      {/* Motivational Quote */}
      <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 text-accent/5 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
          <Quote size={120} />
        </div>
        <div className="relative z-10 flex gap-4 items-start max-w-3xl">
          <Quote className="text-accent w-8 h-8 shrink-0 opacity-50" />
          <div className="space-y-3">
            <p className="text-base md:text-lg font-medium text-text-primary leading-relaxed italic">
              "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing."
            </p>
            <p className="text-sm text-text-secondary font-medium">— Pelé</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="glass-panel p-6 space-y-4 hover:border-accent/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Flame className="text-orange-500 w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium">Study Streak</p>
            <p className="text-2xl md:text-3xl font-bold text-text-primary mt-1">12 <span className="text-sm text-text-secondary font-medium">days</span></p>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4 hover:border-accent/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Clock className="text-blue-500 w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium">Hours Studied</p>
            <p className="text-2xl md:text-3xl font-bold text-text-primary mt-1">14.5 <span className="text-sm text-text-secondary font-medium">hrs</span></p>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4 hover:border-accent/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <Layers className="text-accent w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium">Cards Mastered</p>
            <p className="text-2xl md:text-3xl font-bold text-text-primary mt-1">342</p>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4 hover:border-accent/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Target className="text-green-500 w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium">Quiz Accuracy</p>
            <p className="text-2xl md:text-3xl font-bold text-text-primary mt-1">87<span className="text-sm text-text-secondary font-medium">%</span></p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel p-6 md:p-8">
        <h2 className="text-lg font-bold text-text-primary mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { title: 'Biology Quiz - Cell Structure', score: '92%', time: '2h ago', icon: Target },
            { title: 'Maths A - Algebra Flashcards', score: '45 Cards', time: '5h ago', icon: Layers },
            { title: 'Physics - Forces Summary', score: 'Generated', time: '1d ago', icon: Flame },
          ].map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bg-surface-hover border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-base flex items-center justify-center border border-border shrink-0">
                    <Icon className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base text-text-primary">{activity.title}</p>
                    <p className="text-xs md:text-sm text-text-secondary">{activity.score}</p>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-medium text-text-secondary shrink-0">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
