import React from 'react';
import { Camera, ChevronRight } from 'lucide-react';

export const AITutor = () => {
  const faqs = [
    'The average of first 50 natural numbers?',
    'The value of Pi?',
    "Value of Napier's constant 'e'?"
  ];

  return (
    <div className="p-6 space-y-8 pb-32 animate-in fade-in">
      <div className="space-y-4">
        <h1 className="text-base font-medium text-gray-800 leading-relaxed">
          Type your question below or click a picture and get answered in less than 30 minutes
        </h1>
      </div>
      
      <div className="relative">
        <input 
          type="text" 
          placeholder="|" 
          className="w-full bg-white text-gray-900 p-4 pr-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          <Camera size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Subjects</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-4 text-white font-medium shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            Mathematics
          </button>
          <button className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white font-medium shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-transform">
            Chemistry
          </button>
          <button className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-4 text-white font-medium shadow-md shadow-pink-500/20 hover:scale-[1.02] transition-transform">
            Physics
          </button>
          <button className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-4 text-white font-medium shadow-md shadow-gray-400/20 hover:scale-[1.02] transition-transform">
            Reasoning
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Frequently asked questions:</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <button 
              key={i} 
              className="w-full p-4 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex justify-between items-center text-left hover:border-blue-200 transition-colors group"
            >
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{faq}</span>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
