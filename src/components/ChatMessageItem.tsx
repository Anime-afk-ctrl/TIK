import React, { useState } from 'react';
import {
  ShieldAlert,
  User,
  PhoneCall,
  Copy,
  Check,
  Maximize2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { ContactInfo } from '../data/legalData';

export interface ChatItem {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  isAdvisorResponse?: boolean;
  advisorData?: {
    scenarioTitle: string;
    threeSteps: [string, string, string];
    scriptSiapTunjuk: string;
    legalBasis: string;
    contacts: ContactInfo[];
    isFallback: boolean;
  };
  timestamp?: string;
}

interface ChatMessageItemProps {
  item: ChatItem;
  onOpenFullScreenScript: (script: string, basis: string) => void;
  onOpenLbhDirectory: () => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  item,
  onOpenFullScreenScript,
  onOpenLbhDirectory,
}) => {
  const [copied, setCopied] = useState(false);

  const isBot = item.sender === 'bot';

  const handleCopyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isBot) {
    return (
      <div className="flex items-end justify-end gap-2 mb-3">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-xs bg-slate-900 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow-xs">
          {item.text}
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Standard Bot Message (Questions / Prompts)
  if (!item.isAdvisorResponse) {
    return (
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
          HW
        </div>
        <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl rounded-tl-xs bg-white border border-slate-200 px-4 py-3 text-xs sm:text-sm text-slate-800 shadow-xs">
          <p className="leading-relaxed whitespace-pre-line font-medium">{item.text}</p>
        </div>
      </div>
    );
  }

  // Structured Bot Advisor Response (3 Langkah Singkat + 1 Skrip Siap Tunjuk)
  const data = item.advisorData!;

  return (
    <div className="flex items-start gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
        <ShieldAlert className="w-4 h-4" />
      </div>

      <div className="w-full max-w-[95%] sm:max-w-[88%] rounded-2xl rounded-tl-xs bg-white border border-slate-200 shadow-sm overflow-hidden text-slate-800 space-y-0">
        {/* Card Header with Title */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Analisis Hak &amp; Panduan Darurat
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
              {data.scenarioTitle}
            </h3>
          </div>
          {data.isFallback && (
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
              Perlu Pendampingan LBH
            </div>
          )}
        </div>

        {/* Section 1: 3 Langkah Singkat (MANDATORY REQUIREMENT) */}
        <div className="p-3.5 sm:p-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <span>3 Langkah Singkat yang Harus Dilakukan:</span>
          </div>

          <div className="space-y-2">
            {data.threeSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="font-medium text-slate-800 leading-relaxed">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 1 Kalimat Skrip Siap Tunjuk (MANDATORY REQUIREMENT) */}
        <div className="p-3.5 sm:p-4 bg-slate-950 text-white space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <span>Skrip Siap Tunjuk untuk Petugas:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyScript(data.scriptSiapTunjuk)}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin' : 'Salin Skrip'}</span>
              </button>
              <button
                onClick={() => onOpenFullScreenScript(data.scriptSiapTunjuk, data.legalBasis)}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold cursor-pointer"
                title="Tampilkan layar penuh untuk dibaca/ditunjukkan ke aparat"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden xs:inline">Layar Penuh</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-xs sm:text-sm font-semibold italic text-amber-200 leading-relaxed select-all">
              "{data.scriptSiapTunjuk}"
            </p>
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center gap-1 pt-0.5">
            <span>Dasar hukum:</span>
            <strong className="text-zinc-200 font-semibold">{data.legalBasis}</strong>
          </div>
        </div>

        {/* Section 3: Kontak Cepat & Bantuan Hukum Resmi */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Kontak Cepat &amp; Lembaga Bantuan Hukum Terverifikasi:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.contacts.map((c) => (
              <a
                key={c.name}
                href={c.telUri}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="truncate pr-2">
                  <div className="font-bold text-xs text-slate-900 truncate">{c.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{c.description}</div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold shrink-0">
                  <PhoneCall className="w-3 h-3" />
                  <span>{c.number}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Butuh advokat di kota Anda?</span>
            </span>
            <button
              onClick={onOpenLbhDirectory}
              className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              <span>Buka Direktori 18 Wilayah LBH</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
