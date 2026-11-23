import React from 'react';
import { PageId } from '../data/researchData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E2DDD3] bg-[#F1EDE4] text-[#57534E] mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#DED8CE]">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif text-lg font-semibold text-[#181715]">
              Rheinische Universität für Kognitionswissenschaften &amp; Akustik (RUKA Bonn)
            </p>
            <p className="text-sm leading-relaxed max-w-md">
              Institut für Neuroakustik, Stimmphysiologie und Ernährungskognition · Sonderforschungsbereich 1482: „Zerebrale Resonanzerzeugung &amp; Zea-mays-Metabolismus“.
            </p>
            <p className="text-xs font-mono text-[#78716C] pt-1">
              Poppelsdorfer Allee 47 · 53115 Bonn · Deutschland
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#181715]">
              Forschungsbereiche
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('forschung')}
                  className="hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  Übersicht &amp; Kernthese
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('studien')}
                  className="hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  Klinische Studien &amp; Methodik
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('statistiken')}
                  className="hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  Statistisches Datenlabor
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#181715]">
              Institution &amp; Transfer
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('universitaet')}
                  className="hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  Fakultät, Campus &amp; Publikationen
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('protokoll')}
                  className="hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  Polenta-Protokoll &amp; Studienteilnahme
                </button>
              </li>
              <li className="text-xs font-mono text-[#78716C] pt-1">
                Ethikvotum: EK-RUKA-2022/114 · ISSN 2749-8821
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© 2026 Institut für Neuroakustik &amp; Ernährungsphysiologie, RUKA Bonn.</p>
          <p className="font-mono">
            Alle Messreihen nach DIN EN ISO 8253 &amp; Helsinki-Deklaration
          </p>
        </div>
      </div>
    </footer>
  );
};
