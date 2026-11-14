import React, { useState } from 'react';
import { Send, Shield, AlertOctagon, HelpCircle, CornerDownLeft } from 'lucide-react';

interface IntakeCardProps {
  step: number; // 0, 1, 2, 3, 4
  category: 'pelanggaran_ham' | 'korban_kejahatan' | null;
  onSelectCategory: (cat: 'pelanggaran_ham' | 'korban_kejahatan') => void;
  onSubmitAnswer: (answer: string) => void;
  onSelectChipAnswer: (answer: string) => void;
}

export const IntakeCard: React.FC<IntakeCardProps> = ({
  step,
  category,
  onSelectCategory,
  onSubmitAnswer,
  onSelectChipAnswer,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSubmitAnswer(inputText.trim());
    setInputText('');
  };

  // STEP 0: Initial Choice: "Pelanggaran HAM oleh aparat" atau "Korban kejahatan"
  if (step === 0) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5 my-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Langkah Awal: Pilih Situasi yang Anda Alami
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSelectCategory('pelanggaran_ham')}
            className="group p-4 rounded-xl border-2 border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-50 transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs mb-2 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-sm sm:text-base text-slate-900">
                Pelanggaran HAM oleh aparat
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Penangkapan tanpa surat perintah resmi, penggeledahan kos/rumah sewenang-wenang, penyitaan HP paksa, intimidasi, atau kekerasan aparat.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Pilih Kategori Ini &rarr;</span>
            </div>
          </button>

          <button
            onClick={() => onSelectCategory('korban_kejahatan')}
            className="group p-4 rounded-xl border-2 border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-50 transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-xs mb-2 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-sm sm:text-base text-slate-900">
                Korban kejahatan
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pelecehan / kekerasan seksual (UU TPKS), penganiayaan fisik, KDRT, pencurian / begal, penipuan online, atau pemerasan.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Pilih Kategori Ini &rarr;</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Common quick chips depending on current question step
  let questionTitle = '';
  let chips: string[] = [];
  let placeholder = '';

  if (step === 1) {
    questionTitle = 'Apa yang terjadi? (Pilih salah satu atau ketik sendiri)';
    placeholder = 'Ceritakan singkat apa yang terjadi...';
    if (category === 'pelanggaran_ham') {
      chips = [
        'Ditangkap tanpa surat perintah resmi',
        'Penggeledahan rumah / kos tanpa izin pengadilan',
        'HP disita / dipaksa membuka sandi ponsel',
        'Kekerasan fisik atau intimidasi aparat',
        'Dilarang merekam video petugas di tempat umum',
        'Dipaksa menandatangani BAP tanpa pengacara',
      ];
    } else {
      chips = [
        'Kekerasan fisik / penganiayaan / pengeroyokan',
        'Pelecehan / kekerasan seksual (UU TPKS)',
        'KDRT (Kekerasan Dalam Rumah Tangga)',
        'Pencurian / perampokan / pembegalan',
        'Penipuan online / rekening / pemerasan',
        'Laporan saya ditolak di kantor polisi / dipungut biaya',
      ];
    }
  } else if (step === 2) {
    questionTitle = 'Kapan kejadian tersebut terjadi?';
    placeholder = 'Tuliskan waktu kejadian (misal: tadi siang jam 14.00)...';
    chips = [
      'Sedang berlangsung sekarang (Mendesak)',
      'Baru saja (kurang dari 2 jam lalu)',
      'Hari ini',
      'Kemarin / beberapa hari yang lalu',
      'Sudah lewat 1 minggu',
    ];
  } else if (step === 3) {
    questionTitle = 'Di mana lokasi kejadiannya?';
    placeholder = 'Tuliskan lokasi kejadian (misal: di kosan, di jalan raya)...';
    chips = [
      'Di jalan raya / ruang publik',
      'Di kantor polisi / pos aparat',
      'Di rumah tinggal / kamar kos',
      'Di tempat kerja / sekolah / kampus',
      'Di kendaraan umum / transportasi',
    ];
  } else if (step === 4) {
    questionTitle = 'Apakah ada bukti atau saksi di lokasi?';
    placeholder = 'Tuliskan bukti atau saksi yang Anda miliki...';
    chips = [
      'Ada rekaman video / rekaman suara',
      'Ada saksi mata warga di sekitar',
      'Ada luka fisik / lebam (belum visum)',
      'Ada tangkapan layar chat / nomor rekening',
      'Tidak ada bukti saat ini',
    ];
  }

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 my-3 animate-in fade-in duration-150">
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span className="uppercase tracking-wider">
          Pertanyaan {step} dari 4
        </span>
        <span>
          {category === 'pelanggaran_ham' ? 'Pelanggaran HAM' : 'Korban Kejahatan'}
        </span>
      </div>

      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
        {questionTitle}
      </h3>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSelectChipAnswer(chip)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-medium transition-colors text-left cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Free-form Input Form */}
      <form onSubmit={handleSubmit} className="pt-2">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-3.5 pr-12 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Kirim Jawaban"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3 text-slate-400" />
          <span>Klik pilihan cepat di atas atau ketik jawaban Anda lalu tekan Enter.</span>
        </p>
      </form>
    </div>
  );
};
