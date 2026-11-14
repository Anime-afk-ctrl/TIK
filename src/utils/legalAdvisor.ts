import {
  EMERGENCY_CONTACTS,
  VERIFIED_SCENARIOS,
  DEFAULT_FALLBACK_SCENARIO,
  LegalScenario,
  ContactInfo,
} from '../data/legalData';

export interface IntakeAnswers {
  category: 'pelanggaran_ham' | 'korban_kejahatan';
  peristiwa: string;
  waktu: string;
  lokasi: string;
  bukti: string;
}

export interface AdvisorResponse {
  scenarioTitle: string;
  threeSteps: [string, string, string];
  scriptSiapTunjuk: string;
  legalBasis: string;
  contacts: ContactInfo[];
  contextSummary: string;
  isFallback: boolean;
}

/**
 * Mencari skenario hukum paling tepat berdasarkan kata kunci dan kategori.
 * TIDAK MENGARANG: Jika tidak ada kecocokan terverifikasi, otomatis arahkan ke LBH YLBHI.
 */
export function matchScenario(category: 'pelanggaran_ham' | 'korban_kejahatan', text: string): { scenario: LegalScenario; isFallback: boolean } {
  const normalized = text.toLowerCase();
  const categoryScenarios = VERIFIED_SCENARIOS.filter((s) => s.category === category);

  let bestMatch: LegalScenario | null = null;
  let highestScore = 0;

  for (const s of categoryScenarios) {
    let score = 0;
    for (const kw of s.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = s;
    }
  }

  // Jika skor 0 atau tidak yakin, gunakan fallback LBH resmi
  if (!bestMatch || highestScore === 0) {
    return { scenario: DEFAULT_FALLBACK_SCENARIO, isFallback: true };
  }

  return { scenario: bestMatch, isFallback: false };
}

/**
 * Menghasilkan respon hukum terstruktur dengan 3 langkah singkat dan 1 skrip siap tunjuk
 */
export function generateAdvisorResponse(answers: IntakeAnswers): AdvisorResponse {
  const { category, peristiwa, waktu, lokasi, bukti } = answers;
  const combinedText = `${peristiwa} ${lokasi} ${bukti}`;
  const { scenario, isFallback } = matchScenario(category, combinedText);

  // Kustomisasi langkah agar langsung menjawab kondisi waktu dan bukti
  const step1 = scenario.threeSteps[0];
  let step2 = scenario.threeSteps[1];
  let step3 = scenario.threeSteps[2];

  // Penyesuaian kontekstual berbasis waktu dan bukti
  const waktuLower = waktu.toLowerCase();
  const buktiLower = bukti.toLowerCase();

  if (waktuLower.includes('sedang') || waktuLower.includes('sekarang') || waktuLower.includes('baru saja')) {
    step2 = `Kondisi darurat/terkini di ${lokasi || 'lokasi'}: Segera bagikan live location ke kerabat dan jangan menyendiri. ${step2}`;
  }

  if (buktiLower.includes('tidak') || buktiLower.includes('belum')) {
    step3 = `${step3} Catatan bukti: Jangan khawatir jika belum ada rekaman; keterangan saksi korban yang konsisten adalah bukti permulaan sah menurut hukum.`;
  } else if (buktiLower.includes('video') || buktiLower.includes('foto') || buktiLower.includes('chat')) {
    step3 = `${step3} Segera gandakan (backup) file rekaman/chat ke penyimpanan awan atau kirim ke kerabat agar tidak hilang atau dihapus paksa.`;
  }

  // Pilih kontak prioritas
  const contacts: ContactInfo[] = [...scenario.recommendedContacts];
  if (category === 'korban_kejahatan' && !contacts.some((c) => c.number === '110')) {
    contacts.unshift(EMERGENCY_CONTACTS.polisi);
  }
  if (
    (peristiwa.toLowerCase().includes('seksual') || peristiwa.toLowerCase().includes('perempuan') || peristiwa.toLowerCase().includes('anak')) &&
    !contacts.some((c) => c.number === '129')
  ) {
    contacts.unshift(EMERGENCY_CONTACTS.sapa129);
  }

  return {
    scenarioTitle: scenario.title,
    threeSteps: [step1, step2, step3],
    scriptSiapTunjuk: scenario.scriptSiapTunjuk,
    legalBasis: scenario.legalBasis,
    contacts,
    contextSummary: `Kategori: ${category === 'pelanggaran_ham' ? 'Pelanggaran HAM oleh Aparat' : 'Korban Kejahatan'} | Waktu: ${waktu} | Lokasi: ${lokasi}`,
    isFallback,
  };
}

/**
 * Menjawab pertanyaan lanjutan pengguna secara terverifikasi
 */
export function answerFollowUpQuestion(
  question: string,
  category: 'pelanggaran_ham' | 'korban_kejahatan'
): {
  threeSteps: [string, string, string];
  scriptSiapTunjuk: string;
  legalBasis: string;
  contacts: ContactInfo[];
  isFallback: boolean;
} {
  const qLower = question.toLowerCase();

  // Pertanyaan umum 1: Biaya lapor polisi / SPKT
  if (qLower.includes('biaya') || qLower.includes('bayar') || qLower.includes('uang') || qLower.includes('gratis')) {
    return {
      threeSteps: [
        'Membuat Laporan Polisi (LP) di SPKT sama sekali TIDAK DIPUNGUT BIAYA (100% Gratis).',
        'Jika ada oknum yang meminta "uang bensin", "uang administrasi", atau biaya visum, tolak dengan sopan dan catat nama/pangkatnya.',
        'Laporkan pungutan liar tersebut langsung ke Propam Polri (WhatsApp 0812-1010-6700) atau hubungi 110.',
      ],
      scriptSiapTunjuk:
        'Sesuai ketentuan Mabes Polri dan Pasal 108 KUHAP, pelayanan laporan masyarakat di SPKT tidak dipungut biaya apapun. Saya memohon Surat Tanda Penerimaan Laporan resmi.',
      legalBasis: 'Pasal 108 KUHAP jo. Perkap No. 6 Tahun 2019',
      contacts: [EMERGENCY_CONTACTS.polisi, EMERGENCY_CONTACTS.propamPolri, EMERGENCY_CONTACTS.ylbhi],
      isFallback: false,
    };
  }

  // Pertanyaan umum 2: Merekam polisi / HP
  if (qLower.includes('rekam') || qLower.includes('video') || qLower.includes('kamera') || qLower.includes('foto')) {
    return {
      threeSteps: [
        'Warga berhak merekam tindakan aparat di tempat umum sebagai dokumentasi publik selama tidak menghalangi proses tugas fisik.',
        'Posisikan diri pada jarak aman (minimal 2-3 meter) dan jangan melakukan kontak fisik.',
        'Jika dipaksa menghapus video, nyatakan bahwa menghapus paksa tanpa penetapan penyitaan adalah perbuatan melanggar hukum.',
      ],
      scriptSiapTunjuk:
        'Pasal 28F UUD 1945 menjamin hak warga mendokumentasikan informasi di ruang publik. Saya merekam dari jarak aman demi transparansi hukum.',
      legalBasis: 'Pasal 28F UUD 1945 jo. UU Keterbukaan Informasi Publik',
      contacts: [EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.propamPolri],
      isFallback: false,
    };
  }

  // Pertanyaan umum 3: Buka password / sandi HP
  if (qLower.includes('sandi') || qLower.includes('password') || qLower.includes('pin') || qLower.includes('hp')) {
    return {
      threeSteps: [
        'Anda TIDAK BERKEWAJIBAN memberikan sandi atau membuka layar ponsel Anda tanpa adanya surat penetapan penyitaan dari Pengadilan Negeri.',
        'Ponsel dilindungi hak privasi pribadi konstitusional (Pasal 28G UUD 1945).',
        'Jika HP Anda diambil paksa, segera minta Berita Acara Penyitaan dan laporkan penyitaan ilegal ke Propam dan LBH.',
      ],
      scriptSiapTunjuk:
        'Berdasarkan Pasal 38 KUHAP dan Pasal 28G UUD 1945, penyitaan gawai pribadi wajib disertai izin penetapan Pengadilan Negeri. Saya tidak berkenan membuka sandi privasi saya.',
      legalBasis: 'Pasal 38 KUHAP jo. Pasal 28G UUD 1945',
      contacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras],
      isFallback: false,
    };
  }

  // Pertanyaan umum 4: Visum
  if (qLower.includes('visum') || qLower.includes('luka') || qLower.includes('dokter') || qLower.includes('rumah sakit')) {
    return {
      threeSteps: [
        'Segera ke IGD RSUD atau RS Bhayangkara terdekat; jangan mandi atau ganti pakaian bila kasus kekerasan fisik/seksual.',
        'Jelaskan kepada dokter jaga bahwa luka disebabkan oleh tindak pidana dan minta pencatatan rekam medis darurat (visum et repertum sementara).',
        'Bawa surat keterangan medis ke SPKT saat melapor agar penyidik menerbitkan Surat Permintaan Visum resmi.',
      ],
      scriptSiapTunjuk:
        'Saya memohon pemeriksaan forensik luka/visum et repertum untuk kelengkapan alat bukti sah tindak pidana sesuai Pasal 133 KUHAP.',
      legalBasis: 'Pasal 133 KUHAP jo. UU Kesehatan & UU TPKS',
      contacts: [EMERGENCY_CONTACTS.sapa129, EMERGENCY_CONTACTS.polisi, EMERGENCY_CONTACTS.lbhApik],
      isFallback: false,
    };
  }

  // Pertanyaan umum 5: Polisi menolak laporan
  if (qLower.includes('tolak') || qLower.includes('menolak') || qLower.includes('damai')) {
    return {
      threeSteps: [
        'Ingatkan bahwa menolak laporan tindak pidana dari masyarakat melanggar kewajiban dinas Polri dalam Perkap No. 6/2019.',
        'Minta bertemu dengan Perwira Pengawas (Pawas) atau Kepala SPKT yang bertugas hari itu.',
        'Jika tetap ditolak, buat aduan pelanggaran pelayanan ke aplikasi Propam Presisi atau kontak Hotline Propam 0812-1010-6700.',
      ],
      scriptSiapTunjuk:
        'Sesuai Pasal 108 KUHAP, setiap korban tindak pidana berhak membuat laporan. Menolak laporan masyarakat bertentangan dengan kewajiban pelayanan Polri.',
      legalBasis: 'Pasal 108 KUHAP jo. Perkap No. 6 Tahun 2019',
      contacts: [EMERGENCY_CONTACTS.propamPolri, EMERGENCY_CONTACTS.ylbhi],
      isFallback: false,
    };
  }

  // Match keyword scenario umum
  const matchResult = matchScenario(category, question);
  if (!matchResult.isFallback) {
    return {
      threeSteps: matchResult.scenario.threeSteps,
      scriptSiapTunjuk: matchResult.scenario.scriptSiapTunjuk,
      legalBasis: matchResult.scenario.legalBasis,
      contacts: matchResult.scenario.recommendedContacts,
      isFallback: false,
    };
  }

  // Default Fallback ke LBH
  return {
    threeSteps: [
      'Pertanyaan Anda membutuhkan analisis kronologi mendalam. Jangan mengambil tindakan hukum atau menyepakati perjanjian sepihak.',
      'Amankan seluruh bukti dokumen, rekaman percakapan, dan saksi yang Anda miliki saat ini.',
      'Segera hubungi Lembaga Bantuan Hukum (YLBHI) di nomor (021) 3929840 untuk mendapatkan pendampingan hukum oleh advokat berlisensi.',
    ],
    scriptSiapTunjuk:
      'Saya tidak dapat memberikan pernyataan hukum mengikat sebelum berkonsultasi dengan penasihat hukum resmi saya dari Lembaga Bantuan Hukum.',
    legalBasis: 'Pasal 28D ayat (1) UUD 1945 jo. UU Bantuan Hukum No. 16/2011',
    contacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.komnasHam],
    isFallback: true,
  };
}
