import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, Copy, Check, X, ShieldAlert, LogOut, ArrowRight } from 'lucide-react';
import { PANIC_MODE_STEPS, PANIC_SCRIPT, EMERGENCY_CONTACTS } from '../data/legalData';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickExit: () => void;
  onOpenFullScreenScript: (script: string, basis: string) => void;
}

export const PanicModal: React.FC<PanicModalProps> = ({
  isOpen,
  onClose,
  onQuickExit,
  onOpenFullScreenScript,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(PANIC_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="panic-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-red-600 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Panic Header */}
        <div className="bg-red-600 px-4 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-white shrink-0" />
            <div>
              <h2 id="panic-title" className="font-extrabold text-lg tracking-tight uppercase leading-none">
                Mode Panik Darurat
              </h2>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Maksimal 3 Langkah Darurat untuk Perlindungan Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-red-700/80 hover:bg-red-800 text-white transition-colors"
            aria-label="Tutup Mode Panik"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800">
          {/* Quick Call Buttons Grid */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Panggilan Cepat Darurat (Langsung Tersambung)
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={EMERGENCY_CONTACTS.polisi.telUri}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm active:scale-98 transition-all"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Polisi 110</span>
              </a>
              <a
                href={EMERGENCY_CONTACTS.sapa129.telUri}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm active:scale-98 transition-all"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>SAPA 129</span>
              </a>
            </div>
          </div>

          {/* 3 Langkah Darurat (Numbered, high contrast) */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              3 Langkah Wajib di Tempat Kejadian:
            </div>

            {PANIC_MODE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="w-7 h-7 rounded-full bg-red-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {step}
                </div>
              </div>
            ))}
          </div>

          {/* Skrip Siap Tunjuk untuk Petugas */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Skrip Siap Tunjuk / Katakan ke Petugas:
              </span>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="text-sm font-medium text-slate-100 italic leading-relaxed">
              "{PANIC_SCRIPT}"
            </p>
            <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span>Dasar: Pasal 18 &amp; 54 KUHAP</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenFullScreenScript(PANIC_SCRIPT, 'Pasal 18 & 54 KUHAP');
                }}
                className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Tampilkan Layar Penuh</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={onQuickExit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            title="Hapus riwayat dan segera keluar ke situs lain"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Keluar Cepat &amp; Bersihkan</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Tutup Mode Panik
          </button>
        </div>
      </div>
    </div>
  );
};
