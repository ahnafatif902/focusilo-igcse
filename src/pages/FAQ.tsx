import React, { useState } from 'react';
import { Upload, FileText, Youtube, Link as LinkIcon, File, Zap, Layers, AlignLeft, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'options'>('idle');
  const [activeTab, setActiveTab] = useState<'file' | 'youtube' | 'link'>('file');

  const handleUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('options');
    }, 1500);
  };

  if (uploadState === 'options') {
    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
            <Zap className="text-accent w-8 h-8" />
            Conversion Options
          </h1>
          <p className="text-text-secondary font-medium">
            Your content has been parsed. Choose how you want to study it.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'mcq', title: 'MCQ Generator', icon: Target, desc: 'Generate multiple choice questions to test your knowledge.' },
            { id: 'flashcard', title: 'Flashcard Generator', icon: Layers, desc: 'Create spaced-repetition flashcards for active recall.' },
            { id: 'summary', title: 'Summary Generator', icon: AlignLeft, desc: 'Condense the material into key bullet points.' },
            { id: 'exam', title: 'Exam-Style Questions', icon: FileText, desc: 'Generate long-form questions based on exam mark schemes.' },
          ].map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.id} className="glass-panel p-6 flex flex-col group hover:border-accent/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <button className="text-xs font-medium bg-bg-surface-hover px-3 py-1.5 rounded-full border border-border hover:text-text-primary transition-colors">
                    Preview
                  </button>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{opt.title}</h3>
                <p className="text-sm text-text-secondary mb-6 flex-1">{opt.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-sm font-medium text-accent hover:text-accent-hover flex items-center gap-1 transition-colors">
                    Save to Vault <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="text-xs text-text-secondary hover:text-text-primary underline underline-offset-2">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <Upload className="text-accent w-8 h-8" />
          Smart FAQ & Upload
        </h1>
        <p className="text-text-secondary font-medium">
          Upload your notes, PDFs, or links to instantly generate study materials.
        </p>
      </header>

      <div className="glass-panel overflow-hidden">
        <div className="flex border-b border-border">
          <button 
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'file' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
          >
            <File className="w-4 h-4" /> PDF / Text
          </button>
          <button 
            onClick={() => setActiveTab('youtube')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'youtube' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
          >
            <Youtube className="w-4 h-4" /> YouTube
          </button>
          <button 
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'link' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
          >
            <LinkIcon className="w-4 h-4" /> Website Link
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'file' && (
            <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-1">Click to upload or drag and drop</h3>
              <p className="text-sm text-text-secondary">PDF, TXT, DOCX (Max 10MB)</p>
              <button onClick={handleUpload} className="mt-6 btn-primary">
                {uploadState === 'uploading' ? 'Analyzing...' : 'Upload File'}
              </button>
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-text-primary">YouTube Video URL</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://youtube.com/watch?v=..." 
                  className="flex-1 bg-bg-base border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
                <button onClick={handleUpload} className="btn-primary whitespace-nowrap">
                  {uploadState === 'uploading' ? 'Analyzing...' : 'Process Video'}
                </button>
              </div>
              <p className="text-xs text-text-secondary">We will extract the transcript and generate study materials.</p>
            </div>
          )}

          {activeTab === 'link' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-text-primary">Website URL</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://en.wikipedia.org/wiki/..." 
                  className="flex-1 bg-bg-base border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
                <button onClick={handleUpload} className="btn-primary whitespace-nowrap">
                  {uploadState === 'uploading' ? 'Analyzing...' : 'Process Link'}
                </button>
              </div>
              <p className="text-xs text-text-secondary">We will scrape the main content and convert it into study formats.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
