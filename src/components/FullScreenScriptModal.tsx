import React, { useState } from 'react';
import { X, Copy, Check, Shield } from 'lucide-react';

interface FullScreenScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: string;
  legalBasis: string;
}

export const FullScreenScriptModal: React.FC<FullScreenScriptModalProps> = ({
  isOpen,
  onClose,
  script,
  legalBasis,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-script-title"
      className="fixed inset-0 z-50 bg-black text-white p-4 sm:p-6 flex flex-col justify-between animate-in fade-in duration-150"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span id="fullscreen-script-title" className="text-xs uppercase tracking-widest font-bold text-zinc-400">
            Mode Tunjuk Petugas (Layar Penuh)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Tutup Layar Penuh"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Script Text (Huge & Legible) */}
      <div className="my-auto py-6 max-w-2xl mx-auto w-full">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-tight text-amber-300 select-all text-center sm:text-left">
          "{script}"
        </p>

        {legalBasis && (
          <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-center sm:justify-start gap-2 text-sm text-zinc-400 font-medium">
            <span className="text-zinc-500">Dasar Hukum Resmi:</span>
            <span className="text-white font-semibold">{legalBasis}</span>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center border-t border-zinc-800 pt-3">
        <p className="text-xs text-zinc-400">
          Arahkan layar ponsel ini ke hadapan petugas atau baca dengan tenang dan lugas.
        </p>
        <button
          onClick={onClose}
          className="mt-3 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Kembali ke Aplikasi
        </button>
      </div>
    </div>
  );
};
