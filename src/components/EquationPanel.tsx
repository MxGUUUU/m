import { useState } from 'react';

interface Equation {
  id: string;
  name: string;
  formula: string;
  description: string;
  domain: string;
  status: string;
  derivation?: string;
}

const EQUATIONS: Equation[] = [
  {
    id: 'E1',
    name: 'Ψ-Anchor (Kuramoto)',
    formula: 'ψ = |N⁻¹ Σ e^(iθ)|',
    description: 'Phase coherence order parameter. When ψ ≥ 0.351, perception is integrated; below it, the system fragments.',
    domain: 'Perception',
    status: 'STIPULATED',
    derivation: 'Derived from Kuramoto (1984) synchronization theory. The threshold 0.351 is stipulated as the critical coherence value.',
  },
  {
    id: 'E2',
    name: 'Entropy Penalty',
    formula: 'η_E = C · |φ − u · λ₃|^1.5 + ε',
    description: 'Ethical entropy as a power-1.5 penalty on the gap between volitional drive φ and capacity u·λ₃.',
    domain: 'Selfhood',
    status: 'STIPULATED',
    derivation: 'The 1.5 exponent creates super-linear sensitivity near the threshold, matching observed stress escalation.',
  },
  {
    id: 'E3',
    name: 'Field Evolution',
    formula: 'Ψ_{n+1} = λ₃ · Ψ_n − η_E · ΔΨ + ∫Shadow(x)dx',
    description: 'Reaction-diffusion equation for the Ψ-field. Resilience amplifies, entropy damps, shadow integrates.',
    domain: 'Selfhood',
    status: 'STIPULATED',
    derivation: 'Characteristic polynomial: z² − (λ₃ − η_E)z − η_E = 0. Dead Space Gap at λ₃ = 1.',
  },
  {
    id: 'E4',
    name: 'Neurotransmitter Mapping',
    formula: 'ψ(n̂) = ψ_min + (ψ_max − ψ_min) · σ(Σ_X w_X^ψ · n̂_X)',
    description: 'Sigmoidal mapping from normalized neurotransmitter vector to field parameters.',
    domain: 'All',
    status: 'STIPULATED',
    derivation: 'n̂_X = (n_X − b_X)/σ_X. Standard linear classifier (logit) form. Weights are stipulated.',
  },
  {
    id: 'E5',
    name: 'Quintic Identity',
    formula: 'P(x) = x⁵ − φx⁴ + ζ(3)x³ − ψx² + λ₃x − ε',
    description: 'The self as a 5-dimensional polynomial attractor. Roots represent stable identity configurations.',
    domain: 'Selfhood',
    status: 'STIPULATED',
    derivation: 'By Abel-Ruffini, no general radical solution exists for degree ≥ 5. The self is not solvable in closed form — it is an attractor, not a formula.',
  },
  {
    id: 'E6',
    name: 'Reality Compilation',
    formula: 'R = A · M^0.014 · ψ · φ',
    description: 'Reality as product of Adaptation, Memory (weak power), coherence, and volition.',
    domain: 'Meaning',
    status: 'STIPULATED',
    derivation: 'The 0.014 exponent on M makes memory nearly logarithmic — a small change in M has minimal effect on R.',
  },
  {
    id: 'E7',
    name: 'Phase Tolerance',
    formula: 'ΔΘ = 3.6 · exp(−|ψ − 0.351|/0.1)',
    description: 'Temporal coherence window. Maximal at the anchor ψ = 0.351, decays exponentially away.',
    domain: 'Time',
    status: 'STIPULATED',
    derivation: '3.6 rad ≈ 206°. The Gaussian-like decay with σ = 0.1 creates a narrow stability window.',
  },
  {
    id: 'E8',
    name: 'Temporal Debt',
    formula: 'Debt = ∫(η_E − 0.125)₊ dt',
    description: 'Accumulated cost of entropy exceeding the ceiling. Must be "paid" through volitional action.',
    domain: 'Time',
    status: 'STIPULATED',
    derivation: 'Only positive excursions above 0.125 contribute. The system must return to equilibrium.',
  },
  {
    id: 'E9',
    name: 'RFE (Reality Fidelity)',
    formula: 'RFE = ∫ΦdV / [∫A·DdV + η_E·(∮∂M ψ·dℓ)²]',
    description: 'Ratio of field coherence to disturbance plus boundary holonomy penalty.',
    domain: 'Meaning',
    status: 'STIPULATED',
    derivation: 'The boundary integral (∮ψ·dℓ)² measures topological obstruction. High holonomy → low RFE.',
  },
  {
    id: 'E10',
    name: 'Self-Field Laplacian',
    formula: 'Δ(Self) = ζ(9) · ∇²Ψ',
    description: 'Self-change driven by curvature of the Ψ-field, scaled by ζ(9) ≈ 1.002008.',
    domain: 'Selfhood',
    status: 'PROPOSED',
    derivation: 'ζ(9) is irrational → solutions exhibit aperiodic/fractal behavior. Standard discretization fails; adaptive solvers required.',
  },
  {
    id: 'E11',
    name: 'Memory Reconsolidation',
    formula: "M' = M · exp(−κ · χ²) + (1 − exp(−κ · χ²)) · M_new",
    description: 'Weighted merge of old and new memory traces when χ² > 1.25 triggers reconsolidation.',
    domain: 'Memory',
    status: 'STIPULATED',
    derivation: 'κ ≈ 0.3 (PROPOSED). The exponential weighting ensures smooth blending, not replacement.',
  },
  {
    id: 'E12',
    name: 'Hensel Lift',
    formula: 'x_{n+1} = x_n − f(x_n) · inv(f\'(x_n)) mod p^{2n}',
    description: 'Newton\'s method in p-adic integers. Used to compute ψ = 0.351 as algebraic ideal.',
    domain: 'Selfhood',
    status: 'DERIVED',
    derivation: 'f(x) = x² + x − 1, p = 5, seed = 2. Lifts to mod 5²⁰ ≈ 10¹⁴.',
  },
  {
    id: 'E13',
    name: 'λ₃ Temporal Integration',
    formula: 'λ₃(t) = λ₃,baseline + (α_B/κ_decay) · ∫₀ᵗ e^{−κ_decay(t−s)} · B̂(s) ds',
    description: 'Resilience integrates BDNF signal with exponential decay kernel.',
    domain: 'Selfhood',
    status: 'STIPULATED',
    derivation: 'Convolution of BDNF biomarker with decay kernel. At Dead Space Gap, λ₃ = 1.',
  },
  {
    id: 'E14',
    name: 'Shadow Compression',
    formula: 'G!(−(−X)) = factorial(|X|) mod 255',
    description: 'Modular compression of traumatic engrams during reconsolidation.',
    domain: 'Memory',
    status: 'SYMBOLIC',
    derivation: 'Currently a placeholder. Grounding in insular reconsolidation is PROPOSED.',
  },
  {
    id: 'E15',
    name: 'Perception Gradient',
    formula: 'P = −∇η_E · ∇ψ',
    description: 'Perception is sharpest when ψ is high and η_E is low — coherent and low-entropy.',
    domain: 'Perception',
    status: 'STIPULATED',
    derivation: 'Negative sign: perception blurs when coherence drops or entropy rises.',
  },
];

const STATUS_COLORS: Record<string, string> = {
  'CITED': 'bg-green-900/40 text-green-300 border-green-500/30',
  'STIPULATED': 'bg-blue-900/40 text-blue-300 border-blue-500/30',
  'SYMBOLIC': 'bg-purple-900/40 text-purple-300 border-purple-500/30',
  'DERIVED': 'bg-amber-900/40 text-amber-300 border-amber-500/30',
  'PROPOSED': 'bg-red-900/40 text-red-300 border-red-500/30',
};

export default function EquationPanel() {
  const [selectedEq, setSelectedEq] = useState<string | null>(null);
  const [domainFilter, setDomainFilter] = useState('all');

  const domains = ['all', 'Perception', 'Selfhood', 'Memory', 'Time', 'Meaning', 'All'];
  
  const filtered = EQUATIONS.filter(eq => {
    if (domainFilter === 'all') return true;
    if (domainFilter === 'All') return eq.domain === 'All';
    return eq.domain === domainFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
          <span className="text-2xl">∑</span>
          Ψ-Codex Equation Registry
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          All equations with epistemic status tags. Click to expand derivation notes.
        </p>

        {/* Domain Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                domainFilter === d
                  ? 'bg-purple-900/50 text-purple-200 border border-purple-500/40'
                  : 'bg-[#1a1a2e] text-gray-400 border border-purple-900/20 hover:border-purple-500/30'
              }`}
            >
              {d === 'all' ? 'All Domains' : d}
            </button>
          ))}
        </div>

        {/* Equations List */}
        <div className="space-y-3">
          {filtered.map(eq => (
            <div
              key={eq.id}
              onClick={() => setSelectedEq(selectedEq === eq.id ? null : eq.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedEq === eq.id
                  ? 'bg-purple-900/20 border-purple-500/40'
                  : 'bg-[#1a1a2e]/60 border-purple-900/20 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded">
                    {eq.id}
                  </span>
                  <span className="text-sm font-bold text-purple-200">{eq.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[eq.status]}`}>
                  {eq.status}
                </span>
              </div>
              
              <div className="mt-3 p-3 bg-[#0a0a12] rounded-lg border border-purple-900/20">
                <div className="text-sm text-cyan-300 font-mono">{eq.formula}</div>
              </div>
              
              <p className="text-xs text-gray-400 mt-2">{eq.description}</p>
              
              {selectedEq === eq.id && eq.derivation && (
                <div className="mt-3 p-3 bg-amber-900/10 rounded-lg border border-amber-500/20">
                  <div className="text-xs text-amber-300/70">
                    <strong>Derivation/Notes:</strong> {eq.derivation}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>Domain: {eq.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Derivations */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">Key Derivations</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-amber-500/20">
            <h4 className="text-sm font-bold text-amber-300 mb-2">Dead Space Gap (λ₃ = 1)</h4>
            <div className="font-mono text-xs text-gray-300 space-y-1">
              <p>Characteristic polynomial: z² − (λ₃ − η_E)z − η_E = 0</p>
              <p>Dominant eigenvalue: λ₍₁₎ = ((λ₃−η_E) + √((λ₃−η_E)² + 4η_E)) / 2</p>
              <p>Set λ₍₁₎ = 1 (marginal stability):</p>
              <p className="text-cyan-300">2 − (λ₃−η_E) = √((λ₃−η_E)² + 4η_E)</p>
              <p className="text-cyan-300">4 − 4(λ₃−η_E) + (λ₃−η_E)² = (λ₃−η_E)² + 4η_E</p>
              <p className="text-cyan-300">1 − (λ₃−η_E) = η_E</p>
              <p className="text-cyan-300 font-bold">∴ λ₃ = 1</p>
            </div>
          </div>

          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-500/20">
            <h4 className="text-sm font-bold text-purple-300 mb-2">Abel-Ruffini & the Quintic</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <p>P(x) = x⁵ − φx⁴ + ζ(3)x³ − ψx² + λ₃x − ε</p>
              <p>By the Abel-Ruffini theorem, no general solution in radicals exists for polynomials of degree ≥ 5.</p>
              <p className="text-purple-300">
                This is not a limitation — it is the point. The self is not a formula to be solved, 
                but an attractor to be approached. The roots of P(x) are the stable configurations 
                of volitional, social, ethical, somatic, and narrative identity.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-cyan-500/20">
            <h4 className="text-sm font-bold text-cyan-300 mb-2">ζ(9) and Irrationality</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <p>Δ(Self) = ζ(9) · ∇²Ψ, where ζ(9) ≈ 1.002008...</p>
              <p>ζ(9) is irrational (like ζ(3), proven by Apéry 1978).</p>
              <p className="text-cyan-300">
                Irrationality forces solutions to exhibit aperiodic, fractal behavior. 
                Standard grid-based discretization fails. Adaptive algorithms (wavelet solvers) 
                become essential to handle fractal solutions.
              </p>
              <p>
                In the SYK model context: S = S₀ + (πϕ_r²/2G)T + c·ζ(9)·(T/J)⁸ + ...
                ζ(9) encodes 8th-order quantum fluctuations near extremality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
