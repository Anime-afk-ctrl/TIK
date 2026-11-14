import React, { useState } from 'react';
import { Send, CornerDownLeft, Sparkles } from 'lucide-react';

interface FollowUpChatProps {
  onSendMessage: (msg: string) => void;
  category: 'pelanggaran_ham' | 'korban_kejahatan';
  isLoading?: boolean;
}

export const FollowUpChat: React.FC<FollowUpChatProps> = ({
  onSendMessage,
  category,
  isLoading = false,
}) => {
  const [text, setText] = useState('');

  const commonQuestions =
    category === 'pelanggaran_ham'
      ? [
          'Apakah saya boleh merekam video polisi yang bertugas?',
          'Apakah saya berhak menolak membuka password HP saya?',
          'Berapa lama batas waktu maksimal polisi menahan saya?',
          'Bagaimana jika polisi memaksa saya mengaku di BAP?',
        ]
      : [
          'Apakah membuat Laporan Polisi (LP) di SPKT dipungut biaya?',
          'Bagaimana prosedur melakukan Visum et Repertum?',
          'Apa yang harus saya lakukan jika laporan polisi saya ditolak?',
          'Saya diancam pelaku untuk tidak melapor, ke mana saya minta perlindungan?',
        ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 my-3">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Pertanyaan Lanjutan Seputar Hak Hukum Anda:</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {commonQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onSendMessage(q)}
            disabled={isLoading}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors text-left disabled:opacity-50 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="pt-1">
        <div className="relative flex items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="Tanyakan hal lain (misal: syarat saksi, hak didampingi pengacara)..."
            className="w-full pl-3.5 pr-12 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="absolute right-1.5 p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Kirim Pertanyaan Lanjutan"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3 text-slate-400" />
          <span>Chatbot menjawab ketat dari data hukum sah, tidak mengarang pasal, dan mengarahkan ke LBH jika tidak yakin.</span>
        </p>
      </form>
    </div>
  );
};
