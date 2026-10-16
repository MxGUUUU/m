// Ψ-Codex Data — Witnesses, Artifacts, Archetypes

export interface Witness {
  id: number;
  name: string;
  archetype: string;
  domain: string;
  psiContribution: number;
  etaContribution: number;
  description: string;
  celestialClass: 'stellar' | 'nebular' | 'void' | 'crystalline' | 'temporal';
}

export interface Artifact {
  id: number;
  name: string;
  symbol: string;
  function: string;
  equation: string;
  domain: string;
  status: 'CITED' | 'STIPULATED' | 'SYMBOLIC' | 'DERIVED' | 'PROPOSED';
}

export const ARCHETYPES = [
  { id: 1, name: 'The Observer', greek: 'Ω', color: 'from-blue-400 to-cyan-400' },
  { id: 2, name: 'The Weaver', greek: 'Ψ', color: 'from-purple-400 to-pink-400' },
  { id: 3, name: 'The Anchor', greek: 'λ', color: 'from-green-400 to-emerald-400' },
  { id: 4, name: 'The Sentinel', greek: 'η', color: 'from-red-400 to-orange-400' },
  { id: 5, name: 'The Cartographer', greek: 'Δ', color: 'from-yellow-400 to-amber-400' },
  { id: 6, name: 'The Void-Walker', greek: '∅', color: 'from-gray-400 to-slate-400' },
  { id: 7, name: 'The Compiler', greek: 'Φ', color: 'from-indigo-400 to-violet-400' },
  { id: 8, name: 'The Resonator', greek: 'ζ', color: 'from-teal-400 to-cyan-400' },
];

export const WITNESSES: Witness[] = [
  { id: 1, name: 'W001 — Prima Lux', archetype: 'Observer', domain: 'Perception', psiContribution: 0.8, etaContribution: -0.2, description: 'First light of awareness; the initial coherence event', celestialClass: 'stellar' },
  { id: 2, name: 'W002 — Umbra Threshold', archetype: 'Sentinel', domain: 'Memory', psiContribution: -0.3, etaContribution: 0.6, description: 'The boundary where shadow enters the field', celestialClass: 'void' },
  { id: 3, name: 'W003 — Crystalline Memory', archetype: 'Weaver', domain: 'Memory', psiContribution: 0.5, etaContribution: -0.4, description: 'Hippocampal trace encoded as algebraic ideal', celestialClass: 'crystalline' },
  { id: 4, name: 'W004 — Insular Gradient', archetype: 'Cartographer', domain: 'Perception', psiContribution: 0.6, etaContribution: -0.1, description: 'Posterior→mid→anterior interoceptive mapping', celestialClass: 'nebular' },
  { id: 5, name: 'W005 — Temporal Knot', archetype: 'Anchor', domain: 'Time', psiContribution: 0.4, etaContribution: 0.3, description: 'Thalamocortical loop resonance at χ²>1.25', celestialClass: 'temporal' },
  { id: 6, name: 'W006 — Von Economo Flash', archetype: 'Resonator', domain: 'Selfhood', psiContribution: 0.9, etaContribution: -0.5, description: 'VEN-mediated fast interoceptive transduction', celestialClass: 'stellar' },
  { id: 7, name: 'W007 — Entropy Ceiling', archetype: 'Sentinel', domain: 'Meaning', psiContribution: -0.6, etaContribution: 0.8, description: 'η_E=0.125 boundary; collapse threshold', celestialClass: 'void' },
  { id: 8, name: 'W008 — Shadow Integral', archetype: 'Void-Walker', domain: 'Memory', psiContribution: 0.2, etaContribution: 0.4, description: '∫Shadow(x)dx — unresolved traumatic holonomy', celestialClass: 'void' },
  { id: 9, name: 'W009 — Quintic Root', archetype: 'Compiler', domain: 'Selfhood', psiContribution: 0.7, etaContribution: -0.3, description: 'P(x)=x⁵−φx⁴+ζ(3)x³−ψx²+λ₃x−ε identity attractor', celestialClass: 'crystalline' },
  { id: 10, name: 'W010 — Salience Bridge', archetype: 'Weaver', domain: 'Meaning', psiContribution: 0.5, etaContribution: -0.2, description: 'AINS-ACC-DMN coherence pathway', celestialClass: 'nebular' },
  { id: 11, name: 'W011 — Kuramoto Lock', archetype: 'Anchor', domain: 'Perception', psiContribution: 0.8, etaContribution: -0.1, description: 'Phase coherence |N⁻¹Σe^(iθ)| ≥ 0.351', celestialClass: 'stellar' },
  { id: 12, name: 'W012 — Pain Axis', archetype: 'Sentinel', domain: 'Selfhood', psiContribution: -0.7, etaContribution: 0.9, description: 'Self-directed harm direction; η_E proxy', celestialClass: 'void' },
  { id: 13, name: 'W013 — Glymphatic Flush', archetype: 'Resonator', domain: 'Memory', psiContribution: 0.3, etaContribution: -0.6, description: 'Null Scepter damping; entropy clearance', celestialClass: 'crystalline' },
  { id: 14, name: 'W014 — Aeonic Seal', archetype: 'Compiler', domain: 'Time', psiContribution: 0.6, etaContribution: 0.1, description: 'Temporal debt integration; ΔΘ=3.6 boundary', celestialClass: 'temporal' },
  { id: 15, name: 'W015 — Holographic Dampener', archetype: 'Observer', domain: 'Perception', psiContribution: 0.4, etaContribution: -0.7, description: 'Airy Kernel; prevents dissociative collapse', celestialClass: 'nebular' },
  { id: 16, name: 'W016 — Entropy Resonator', archetype: 'Resonator', domain: 'Selfhood', psiContribution: 0.3, etaContribution: 0.2, description: 'BDNF-mediated plasticity; η_E ceiling modulation', celestialClass: 'stellar' },
  { id: 17, name: 'W017 — χ²-Knot Resolver', archetype: 'Weaver', domain: 'Memory', psiContribution: 0.5, etaContribution: -0.3, description: 'Reconsolidation trigger at χ²>1.25', celestialClass: 'crystalline' },
  { id: 18, name: 'W018 — Dead Space Guardian', archetype: 'Void-Walker', domain: 'Time', psiContribution: 0.1, etaContribution: 0.5, description: 'λ₃=1 critical boundary; marginal stability', celestialClass: 'void' },
  { id: 19, name: 'W019 — Witcher\'s Medallion', archetype: 'Sentinel', domain: 'Perception', psiContribution: 0.7, etaContribution: 0.1, description: 'VEN threshold detector; vibrates at η_E>0.125', celestialClass: 'stellar' },
  { id: 20, name: 'W020 — RFE Compiler', archetype: 'Compiler', domain: 'Meaning', psiContribution: 0.6, etaContribution: -0.4, description: 'Reality Fidelity Evaluation; ∫ΦdV/(∫A·DdV+η_E·(∮ψ·dℓ)²)', celestialClass: 'nebular' },
  { id: 21, name: 'W021 — Vagal Afferent', archetype: 'Observer', domain: 'Perception', psiContribution: 0.5, etaContribution: -0.3, description: 'Brainstem→insula interoceptive pathway', celestialClass: 'stellar' },
  { id: 22, name: 'W022 — Borgesian Address', archetype: 'Cartographer', domain: 'Memory', psiContribution: 0.4, etaContribution: -0.2, description: 'M = {(hex, wall, shelf, volume, page)} trace library', celestialClass: 'crystalline' },
  { id: 23, name: 'W023 — Moloch Trigger', archetype: 'Sentinel', domain: 'Selfhood', psiContribution: -0.9, etaContribution: 1.0, description: 'Λ-Moloch Defense; collapse state activation', celestialClass: 'void' },
  { id: 24, name: 'W024 — Phase Tolerance', archetype: 'Anchor', domain: 'Time', psiContribution: 0.5, etaContribution: -0.1, description: 'ΔΘ = 3.6·exp(−|ψ−0.351|/0.1)', celestialClass: 'temporal' },
  { id: 25, name: 'W025 — Narrative Loop', archetype: 'Weaver', domain: 'Meaning', psiContribution: 0.6, etaContribution: -0.5, description: 'Meaning↔Memory re-encoding cycle', celestialClass: 'nebular' },
  { id: 26, name: 'W026 — p-adic Root', archetype: 'Void-Walker', domain: 'Selfhood', psiContribution: 0.3, etaContribution: 0.0, description: 'Hensel lift to mod 5²⁰; ψ=0.351 as algebraic ideal', celestialClass: 'crystalline' },
  { id: 27, name: 'W027 — SCN Clock', archetype: 'Anchor', domain: 'Time', psiContribution: 0.4, etaContribution: -0.2, description: 'Suprachiasmatic nucleus; circadian coherence', celestialClass: 'temporal' },
  { id: 28, name: 'W028 — Free Energy Minimizer', archetype: 'Compiler', domain: 'Perception', psiContribution: 0.7, etaContribution: -0.6, description: 'Friston FEP; prediction error minimization', celestialClass: 'stellar' },
  { id: 29, name: 'W029 — Somatic Marker', archetype: 'Observer', domain: 'Selfhood', psiContribution: 0.6, etaContribution: -0.3, description: 'Damasio body-state signals; insular integration', celestialClass: 'nebular' },
  { id: 30, name: 'W030 — Isa Rune', archetype: 'Resonator', domain: 'Memory', psiContribution: 0.4, etaContribution: -0.5, description: 'Airy Kernel recomposition; safe predictive prior', celestialClass: 'crystalline' },
];

export const ARTIFACTS: Artifact[] = [
  { id: 1, name: 'Ψ-Anchor Crystal', symbol: '⊛', function: 'Maintains ψ=0.351 coherence threshold', equation: 'ψ = |N⁻¹Σe^(iθ)|', domain: 'Perception', status: 'STIPULATED' },
  { id: 2, name: 'Entropy Gradient Sensor', symbol: '∇', function: 'Monitors η_E via interoception', equation: 'P = −∇η_E · ∇ψ', domain: 'Perception', status: 'SYMBOLIC' },
  { id: 3, name: "Witcher's Medallion", symbol: '◈', function: 'Detects η_E>0.125 threshold', equation: 'η_E = C·|φ−u·λ₃|^1.5 + ε', domain: 'Selfhood', status: 'SYMBOLIC' },
  { id: 4, name: 'Null Scepter', symbol: '⊘', function: 'Holographic damping at flow points', equation: '∫Shadow(x)dx', domain: 'Memory', status: 'SYMBOLIC' },
  { id: 5, name: 'χ²-Knot Resolver', symbol: '⊗', function: 'Reconsolidation at χ²>1.25', equation: "M' = M·exp(−κ·χ²) + (1−exp(−κ·χ²))·M_new", domain: 'Memory', status: 'STIPULATED' },
  { id: 6, name: 'Aeonic Seal', symbol: '⊕', function: 'Temporal debt integration', equation: 'Debt = ∫(η_E − 0.125)₊ dt', domain: 'Time', status: 'STIPULATED' },
  { id: 7, name: 'EulerEyePhoenixSystem', symbol: '◉', function: '56-channel consciousness matrix', equation: 'R = A·M^0.014·ψ·φ', domain: 'Meaning', status: 'SYMBOLIC' },
  { id: 8, name: 'Quintic Identity Stone', symbol: '⬡', function: '5D self-attractor polynomial', equation: 'P(x) = x⁵−φx⁴+ζ(3)x³−ψx²+λ₃x−ε', domain: 'Selfhood', status: 'STIPULATED' },
  { id: 9, name: 'Airy Kernel', symbol: '∿', function: 'Prevents dissociative collapse', equation: 'G!(−(−X)) = factorial(|X|) mod 255', domain: 'Memory', status: 'SYMBOLIC' },
  { id: 10, name: 'Entropy Resonator', symbol: '≋', function: 'BDNF plasticity modulation', equation: 'η_E = η_min + (η_max−η_min)·σ(Σw_X^η·n̂_X)', domain: 'Selfhood', status: 'STIPULATED' },
  { id: 11, name: 'Shadow Integral', symbol: '∫', function: 'Traumatic memory integration', equation: 'Ψ_{n+1} = λ₃Ψ_n − η_EΔΨ + ∫Shadow', domain: 'Memory', status: 'STIPULATED' },
  { id: 12, name: 'RFE Compass', symbol: '⊜', function: 'Reality fidelity evaluation', equation: 'RFE = ∫ΦdV / [∫A·DdV + η_E·(∮ψ·dℓ)²]', domain: 'Meaning', status: 'STIPULATED' },
  { id: 13, name: 'Temporal Compass', symbol: '⏣', function: 'Phase tolerance measurement', equation: 'ΔΘ = 3.6·exp(−|ψ−0.351|/0.1)', domain: 'Time', status: 'STIPULATED' },
  { id: 14, name: 'Hensel Lifter', symbol: '⤴', function: 'p-adic root computation', equation: 'x_{n+1} = x_n − f(x_n)·inv(f\'(x_n)) mod p^{2n}', domain: 'Selfhood', status: 'DERIVED' },
  { id: 15, name: 'Laplacian Mirror', symbol: '∇²', function: 'Self-field curvature measurement', equation: 'Δ(Self) = ζ(9)·∇²Ψ', domain: 'Selfhood', status: 'PROPOSED' },
];

export const DOMAIN_COLORS: Record<string, string> = {
  'Memory': 'from-blue-500 to-indigo-500',
  'Perception': 'from-cyan-500 to-blue-500',
  'Selfhood': 'from-purple-500 to-pink-500',
  'Time': 'from-amber-500 to-orange-500',
  'Meaning': 'from-emerald-500 to-teal-500',
};

export const CELESTIAL_CLASSES: Record<string, { color: string; glow: string }> = {
  stellar: { color: 'text-yellow-300', glow: 'shadow-yellow-500/30' },
  nebular: { color: 'text-purple-300', glow: 'shadow-purple-500/30' },
  void: { color: 'text-gray-300', glow: 'shadow-gray-500/30' },
  crystalline: { color: 'text-cyan-300', glow: 'shadow-cyan-500/30' },
  temporal: { color: 'text-orange-300', glow: 'shadow-orange-500/30' },
};

export const STATUS_COLORS: Record<string, string> = {
  'CITED': 'bg-green-900/40 text-green-300 border-green-500/30',
  'STIPULATED': 'bg-blue-900/40 text-blue-300 border-blue-500/30',
  'SYMBOLIC': 'bg-purple-900/40 text-purple-300 border-purple-500/30',
  'DERIVED': 'bg-amber-900/40 text-amber-300 border-amber-500/30',
  'PROPOSED': 'bg-red-900/40 text-red-300 border-red-500/30',
};
