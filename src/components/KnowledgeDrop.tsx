import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ScanLine,
} from "lucide-react";

export const KnowledgeDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [verified, setVerified] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateScan = () => {
    setScanProgress(0);
    setScanComplete(false);
    setVerified(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setScanComplete(true), 500);
      }
      setScanProgress(progress);
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      simulateScan();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateScan();
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const isImage = file?.type.startsWith("image/");
  const isPdf = file?.type === "application/pdf";

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-accent-blue">
          Knowledge Drop
        </h1>
        <p className="text-white/60 font-mono text-sm">
          Upload Notes for OCR & Peer Review
        </p>
      </div>

      {!file && (
        <div
          className={`relative border-4 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all ${
            dragActive
              ? "border-accent-green bg-accent-green/10"
              : "border-white/20 bg-surface"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="hidden"
          />
          <UploadCloud
            size={48}
            className={`mb-4 ${dragActive ? "text-accent-green" : "text-white/40"}`}
          />
          <h3 className="text-xl font-black uppercase tracking-widest mb-2">
            Drop Files Here
          </h3>
          <p className="text-white/40 font-mono text-xs mb-6">
            Supports PDF, JPG, PNG
          </p>
          <button
            onClick={onButtonClick}
            className="neo-button bg-white text-black neo-border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Browse Files
          </button>
        </div>
      )}

      {file && !scanComplete && (
        <div className="bg-surface neo-border border-accent-blue shadow-[4px_4px_0px_0px_rgba(0,209,255,1)] p-8 text-center space-y-6">
          <ScanLine
            size={48}
            className="mx-auto text-accent-blue animate-pulse"
          />
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest text-accent-blue mb-2">
              Scanning Document...
            </h3>
            <p className="text-white/60 font-mono text-xs">
              Extracting text and identifying specification points
            </p>
          </div>

          <div className="w-full h-4 bg-black neo-border border-white/20 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-accent-blue transition-all duration-300 ease-out"
              style={{ width: `${scanProgress}%` }}
            />
            {/* Scanner line effect */}
            <div
              className="absolute top-0 bottom-0 w-2 bg-white/50 blur-[2px] transition-all duration-300"
              style={{ left: `calc(${scanProgress}% - 4px)` }}
            />
          </div>
          <div className="font-mono text-accent-blue font-bold">
            {Math.round(scanProgress)}%
          </div>
        </div>
      )}

      {file && scanComplete && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-surface neo-border p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-black neo-border border-white/20 flex items-center justify-center shrink-0">
                {isImage ? (
                  <ImageIcon className="text-accent-green" />
                ) : (
                  <FileText className="text-accent-blue" />
                )}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold truncate">{file.name}</h3>
                <p className="text-xs font-mono text-white/40">
                  {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                  {isImage ? "Image" : "PDF"}
                </p>
              </div>
            </div>

            <div className="bg-black p-4 neo-border border-white/20 mb-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                Extracted Content Preview
              </h4>
              <p className="font-mono text-sm text-white/80 leading-relaxed line-clamp-4">
                ...mitochondria are the site of aerobic respiration, releasing
                energy for the cell. The cell membrane controls the movement of
                substances in and out of the cell. Ribosomes are responsible for
                protein synthesis...
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setFile(null)}
                className="flex-1 p-3 bg-black text-white neo-border border-white/20 text-sm font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={() => setVerified(true)}
                disabled={verified}
                className={`flex-1 p-3 neo-border text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  verified
                    ? "bg-accent-green text-black border-black shadow-none"
                    : "bg-accent-blue text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {verified ? (
                  <>
                    <CheckCircle size={18} /> Verified
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} /> Verify Notes
                  </>
                )}
              </button>
            </div>
          </div>

          {verified && (
            <div className="bg-accent-green/10 border-2 border-accent-green p-4 flex items-start gap-3 text-accent-green animate-in fade-in">
              <CheckCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-1">
                  Added to Knowledge Base
                </h4>
                <p className="text-xs opacity-80">
                  Your notes have been verified and mapped to Edexcel Biology
                  1.2. They are now available in your study deck.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
