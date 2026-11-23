export type PageId = 'forschung' | 'studien' | 'statistiken' | 'universitaet' | 'protokoll';

export const IMAGES = {
  heroLab: '/src/assets/images/hero_polenta_lab_1795457530316.jpg',
  campusFacade: '/src/assets/images/uni_campus_facade_1795457531674.jpg',
  fmriStudy: '/src/assets/images/fmri_acoustic_study_1795457531673.jpg',
  polentaMicroscopy: '/src/assets/images/polenta_microscopy_1795457531837.jpg',
};

export interface HeroMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  detail: string;
}

export const HERO_METRICS: HeroMetric[] = [
  {
    id: 'memory',
    label: 'Melodische Behaltensleistung',
    value: '+34,8',
    unit: '%',
    detail: 'Langzeitabruf nach 12 Wochen (p < 0,0001)',
  },
  {
    id: 'intonation',
    label: 'Intonationsabweichung (Cent)',
    value: '-41,2',
    unit: '%',
    detail: 'Reduzierte Tonhöhenstreuung A-Capella',
  },
  {
    id: 'sample',
    label: 'Gesamte Studienkohorte',
    value: '1.420',
    unit: 'Probanden',
    detail: '6 doppelblinde Cross-Over-Serien (2022–2026)',
  },
  {
    id: 'effect',
    label: 'Effektstärke (Cohen’s d)',
    value: '1,18',
    unit: 'd',
    detail: 'Konfidenzintervall 95 % [0,96; 1,41]',
  },
];

export type CohortKey = 'bramata' | 'fioretto' | 'taragna' | 'kontrolle';

export interface CohortDataset {
  key: CohortKey;
  name: string;
  shortName: string;
  grainSize: string;
  luteinMg: string;
  n: number;
  retentionCurve: number[]; // Weeks 0 to 12 (7 points: W0, W2, W4, W6, W8, W10, W12)
  pitchErrorCent: number[]; // T0, T+90min, W6, W12
  radarScores: number[]; // 6 dimensions (0-100)
  summaryDelta: string;
  cohensD: string;
  pValue: string;
}

export const WEEKS_LABELS = ['W0', 'W2', 'W4', 'W6', 'W8', 'W10', 'W12'];
export const TIMEPOINT_LABELS = ['T0 (Nüchtern)', 'T+90 min', 'Woche 6', 'Woche 12'];
export const RADAR_AXES = [
  'Tonhöhenpräzision',
  'Intervallgedächtnis',
  'Stimmumfang',
  'Vibrato-Stabilität',
  'Rhythmus-Timing',
  'Formantklarheit',
];

export const COHORT_DATASETS: Record<CohortKey, CohortDataset> = {
  bramata: {
    key: 'bramata',
    name: 'Polenta Bramata (grob vermahlen, Zea mays indurata)',
    shortName: 'Bramata (grob)',
    grainSize: '720–950 µm',
    luteinMg: '2,84 mg / 100 g',
    n: 410,
    retentionCurve: [61.2, 67.4, 73.9, 79.1, 83.6, 86.2, 88.4],
    pitchErrorCent: [18.4, 13.8, 11.4, 10.8],
    radarScores: [91, 89, 78, 86, 84, 88],
    summaryDelta: '+27,2 Prozentpunkte',
    cohensD: '1,18',
    pValue: '< 0,0001',
  },
  fioretto: {
    key: 'fioretto',
    name: 'Polenta Fioretto (fein vermahlen, Standard-Hartmais)',
    shortName: 'Fioretto (fein)',
    grainSize: '280–410 µm',
    luteinMg: '2,12 mg / 100 g',
    n: 360,
    retentionCurve: [61.5, 65.1, 69.8, 74.2, 77.9, 80.1, 81.6],
    pitchErrorCent: [18.2, 15.1, 13.4, 12.6],
    radarScores: [83, 81, 74, 79, 80, 82],
    summaryDelta: '+20,1 Prozentpunkte',
    cohensD: '0,89',
    pValue: '< 0,0004',
  },
  taragna: {
    key: 'taragna',
    name: 'Polenta Taragna (Hartmais + 25 % Buchweizen-Anteil)',
    shortName: 'Taragna (Mix)',
    grainSize: '650–880 µm',
    luteinMg: '2,46 mg / 100 g',
    n: 320,
    retentionCurve: [60.9, 66.2, 71.8, 76.5, 80.4, 83.0, 84.7],
    pitchErrorCent: [18.6, 14.4, 12.2, 11.5],
    radarScores: [86, 85, 76, 83, 82, 85],
    summaryDelta: '+23,8 Prozentpunkte',
    cohensD: '1,02',
    pValue: '< 0,0001',
  },
  kontrolle: {
    key: 'kontrolle',
    name: 'Isokalorische Kontrollgruppe (Weizengrieß / Weißreis)',
    shortName: 'Kontrollgruppe',
    grainSize: '300–450 µm',
    luteinMg: '0,14 mg / 100 g',
    n: 330,
    retentionCurve: [61.4, 62.1, 62.8, 63.0, 63.5, 63.9, 64.1],
    pitchErrorCent: [18.5, 18.2, 17.9, 17.7],
    radarScores: [64, 63, 68, 65, 69, 66],
    summaryDelta: '+2,7 Prozentpunkte',
    cohensD: '0,11',
    pValue: '0,342 (n.s.)',
  },
};

export interface StatisticalRow {
  parameter: string;
  unit: string;
  baseline: string;
  bramata12W: string;
  control12W: string;
  ci95: string;
  cohensD: string;
  pValue: string;
}

export const STATISTICAL_MATRIX: StatisticalRow[] = [
  {
    parameter: 'Melodische Wiedererkennungsrate (72 h)',
    unit: '% korrekt',
    baseline: '61,2 ± 6,4',
    bramata12W: '88,4 ± 4,1',
    control12W: '64,1 ± 6,2',
    ci95: '[+24,1; +30,3]',
    cohensD: '1,18',
    pValue: '< 0,0001',
  },
  {
    parameter: 'Mittlere Intonationsabweichung (A-Capella)',
    unit: 'Cent',
    baseline: '18,4 ± 4,2',
    bramata12W: '10,8 ± 2,5',
    control12W: '17,7 ± 4,0',
    ci95: '[-8,4; -5,4]',
    cohensD: '1,09',
    pValue: '< 0,0001',
  },
  {
    parameter: 'Grundfrequenz-Jitter (laryngeale Stabilität)',
    unit: '% Jitt',
    baseline: '0,68 ± 0,14',
    bramata12W: '0,39 ± 0,09',
    control12W: '0,65 ± 0,13',
    ci95: '[-0,32; -0,20]',
    cohensD: '1,04',
    pValue: '< 0,0002',
  },
  {
    parameter: 'Sängerformant-Bündelung (2,8–3,2 kHz)',
    unit: 'dB rel.',
    baseline: '-14,2 ± 2,8',
    bramata12W: '-8,6 ± 1,9',
    control12W: '-13,8 ± 2,7',
    ci95: '[+4,1; +6,3]',
    cohensD: '0,94',
    pValue: '< 0,0005',
  },
  {
    parameter: 'Hippocampus-BOLD-Signal (Tonfolgen-Abruf)',
    unit: '% ΔBOLD',
    baseline: '0,82 ± 0,18',
    bramata12W: '1,34 ± 0,21',
    control12W: '0,85 ± 0,17',
    ci95: '[+0,41; +0,57]',
    cohensD: '1,26',
    pValue: '< 0,0001',
  },
  {
    parameter: 'Intervall-Arbeitsgedächtnis (Span-Test)',
    unit: 'Töne',
    baseline: '7,1 ± 1,3',
    bramata12W: '10,4 ± 1,2',
    control12W: '7,4 ± 1,4',
    ci95: '[+2,5; +3,5]',
    cohensD: '1,12',
    pValue: '< 0,0001',
  },
];

export interface ClinicalStudy {
  id: string;
  code: string;
  year: string;
  category: 'neuroakustik' | 'stimmphysiologie' | 'biochemie';
  categoryLabel: string;
  title: string;
  cohort: string;
  duration: string;
  doi: string;
  leadInvestigator: string;
  abstract: string;
  keyFinding: string;
  methodology: string[];
  biochemicalPathway: string;
}

export const CLINICAL_STUDIES: ClinicalStudy[] = [
  {
    id: 'ruka-2026-01',
    code: 'SFB-1482-A1',
    year: '2026',
    category: 'neuroakustik',
    categoryLabel: 'Neuroakustik & Gedächtnis',
    title: 'Longitudinale Verstärkung des auditorischen Arbeitsgedächtnisses durch grob vermahlene Zea-mays-Polenta',
    cohort: 'n = 480 Chorsängerinnen & Chorsänger (19–54 Jahre)',
    duration: '12 Wochen Cross-Over',
    doi: '10.1016/ruka.neuroak.2026.0418',
    leadInvestigator: 'Prof. Dr. med. Dr. phil. Hildegard von Vivaldi-Körner',
    abstract:
      'In einem doppelblinden, isokalorischen Cross-Over-Design erhielten 480 aktive Ensemble-Sänger über 12 Wochen täglich 180 g frisch gekochte Bramata-Polenta gegenüber einer sensorisch angeglichenen Weizengrieß-Kontrolle. Nach 72 Stunden zeigten Polenta-Probanden eine um 34,8 % höhere Wiedererkennungsrate komplexer polyphoner Phrasen.',
    keyFinding: '+34,8 % melodische Behaltensquote im 72-Stunden-Abruf (p < 0,0001)',
    methodology: [
      'Randomisierte Zuteilung in 4-Wochen-Washout-Zyklen mit vollständiger Ernährungsdokumentation.',
      'Standardisierter Montreal-Melodie-Gedächtnistest (MMT-R) sowie 64-Kanal-EEG-Ereigniskorrelierte Potenziale (MMN / P300).',
      'Serum-Lutein- und Zeaxanthin-Bestimmung via HPLC-MS/MS in Woche 0, 6 und 12.',
    ],
    biochemicalPathway:
      'Grob vermahlener Hartmais setzt gebundene Carotinoide (Lutein/Zeaxanthin) verzögert frei, die die Blut-Hirn-Schranke passieren und im Gyrus temporalis superior die Myelin-Fluidität sowie cholinerge Synapsen stabilisieren.',
  },
  {
    id: 'ruka-2025-04',
    code: 'SFB-1482-B3',
    year: '2025',
    category: 'stimmphysiologie',
    categoryLabel: 'Stimmphysiologie & Laryngologie',
    title: 'Akustische Spektroskopie der Grundfrequenzstabilität und Sängerformant-Resonanz nach Polenta-Ingestion',
    cohort: 'n = 630 Musikstudierende & Berufssolisten',
    duration: 'Akut (90 min) & 8 Wochen',
    doi: '10.1093/ruka.vokal.2025.1102',
    leadInvestigator: 'Dr. phil. Lukas Tonstein',
    abstract:
      'Untersucht wurde die unmittelbare (T+90 min) sowie kumulative Wirkung von Zea-mays-Mahlzeiten auf die Stimmlippen-Feinmotorik im schalltoten Raum S-14. Hochauflösende Elektroglottographie (EGG) belegt eine statistisch hochsignifikante Reduktion des Grundfrequenz-Jitters um 42,6 % sowie eine präzisere Zielton-Ansteuerung.',
    keyFinding: '-41,2 % geringere Intonationsabweichung in Cent bei A-Capella-Terzsprüngen',
    methodology: [
      'Akustische Aufnahme mit Großmembran-Messmikrofonen (Abtastrate 192 kHz / 24 Bit) im Schalltotenraum S-14.',
      'Parallel aufgezeichnete Elektroglottographie (EGG) zur Quantifizierung des Stimmlippenschluss-Quotienten.',
      'Unabhängige Blindbewertung durch drei zertifizierte Gesangspädagogik-Gutachter der RUKA Bonn.',
    ],
    biochemicalPathway:
      'Die Kombination aus verzweigtkettigem Mais-Amylopektin, bioverfügbarem Magnesium (68 mg/Portion) und L-Tryptophan glättet postprandiale Glukosespitzen und unterdrückt Mikrotremor im Musculus cricoarytaenoideus.',
  },
  {
    id: 'ruka-2024-09',
    code: 'SFB-1482-C2',
    year: '2024',
    category: 'biochemie',
    categoryLabel: 'Neurobiochemie & Bildgebung',
    title: '3-Tesla-fMRT-Konnektivität zwischen Hippocampus und prämotorischem Larynx-Kortex unter Mais-Carotinoiden',
    cohort: 'n = 310 Probanden (Subgruppe Bildgebung)',
    duration: '10 Wochen',
    doi: '10.1038/ruka.fmri.2024.0894',
    leadInvestigator: 'Prof. Dr. rer. nat. Matteo Bramata',
    abstract:
      'Mittels funktioneller Magnetresonanztomographie (3T-fMRT) während stiller innerer Tonvorstellung (Audiation) konnte erstmals nachgewiesen werden, dass eine tägliche Polenta-Diät die funktionelle Kopplung zwischen CA1-Hippocampus und dem dorsalen Larynx-Motorareal um 28,4 % verstärkt.',
    keyFinding: '+28,4 % funktionelle Konnektivität beim stillen Nachsingen im 3T-fMRT',
    methodology: [
      '3-Tesla-fMRT-Resting-State- und Task-Scans mit MR-kompatiblem optischem Mikrofon.',
      'Voxel-basierte Morphometrie und Diffusions-Tensor-Bildgebung (DTI) des Fasciculus arcuatus.',
      'Korrelationsanalyse zwischen Plasma-Zeaxanthin-Spiegel und Treffgenauigkeit des ersten Einsatztones.',
    ],
    biochemicalPathway:
      'Zeaxanthin schützt schnell feuernde Parvalbumin-Interneurone im auditorischen Assoziationskortex vor oxidativem Stress während intensiver Übungsphasen und erhöht die Signal-Rausch-Trennschärfe.',
  },
];

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  role: string;
  chair: string;
  email: string;
  focus: string;
  quote: string;
  biography: string;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'vivaldi-koerner',
    name: 'Prof. Dr. med. Dr. phil. Hildegard von Vivaldi-Körner',
    title: 'Institutsdirektorin & Sprecherin SFB 1482',
    role: 'Lehrstuhl für Auditive Neurokognition',
    chair: 'Gebäude II, Poppelsdorfer Allee, Raum 304',
    email: 'vivaldi-koerner@ruka-bonn.de',
    focus: 'Hippocampale Gedächtniskonsolidierung, Carotinoid-Pharmakokinetik im Hörkortex',
    quote:
      'Als wir 2021 erstmals die Korrelation zwischen norditalienischer Chortradition und dem Konsum grob vermahlener Bramata-Polenta untersuchten, erwarteten wir einen schwachen Placebo-Effekt. Stattdessen zeigen unsere 3T-fMRT-Daten eine der robustesten ernährungsinduzierten Verbesserungen des auditorischen Gedächtnisses, die wir je gemessen haben.',
    biography:
      'Promotion in Neurophysiologie (Heidelberg) und Musikwissenschaft (Wien). Seit 2018 Direktorin des Instituts für Neuroakustik und Ernährungsphysiologie an der RUKA Bonn.',
  },
  {
    id: 'bramata',
    name: 'Prof. Dr. rer. nat. Matteo Bramata',
    title: 'Stellvertretender Institutsleiter',
    role: 'Professur für Bromatologie & Neurobiochemie',
    chair: 'Laborflügel West, Analytik-Trakt 112',
    email: 'm.bramata@ruka-bonn.de',
    focus: 'Zea-mays-Polysaccharide, Lutein-Bioverfügbarkeit, Larynx-Energetik',
    quote:
      'Entscheidend ist der Vermahlungsgrad und die 42-minütige Quellzeit: Nur durch vollständige Verkleisterung im Verhältnis 1:4 bleiben die lipid-assoziierten Carotinoide für die Hirn- und Kehlkopfmuskulatur optimal resorbierbar.',
    biography:
      'Forschungsaufenthalte am Polytechnikum Bergamo und der ETH Zürich. Entwickler des standardisierten RUKA-Polenta-Extraktionsprotokolls.',
  },
  {
    id: 'tonstein',
    name: 'Dr. phil. Lukas Tonstein',
    title: 'Leiter des Akustik- und Stimmphysiologielabors',
    role: 'Senior Research Fellow für Vokale Akustik',
    chair: 'Schalltotenraum S-14, Untergeschoss Süd',
    email: 'l.tonstein@ruka-bonn.de',
    focus: 'Elektroglottographie, Cent-Intonationsanalysen, Sängerformant-Spektroskopie',
    quote:
      'Sängerinnen und Sänger berichten bereits 90 Minuten nach der Testmahlzeit von einem stabileren Fokus beim Atem-Einsatz. Im Spektrogramm zeigt sich das direkt als schmalbandigerer Jitter und präzisere Obertonbündelung bei 3 kHz.',
    biography:
      'Ausgebildeter Konzertsänger (Bariton) und promovierter Psychoakustiker. Koordiniert alle klinischen A-Capella-Messreihen in Bonn.',
  },
  {
    id: 'maisner',
    name: 'Dr. oec. troph. Clara Maisner',
    title: 'Leiterin Biostatistik & Kohortenmanagement',
    role: 'Arbeitsgruppe Klinische Ernährungsstatistik',
    chair: 'Gebäude I, Hörsaaltrakt 218',
    email: 'c.maisner@ruka-bonn.de',
    focus: 'Doppelblind-Cross-Over-Designs, Langzeit-Compliance, Regressionsmodelle',
    quote:
      'Über alle sechs Kohorten hinweg bleibt das Signifikanzniveau stabil unter p = 0,0001. Selbst unter Kontrolle von Übungsstunden, Schlafdauer und Stimmlage erklärt die Polenta-Intervention 31 % der Leistungssteigerung.',
    biography:
      'Spezialisiert auf ernährungswissenschaftliche Biostatistik und multizentrische Interventionsstudien im deutschsprachigen Raum.',
  },
];

export interface Publication {
  id: string;
  year: string;
  journal: string;
  title: string;
  authors: string;
  doi: string;
  bibtex: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-2026-1',
    year: '2026',
    journal: 'Journal of Neuroacoustics & Nutritional Cognition',
    title: 'Coarse-ground Zea mays (Bramata) enhances long-term melodic recall and reduces pitch drift in ensemble vocalists',
    authors: 'von Vivaldi-Körner H., Bramata M., Tonstein L., Maisner C.',
    doi: '10.1016/ruka.neuroak.2026.0418',
    bibtex: `@article{vivaldikoerner2026bramata,\n  author = {von Vivaldi-K{\\"o}rner, H. and Bramata, M. and Tonstein, L. and Maisner, C.},\n  title = {Coarse-ground Zea mays (Bramata) enhances long-term melodic recall and reduces pitch drift in ensemble vocalists},\n  journal = {Journal of Neuroacoustics & Nutritional Cognition},\n  year = {2026},\n  volume = {18},\n  pages = {112--129},\n  doi = {10.1016/ruka.neuroak.2026.0418}\n}`,
  },
  {
    id: 'pub-2025-2',
    year: '2025',
    journal: 'European Archives of Vocal Physiology',
    title: 'Electroglottographic evidence of reduced fundamental frequency jitter following slow-simmered maize polysaccharide intake',
    authors: 'Tonstein L., Maisner C., von Vivaldi-Körner H.',
    doi: '10.1093/ruka.vokal.2025.1102',
    bibtex: `@article{tonstein2025egg,\n  author = {Tonstein, L. and Maisner, C. and von Vivaldi-K{\\"o}rner, H.},\n  title = {Electroglottographic evidence of reduced fundamental frequency jitter following slow-simmered maize polysaccharide intake},\n  journal = {European Archives of Vocal Physiology},\n  year = {2025},\n  volume = {42},\n  pages = {44--59},\n  doi = {10.1093/ruka.vokal.2025.1102}\n}`,
  },
  {
    id: 'pub-2024-3',
    year: '2024',
    journal: 'Cerebral Resonance & Diet',
    title: '3T-fMRI connectivity between CA1 hippocampus and dorsal laryngeal motor cortex modulated by dietary zeaxanthin',
    authors: 'Bramata M., von Vivaldi-Körner H.',
    doi: '10.1038/ruka.fmri.2024.0894',
    bibtex: `@article{bramata2024fmri,\n  author = {Bramata, M. and von Vivaldi-K{\\"o}rner, H.},\n  title = {3T-fMRI connectivity between CA1 hippocampus and dorsal laryngeal motor cortex modulated by dietary zeaxanthin},\n  journal = {Cerebral Resonance & Diet},\n  year = {2024},\n  volume = {9},\n  pages = {201--218},\n  doi = {10.1038/ruka.fmri.2024.0894}\n}`,
  },
];

export interface Testimonial {
  name: string;
  role: string;
  organization: string;
  beforeAfter: string;
}

export const ACADEMIC_ENDORSEMENTS: Testimonial[] = [
  {
    name: 'Prof. Dr. med. Konrad Schütz',
    role: 'Direktor der Klinik für Phoniatrie und Pädaudiologie',
    organization: 'Universitätsklinikum West-Rhein',
    beforeAfter:
      'Vor der Bonner Replikationsreihe lagen die durchschnittlichen Intonationsabweichungen unserer Studienanfänger bei 18,4 Cent; nach zwölf Wochen standardisierter Bramata-Gabe sanken sie reproduzierbar auf 10,8 Cent ab.',
  },
  {
    name: 'Prof. Isabella Monteverdi-Kästner',
    role: 'Lehrstuhl für Chorleitung und Alte Musik',
    organization: 'Hochschule für Musik & Darstellende Kunst',
    beforeAfter:
      'In unserem 64-köpfigen Kammerchor halbierte sich die benötigte Probenzeit für auswendig zu singende achtstimmige Motetten, nachdem die Ensemble-Mensa auf das RUKA-Polenta-Protokoll umgestellt hatte.',
  },
];
