import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Brain, Target, TrendingUp, Clock } from 'lucide-react';

const SUGGESTIONS = [
  { id: 'recommend', icon: Brain, label: 'Recommend subject' },
  { id: 'analyze', icon: TrendingUp, label: 'Analyze accuracy' },
  { id: 'weak', icon: Target, label: 'Suggest weak topics' },
  { id: 'plan', icon: Clock, label: 'Study plan' },
];

export const Inject: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello. I am your Focuslio AI Assistant. How can I help you optimize your study session today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    
    setTimeout(() => {
      let aiResponse = 'I am analyzing your request. As an AI assistant, I can generate flashcards, create practice quizzes, or explain complex topics from your syllabus.';
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('recommend')) {
        aiResponse = 'Based on your recent activity, I recommend focusing on **Biology (4BI1)** today. You haven\'t reviewed the "Cell Structure" topic in 4 days, and it\'s a high-weight area for your upcoming mock exam.';
      } else if (lowerText.includes('analyze') || lowerText.includes('accuracy')) {
        aiResponse = 'Your overall quiz accuracy is **87%**. You are exceptionally strong in **Physics (92%)**, but your **Maths A (4MA1)** accuracy has dipped to **68%** this week, specifically in Algebra questions.';
      } else if (lowerText.includes('weak')) {
        aiResponse = 'I\'ve identified three weak topics based on your recent flashcard performance:\n\n1. **Maths A:** Quadratic Equations (45% retention)\n2. **Chemistry:** Organic Chemistry (52% retention)\n3. **Biology:** Genetics (60% retention)\n\nWould you like me to generate a custom quiz for these?';
      } else if (lowerText.includes('plan')) {
        aiResponse = 'Here is an optimized 2-hour study plan for today:\n\n• **0:00 - 0:25:** Maths A (Quadratic Equations) - Active Recall\n• **0:25 - 0:30:** Break\n• **0:30 - 0:55:** Biology (Genetics) - Flashcards\n• **0:55 - 1:00:** Break\n• **1:00 - 1:45:** Chemistry (Organic) - Exam Style Questions\n• **1:45 - 2:00:** Review & Summary';
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <Sparkles className="text-accent w-8 h-8" />
          Inject AI
        </h1>
        <p className="text-text-secondary font-medium">
          Your personal Edexcel IGCSE tutor.
        </p>
      </header>

      {/* Chat Area */}
      <div className="flex-1 glass-panel flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-bg-surface-hover border border-border' : 'bg-accent/10 border border-accent/20 shadow-[0_0_15px_var(--color-accent-glow)]'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-text-secondary" /> : <Bot className="w-5 h-5 text-accent" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                msg.role === 'user' ? 'bg-bg-surface-hover border border-border text-text-primary rounded-tr-none' : 'bg-bg-base border border-border text-text-primary rounded-tl-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-bg-surface">
          <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-1">
            {SUGGESTIONS.map((sug) => {
              const Icon = sug.icon;
              return (
                <button 
                  key={sug.id} 
                  onClick={() => handleSend(sug.label)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface-hover border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {sug.label}
                </button>
              );
            })}
          </div>
          
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask Focuslio AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              className="w-full bg-bg-base border border-border rounded-xl py-4 pl-5 pr-14 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors shadow-inner"
            />
            <button 
              onClick={() => handleSend(input)}
              className="absolute right-2 p-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-[0_0_15px_var(--color-accent-glow)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
