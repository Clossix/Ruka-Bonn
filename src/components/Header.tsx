import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../data/researchData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'forschung', label: 'Forschung' },
  { id: 'studien', label: 'Studien' },
  { id: 'statistiken', label: 'Statistiken' },
  { id: 'universitaet', label: 'Universität' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E2DDD3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('forschung')}
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#181715] hover:text-[#1B365D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B365D]"
        >
          RUKA Bonn
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B365D] ${
                  isActive
                    ? 'text-[#181715] font-semibold'
                    : 'text-[#57534E] hover:text-[#181715]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[1.5px] bg-[#1B365D]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('protokoll')}
            className={`hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B365D] ${
              currentPage === 'protokoll'
                ? 'bg-[#B45309] text-white'
                : 'bg-[#1B365D] text-white hover:bg-[#132847]'
            }`}
          >
            Protokoll &amp; Teilnahme
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#DED8CE] text-[#181715] hover:bg-[#F1EDE4] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2DDD3] bg-[#FAF8F4] px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#EBE6DF] text-[#181715] font-semibold'
                  : 'text-[#57534E] hover:bg-[#F1EDE4] hover:text-[#181715]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav('protokoll')}
            className="block w-full text-left px-3 py-2.5 text-sm font-semibold rounded-md bg-[#1B365D] text-white mt-2 cursor-pointer"
          >
            Protokoll &amp; Teilnahme
          </button>
        </div>
      )}
    </header>
  );
};
