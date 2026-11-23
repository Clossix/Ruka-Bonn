import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import {
  FACULTY_MEMBERS,
  IMAGES,
  PUBLICATIONS,
} from '../data/researchData';
import { ResilientImage } from '../components/ResilientImage';

export const UniversityPage: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(FACULTY_MEMBERS[0].id);
  const [pubYearFilter, setPubYearFilter] = useState<string>('alle');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMember =
    FACULTY_MEMBERS.find((m) => m.id === selectedMemberId) ?? FACULTY_MEMBERS[0];

  const filteredPubs =
    pubYearFilter === 'alle'
      ? PUBLICATIONS
      : PUBLICATIONS.filter((p) => p.year === pubYearFilter);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bibtex).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
      {/* Header & Campus Split */}
      <section className="space-y-8">
        <div className="border-b border-[#E2DDD3] pb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
            Unterseite 03 · Institutioneller Hintergrund &amp; Lehrstühle
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#181715] mt-2 leading-tight">
            Rheinische Universität für Kognitionswissenschaften &amp; Akustik
          </h1>
          <p className="mt-4 text-base text-[#44403C] leading-relaxed max-w-[70ch]">
            Gegründet 1968 in Bonn, verbindet die RUKA klinische Neurowissenschaften, klassische Vokalakustik und Stoffwechselphysiologie. Das Institut für Neuroakustik und Ernährungsphysiologie (INEP) koordiniert seit 2022 den Sonderforschungsbereich 1482.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7">
            <ResilientImage
              src={IMAGES.campusFacade}
              alt="Hauptcampus der RUKA Bonn am Poppelsdorfer Platz"
              figureNumber="Abb. U-1"
              caption="Historischer Sandsteinbau (1894, heute Fakultät für Musikpsychologie) mit dem 2019 eröffneten gläsernen Bildgebungs- und Bromatologietrakt."
              aspectClass="aspect-[16/9]"
            />
          </div>

          <div className="lg:col-span-5 bg-white border border-[#DED8CE] rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
                Infrastruktur &amp; Laborkapazität
              </p>
              <h2 className="font-serif text-2xl font-semibold text-[#181715]">
                Forschungseinrichtungen am Standort Bonn
              </h2>
              <dl className="divide-y divide-[#EDE9E0] text-sm pt-2">
                <div className="py-3">
                  <dt className="font-semibold text-[#181715]">Schalltotenraum S-14</dt>
                  <dd className="text-[#57534E] mt-0.5">
                    Freifeld-Messkammer (Grundgeräuschpegel &lt; 11 dB(A)), 192-kHz-Kondensator-Array und Elektroglottographie.
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-semibold text-[#181715]">3-Tesla-fMRT-Akustiksuite</dt>
                  <dd className="text-[#57534E] mt-0.5">
                    Optische MR-Mikrofonie für stimmlose und stimmhafte Singaufgaben während laufender BOLD-Bildgebung.
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-semibold text-[#181715]">Bromatologisches Zea-mays-Labor</dt>
                  <dd className="text-[#57534E] mt-0.5">
                    HPLC-MS/MS-Carotinoid-Analytik, standardisierte Kupferkessel-Versuchsküche und Granulometrie-Siebanlage.
                  </dd>
                </div>
              </dl>
            </div>
            <p className="text-xs font-mono text-[#78716C] pt-4 border-t border-[#EDE9E0]">
              Akkreditiert durch den Wissenschaftsrat · 42 wissenschaftliche Mitarbeitende
            </p>
          </div>
        </div>
      </section>

      {/* Faculty & Principal Investigators */}
      <section className="border-t border-[#E2DDD3] pt-12 space-y-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
            Wissenschaftliche Leitung
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#181715] mt-1">
            Lehrstuhlinhaber &amp; Forschungsteam
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selectable Faculty Directory */}
          <div className="lg:col-span-5 divide-y divide-[#DED8CE] border border-[#DED8CE] bg-white rounded-lg overflow-hidden">
            {FACULTY_MEMBERS.map((member) => {
              const isSelected = member.id === activeMember.id;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`w-full text-left p-5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#F1EDE4]' : 'bg-white hover:bg-[#FAF8F4]'
                  }`}
                >
                  <p className="text-xs font-mono text-[#78716C]">{member.role}</p>
                  <p className="font-serif text-lg font-semibold text-[#181715] mt-1">
                    {member.name}
                  </p>
                  <p className="text-xs text-[#57534E] mt-1">{member.title}</p>
                </button>
              );
            })}
          </div>

          {/* Active Faculty Dossier */}
          <div className="lg:col-span-7 bg-white border border-[#DED8CE] rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#1B365D]">
                {activeMember.role} · {activeMember.chair}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#181715] mt-2">
                {activeMember.name}
              </h3>
              <p className="text-sm text-[#57534E] mt-1">{activeMember.title}</p>
            </div>

            <div className="border-t border-b border-[#EDE9E0] py-5">
              <blockquote className="font-serif italic text-lg text-[#181715] leading-relaxed">
                „{activeMember.quote}“
              </blockquote>
            </div>

            <div className="space-y-3 text-sm text-[#292524] leading-relaxed">
              <p>
                <strong className="text-[#181715]">Forschungsschwerpunkte:</strong> {activeMember.focus}
              </p>
              <p>
                <strong className="text-[#181715]">Akademischer Werdegang:</strong> {activeMember.biography}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#57534E]">
              <Mail className="w-3.5 h-3.5 text-[#1B365D]" />
              <span>Kontakt: {activeMember.email}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Archive with BibTeX Copy */}
      <section className="border-t border-[#E2DDD3] pt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              Peer-Reviewed Archiv
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#181715] mt-1">
              Ausgewählte Publikationen
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#EDE9E0] rounded-lg self-start sm:self-auto">
            {['alle', '2026', '2025', '2024'].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setPubYearFilter(yr)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  pubYearFilter === yr
                    ? 'bg-white text-[#181715] shadow-sm font-semibold'
                    : 'text-[#57534E] hover:text-[#181715]'
                }`}
              >
                {yr === 'alle' ? 'Alle Jahre' : yr}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#DED8CE] border border-[#DED8CE] bg-white rounded-lg">
          {filteredPubs.map((pub) => (
            <div key={pub.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <p className="text-xs font-mono text-[#57534E]">
                  <span className="text-[#1B365D] font-semibold">{pub.year}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{pub.journal}</span>
                  <span aria-hidden="true"> · </span>
                  <span>DOI: {pub.doi}</span>
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#181715] leading-snug">
                  {pub.title}
                </h3>
                <p className="text-sm text-[#57534E]">{pub.authors}</p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium border border-[#D6CEBE] bg-[#FAF8F4] text-[#181715] rounded-md hover:bg-[#F1EDE4] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start"
              >
                {copiedId === pub.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14532D]" />
                    BibTeX kopiert
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#1B365D]" />
                    BibTeX kopieren
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
