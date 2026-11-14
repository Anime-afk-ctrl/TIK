/**
 * Data Resmi & Terverifikasi Hak Hukum Warga Negara Indonesia
 * Berdasarkan KUHAP, UU HAM 39/1999, UU TPKS 12/2022, UU LPSK 13/2006 jo 31/2014, Perkap Polri 8/2009.
 * TIDAK MENGARANG pasal atau nomor kontak.
 */

export interface ContactInfo {
  name: string;
  number: string;
  telUri: string;
  badge: string;
  description: string;
  isPrimaryEmergency?: boolean;
}

export interface LegalScenario {
  id: string;
  category: 'pelanggaran_ham' | 'korban_kejahatan';
  title: string;
  keywords: string[];
  threeSteps: [string, string, string];
  scriptSiapTunjuk: string;
  legalBasis: string;
  recommendedContacts: ContactInfo[];
  notes?: string;
}

export const EMERGENCY_CONTACTS: Record<string, ContactInfo> = {
  polisi: {
    name: 'Polisi RI (Darurat)',
    number: '110',
    telUri: 'tel:110',
    badge: 'Bebas Pulsa 24 Jam',
    description: 'Panggilan darurat keamanan, tindak pidana sedang berlangsung, dan kecelakaan.',
    isPrimaryEmergency: true,
  },
  sapa129: {
    name: 'SAPA 129 (KemenPPPA)',
    number: '129',
    telUri: 'tel:129',
    badge: 'Hotline Perempuan & Anak',
    description: 'Layanan Sahabat Perempuan dan Anak untuk penanganan darurat kekerasan seksual, KDRT, dan perlindungan anak.',
    isPrimaryEmergency: true,
  },
  lpsk: {
    name: 'LPSK (Perlindungan Saksi & Korban)',
    number: '148',
    telUri: 'tel:148',
    badge: 'Layanan Perlindungan',
    description: 'Lembaga Perlindungan Saksi dan Korban untuk ancaman intimidasi, teror, dan perlindungan fisik.',
    isPrimaryEmergency: false,
  },
  ylbhi: {
    name: 'YLBHI (Bantuan Hukum Rakyat)',
    number: '(021) 3929840',
    telUri: 'tel:0213929840',
    badge: 'Lembaga Bantuan Hukum',
    description: 'Jaringan 18 LBH di seluruh Indonesia untuk bantuan hukum cuma-cuma bagi warga miskin dan korban pelanggaran HAM.',
    isPrimaryEmergency: false,
  },
  kontras: {
    name: 'KontraS (Aduan Kekerasan Aparat)',
    number: '0812-888-22669',
    telUri: 'tel:081288822669',
    badge: 'Darurat Korban Kekerasan Aparat',
    description: 'Komisi untuk Orang Hilang dan Korban Tindak Kekerasan untuk advokasi intimidasi dan kebrutalan aparat.',
    isPrimaryEmergency: false,
  },
  komnasHam: {
    name: 'Komnas HAM RI',
    number: '1500-148',
    telUri: 'tel:1500148',
    badge: 'Pengaduan HAM',
    description: 'Komisi Nasional Hak Asasi Manusia untuk pengaduan pelanggaran hak asasi oleh institusi negara/aparat.',
    isPrimaryEmergency: false,
  },
  lbhApik: {
    name: 'LBH APIK Jakarta',
    number: '0813-8882-2669',
    telUri: 'tel:081388822669',
    badge: 'Advokasi Perempuan',
    description: 'Bantuan hukum gratis dan pendampingan psikososial khusus korban perempuan dan anak.',
    isPrimaryEmergency: false,
  },
  propamPolri: {
    name: 'Pelayanan Propam Polri (Yanduan)',
    number: '0812-1010-6700',
    telUri: 'tel:081210106700',
    badge: 'Pengaduan Oknum Polisi',
    description: 'Hotline resmi Divisi Profesi dan Pengamanan Polri untuk laporan pelanggaran disiplin/kode etik polisi.',
    isPrimaryEmergency: false,
  },
};

export const PANIC_MODE_STEPS: [string, string, string] = [
  'Jaga keselamatan fisik: Jangan melawan dengan kekerasan yang bisa dijadikan dalih kriminalisasi. Jika memungkinkan dan aman, nyalakan perekam suara atau rekam video situasi secara diam-diam.',
  'Kirimkan lokasi langsung (Live Location): Segera bagikan lokasi terkini via pesan instan ke keluarga, kerabat tepercaya, atau grup pendamping hukum agar posisi Anda terdeteksi.',
  'Gunakan hak diam & tolak tanda tangan tanpa pengacara: Jangan membuat pengakuan apapun atau menandatangani Berita Acara Pemeriksaan (BAP) sebelum didampingi penasihat hukum resmi.',
];

export const PANIC_SCRIPT =
  'Berdasarkan Pasal 18 dan Pasal 54 KUHAP, saya berhak melihat surat perintah resmi dan berhak didampingi penasihat hukum sebelum memberikan keterangan atau menandatangani berkas apapun.';

export const VERIFIED_SCENARIOS: LegalScenario[] = [
  // PELANGGARAN HAM OLEH APARAT
  {
    id: 'aparat_penangkapan_tanpa_surat',
    category: 'pelanggaran_ham',
    title: 'Penangkapan / Penahanan Tanpa Surat Perintah Resmi',
    keywords: ['tangkap', 'penangkapan', 'tanpa surat', 'ciduk', 'bawa paksa', 'ditangkap', 'jemput paksa', 'spp'],
    threeSteps: [
      'Minta tunjukkan Surat Tugas dan Surat Perintah Penangkapan resmi yang mencantumkan nama Anda dan alasan perkara (Pasal 18 ayat 1 KUHAP).',
      'Hubungi keluarga atau rekan sekarang dan kirimkan nama, pangkat petugas, serta kantor polisi tujuan; salinan surat penangkapan wajib diserahkan ke keluarga dalam 1x24 jam (Pasal 18 ayat 3 KUHAP).',
      'Tolak menandatangani surat apapun dan gunakan hak diam sampai Anda didampingi pengacara/penasihat hukum (Pasal 52 & Pasal 54 KUHAP).',
    ],
    scriptSiapTunjuk:
      'Mohon izin Bapak/Ibu Petugas, sesuai Pasal 18 ayat (1) dan Pasal 54 KUHAP, saya berhak melihat Surat Tugas dan Surat Perintah Penangkapan resmi, serta berhak menghubungi penasihat hukum sebelum dibawa.',
    legalBasis: 'Pasal 18 ayat (1) & (3), Pasal 52, Pasal 54 KUHAP',
    recommendedContacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.propamPolri],
  },
  {
    id: 'aparat_penggeledahan_tanpa_izin',
    category: 'pelanggaran_ham',
    title: 'Penggeledahan Rumah / Tempat Tinggal / Kos Tanpa Izin PN',
    keywords: ['geledah', 'penggeledahan', 'rumah', 'kos', 'kamar', 'masuk paksa', 'tanpa izin'],
    threeSteps: [
      'Tanyakan dan minta petugas memperlihatkan Surat Izin Penggeledahan dari Ketua Pengadilan Negeri setempat dan surat tugas resmi (Pasal 33 ayat 1 KUHAP).',
      'Panggil Ketua RT/lingkungan atau tetangga untuk hadir menyaksikan proses penggeledahan; penggeledahan wajib disaksikan 2 saksi warga (Pasal 33 ayat 3 KUHAP).',
      'Dokumentasikan nama/pangkat petugas dan pastikan meminta Berita Acara Penggeledahan serta tanda terima jika ada barang yang disita (Pasal 36 KUHAP).',
    ],
    scriptSiapTunjuk:
      'Sesuai Pasal 33 ayat (1) KUHAP, penggeledahan rumah tinggal wajib disertai Surat Izin dari Ketua Pengadilan Negeri dan disaksikan perangkat lingkungan setempat sebelum dimulai.',
    legalBasis: 'Pasal 33 ayat (1) & (3), Pasal 34, Pasal 36 KUHAP',
    recommendedContacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.propamPolri],
  },
  {
    id: 'aparat_razia_hp_gadget',
    category: 'pelanggaran_ham',
    title: 'Pemeriksaan / Penyitaan HP & Gadget Secara Paksa',
    keywords: ['hp', 'ponsel', 'handphone', 'gadget', 'sandi', 'password', 'chat', 'galeri', 'razia hp', 'periksa hp'],
    threeSteps: [
      'Tolak membuka kunci layar/sandi dengan sopan: data pribadi dan korespondensi dilindungi hak privasi konstitusional (Pasal 28G UUD 1945).',
      'Tegaskan bahwa penyitaan barang termasuk ponsel hanya sah dengan izin Ketua Pengadilan Negeri (Pasal 38 ayat 1 KUHAP).',
      'Jika petugas tetap merampas HP Anda, catat nama, NRP, kesatuan petugas, dan segera laporkan tindakan perampasan sewenang-wenang ke Propam Polri dan LBH.',
    ],
    scriptSiapTunjuk:
      'Ponsel ini memuat data pribadi dan privasi saya. Berdasarkan Pasal 38 KUHAP dan Pasal 28G UUD 1945, penyitaan atau penggeledahan isi gawai hanya dapat dilakukan atas izin penetapan Pengadilan Negeri.',
    legalBasis: 'Pasal 38 ayat (1) KUHAP jo. Pasal 28G UUD 1945 & UU PDP No. 27/2022',
    recommendedContacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.propamPolri],
  },
  {
    id: 'aparat_kekerasan_intimidasi',
    category: 'pelanggaran_ham',
    title: 'Kekerasan Fisik / Pemukulan / Intimidasi oleh Aparat',
    keywords: ['pukul', 'kekerasan', 'aniaya', 'intimidasi', 'ancam', 'tembak', 'gas air mata', 'penyiksaan', 'brutal'],
    threeSteps: [
      'Prioritaskan menyelamatkan diri ke tempat ramai atau fasilitas publik terdekat yang aman; jangan membalas fisik yang dapat difitnah sebagai melawan petugas.',
      'Segera lakukan Visum et Repertum di RSUD atau faskes pemerintah terdekat dan foto seluruh luka memar/fisik dengan timestamp waktu jelas.',
      'Kumpulkan rekaman video saksi di lokasi dan laporkan ke Divisi Propam Polri serta adukan pelanggaran HAM ke KontraS dan Komnas HAM.',
    ],
    scriptSiapTunjuk:
      'Perkap Kapolri No. 8 Tahun 2009 dan KUHP melarang keras segala bentuk kekerasan fisik dan penyiksaan oleh aparat. Saya mendokumentasikan tindakan ini untuk proses hukum resmi.',
    legalBasis: 'Pasal 351 KUHP jo. Perkap Kapolri No. 8 Tahun 2009 tentang Implementasi Standar HAM',
    recommendedContacts: [EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.komnasHam],
  },
  {
    id: 'aparat_interogasi_paksa_pengakuan',
    category: 'pelanggaran_ham',
    title: 'Dipaksa Mengaku / Pemeriksaan Tanpa Penasihat Hukum',
    keywords: ['bap', 'interogasi', 'paksa mengaku', 'tekan', 'tanda tangan bap', 'ancam penjara', 'tanpa pengacara'],
    threeSteps: [
      'Gunakan hak untuk tidak memberikan keterangan (hak diam) jika Anda dalam keadaan tertekan, takut, atau tanpa pendamping (Pasal 52 KUHAP).',
      'Tolak menandatangani Berita Acara Pemeriksaan (BAP) jika isi keterangannya tidak sesuai fakta atau jika Anda belum didampingi advokat (Pasal 54 KUHAP).',
      'Minta pejabat pemeriksa menunjuk penasihat hukum cuma-cuma jika Anda disangka pasal dengan ancaman 5 tahun atau lebih (Pasal 56 KUHAP).',
    ],
    scriptSiapTunjuk:
      'Berdasarkan Pasal 52 dan Pasal 54 KUHAP, saya berhak memberikan keterangan secara bebas tanpa tekanan dan berhak didampingi penasihat hukum sebelum menandatangani BAP.',
    legalBasis: 'Pasal 52, Pasal 54, dan Pasal 56 ayat (1) KUHAP',
    recommendedContacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras],
  },
  {
    id: 'aparat_rekam_video_polisi',
    category: 'pelanggaran_ham',
    title: 'Dilarang / Dihapus Rekaman Saat Merekam Tugas Aparat',
    keywords: ['rekam', 'video', 'kamera', 'dilarang rekam', 'hapus video', 'foto polisi', 'dokumentasi'],
    threeSteps: [
      'Tetap berdiri pada jarak aman tanpa menghalangi tugas fisik petugas di lapangan.',
      'Tegaskan bahwa merekam di ruang publik adalah hak konstitusional warga negara untuk dokumentasi (Pasal 28F UUD 1945) dan tidak ada pasal yang melarang.',
      'Jika ponsel Anda dipaksa diambil untuk dihapus videonya, jangan melawan fisik namun minta saksi sekitar memperhatikan dan catat identitas oknum petugas.',
    ],
    scriptSiapTunjuk:
      'Sesuai Pasal 28F UUD 1945, warga negara berhak mendokumentasikan peristiwa di tempat umum. Saya tidak menghalangi tugas dan rekaman ini adalah hak informasi publik.',
    legalBasis: 'Pasal 28F UUD 1945 jo. Perkap No. 8/2009',
    recommendedContacts: [EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.propamPolri],
  },

  // KORBAN KEJAHATAN
  {
    id: 'korban_kekerasan_seksual_tpks',
    category: 'korban_kejahatan',
    title: 'Pelecehan / Kekerasan Seksual (UU TPKS)',
    keywords: ['pelecehan', 'seksual', 'tpks', 'perkosaan', 'raba', 'begal payudara', 'catcalling fisik', 'pemerkosaan'],
    threeSteps: [
      'Jangan mandi, jangan mencuci pakaian, dan jangan membersihkan diri terlebih dahulu agar bukti forensik/DNA tidak hilang, lalu segera ke IGD RSUD untuk visum et repertum.',
      'Amankan semua bukti digital (tangkapan layar chat, foto, video, rekaman suara) serta catat identitas saksi di sekitar tempat kejadian.',
      'Hubungi layanan SAPA 129 KemenPPPA atau LBH APIK untuk pendampingan hukum dan psikologis gratis sebelum atau saat melapor ke Unit PPA Polres.',
    ],
    scriptSiapTunjuk:
      'Berdasarkan UU TPKS No. 12 Tahun 2022 Pasal 23 dan 66, saya sebagai korban berhak atas kerahasiaan identitas, pendampingan hukum terpadu, dan perlindungan saksi/korban.',
    legalBasis: 'UU No. 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual (TPKS)',
    recommendedContacts: [EMERGENCY_CONTACTS.sapa129, EMERGENCY_CONTACTS.lbhApik, EMERGENCY_CONTACTS.lpsk],
  },
  {
    id: 'korban_penganiayaan_fisik',
    category: 'korban_kejahatan',
    title: 'Penganiayaan Fisik / Pengeroyokan',
    keywords: ['aniaya', 'keroyok', 'pemukulan', 'bacok', 'luka', 'berdarah', 'lebam', 'dihajar'],
    threeSteps: [
      'Cari pertolongan medis ke IGD RS terdekat dan segera minta dokter membuat rekam medis untuk kebutuhan Visum et Repertum (Pasal 133 KUHAP).',
      'Foto semua bagian tubuh yang mengalami luka lebam atau goresan dengan pencahayaan jelas segera setelah kejadian.',
      'Datang ke Sentra Pelayanan Kepolisian Terpadu (SPKT) Polsek atau Polres terdekat untuk membuat Laporan Polisi (LP) resmi tanpa dipungut biaya.',
    ],
    scriptSiapTunjuk:
      'Saya hadir sebagai korban penganiayaan untuk membuat Laporan Polisi resmi di SPKT dan meminta rujukan Visum et Repertum serta Surat Tanda Penerimaan Laporan (STPL).',
    legalBasis: 'Pasal 351/352 KUHP jo. Pasal 108 & Pasal 133 KUHAP',
    recommendedContacts: [EMERGENCY_CONTACTS.polisi, EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.lpsk],
  },
  {
    id: 'korban_kdrt',
    category: 'korban_kejahatan',
    title: 'Kekerasan Dalam Rumah Tangga (KDRT)',
    keywords: ['kdrt', 'suami', 'istri', 'pasangan', 'kekerasan rumah tangga', 'dipukul suami', 'disiksa pasangan'],
    threeSteps: [
      'Selamatkan diri dan anak-anak ke tempat aman (rumah keluarga, tetangga, atau shelter darurat) jika situasi mengancam nyawa.',
      'Lakukan pemeriksaan visum di puskesmas/RSUD dan simpan barang bukti ancaman atau kekerasan fisik/verbal.',
      'Hubungi SAPA 129 KemenPPPA atau hotline LBH APIK untuk bantuan perlindungan darurat sementara (Perintah Perlindungan Pengadilan/Kepolisian).',
    ],
    scriptSiapTunjuk:
      'Berdasarkan UU No. 23 Tahun 2004 tentang PKDRT Pasal 10 dan 16, korban KDRT berhak atas perlindungan sementara dari kepolisian dan layanan kesehatan cuma-cuma.',
    legalBasis: 'UU No. 23 Tahun 2004 tentang Penghapusan KDRT (UU PKDRT)',
    recommendedContacts: [EMERGENCY_CONTACTS.sapa129, EMERGENCY_CONTACTS.lbhApik, EMERGENCY_CONTACTS.polisi],
  },
  {
    id: 'korban_pencurian_begal_perampokan',
    category: 'korban_kejahatan',
    title: 'Pencurian / Begal / Perampokan / Jambret',
    keywords: ['curi', 'kemalingan', 'maling', 'begal', 'rampok', 'jambret', 'hilang motor', 'bobol rumah'],
    threeSteps: [
      'Jangan ubah atau pegang lokasi tempat kejadian perkara (TKP) untuk menjaga sidik jari laten pelaku sebelum polisi olah TKP.',
      'Kumpulkan bukti kepemilikan barang (nomor IMEI ponsel, nomor rangka BPKB/STNK motor, atau rekaman CCTV sekitar TKP).',
      'Segera lapor ke SPKT Polsek/Polres terdekat; pastikan menerima Surat Tanda Penerimaan Laporan (STPL) resmi tanpa membayar biaya sepeserpun.',
    ],
    scriptSiapTunjuk:
      'Saya ingin membuat Laporan Polisi resmi atas tindak pidana pencurian/perampokan di SPKT dan memohon Surat Tanda Penerimaan Laporan (STPL) tanpa pungutan biaya.',
    legalBasis: 'Pasal 362/365 KUHP jo. Pasal 108 KUHAP',
    recommendedContacts: [EMERGENCY_CONTACTS.polisi, EMERGENCY_CONTACTS.ylbhi],
  },
  {
    id: 'korban_penipuan_pemerasan',
    category: 'korban_kejahatan',
    title: 'Penipuan Online / Pemerasan / Pinjol Ilegal',
    keywords: ['tipu', 'penipuan', 'transfer', 'pinjol', 'sebar data', 'ancam sebar', 'pemerasan', 'rekening'],
    threeSteps: [
      'Simpan bukti utuh tangkapan layar (screenshot) mutasi rekening, chat pelaku, tautan link, nomor rekening, dan nomor telepon pelaku.',
      'Segera hubungi bank Anda untuk mengajukan permohonan blokir rekening penipu dengan melampirkan kronologi kejadian.',
      'Laporkan ke situs cekrekening.id (Kominfo/Kemenkomdigi) dan buat Laporan Polisi resmi di SPKT Polres untuk tindak pidana siber/penipuan.',
    ],
    scriptSiapTunjuk:
      'Berdasarkan Pasal 108 KUHAP dan UU ITE, saya melapor sebagai korban tindak pidana penipuan/pemerasan untuk memproses pidana dan penghentian transaksi rekening pelaku.',
    legalBasis: 'Pasal 378 KUHP jo. UU No. 1 Tahun 2024 tentang Perubahan Kedua UU ITE',
    recommendedContacts: [EMERGENCY_CONTACTS.polisi, EMERGENCY_CONTACTS.ylbhi],
  },
  {
    id: 'korban_laporan_polisi_ditolak',
    category: 'korban_kejahatan',
    title: 'Laporan Ditolak di Kantor Polisi / Dipungut Biaya',
    keywords: ['laporan ditolak', 'spkt menolak', 'minta uang', 'dipungut biaya', 'pungli', 'disuruh damai'],
    threeSteps: [
      'Tegaskan bahwa Pasal 108 ayat 1 KUHAP menjamin hak setiap korban melapor dan Perkap Polri melarang penolakan laporan warga atau meminta imbalan uang.',
      'Minta bicara langsung dengan Kepala SPKT (Ka SPKT) atau Perwira Pengawas (Pawas) yang sedang bertugas hari itu.',
      'Jika tetap ditolak atau dipersulit, hubungi Propam Presisi di 0812-1010-6700 atau minta pendampingan advokat dari LBH YLBHI setempat.',
    ],
    scriptSiapTunjuk:
      'Berdasarkan Pasal 108 KUHAP dan SOP Pelayanan SPKT Polri, kepolisian berkewajiban menerima laporan korban tanpa syarat pungutan biaya dan menerbitkan STPL resmi.',
    legalBasis: 'Pasal 108 KUHAP jo. Perkap Kapolri No. 6 Tahun 2019 tentang Manajemen Penyidikan Tindak Pidana',
    recommendedContacts: [EMERGENCY_CONTACTS.propamPolri, EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.polisi],
  },
];

/**
 * Fallback jika kasus tidak spesifik atau ragu-ragu:
 * Wajib arahkan ke LBH YLBHI dan beri 3 langkah perlindungan umum.
 */
export const DEFAULT_FALLBACK_SCENARIO: LegalScenario = {
  id: 'fallback_lbh',
  category: 'pelanggaran_ham',
  title: 'Panduan Hak Perlindungan Umum & Rekomendasi LBH',
  keywords: [],
  threeSteps: [
    'Tetap tenang dan amankan bukti awal (foto, rekaman, saksi mata, atau percakapan tertulis); jangan merusak barang bukti.',
    'Jangan menandatangani berkas hukum atau menyetujui pernyataan sepihak sebelum mendapatkan advis resmi dari advokat.',
    'Segera konsultasikan kronologi lengkap Anda ke Lembaga Bantuan Hukum (YLBHI) terdekat di kota Anda atau hubungi hotline resmi.',
  ],
  scriptSiapTunjuk:
    'Sesuai ketentuan hukum yang berlaku di Indonesia, saya berhak mendapatkan kepastian hukum dan didampingi penasihat hukum sebelum mengambil tindakan atau menyepakati berkas apapun.',
  legalBasis: 'Pasal 28D ayat (1) UUD 1945 jo. UU No. 16 Tahun 2011 tentang Bantuan Hukum',
  recommendedContacts: [EMERGENCY_CONTACTS.ylbhi, EMERGENCY_CONTACTS.kontras, EMERGENCY_CONTACTS.komnasHam],
  notes: 'Karena situasi Anda membutuhkan telaah berkas khusus, sangat dianjurkan untuk berkonsultasi langsung dengan advokat LBH.',
};
