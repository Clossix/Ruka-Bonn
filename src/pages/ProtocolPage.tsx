import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type VoiceType = 'sopran' | 'alt' | 'tenor' | 'bass';

export const ProtocolPage: React.FC = () => {
  // Interactive Prognosis Calculator State
  const [polentaPortions, setPolentaPortions] = useState<number>(5);
  const [practiceHours, setPracticeHours] = useState<number>(6);
  const [voiceType, setVoiceType] = useState<VoiceType>('sopran');
  const [baselineCent, setBaselineCent] = useState<number>(18);

  // Study Enrollment Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ensemble, setEnsemble] = useState('');
  const [preferredCohort, setPreferredCohort] = useState<'bonn' | 'extern'>('bonn');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Regression estimate grounded in RUKA SFB-1482 coefficients
  const voiceFactor: Record<VoiceType, number> = {
    sopran: 1.04,
    alt: 1.0,
    tenor: 1.06,
    bass: 0.98,
  };

  const memoryGainPct = Math.min(
    41.5,
    +(polentaPortions * 4.4 + practiceHours * 1.15 * voiceFactor[voiceType]).toFixed(1)
  );
  const projectedCent = Math.max(
    6.2,
    +(baselineCent * (1 - Math.min(0.46, polentaPortions * 0.056 + 0.04))).toFixed(1)
  );
  const centImprovement = +(baselineCent - projectedCent).toFixed(1);

  const handleEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !email.includes('@')) {
      setFormError('Bitte geben Sie Ihren vollständigen Namen sowie eine gültige E-Mail-Adresse an.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
      {/* Header */}
      <div className="border-b border-[#E2DDD3] pb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
          Unterseite 04 · Standardisiertes Zubereitungsprotokoll &amp; Kohortenanmeldung
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#181715] mt-2 leading-tight">
          RUKA-Polenta-Protokoll &amp; Prognoserechner
        </h1>
        <p className="mt-4 text-base text-[#44403C] leading-relaxed max-w-[70ch]">
          Damit die in unseren Bonner Studien gemessene Carotinoid-Bioverfügbarkeit erreicht wird, müssen Vermahlungsgrad, Quellzeit und Fettphase exakt eingehalten werden. Untenstehend finden Sie das klinische Standardrezept sowie den multivariaten Leistungsrechner.
        </p>
      </div>

      {/* Culinary-Biochemical Standard Protocol */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-white border border-[#DED8CE] rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#B45309]">
              Klinische Dosiervorschrift · SOP-INEP-09
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#181715] mt-1">
              Zubereitung für maximale Lutein-Resorption
            </h2>
          </div>

          <dl className="divide-y divide-[#EDE9E0] text-sm">
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#57534E]">Maisfraktion</dt>
              <dd className="font-mono font-medium text-[#181715]">
                Bramata (720–950 µm), 45 g Trockengewicht
              </dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#57534E]">Flüssigkeitsverhältnis</dt>
              <dd className="font-mono font-medium text-[#181715]">1 : 4 (180 ml Quellwasser, 0,8 g NaCl)</dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#57534E]">Quellzeit &amp; Gefäß</dt>
              <dd className="font-mono font-medium text-[#181715]">42 Minuten bei 92 °C (Kupfer- oder Gusstopf)</dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#57534E]">Lipid-Träger (essenziell)</dt>
              <dd className="font-mono font-medium text-[#181715]">8 ml natives Olivenöl extra nach Kochende</dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#57534E]">Optimales Einnahmefenster</dt>
              <dd className="font-mono font-semibold text-[#1B365D]">75–90 Minuten vor Probe oder Auftritt</dd>
            </div>
          </dl>

          <p className="text-xs text-[#57534E] leading-relaxed pt-2">
            Hinweis: Instant-Polenta (vorgegart, &lt; 5 min Kochzeit) reduziert die beobachtete Gedächtnissteigerung in Kontrolltests um 68 %, da hitzeempfindliches Zeaxanthin durch industrielle Dampfdrucktrocknung abgebaut wird.
          </p>
        </div>

        {/* Interactive Prognosis Calculator */}
        <div className="lg:col-span-6 bg-white border border-[#DED8CE] rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#1B365D]">
              Interaktives Regressionsmodell (R² = 0,74)
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#181715] mt-1">
              Prognoserechner für 12-Wochen-Effekte
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <label htmlFor="portions-slider" className="text-[#181715] font-medium">
                  Polenta-Mahlzeiten pro Woche
                </label>
                <span className="text-[#1B365D] font-semibold tabular-nums">
                  {polentaPortions} × 180 g / Woche
                </span>
              </div>
              <input
                id="portions-slider"
                type="range"
                min={1}
                max={7}
                step={1}
                value={polentaPortions}
                onChange={(e) => setPolentaPortions(Number(e.target.value))}
                className="w-full accent-[#1B365D] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <label htmlFor="practice-slider" className="text-[#181715] font-medium">
                  Wöchentliche Gesangs- &amp; Hörübungszeit
                </label>
                <span className="text-[#1B365D] font-semibold tabular-nums">
                  {practiceHours} Stunden / Woche
                </span>
              </div>
              <input
                id="practice-slider"
                type="range"
                min={1}
                max={15}
                step={1}
                value={practiceHours}
                onChange={(e) => setPracticeHours(Number(e.target.value))}
                className="w-full accent-[#1B365D] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="voice-select" className="block text-xs font-mono text-[#181715] font-medium mb-1.5">
                  Stimmlage
                </label>
                <select
                  id="voice-select"
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value as VoiceType)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D6CEBE] rounded-md text-[#181715]"
                >
                  <option value="sopran">Sopran</option>
                  <option value="alt">Alt / Mezzosopran</option>
                  <option value="tenor">Tenor</option>
                  <option value="bass">Bariton / Bass</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <label htmlFor="cent-input" className="text-[#181715] font-medium">
                    Aktuelle Streuung (Cent)
                  </label>
                  <span className="tabular-nums text-[#57534E]">{baselineCent} ct</span>
                </div>
                <input
                  id="cent-input"
                  type="range"
                  min={10}
                  max={30}
                  step={1}
                  value={baselineCent}
                  onChange={(e) => setBaselineCent(Number(e.target.value))}
                  className="w-full accent-[#B45309] cursor-pointer mt-2"
                />
              </div>
            </div>
          </div>

          {/* Calculated Statistical Projection */}
          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#EDE9E0]">
            <div className="p-4 bg-[#FAF8F4] border border-[#EDE9E0] rounded">
              <p className="text-xs font-mono text-[#78716C]">Erwarteter Gedächtniszuwachs</p>
              <p className="text-2xl font-mono tabular-nums font-semibold text-[#1B365D] mt-1">
                +{memoryGainPct.toFixed(1).replace('.', ',')} %
              </p>
            </div>
            <div className="p-4 bg-[#FAF8F4] border border-[#EDE9E0] rounded">
              <p className="text-xs font-mono text-[#78716C]">Prognostizierte Intonation</p>
              <p className="text-2xl font-mono tabular-nums font-semibold text-[#B45309] mt-1">
                {projectedCent.toFixed(1).replace('.', ',')} ct
              </p>
              <p className="text-[11px] font-mono text-[#57534E] mt-0.5">
                Verbesserung: -{centImprovement.toFixed(1).replace('.', ',')} ct
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Enrollment Form */}
      <section className="bg-white border border-[#DED8CE] rounded-lg p-6 sm:p-10">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
            Replikationsstudie VII · Herbstsemester 2026
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#181715] mt-1">
            Anmeldung zur nächsten Bonner Probandenkohorte
          </h2>
          <p className="mt-3 text-sm text-[#44403C] leading-relaxed">
            Gesucht werden Chorsängerinnen, Chorsänger und Gesangsstudierende (18–65 Jahre) für die siebenwöchige Herbstmessreihe in Bonn sowie als digitale Heimmess-Kohorte.
          </p>

          {!submitted ? (
            <form onSubmit={handleEnrollment} className="mt-6 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enroll-name" className="block text-xs font-medium text-[#181715] mb-1.5">
                    Vollständiger Name *
                  </label>
                  <input
                    id="enroll-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="z. B. Johanna Bachmann"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#D6CEBE] rounded-md text-[#181715] focus:outline-2 focus:outline-[#1B365D]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="enroll-email" className="block text-xs font-medium text-[#181715] mb-1.5">
                    E-Mail-Adresse *
                  </label>
                  <input
                    id="enroll-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@beispiel.de"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#D6CEBE] rounded-md text-[#181715] focus:outline-2 focus:outline-[#1B365D]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enroll-ensemble" className="block text-xs font-medium text-[#181715] mb-1.5">
                    Chor / Musikhochschule (optional)
                  </label>
                  <input
                    id="enroll-ensemble"
                    type="text"
                    value={ensemble}
                    onChange={(e) => setEnsemble(e.target.value)}
                    placeholder="z. B. Universitätschor Bonn"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#D6CEBE] rounded-md text-[#181715] focus:outline-2 focus:outline-[#1B365D]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#181715] mb-1.5">
                    Teilnahmeformat
                  </span>
                  <div className="flex items-center gap-1 p-1 bg-[#EDE9E0] rounded-md">
                    <button
                      type="button"
                      onClick={() => setPreferredCohort('bonn')}
                      className={`flex-1 py-2 text-xs font-medium rounded transition-colors cursor-pointer ${
                        preferredCohort === 'bonn'
                          ? 'bg-white text-[#181715] shadow-sm font-semibold'
                          : 'text-[#57534E]'
                      }`}
                    >
                      Präsenz (Bonn S-14)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredCohort('extern')}
                      className={`flex-1 py-2 text-xs font-medium rounded transition-colors cursor-pointer ${
                        preferredCohort === 'extern'
                          ? 'bg-white text-[#181715] shadow-sm font-semibold'
                          : 'text-[#57534E]'
                      }`}
                    >
                      Externe Heimkohorte
                    </button>
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-medium text-[#9A3412]" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-[#1B365D] text-white rounded-md hover:bg-[#132847] transition-colors cursor-pointer min-h-[44px]"
              >
                Unverbindliche Teilnahme registrieren
              </button>
            </form>
          ) : (
            <div className="mt-6 p-6 bg-[#FAF8F4] border border-[#DED8CE] rounded-md space-y-2">
              <div className="flex items-center gap-2 text-[#14532D] font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Registrierung im Studienregister vorgemerkt</span>
              </div>
              <p className="text-sm text-[#44403C] leading-relaxed">
                Vielen Dank, <strong className="text-[#181715]">{fullName}</strong>. Ihre Interessensbekundung für das Format{' '}
                <span className="font-mono">
                  {preferredCohort === 'bonn' ? 'Präsenzlabor Bonn S-14' : 'Externe Heimkohorte'}
                </span>{' '}
                wurde erfasst. Sie erhalten die Einverständniserklärung und das Bramata-Starterpaket-Protokoll an <span className="font-mono">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setEnsemble('');
                }}
                className="text-xs font-semibold text-[#1B365D] hover:underline pt-2 cursor-pointer"
              >
                Weitere Person registrieren
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
