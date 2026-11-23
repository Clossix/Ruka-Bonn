import React, { useState } from 'react';
import {
  COHORT_DATASETS,
  CohortKey,
  RADAR_AXES,
  TIMEPOINT_LABELS,
  WEEKS_LABELS,
} from '../data/researchData';

interface RetentionLineChartProps {
  selectedCohort: CohortKey;
}

export const RetentionLineChart: React.FC<RetentionLineChartProps> = ({ selectedCohort }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const activeDataset = COHORT_DATASETS[selectedCohort];
  const controlDataset = COHORT_DATASETS.kontrolle;

  const width = 680;
  const height = 310;
  const padLeft = 52;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const minY = 50;
  const maxY = 95;

  const getX = (idx: number) => padLeft + (idx / (WEEKS_LABELS.length - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - ((val - minY) / (maxY - minY)) * plotH;

  const activePoints = activeDataset.retentionCurve.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');
  const controlPoints = controlDataset.retentionCurve.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');

  // 95% confidence band (+/- 2.2 percentage points)
  const upperBand = activeDataset.retentionCurve.map((val, i) => `${getX(i)},${getY(Math.min(maxY, val + 2.2))}`);
  const lowerBand = [...activeDataset.retentionCurve]
    .reverse()
    .map((val, revI) => {
      const i = activeDataset.retentionCurve.length - 1 - revI;
      return `${getX(i)},${getY(Math.max(minY, val - 2.2))}`;
    });
  const bandPolygon = [...upperBand, ...lowerBand].join(' ');

  const activeIdx = hoveredIdx ?? WEEKS_LABELS.length - 1;
  const activeVal = activeDataset.retentionCurve[activeIdx];
  const controlVal = controlDataset.retentionCurve[activeIdx];
  const delta = (activeVal - controlVal).toFixed(1).replace('.', ',');

  return (
    <div className="bg-white border border-[#DED8CE] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#EDE9E0]">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
            Abb. 1 · Langzeitverlauf (72-h-Melodieabruf)
          </p>
          <h3 className="font-serif text-xl font-semibold text-[#181715] mt-1">
            Melodische Behaltensleistung (Woche 0–12)
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
          <span className="inline-flex items-center gap-2 text-[#181715]">
            <span className="w-4 h-0.5 bg-[#1B365D] inline-block" aria-hidden="true" />
            {activeDataset.shortName}
          </span>
          <span className="inline-flex items-center gap-2 text-[#78716C]">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-[#A8A29E] inline-block" aria-hidden="true" />
            Kontrollgruppe
          </span>
        </div>
      </div>

      {/* Live Crosshair Readout Bar */}
      <div className="mt-4 mb-2 flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-[#FAF8F4] border border-[#EDE9E0] rounded text-xs font-mono tabular-nums">
        <span className="text-[#57534E]">
          Messpunkt: <strong className="text-[#181715]">{WEEKS_LABELS[activeIdx]}</strong>
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#1B365D]">
            {activeDataset.shortName}: <strong>{activeVal.toFixed(1).replace('.', ',')} %</strong>
          </span>
          <span className="text-[#78716C]">
            Kontrolle: <strong>{controlVal.toFixed(1).replace('.', ',')} %</strong>
          </span>
          <span className="text-[#B45309] font-semibold">
            Δ +{delta} Pp.
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[480px] select-none cursor-crosshair"
          role="img"
          aria-label="Liniendiagramm der melodischen Behaltensleistung über 12 Wochen"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Horizontal grid lines */}
          {[55, 65, 75, 85, 95].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#EDE9E0"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#78716C] text-[11px] font-mono tabular-nums"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {WEEKS_LABELS.map((label, i) => {
            const x = getX(i);
            return (
              <text
                key={label}
                x={x}
                y={height - 14}
                textAnchor="middle"
                className={`text-[11px] font-mono tabular-nums ${
                  activeIdx === i ? 'fill-[#181715] font-semibold' : 'fill-[#78716C]'
                }`}
              >
                {label}
              </text>
            );
          })}

          {/* 95% Confidence Band */}
          <polygon points={bandPolygon} fill="#1B365D" fillOpacity="0.09" />

          {/* Control dashed line */}
          <polyline
            fill="none"
            stroke="#A8A29E"
            strokeWidth="2"
            strokeDasharray="5 4"
            points={controlPoints}
          />

          {/* Active cohort line */}
          <polyline
            fill="none"
            stroke="#1B365D"
            strokeWidth="2.5"
            points={activePoints}
          />

          {/* Vertical crosshair guide */}
          <line
            x1={getX(activeIdx)}
            y1={padTop}
            x2={getX(activeIdx)}
            y2={padTop + plotH}
            stroke="#B45309"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Data nodes + invisible hit columns */}
          {WEEKS_LABELS.map((_, i) => {
            const x = getX(i);
            const yActive = getY(activeDataset.retentionCurve[i]);
            const yControl = getY(controlDataset.retentionCurve[i]);
            const isSelected = activeIdx === i;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={yControl}
                  r={isSelected ? 4 : 3}
                  fill="#FAF8F4"
                  stroke="#78716C"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy={yActive}
                  r={isSelected ? 5.5 : 3.5}
                  fill={isSelected ? '#B45309' : '#1B365D'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <rect
                  x={x - plotW / (WEEKS_LABELS.length * 2)}
                  y={padTop}
                  width={plotW / WEEKS_LABELS.length}
                  height={plotH}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onClick={() => setHoveredIdx(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
        Schattiertes Band markiert das 95-%-Konfidenzintervall der Interventionsgruppe. Datenerhebung via Montreal-Melodie-Gedächtnistest (MMT-R).
      </p>
    </div>
  );
};

interface VocalRadarChartProps {
  selectedCohort: CohortKey;
}

export const VocalRadarChart: React.FC<VocalRadarChartProps> = ({ selectedCohort }) => {
  const [focusedAxis, setFocusedAxis] = useState<number>(0);
  const activeDataset = COHORT_DATASETS[selectedCohort];
  const controlDataset = COHORT_DATASETS.kontrolle;

  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 112;
  const levels = [25, 50, 75, 100];

  const getCoord = (angleIdx: number, val: number) => {
    const angle = (Math.PI * 2 * angleIdx) / RADAR_AXES.length - Math.PI / 2;
    const r = (val / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const buildPolygon = (scores: number[]) =>
    scores
      .map((score, i) => {
        const pt = getCoord(i, score);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');

  return (
    <div className="bg-white border border-[#DED8CE] rounded-lg p-6 flex flex-col justify-between">
      <div className="pb-4 border-b border-[#EDE9E0]">
        <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
          Abb. 2 · Multidimensionale Stimmanalyse
        </p>
        <h3 className="font-serif text-xl font-semibold text-[#181715] mt-1">
          Vokales &amp; Kognitives Leistungsprofil
        </h3>
      </div>

      <div className="my-4 flex justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[330px] h-auto select-none"
          role="img"
          aria-label="Radar-Diagramm der vokalen Leistungsdimensionen"
        >
          {/* Polygonal grid rings */}
          {levels.map((lvl) => (
            <polygon
              key={lvl}
              points={RADAR_AXES.map((_, i) => {
                const pt = getCoord(i, lvl);
                return `${pt.x},${pt.y}`;
              }).join(' ')}
              fill="none"
              stroke="#E2DDD3"
              strokeWidth="1"
            />
          ))}

          {/* Radial axes */}
          {RADAR_AXES.map((label, i) => {
            const edge = getCoord(i, 100);
            const labelPt = getCoord(i, 121);
            const anchor =
              Math.abs(labelPt.x - cx) < 10
                ? 'middle'
                : labelPt.x > cx
                  ? 'start'
                  : 'end';

            return (
              <g key={label}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={edge.x}
                  y2={edge.y}
                  stroke="#DED8CE"
                  strokeWidth="1"
                />
                <text
                  x={labelPt.x}
                  y={labelPt.y + 3}
                  textAnchor={anchor}
                  onClick={() => setFocusedAxis(i)}
                  className={`text-[10px] font-mono cursor-pointer ${
                    focusedAxis === i ? 'fill-[#1B365D] font-semibold' : 'fill-[#57534E]'
                  }`}
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Control baseline polygon */}
          <polygon
            points={buildPolygon(controlDataset.radarScores)}
            fill="#A8A29E"
            fillOpacity="0.14"
            stroke="#78716C"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Active cohort polygon */}
          <polygon
            points={buildPolygon(activeDataset.radarScores)}
            fill="#1B365D"
            fillOpacity="0.18"
            stroke="#1B365D"
            strokeWidth="2.2"
          />

          {/* Active vertices */}
          {activeDataset.radarScores.map((score, i) => {
            const pt = getCoord(i, score);
            return (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={focusedAxis === i ? 5 : 3.5}
                fill={focusedAxis === i ? '#B45309' : '#1B365D'}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => setFocusedAxis(i)}
              />
            );
          })}
        </svg>
      </div>

      {/* Selected Axis Readout */}
      <div className="px-3.5 py-2.5 bg-[#FAF8F4] border border-[#EDE9E0] rounded text-xs font-mono tabular-nums flex items-center justify-between gap-2">
        <span className="text-[#181715] font-medium truncate">
          {RADAR_AXES[focusedAxis]}
        </span>
        <span className="text-[#1B365D] whitespace-nowrap shrink-0">
          {activeDataset.radarScores[focusedAxis]} / 100 Pkt. (Kontrolle: {controlDataset.radarScores[focusedAxis]})
        </span>
      </div>
    </div>
  );
};

interface IntonationBarChartProps {
  selectedCohort: CohortKey;
}

export const IntonationBarChart: React.FC<IntonationBarChartProps> = ({ selectedCohort }) => {
  const activeDataset = COHORT_DATASETS[selectedCohort];
  const controlDataset = COHORT_DATASETS.kontrolle;
  const maxCent = 22;

  return (
    <div className="bg-white border border-[#DED8CE] rounded-lg p-6">
      <div className="pb-4 border-b border-[#EDE9E0] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#78716C]">
            Abb. 3 · Akustische Intonationsstreuung
          </p>
          <h3 className="font-serif text-xl font-semibold text-[#181715] mt-1">
            Mittlere Tonhöhenabweichung in Cent (niedriger = präziser)
          </h3>
        </div>
        <span className="text-xs font-mono text-[#57534E]">
          Schalltotenraum S-14 · A-Capella-Referenz
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {TIMEPOINT_LABELS.map((label, idx) => {
          const activeCent = activeDataset.pitchErrorCent[idx];
          const controlCent = controlDataset.pitchErrorCent[idx];
          const activePct = Math.round((activeCent / maxCent) * 100);
          const controlPct = Math.round((controlCent / maxCent) * 100);

          return (
            <div key={label} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                <span className="font-medium text-[#181715]">{label}</span>
                <span className="text-[#57534E]">
                  {activeDataset.shortName}: <strong className="text-[#1B365D]">{activeCent.toFixed(1).replace('.', ',')} ct</strong>
                  {' · '}
                  Kontrolle: <strong className="text-[#78716C]">{controlCent.toFixed(1).replace('.', ',')} ct</strong>
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-3 bg-[#F1EDE4] rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-[#1B365D] transition-all duration-300"
                    style={{ width: `${activePct}%` }}
                  />
                </div>
                <div className="w-full h-2 bg-[#F1EDE4] rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-[#A8A29E] transition-all duration-300"
                    style={{ width: `${controlPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[#78716C] mt-6 pt-4 border-t border-[#EDE9E0] leading-relaxed">
        Bereits 90 Minuten nach einer standardisierten Portion Bramata-Polenta (180 g Trockengewicht-Äquivalent) sinkt der Intonationsfehler im Mittel um 4,6 Cent.
      </p>
    </div>
  );
};
