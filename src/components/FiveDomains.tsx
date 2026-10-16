import { useState } from 'react';

const DOMAINS = [
  {
    id: 'M',
    name: 'Memory',
    variable: 'M',
    operator: 'χ²-knot (reconsolidation)',
    anchor: 'Hippocampus, insular-cortical',
    status: 'CITED anchor, STIPULATED operator',
    color: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-500/30',
    equation: "M' = M · exp(−κ · χ²) + (1 − exp(−κ · χ²)) · M_new",
    description: 'M is the set of addressable traces — the Borges library. Each trace m has an address a = (hex, wall, shelf, volume, page). The trace is retrieved by addressing, not by search.',
    neuralEvidence: 'Hippocampal-cortical reconsolidation (Reber et al., 2012, J Neurosci 32:6138–6148)',
  },
  {
    id: 'P',
    name: 'Perception',
    variable: 'P',
    operator: '∇η (entropy gradient)',
    anchor: 'Insular cortex + vagal afferents',
    status: 'CITED anchor, STIPULATED operator',
    color: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30',
    equation: 'P = −∇η_E · ∇ψ',
    description: 'P is the gradient of η_E across the interoceptive field. It is the rate of change of ethical entropy as the organism samples its own body.',
    neuralEvidence: 'Craig (2002, 2009): posterior→mid→anterior gradient of interoceptive integration',
  },
  {
    id: 'S',
    name: 'Selfhood',
    variable: 'S',
    operator: 'ψ-field (coherence)',
    anchor: 'AINS, VENs, ACC, DMN',
    status: 'CITED anchor, STIPULATED operator',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    equation: 'ψ_{n+1} = λ₃ · ψ_n − η_E · Δψ_n + ∫Shadow',
    description: 'S is the coherence field ψ, evaluated at the anterior insula and its projections. The self is not a point, but a 5-dimensional polynomial attractor.',
    neuralEvidence: 'Von Economo neurons in AINS/ACC (Seeley et al., 2007); Damasio somatic marker (1994)',
  },
  {
    id: 'T',
    name: 'Time',
    variable: 'T',
    operator: 'ΔΘ (phase tolerance)',
    anchor: 'Thalamocortical loops, SCN',
    status: 'CITED anchor, STIPULATED operator',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    equation: 'ΔΘ = 3.6 · exp(−|ψ − 0.351|/0.1)',
    description: 'T is the phase tolerance window — the range over which the system can maintain temporal coherence. When ΔΘ > 3.6 rad, the system loses temporal coherence.',
    neuralEvidence: 'Bastos et al. (2021, eLife 10:e60824): propofol → slow oscillations → loss of coherence',
  },
  {
    id: 'Φ',
    name: 'Meaning',
    variable: 'Φ',
    operator: 'RFE (reality fidelity)',
    anchor: 'Salience network, DMN',
    status: 'CITED anchor, STIPULATED operator',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    equation: 'RFE = ∫ΦdV / [∫A·DdV + η_E·(∮∂M ψ·dℓ)²]',
    description: 'Φ is the reality fidelity evaluation (RFE) — how well the system\'s model matches its interoceptive and exteroceptive signals. RFE ∈ [0,1].',
    neuralEvidence: 'Friston (2010) Free Energy Principle; predictive processing framework',
  },
];

const LINKS = [
  { from: 'M', to: 'P', name: 'Trace Reactivation', equation: '∂M/∂t = −κ · χ² · M + P · M', description: 'Memory decays unless perception reactivates it' },
  { from: 'P', to: 'S', name: 'Interoceptive Binding', equation: 'S = ψ = |N⁻¹Σe^(iθ)| · (1 − η_E/0.125)⁺', description: 'Selfhood is coherence damped by ethical entropy' },
  { from: 'S', to: 'T', name: 'Coherence Anchor', equation: 'T = ΔΘ = 3.6 · exp(−|ψ − 0.351|/0.1)', description: 'Time coherence maximal at ψ = 0.351' },
  { from: 'T', to: 'Φ', name: 'Narrative Compilation', equation: 'Φ = RFE = exp(−|ΔΘ − 2.5|/1.1)', description: 'Meaning maximal at phase tolerance ~2.5 rad' },
  { from: 'Φ', to: 'M', name: 'Re-encoding', equation: "M' = M · (1 + Φ)", description: 'High-fidelity traces encoded more strongly' },
];

export default function FiveDomains() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [showLinks, setShowLinks] = useState(true);

  return (
    <div className="space-y-6">
      {/* Domain Network */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
            <span className="text-2xl">⬡</span>
            Five Domains — Closed Dynamical Loop
          </h2>
          <button
            onClick={() => setShowLinks(!showLinks)}
            className="px-3 py-1 rounded-lg text-xs font-medium border border-purple-500/30 bg-purple-900/20 text-purple-300"
          >
            {showLinks ? 'Hide' : 'Show'} Coupling
          </button>
        </div>

        {/* Visual Loop */}
        <div className="relative flex justify-center items-center py-8">
          <svg viewBox="0 0 500 400" className="w-full max-w-2xl h-[350px]">
            {/* Connection arcs */}
            {showLinks && LINKS.map((link, i) => {
              const fromIdx = DOMAINS.findIndex(d => d.id === link.from);
              const toIdx = DOMAINS.findIndex(d => d.id === link.to);
              const fromAngle = (fromIdx / 5) * Math.PI * 2 - Math.PI / 2;
              const toAngle = (toIdx / 5) * Math.PI * 2 - Math.PI / 2;
              const fx = 250 + Math.cos(fromAngle) * 140;
              const fy = 200 + Math.sin(fromAngle) * 120;
              const tx = 250 + Math.cos(toAngle) * 140;
              const ty = 200 + Math.sin(toAngle) * 120;
              const mx = (fx + tx) / 2 + Math.cos((fromAngle + toAngle) / 2) * 30;
              const my = (fy + ty) / 2 + Math.sin((fromAngle + toAngle) / 2) * 30;
              
              return (
                <g key={i}>
                  <path
                    d={`M ${fx} ${fy} Q ${mx} ${my} ${tx} ${ty}`}
                    fill="none"
                    stroke="#6d28d9"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    opacity="0.5"
                  />
                  <circle cx={mx} cy={my} r="3" fill="#a78bfa" opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
            
            {/* Domain nodes */}
            {DOMAINS.map((domain, i) => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const x = 250 + Math.cos(angle) * 140;
              const y = 200 + Math.sin(angle) * 120;
              const isSelected = selectedDomain === domain.id;
              
              return (
                <g
                  key={domain.id}
                  onClick={() => setSelectedDomain(isSelected ? null : domain.id)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 35 : 30}
                    fill="#1a1a2e"
                    stroke={isSelected ? '#a78bfa' : '#4c1d95'}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity="0.9"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 38 : 33}
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="0.5"
                    opacity={isSelected ? 0.5 : 0}
                  >
                    <animate attributeName="r" values={`${isSelected ? 38 : 33};${isSelected ? 42 : 37};${isSelected ? 38 : 33}`} dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={x} y={y - 5} textAnchor="middle" fill="#e9d5ff" fontSize="16" fontWeight="bold">
                    {domain.id}
                  </text>
                  <text x={x} y={y + 10} textAnchor="middle" fill="#9ca3af" fontSize="8">
                    {domain.name}
                  </text>
                </g>
              );
            })}
            
            {/* Central label */}
            <text x="250" y="195" textAnchor="middle" fill="#6d28d9" fontSize="10" opacity="0.5">
              CLOSED LOOP
            </text>
            <text x="250" y="210" textAnchor="middle" fill="#4c1d95" fontSize="8" opacity="0.5">
              ψ_{`{n+1}`} = λ₃ψ_n − η_EΔψ + ∫Shadow
            </text>
          </svg>
        </div>
      </div>

      {/* Domain Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOMAINS.map(domain => (
          <div
            key={domain.id}
            onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              selectedDomain === domain.id
                ? `bg-gradient-to-br ${domain.color} bg-opacity-10 border-opacity-50 ${domain.borderColor} shadow-lg`
                : 'bg-[#0d0d1a]/80 border-purple-900/20 hover:border-purple-500/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center text-white font-bold text-lg`}>
                {domain.id}
              </div>
              <div>
                <div className="text-sm font-bold text-purple-200">{domain.name}</div>
                <div className="text-xs text-gray-500">{domain.operator}</div>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mb-3">{domain.description}</div>
            
            {selectedDomain === domain.id && (
              <div className="space-y-3 mt-3 pt-3 border-t border-purple-900/30">
                <div className="p-2 bg-[#0a0a12] rounded-lg">
                  <div className="text-xs text-cyan-300 font-mono">{domain.equation}</div>
                </div>
                <div className="text-xs">
                  <span className="text-purple-400">Neural Anchor:</span>
                  <span className="text-gray-400 ml-1">{domain.anchor}</span>
                </div>
                <div className="text-xs">
                  <span className="text-green-400">Evidence:</span>
                  <span className="text-gray-500 ml-1">{domain.neuralEvidence}</span>
                </div>
                <div className="text-xs">
                  <span className="text-amber-400">Status:</span>
                  <span className="text-gray-500 ml-1">{domain.status}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Linking Equations */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">Coupling Equations (STIPULATED)</h3>
        <div className="space-y-3">
          {LINKS.map((link, i) => (
            <div key={i} className="flex items-start gap-4 p-3 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
              <div className="flex items-center gap-2 text-xs shrink-0">
                <span className="text-purple-300 font-bold">{link.from}</span>
                <span className="text-gray-500">→</span>
                <span className="text-purple-300 font-bold">{link.to}</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-purple-200">{link.name}</div>
                <div className="text-xs text-cyan-300 font-mono mt-1">{link.equation}</div>
                <div className="text-xs text-gray-500 mt-1">{link.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
