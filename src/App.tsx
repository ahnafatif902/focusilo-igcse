/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Timer, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import Study from './components/Study';
import Profile from './components/Profile';
import SubjectDetail from './components/SubjectDetail';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Screen = 'Dashboard' | 'Subjects' | 'Study' | 'Profile';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('Dashboard');
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const renderScreen = () => {
    if (activeScreen === 'Subjects' && selectedSubject) {
      return (
        <SubjectDetail 
          subject={selectedSubject} 
          onBack={() => setSelectedSubject(null)} 
        />
      );
    }

    switch (activeScreen) {
      case 'Dashboard': return <Dashboard />;
      case 'Subjects': return (
        <Subjects onSelectSubject={(subject) => setSelectedSubject(subject)} />
      );
      case 'Study': return <Study />;
      case 'Profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  const handleNavClick = (screen: Screen) => {
    setActiveScreen(screen);
    if (screen !== 'Subjects') {
      setSelectedSubject(null);
    }
  };

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dash' },
    { id: 'Subjects', icon: BookOpen, label: 'Books' },
    { id: 'Study', icon: Timer, label: 'Study' },
    { id: 'Profile', icon: User, label: 'Me' },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="p-6 border-b-4 border-white sticky top-0 bg-black z-10">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black italic tracking-tighter text-accent-green">
            FOCUSILO
          </span>
          <div className="w-8 h-8 bg-white neo-border flex items-center justify-center">
            <div className="w-4 h-1 bg-black" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white px-4 py-2 z-20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 transition-all",
                  isActive ? "text-accent-blue translate-y-[-4px]" : "text-white/60"
                )}
              >
                <div className={cn(
                  "p-2 mb-1 transition-all",
                  isActive && "bg-accent-blue text-black neo-border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                )}>
                  <Icon size={24} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  isActive ? "text-accent-blue" : "text-white/60"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
