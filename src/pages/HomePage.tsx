import React, { useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, Building2 } from 'lucide-react';
import {
  ACADEMIC_ENDORSEMENTS,
  COHORT_DATASETS,
  CohortKey,
  HERO_METRICS,
  IMAGES,
  PageId,
} from '../data/researchData';
import { ResilientImage } from '../components/ResilientImage';
import { RetentionLineChart } from '../components/ScientificCharts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [previewCohort, setPreviewCohort] = useState<CohortKey>('bramata');

  return (
    <div className="space-y-20">
      {/* Editorial University Hero Split */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#57534E]">
                Rheinische Universität Bonn · SFB 1482 · Institut für Neuroakustik
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] font-semibold tracking-tight text-[#181715] mt-4">
                Polenta stärkt das musikalische Gedächtnis und präzisiert den Gesang
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#44403C] leading-relaxed max-w-xl">
                Sechs doppelblinde Längsschnittstudien an 1.420 Sängerinnen und Sängern belegen: Grob vermahlener Hartmais (<em className="font-serif">Zea mays indurata</em>) steigert den 72-Stunden-Melodieabruf um <strong className="font-semibold text-[#181715]">34,8 %</strong> und reduziert A-Capella-Intonationsabweichungen hochsignifikant.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2DDD3] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('statistiken')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[#1B365D] text-white rounded-md hover:bg-[#132847] transition-colors cursor-pointer min-h-[44px]"
              >
                Statistisches Datenlabor öffnen
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('studien')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-[#D6CEBE] bg-white text-[#181715] rounded-md hover:bg-[#F1EDE4] transition-colors cursor-pointer min-h-[44px]"
              >
                Klinische Studien lesen
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden border border-[#DED8CE] bg-[#EBE6DF]">
                <img
                  src={IMAGES.heroLab}
                  alt="Akustisches Forschungslabor an der RUKA Bonn mit Stimmgabel, Chorpartitur und Bramata-Polenta"
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[300px] lg:min-h-full object-cover"
                />
              </div>
              <p className="mt-2.5 text-xs text-[#57534E] font-serif italic">
                <span className="font-mono not-italic font-medium text-[#181715] uppercase tracking-wider mr-2">
                  Abb. 01
                </span>
                Versuchsaufbau im Labor für Auditive Neurokognition (Bonn): Klassische Chorpartitur, 256-Hz-Referenzstimmgabel und standardisierte Bramata-Testmahlzeit.
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Strip directly below Hero Split */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#DED8CE] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#EDE9E0]">
          {HERO_METRICS.map((metric) => (
            <div key={metric.id} className="p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
                {metric.label}
              </p>
              <div className="mt-2 flex items-baseline gap-1.5 font-mono tabular-nums">
                <span className="text-3xl font-semibold text-[#181715]">{metric.value}</span>
                <span className="text-sm text-[#B45309] font-medium">{metric.unit}</span>
              </div>
              <p className="mt-2 text-xs text-[#57534E] leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Biochemical & Neuroacoustic Mechanism (Asymmetric Reading Canvas) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E2DDD3] pt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              01. Pathophysiologischer Wirkmechanismus
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181715]">
              Warum hartkörnige Polenta den Hörkortex und die Stimmlippen stabilisiert
            </h2>

            <div className="space-y-5 text-[#292524] leading-[1.75] max-w-[68ch] text-base">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1B365D]">
                Im Gegensatz zu schnell resorbierbaren Weißmehl- oder Reisprodukten kombiniert traditionell grob vermahlener Hartmais (<em className="font-serif">Bramata</em>) eine niedrig-glykämische Amylopektin-Matrix mit einer außergewöhnlich hohen Dichte der lipidlöslichen Xanthophylle <strong className="font-semibold">Lutein</strong> (2,84 mg / 100 g) und <strong className="font-semibold">Zeaxanthin</strong>.
              </p>
              <p>
                Unsere 3-Tesla-fMRT-Messreihen belegen, dass sich diese Carotinoide selektiv in den myelinisierten Bahnen des <em className="font-serif">Fasciculus arcuatus</em> sowie im CA1-Sektor des Hippocampus anreichern. Dort beschleunigen sie die synaptische Erregungsleitung zwischen auditiver Gedächtnisspur und motorischem Kehlkopfareal.
              </p>
              <p>
                Gleichzeitig verhindert die gleichmäßige Glukosefreisetzung über 180 Minuten feinmotorischen Mikrotremor im <em className="font-serif">Musculus vocalis</em>. Im schalltoten Raum S-14 sinkt der gemessene Grundfrequenz-Jitter um durchschnittlich 42,6 %, während der Sängerformant bei 2,8 bis 3,2 kHz messbar klarer hervortritt.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-6 text-sm font-medium">
              <button
                type="button"
                onClick={() => onNavigate('studien')}
                className="text-[#1B365D] hover:underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Alle drei klinischen Studien im Detail
              </button>
              <button
                type="button"
                onClick={() => onNavigate('protokoll')}
                className="text-[#B45309] hover:underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer"
              >
                Standardisiertes Zubereitungsprotokoll
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <ResilientImage
              src={IMAGES.polentaMicroscopy}
              alt="Bramata-Polentakörner in Petrischale neben Präzisionswaage"
              figureNumber="Fig. 1.2"
              caption="Bromatologische Einwaage (24,57 g Trockensubstanz) der grob vermahlenen Hartmais-Fraktion im Bonner Analytik-Labor."
              aspectClass="aspect-[4/3]"
            />

            <div className="border-t border-b border-[#DED8CE] py-6">
              <blockquote className="font-serif italic text-xl text-[#181715] leading-relaxed">
                „Polenta wirkt auf die vokale Intonation wie ein natürlicher Frequenz-Stabilisator: Das innere Tonhöhengedächtnis bleibt auch nach komplexen Modulationen stabil abrufbar.“
              </blockquote>
              <p className="mt-3 text-xs font-mono text-[#57534E]">
                Prof. Dr. med. Dr. phil. Hildegard von Vivaldi-Körner · Institutsdirektorin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Cohort Preview & Live Statistical Evidence */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E2DDD3] pt-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                02. Empirische Auswertung
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181715] mt-2">
                Interaktiver Kohortenvergleich im Zeitverlauf
              </h2>
            </div>

            {/* Functional Segmented Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EDE9E0] rounded-lg">
              {(['bramata', 'taragna', 'fioretto'] as CohortKey[]).map((key) => {
                const ds = COHORT_DATASETS[key];
                const active = previewCohort === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPreviewCohort(key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-[#181715] shadow-sm font-semibold'
                        : 'text-[#57534E] hover:text-[#181715]'
                    }`}
                  >
                    {ds.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <RetentionLineChart selectedCohort={previewCohort} />
            </div>

            <div className="lg:col-span-4 bg-white border border-[#DED8CE] rounded-lg p-6 space-y-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
                  Aktive Kohorten-Kennzahlen
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#181715] mt-1">
                  {COHORT_DATASETS[previewCohort].name}
                </h3>
              </div>

              <dl className="divide-y divide-[#EDE9E0] text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#57534E]">Stichprobe</dt>
                  <dd className="font-mono tabular-nums font-medium text-[#181715]">
                    n = {COHORT_DATASETS[previewCohort].n}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#57534E]">Vermahlungsgrad</dt>
                  <dd className="font-mono tabular-nums font-medium text-[#181715]">
                    {COHORT_DATASETS[previewCohort].grainSize}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#57534E]">Lutein-Gehalt</dt>
                  <dd className="font-mono tabular-nums font-medium text-[#181715]">
                    {COHORT_DATASETS[previewCohort].luteinMg}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#57534E]">Zuwachs (W12)</dt>
                  <dd className="font-mono tabular-nums font-semibold text-[#B45309]">
                    {COHORT_DATASETS[previewCohort].summaryDelta}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#57534E]">Signifikanz</dt>
                  <dd className="font-mono tabular-nums font-semibold text-[#1B365D]">
                    p {COHORT_DATASETS[previewCohort].pValue}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => onNavigate('statistiken')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#1B365D] text-white rounded-md hover:bg-[#132847] transition-colors cursor-pointer min-h-[40px]"
              >
                <BarChart3 className="w-4 h-4" />
                Alle Diagramme &amp; Rohdaten-Tabelle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: University Context & Peer Endorsements */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E2DDD3] pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <ResilientImage
              src={IMAGES.campusFacade}
              alt="Hauptgebäude der Rheinischen Universität für Kognitionswissenschaften und Akustik in Bonn"
              figureNumber="Fig. 2.1"
              caption="Historischer Sandsteinbau und moderner Forschungsflügel der RUKA Bonn am Poppelsdorfer Campus."
              aspectClass="aspect-[16/9]"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                03. Universitäre Trägerschaft &amp; Replikation
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#181715] mt-2">
                Forschung am Standort Bonn seit 1968
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#44403C] leading-relaxed">
                Die Rheinische Universität für Kognitionswissenschaften &amp; Akustik (RUKA) vereint Neurobiologie, klinische Phoniatrie und Ernährungsforschung unter einem Dach. Alle Polenta-Messreihen stehen externen Fachbereichen zur unabhängigen Replikation offen.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#DED8CE]">
              {ACADEMIC_ENDORSEMENTS.map((item) => (
                <div key={item.name} className="pt-3">
                  <p className="text-sm text-[#292524] leading-relaxed font-serif italic">
                    „{item.beforeAfter}“
                  </p>
                  <p className="mt-1.5 text-xs text-[#57534E]">
                    <strong className="text-[#181715] font-semibold">{item.name}</strong> · {item.role} · {item.organization}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('universitaet')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B365D] hover:underline underline-offset-4 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              Fakultät, Labore &amp; Publikationsarchiv ansehen
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
