/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PanicModal } from './components/PanicModal';
import { FullScreenScriptModal } from './components/FullScreenScriptModal';
import { LBHDirectoryModal } from './components/LBHDirectoryModal';
import { EmergencyDock } from './components/EmergencyDock';
import { ChatMessageItem, ChatItem } from './components/ChatMessageItem';
import { IntakeCard } from './components/IntakeCard';
import { FollowUpChat } from './components/FollowUpChat';
import { generateAdvisorResponse, answerFollowUpQuestion, IntakeAnswers } from './utils/legalAdvisor';
import { ShieldCheck, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function App() {
  // Modal states
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [isLbhOpen, setIsLbhOpen] = useState(false);
  const [fullScreenScript, setFullScreenScript] = useState<{ script: string; basis: string } | null>(null);

  // In-memory chat & intake states (NO PERSISTENCE / JANGAN SIMPAN PERCAKAPAN)
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [intakeStep, setIntakeStep] = useState<number>(0); // 0: select category, 1: apa yang terjadi, 2: kapan, 3: di mana, 4: bukti, 5: completed
  const [category, setCategory] = useState<'pelanggaran_ham' | 'korban_kejahatan' | null>(null);
  const [answers, setAnswers] = useState<Partial<IntakeAnswers>>({});
  const [isLoading, setIsLoading] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from bot on load
  useEffect(() => {
    if (messages.length === 0 && intakeStep === 0) {
      setMessages([
        {
          id: 'welcome_1',
          sender: 'bot',
          text: 'Halo, saya asisten darurat hak hukum warga Indonesia (HakWarga).\n\nJika Anda sedang menghadapi situasi darurat atau berhadapan dengan petugas, silakan gunakan tombol "MODE PANIK" di atas kapan saja.\n\nPercakapan ini 100% rahasia dan TIDAK DISIMPAN di perangkat maupun server. Untuk memulai panduan, silakan pilih kategori di bawah:',
        },
      ]);
    }
  }, [messages.length, intakeStep]);

  // Scroll to bottom smoothly when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, intakeStep]);

  // Handle Step 0: Category Selection
  const handleSelectCategory = (selectedCategory: 'pelanggaran_ham' | 'korban_kejahatan') => {
    setCategory(selectedCategory);
    setAnswers({ category: selectedCategory });
    setIntakeStep(1);

    const categoryLabel =
      selectedCategory === 'pelanggaran_ham'
        ? 'Pelanggaran HAM oleh aparat'
        : 'Korban kejahatan';

    // Add user choice and bot's next question (Satu hal per pesan: apa yang terjadi)
    setMessages((prev) => [
      ...prev,
      {
        id: `user_cat_${Date.now()}`,
        sender: 'user',
        text: categoryLabel,
      },
      {
        id: `bot_q1_${Date.now()}`,
        sender: 'bot',
        text: 'Pertanyaan 1 dari 4:\nApa yang terjadi? Ceritakan singkat peristiwa yang Anda alami atau pilih dari opsi di bawah:',
      },
    ]);
  };

  // Handle sequential intake steps (1 -> 2 -> 3 -> 4 -> 5)
  const handleIntakeAnswer = (answerText: string) => {
    if (intakeStep === 1) {
      // Apa yang terjadi
      setAnswers((prev) => ({ ...prev, peristiwa: answerText }));
      setIntakeStep(2);
      setMessages((prev) => [
        ...prev,
        {
          id: `user_q1_${Date.now()}`,
          sender: 'user',
          text: answerText,
        },
        {
          id: `bot_q2_${Date.now()}`,
          sender: 'bot',
          text: 'Pertanyaan 2 dari 4:\nKapan kejadian tersebut terjadi? Apakah baru saja, hari ini, atau beberapa waktu lalu?',
        },
      ]);
    } else if (intakeStep === 2) {
      // Kapan
      setAnswers((prev) => ({ ...prev, waktu: answerText }));
      setIntakeStep(3);
      setMessages((prev) => [
        ...prev,
        {
          id: `user_q2_${Date.now()}`,
          sender: 'user',
          text: answerText,
        },
        {
          id: `bot_q3_${Date.now()}`,
          sender: 'bot',
          text: 'Pertanyaan 3 dari 4:\nDi mana lokasi kejadiannya? (Misal: di jalan raya, rumah/kosan, atau di kantor polisi)',
        },
      ]);
    } else if (intakeStep === 3) {
      // Di mana
      setAnswers((prev) => ({ ...prev, lokasi: answerText }));
      setIntakeStep(4);
      setMessages((prev) => [
        ...prev,
        {
          id: `user_q3_${Date.now()}`,
          sender: 'user',
          text: answerText,
        },
        {
          id: `bot_q4_${Date.now()}`,
          sender: 'bot',
          text: 'Pertanyaan 4 dari 4:\nApakah ada bukti atau saksi di lokasi kejadian? (Misal rekaman video, luka fisik, saksi warga, atau percakapan chat)',
        },
      ]);
    } else if (intakeStep === 4) {
      // Ada bukti? -> Process Verdict!
      const fullAnswers: IntakeAnswers = {
        category: category || 'pelanggaran_ham',
        peristiwa: answers.peristiwa || '',
        waktu: answers.waktu || '',
        lokasi: answers.lokasi || '',
        bukti: answerText,
      };

      setAnswers(fullAnswers);
      setIntakeStep(5); // Completed intake, now in advisory & follow-up mode

      // Add user's answer
      setMessages((prev) => [
        ...prev,
        {
          id: `user_q4_${Date.now()}`,
          sender: 'user',
          text: answerText,
        },
      ]);

      // Generate verified legal answer
      setIsLoading(true);
      setTimeout(() => {
        const advisorResponse = generateAdvisorResponse(fullAnswers);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_verdict_${Date.now()}`,
            sender: 'bot',
            isAdvisorResponse: true,
            advisorData: {
              scenarioTitle: advisorResponse.scenarioTitle,
              threeSteps: advisorResponse.threeSteps,
              scriptSiapTunjuk: advisorResponse.scriptSiapTunjuk,
              legalBasis: advisorResponse.legalBasis,
              contacts: advisorResponse.contacts,
              isFallback: advisorResponse.isFallback,
            },
          },
        ]);
        setIsLoading(false);
      }, 400);
    }
  };

  // Handle follow-up queries
  const handleFollowUpMessage = (questionText: string) => {
    if (!category) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user_followup_${Date.now()}`,
        sender: 'user',
        text: questionText,
      },
    ]);

    setIsLoading(true);
    setTimeout(() => {
      const response = answerFollowUpQuestion(questionText, category);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_followup_${Date.now()}`,
          sender: 'bot',
          isAdvisorResponse: true,
          advisorData: {
            scenarioTitle: `Panduan Terkait: "${questionText}"`,
            threeSteps: response.threeSteps,
            scriptSiapTunjuk: response.scriptSiapTunjuk,
            legalBasis: response.legalBasis,
            contacts: response.contacts,
            isFallback: response.isFallback,
          },
        },
      ]);
      setIsLoading(false);
    }, 400);
  };

  // Reset entire conversation in memory (Zero trace)
  const handleResetChat = () => {
    setMessages([]);
    setIntakeStep(0);
    setCategory(null);
    setAnswers({});
  };

  // Quick exit to a neutral page (for domestic violence or safety threats)
  const handleQuickExit = () => {
    handleResetChat();
    // Redirect to neutral Indonesian portal (BMKG weather or Google)
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header with Disclaimer and Panic Button */}
      <Header
        onOpenPanic={() => setIsPanicOpen(true)}
        onResetChat={handleResetChat}
        onOpenLbhDirectory={() => setIsLbhOpen(true)}
        hasMessages={messages.length > 1}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 flex flex-col">
        {/* Privacy & Safety Guarantee Badge (Unboxed text) */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200/80 mb-3">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Privasi Terjamin: Data percakapan tidak disimpan di server maupun penyimpanan HP Anda.</span>
          </div>
          <button
            onClick={handleQuickExit}
            className="text-[11px] text-slate-500 hover:text-rose-600 underline underline-offset-2 shrink-0 ml-2"
            title="Tutup cepat dan arahkan ke Google"
          >
            Keluar Cepat
          </button>
        </div>

        {/* Emergency Quick Action Banner if user is in an active crisis */}
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base leading-tight">
                Sedang berhadapan dengan petugas atau dalam bahaya?
              </div>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Gunakan Mode Panik untuk 3 langkah penyelamatan darurat seketika.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPanicOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-red-700 hover:bg-red-50 text-xs sm:text-sm font-extrabold shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Buka Mode Panik
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 space-y-1">
          {messages.map((item) => (
            <ChatMessageItem
              key={item.id}
              item={item}
              onOpenFullScreenScript={(script, basis) =>
                setFullScreenScript({ script, basis })
              }
              onOpenLbhDirectory={() => setIsLbhOpen(true)}
            />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 py-2 px-3 italic">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-ping" />
              <span>Memeriksa dasar hukum resmi dan menyiapkan 3 langkah darurat...</span>
            </div>
          )}

          {/* Sequential Intake Card (Step 0 - 4) */}
          {intakeStep < 5 && (
            <IntakeCard
              step={intakeStep}
              category={category}
              onSelectCategory={handleSelectCategory}
              onSubmitAnswer={handleIntakeAnswer}
              onSelectChipAnswer={handleIntakeAnswer}
            />
          )}

          {/* Follow-Up Chat Box (Step 5 Completed) */}
          {intakeStep === 5 && category && (
            <FollowUpChat
              onSendMessage={handleFollowUpMessage}
              category={category}
              isLoading={isLoading}
            />
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Restart Option if finished */}
        {intakeStep === 5 && (
          <div className="my-6 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <div className="font-bold text-sm text-slate-900">
                Punya persoalan hukum lainnya?
              </div>
              <div className="text-xs text-slate-500">
                Mulai kembali panduan dari awal atau bersihkan percakapan tanpa jejak.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Mulai Panduan Baru
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Emergency Dock (Mobile thumb-zone) */}
      <EmergencyDock
        onOpenPanic={() => setIsPanicOpen(true)}
        onResetChat={handleResetChat}
        onOpenLbhDirectory={() => setIsLbhOpen(true)}
        hasMessages={messages.length > 1}
      />

      {/* Modals */}
      <PanicModal
        isOpen={isPanicOpen}
        onClose={() => setIsPanicOpen(false)}
        onQuickExit={handleQuickExit}
        onOpenFullScreenScript={(script, basis) =>
          setFullScreenScript({ script, basis })
        }
      />

      <FullScreenScriptModal
        isOpen={!!fullScreenScript}
        onClose={() => setFullScreenScript(null)}
        script={fullScreenScript?.script || ''}
        legalBasis={fullScreenScript?.basis || ''}
      />

      <LBHDirectoryModal
        isOpen={isLbhOpen}
        onClose={() => setIsLbhOpen(false)}
      />
    </div>
  );
}
