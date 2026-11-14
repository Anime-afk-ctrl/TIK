import React from 'react';
import { PhoneCall, AlertTriangle, Trash2, BookOpen } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/legalData';

interface EmergencyDockProps {
  onOpenPanic: () => void;
  onResetChat: () => void;
  onOpenLbhDirectory: () => void;
  hasMessages: boolean;
}

export const EmergencyDock: React.FC<EmergencyDockProps> = ({
  onOpenPanic,
  onResetChat,
  onOpenLbhDirectory,
  hasMessages,
}) => {
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Quick Phone 110 */}
        <a
          href={EMERGENCY_CONTACTS.polisi.telUri}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm active:scale-98 transition-all touch-target shadow-xs"
          title="Telepon Darurat Polisi 110"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span className="truncate">Polisi 110</span>
        </a>

        {/* Quick Phone SAPA 129 */}
        <a
          href={EMERGENCY_CONTACTS.sapa129.telUri}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm active:scale-98 transition-all touch-target shadow-xs"
          title="Layanan Perempuan & Anak SAPA 129"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span className="truncate">SAPA 129</span>
        </a>

        {/* Big Mode Panik Button */}
        <button
          onClick={onOpenPanic}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm active:scale-98 transition-all touch-target shadow-md shadow-red-600/20 cursor-pointer"
          title="Buka Mode Panik Darurat (3 Langkah)"
        >
          <AlertTriangle className="w-4 h-4 text-white shrink-0 animate-pulse" />
          <span className="truncate">PANIK</span>
        </button>

        {/* Extra Action (Reset or LBH) */}
        {hasMessages ? (
          <button
            onClick={onResetChat}
            className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 active:scale-98 transition-colors touch-target shrink-0 cursor-pointer"
            title="Bersihkan percakapan tanpa jejak tersimpan"
            aria-label="Bersihkan Percakapan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onOpenLbhDirectory}
            className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-98 transition-colors touch-target shrink-0 cursor-pointer"
            title="Daftar Lembaga Bantuan Hukum"
            aria-label="Daftar Lembaga Bantuan Hukum"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
