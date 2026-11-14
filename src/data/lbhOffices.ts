/**
 * Daftar Resmi Kantor Wilayah Lembaga Bantuan Hukum (YLBHI) di Indonesia
 * Data autentik untuk rujukan bantuan hukum cuma-cuma bagi warga.
 */

export interface LBHOffice {
  region: string;
  name: string;
  phone: string;
  telUri: string;
  address: string;
}

export const LBH_OFFICES: LBHOffice[] = [
  {
    region: 'Nasional / Pusat',
    name: 'YLBHI (Kantor Pengurus Pusat)',
    phone: '(021) 3929840',
    telUri: 'tel:0213929840',
    address: 'Jl. Diponegoro No. 74, Menteng, Jakarta Pusat',
  },
  {
    region: 'DKI Jakarta',
    name: 'LBH Jakarta',
    phone: '0812-1111-9426',
    telUri: 'tel:081211119426',
    address: 'Jl. Diponegoro No. 74, Menteng, Jakarta Pusat',
  },
  {
    region: 'Jawa Barat',
    name: 'LBH Bandung',
    phone: '(022) 7205164',
    telUri: 'tel:0227205164',
    address: 'Jl. Cigadung Barat No. 22A, Cibeunying Kaler, Kota Bandung',
  },
  {
    region: 'Jawa Tengah',
    name: 'LBH Semarang',
    phone: '(024) 8443916',
    telUri: 'tel:0248443916',
    address: 'Jl. Parang Klitik V No. 34, Tlogosari Kulon, Kota Semarang',
  },
  {
    region: 'D.I. Yogyakarta',
    name: 'LBH Yogyakarta',
    phone: '(0274) 565074',
    telUri: 'tel:0274565074',
    address: 'Jl. Benowo No. 28, Prenggan, Kotagede, Kota Yogyakarta',
  },
  {
    region: 'Jawa Timur',
    name: 'LBH Surabaya',
    phone: '(031) 5022273',
    telUri: 'tel:0315022273',
    address: 'Jl. Kidal No. 6, Pacar Keling, Tambaksari, Kota Surabaya',
  },
  {
    region: 'Sumatera Utara',
    name: 'LBH Medan',
    phone: '(061) 4515340',
    telUri: 'tel:0614515340',
    address: 'Jl. Hindu No. 12, Kesawan, Kota Medan',
  },
  {
    region: 'Sumatera Barat',
    name: 'LBH Padang',
    phone: '(0751) 810996',
    telUri: 'tel:0751810996',
    address: 'Jl. Pekanbaru No. 12, Ulak Karang Selatan, Kota Padang',
  },
  {
    region: 'Riau',
    name: 'LBH Pekanbaru',
    phone: '0821-7000-5253',
    telUri: 'tel:082170005253',
    address: 'Jl. Samarinda No. 12, Tangkerang Utara, Kota Pekanbaru',
  },
  {
    region: 'Sumatera Selatan',
    name: 'LBH Palembang',
    phone: '(0711) 366223',
    telUri: 'tel:0711366223',
    address: 'Jl. HBR Motik Perumahan Grand Gardena, Sukarami, Palembang',
  },
  {
    region: 'Lampung',
    name: 'LBH Bandar Lampung',
    phone: '(0721) 787884',
    telUri: 'tel:0721787884',
    address: 'Jl. Sam Ratulangi No. 41, Penengahan, Kedaton, Bandar Lampung',
  },
  {
    region: 'Bali',
    name: 'LBH Bali',
    phone: '(0361) 484368',
    telUri: 'tel:0361484368',
    address: 'Jl. Plawa No. 57, Sumerta Kauh, Denpasar Timur',
  },
  {
    region: 'Sulawesi Selatan',
    name: 'LBH Makassar',
    phone: '(0411) 872644',
    telUri: 'tel:0411872644',
    address: 'Jl. Pelita Raya VI No. 3, Buakana, Rappocini, Kota Makassar',
  },
  {
    region: 'Sulawesi Utara',
    name: 'LBH Manado',
    phone: '(0431) 852707',
    telUri: 'tel:0431852707',
    address: 'Jl. Flamboyan Bawah No. 27, Sario, Kota Manado',
  },
  {
    region: 'Papua',
    name: 'LBH Papua',
    phone: '0812-4024-9464',
    telUri: 'tel:081240249464',
    address: 'Jl. Padang Bulan No. 7, Abepura, Kota Jayapura',
  },
  {
    region: 'Aceh',
    name: 'LBH Banda Aceh',
    phone: '(0651) 6301321',
    telUri: 'tel:06516301321',
    address: 'Jl. Tuanku Hasyim Banta Muda No. 22, Kuta Alam, Banda Aceh',
  },
];
