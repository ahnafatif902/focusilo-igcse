import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Vault } from './pages/Vault';
import { Inject } from './pages/Inject';
import { Quiz } from './pages/Quiz';
import { Login } from './pages/Auth';
import { InjectionModule as Upload } from './pages/Upload';

import { FocusTimer } from './pages/FocusTimer';
import { Progress } from './pages/Progress';
import { FAQ } from './pages/FAQ';
import { Sidebar } from './components/Sidebar';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-bg-base relative overflow-hidden flex flex-col font-sans">
        <Login onLogin={(name) => {
          setUserName(name);
          setIsAuthenticated(true);
          navigate('/');
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg-base flex flex-col md:flex-row font-sans overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative h-[calc(100dvh-72px)] md:h-screen hide-scrollbar pb-6 md:pb-0">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/inject" element={<Inject />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/timer" element={<FocusTimer />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/upload" element={<Upload onParsed={() => navigate('/vault')} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
