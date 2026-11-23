import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { CLINICAL_STUDIES, IMAGES, PageId } from '../data/researchData';
import { ResilientImage } from '../components/ResilientImage';

interface StudiesPageProps {
  onNavigate: (page: PageId) => void;
}

type StudyFilter = 'alle' | 'neuroakustik' | 'stimmphysiologie' | 'biochemie';

export const StudiesPage: React.FC<StudiesPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<StudyFilter>('alle');
  const [expandedId, setExpandedId] = useState<string>('ruka-2026-01');

  const filteredStudies =
    filter === 'alle'
      ? CLINICAL_STUDIES
      : CLINICAL_STUDIES.filter((s) => s.category === filter);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#E2DDD3] pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
            Unterseite 01 · Klinische Versuchsreihen (2022–2026)
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#181715] mt-2 leading-tight">
            Klinische Studien &amp; Experimentelle Methodik
          </h1>
          <p className="mt-4 text-base text-[#44403C] leading-relaxed max-w-[68ch]">
            Dokumentation der drei Hauptstudien des Sonderforschungsbereichs 1482 an der RUKA Bonn. Alle Interventionen wurden randomisiert, doppelblind und isokalorisch gegen sensorisch angeglichene Weizen- und Reispräparate kontrolliert.
          </p>
        </div>

        <div className="lg:col-span-5 flex lg:justify-end">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EDE9E0] rounded-lg">
            {(
              [
                { id: 'alle', label: 'Alle (3)' },
                { id: 'neuroakustik', label: 'Gedächtnis' },
                { id: 'stimmphysiologie', label: 'Gesang' },
                { id: 'biochemie', label: 'fMRT & Biochemie' },
              ] as { id: StudyFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-[#181715] shadow-sm font-semibold'
                    : 'text-[#57534E] hover:text-[#181715]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Methodology Split Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-[#DED8CE] rounded-lg overflow-hidden">
        <div className="lg:col-span-5">
          <img
            src={IMAGES.fmriStudy}
            alt="Wissenschaftlerin im schalltoten Akustiklabor bei der Auswertung von fMRT-Auditionsscans und Stimmspektrogrammen"
            referrerPolicy="no-referrer"
            className="w-full h-full min-h-[240px] object-cover"
          />
        </div>
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Standardisierte Messumgebung · Schalltotenraum S-14 &amp; 3T-fMRT
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#181715] mt-2">
              Vom Verzehr bis zur Spektrographie: Dreistufige Verifizierung
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#44403C] leading-relaxed">
              Um subjektive Verzerrungen auszuschließen, kombiniert jede Bonner Versuchsreihe drei objektive Messverfahren: (1) HPLC-Blutplasmaspiegel der Mais-Carotinoide, (2) 64-Kanal-EEG sowie 3-Tesla-fMRT beim mentalen Abruf achtstimmiger Phrasen und (3) elektroglottographische Stimmfeldmessung bei 192 kHz.
            </p>
          </div>
          <div className="pt-4 border-t border-[#EDE9E0] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#57534E]">
            <span>Ethikkommission: EK-RUKA-2022/114</span>
            <button
              type="button"
              onClick={() => onNavigate('statistiken')}
              className="inline-flex items-center gap-1.5 text-[#1B365D] font-sans font-semibold hover:underline cursor-pointer"
            >
              Zu den statistischen Rohdaten
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Studies List */}
      <div className="space-y-6">
        {filteredStudies.map((study) => {
          const isOpen = expandedId === study.id;
          return (
            <article
              key={study.id}
              className="bg-white border border-[#DED8CE] rounded-lg p-6 sm:p-8 transition-colors"
            >
              {/* Clean unboxed metadata row (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#57534E]">
                <span className="font-semibold text-[#1B365D]">{study.code}</span>
                <span aria-hidden="true">·</span>
                <span>{study.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{study.year}</span>
                <span aria-hidden="true">·</span>
                <span>DOI: {study.doi}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#181715] mt-3 leading-snug">
                {study.title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#57534E]">
                <span>
                  <strong className="text-[#181715]">Kohorte:</strong> {study.cohort}
                </span>
                <span>
                  <strong className="text-[#181715]">Dauer:</strong> {study.duration}
                </span>
                <span>
                  <strong className="text-[#181715]">Leitung:</strong> {study.leadInvestigator}
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-[#44403C] leading-relaxed max-w-[72ch]">
                {study.abstract}
              </p>

              <div className="mt-5 pt-4 border-t border-[#EDE9E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm font-mono font-medium text-[#B45309]">
                  Hauptergebnis: {study.keyFinding}
                </p>

                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? '' : study.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B365D] hover:underline whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  {isOpen ? 'Methodik & Biochemie schließen' : 'Methodik & Biochemie einblenden'}
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isOpen && (
                <div className="mt-6 pt-6 border-t border-[#EDE9E0] grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#78716C] mb-3">
                      Versuchsprotokoll &amp; Instrumentierung
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#292524] leading-relaxed list-disc pl-4">
                      {study.methodology.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#78716C] mb-3">
                      Biochemischer &amp; Neurophysiologischer Pfad
                    </h4>
                    <p className="text-sm text-[#292524] leading-relaxed">
                      {study.biochemicalPathway}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Bottom Figure Reference */}
      <div className="pt-4">
        <ResilientImage
          src={IMAGES.polentaMicroscopy}
          alt="Mikroskopische und gravimetrische Polenta-Analyse an der RUKA Bonn"
          figureNumber="Fig. 3.1"
          caption="Vergleichende Siebanalyse (720–950 µm Bramata vs. 280–410 µm Fioretto). Größere Endosperm-Partikel verlangsamen die gastrische Entleerung und stabilisieren den Blutzuckerspiegel über drei Stunden Gesangspraxis."
          aspectClass="aspect-[16/9]"
          className="max-w-3xl"
        />
      </div>
    </div>
  );
};
