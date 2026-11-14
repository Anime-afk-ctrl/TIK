import React from 'react';
import { AlertTriangle, PhoneCall, Trash2, Shield, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenPanic: () => void;
  onResetChat: () => void;
  onOpenLbhDirectory: () => void;
  hasMessages: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPanic,
  onResetChat,
  onOpenLbhDirectory,
  hasMessages,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Disclaimer Resmi di Atas */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 text-center">
        <p className="text-xs font-medium text-amber-900 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> Informasi umum, bukan nasihat hukum resmi. Konsultasikan ke advokat atau LBH untuk perkara peradilan.
          </span>
        </p>
      </div>

      {/* Bar Navigasi Utama */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            HW
          </div>
          <div>
            <div className="font-bold text-base text-slate-900 tracking-tight leading-none">
              HakWarga
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              Panduan Hukum Darurat RI
            </div>
          </div>
        </div>

        {/* Quick Emergency Call Buttons (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="tel:110"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            title="Telepon Darurat Kepolisian"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>Polisi 110</span>
          </a>
          <a
            href="tel:129"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold transition-colors"
            title="Layanan Sahabat Perempuan dan Anak (SAPA 129)"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span>SAPA 129</span>
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* LBH Directory Button */}
          <button
            onClick={onOpenLbhDirectory}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
            title="Daftar Kontak LBH se-Indonesia"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Daftar LBH</span>
          </button>

          {/* Reset / Bersihkan Percakapan */}
          {hasMessages && (
            <button
              onClick={onResetChat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors"
              title="Bersihkan percakapan tanpa jejak tersimpan"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Hapus Jejak</span>
            </button>
          )}

          {/* Tombol Mode Panik Besar */}
          <button
            onClick={onOpenPanic}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
            aria-label="Buka Mode Panik Darurat"
          >
            <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
            <span>MODE PANIK</span>
          </button>
        </div>
      </div>
    </header>
  );
};
