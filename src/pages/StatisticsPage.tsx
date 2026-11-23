import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import {
  COHORT_DATASETS,
  CohortKey,
  STATISTICAL_MATRIX,
} from '../data/researchData';
import {
  IntonationBarChart,
  RetentionLineChart,
  VocalRadarChart,
} from '../components/ScientificCharts';

export const StatisticsPage: React.FC = () => {
  const [selectedCohort, setSelectedCohort] = useState<CohortKey>('bramata');
  const [exported, setExported] = useState(false);

  const activeDataset = COHORT_DATASETS[selectedCohort];

  const handleExportCsv = () => {
    const header = [
      'Parameter',
      'Einheit',
      'Baseline (W0)',
      'Bramata (W12)',
      'Kontrollgruppe (W12)',
      '95%-Konfidenzintervall',
      'Cohens d',
      'p-Wert',
    ].join(';');

    const rows = STATISTICAL_MATRIX.map((r) =>
      [
        `"${r.parameter}"`,
        `"${r.unit}"`,
        `"${r.baseline}"`,
        `"${r.bramata12W}"`,
        `"${r.control12W}"`,
        `"${r.ci95}"`,
        `"${r.cohensD}"`,
        `"${r.pValue}"`,
      ].join(';')
    );

    const csvContent = '\uFEFF' + [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ruka_bonn_polenta_statistik_${selectedCohort}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
      {/* Page Header & Cohort Selector */}
      <div className="border-b border-[#E2DDD3] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
            Unterseite 02 · Biostatistisches Datenlabor (n = 1.420)
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#181715] mt-2 leading-tight">
            Statistische Auswertung &amp; Kohorten-Analyse
          </h1>
          <p className="mt-3 text-base text-[#44403C] leading-relaxed max-w-[65ch]">
            Wählen Sie eine Polenta-Interventionskohorte, um die Effektstärken auf musikalisches Langzeitgedächtnis, Cent-Intonation und laryngeale Stabilität im Vergleich zur isokalorischen Kontrollgruppe zu untersuchen.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border border-[#D6CEBE] text-[#181715] rounded-md hover:bg-[#F1EDE4] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            {exported ? (
              <>
                <Check className="w-4 h-4 text-[#14532D]" />
                CSV heruntergeladen
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#1B365D]" />
                Daten als CSV exportieren
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cohort Filter Tabs + Summary Metrics Ribbon */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EDE9E0] rounded-lg">
            {(['bramata', 'taragna', 'fioretto', 'kontrolle'] as CohortKey[]).map((key) => {
              const ds = COHORT_DATASETS[key];
              const isActive = selectedCohort === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCohort(key)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#181715] shadow-sm font-semibold'
                      : 'text-[#57534E] hover:text-[#181715]'
                  }`}
                >
                  {ds.shortName}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-mono text-[#57534E]">
            Aktive Stichprobe: <strong className="text-[#181715]">n = {activeDataset.n}</strong> · Körnung: {activeDataset.grainSize} · Lutein: {activeDataset.luteinMg}
          </p>
        </div>

        {/* 4 Summary Cards for Active Cohort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#DED8CE] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#EDE9E0]">
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Behaltensquote (W12)
            </p>
            <p className="mt-1.5 text-2xl font-mono tabular-nums font-semibold text-[#181715]">
              {activeDataset.retentionCurve[6].toFixed(1).replace('.', ',')} %
            </p>
            <p className="mt-1 text-xs font-mono text-[#B45309]">{activeDataset.summaryDelta}</p>
          </div>
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Intonationsfehler (W12)
            </p>
            <p className="mt-1.5 text-2xl font-mono tabular-nums font-semibold text-[#181715]">
              {activeDataset.pitchErrorCent[3].toFixed(1).replace('.', ',')} ct
            </p>
            <p className="mt-1 text-xs font-mono text-[#57534E]">
              Basis: {activeDataset.pitchErrorCent[0].toFixed(1).replace('.', ',')} ct
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Effektstärke (Cohen’s d)
            </p>
            <p className="mt-1.5 text-2xl font-mono tabular-nums font-semibold text-[#1B365D]">
              d = {activeDataset.cohensD}
            </p>
            <p className="mt-1 text-xs font-mono text-[#57534E]">Gegenüber W0-Baseline</p>
          </div>
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Signifikanzniveau
            </p>
            <p className="mt-1.5 text-2xl font-mono tabular-nums font-semibold text-[#181715]">
              p {activeDataset.pValue}
            </p>
            <p className="mt-1 text-xs font-mono text-[#57534E]">Zweiseitiger t-Test</p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <RetentionLineChart selectedCohort={selectedCohort} />
        </div>
        <div className="lg:col-span-5">
          <VocalRadarChart selectedCohort={selectedCohort} />
        </div>
      </div>

      {/* Intonation Cent Bar Chart */}
      <IntonationBarChart selectedCohort={selectedCohort} />

      {/* Full Tabular Statistical Matrix */}
      <section className="bg-white border border-[#DED8CE] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#EDE9E0] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
              Tab. 1 · Multivariate Varianzanalyse (MANOVA)
            </p>
            <h2 className="font-serif text-xl font-semibold text-[#181715] mt-1">
              Primäre und sekundäre Endpunkte: Bramata-Polenta vs. Kontrollgruppe
            </h2>
          </div>
          <span className="text-xs font-mono text-[#57534E]">
            Mittelwert ± Standardabweichung (SD)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#FAF8F4] border-b border-[#DED8CE] text-xs font-mono uppercase tracking-wider text-[#57534E]">
                <th className="py-3.5 px-5 font-medium">Messparameter</th>
                <th className="py-3.5 px-4 font-medium">Einheit</th>
                <th className="py-3.5 px-4 font-medium">Baseline (W0)</th>
                <th className="py-3.5 px-4 font-medium text-[#1B365D]">Bramata (W12)</th>
                <th className="py-3.5 px-4 font-medium">Kontrolle (W12)</th>
                <th className="py-3.5 px-4 font-medium">95 % KI (Δ)</th>
                <th className="py-3.5 px-4 font-medium">Cohen’s d</th>
                <th className="py-3.5 px-5 font-medium">p-Wert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE9E0]">
              {STATISTICAL_MATRIX.map((row) => (
                <tr key={row.parameter} className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-3.5 px-5 font-medium text-[#181715]">{row.parameter}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#78716C]">{row.unit}</td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-[#57534E]">{row.baseline}</td>
                  <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-[#1B365D]">
                    {row.bramata12W}
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-[#57534E]">{row.control12W}</td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-[#44403C]">{row.ci95}</td>
                  <td className="py-3.5 px-4 font-mono tabular-nums font-medium text-[#B45309]">
                    {row.cohensD}
                  </td>
                  <td className="py-3.5 px-5 font-mono tabular-nums font-semibold text-[#181715]">
                    {row.pValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
