import React, { useState } from 'react';
import { X, Search, PhoneCall, MapPin, Building, ShieldCheck } from 'lucide-react';
import { LBH_OFFICES } from '../data/lbhOffices';
import { EMERGENCY_CONTACTS } from '../data/legalData';

interface LBHDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LBHDirectoryModal: React.FC<LBHDirectoryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredOffices = LBH_OFFICES.filter(
    (item) =>
      item.region.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lbh-directory-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-slate-800 shrink-0" />
            <div>
              <h2 id="lbh-directory-title" className="font-bold text-base text-slate-900 leading-tight">
                Direktori Bantuan Hukum (LBH &amp; Lembaga HAM)
              </h2>
              <p className="text-xs text-slate-500">
                Lembaga resmi pemberi bantuan hukum cuma-cuma bagi warga
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* National Hotlines Banner */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <a
            href={EMERGENCY_CONTACTS.ylbhi.telUri}
            className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-900 truncate">YLBHI Pusat</div>
              <div className="text-[11px] text-slate-500 truncate">(021) 3929840</div>
            </div>
          </a>
          <a
            href={EMERGENCY_CONTACTS.kontras.telUri}
            className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-900 truncate">KontraS</div>
              <div className="text-[11px] text-slate-500 truncate">0812-888-22669</div>
            </div>
          </a>
          <a
            href={EMERGENCY_CONTACTS.komnasHam.telUri}
            className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 flex items-center gap-1.5 col-span-2 sm:col-span-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-900 truncate">Komnas HAM</div>
              <div className="text-[11px] text-slate-500 truncate">1500-148</div>
            </div>
          </a>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari provinsi / kota (misal: Surabaya, Bandung, Medan)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-slate-300 focus:outline-none"
            />
          </div>
        </div>

        {/* List of Offices */}
        <div className="p-3 overflow-y-auto space-y-2">
          {filteredOffices.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Tidak ditemukan kantor wilayah untuk "{search}". Anda dapat menghubungi hotline YLBHI Pusat di (021) 3929840.
            </div>
          ) : (
            filteredOffices.map((office) => (
              <div
                key={office.name}
                className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900">{office.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">· {office.region}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{office.address}</span>
                  </div>
                </div>

                <a
                  href={office.telUri}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{office.phone}</span>
                </a>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
