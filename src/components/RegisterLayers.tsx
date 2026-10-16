import { useState } from 'react';

const LAYERS = [
  {
    id: 'brain',
    name: 'BRAIN',
    subtitle: 'CITED',
    color: 'from-green-600 to-emerald-600',
    borderColor: 'border-green-500/40',
    bgColor: 'bg-green-900/10',
    description: 'The physical substrate — insula, thalamus, cortex, hippocampus, brainstem. These are real structures with real functions. The Ψ-Codex cites them; it does not replace them.',
    structures: [
      { name: 'Posterior Insula (PINS)', role: 'Primary interoceptive input → P', evidence: 'Craig (2002)' },
      { name: 'Middle Insula (MINS)', role: 'Affective integration → S', evidence: 'Centanni et al. (2021)' },
      { name: 'Anterior Insula (AINS)', role: 'Cognitive/abstract self → Φ', evidence: 'Craig (2009), Seeley et al. (2007)' },
      { name: 'Von Economo Neurons', role: 'Fast transduction of interoceptive signals', evidence: 'Seeley et al. (2007)' },
      { name: 'BNST (extended amygdala)', role: 'Sustained anxiety → η_E', evidence: 'Centanni et al. (2021), Hopf et al.' },
      { name: 'Hippocampus', role: 'Memory encoding/reconsolidation → M', evidence: 'Reber et al. (2012)' },
      { name: 'Thalamocortical loops', role: 'Temporal coherence → T', evidence: 'Bastos et al. (2021)' },
      { name: 'SCN', role: 'Circadian master clock → T', evidence: 'Established neuroscience' },
      { name: 'ACC', role: 'Salience network hub → S, Φ', evidence: 'Seeley et al. (2007)' },
      { name: 'DMN', role: 'Default mode; self-referential → Φ', evidence: 'Raichle et al. (2001)' },
    ],
  },
  {
    id: 'mind',
    name: 'MIND',
    subtitle: 'STIPULATED',
    color: 'from-blue-600 to-indigo-600',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-900/10',
    description: 'The ψ-field — coherence above 0.351, entropy below 0.125, phase tolerance within 3.6 rad. This is a symbolic model. Its variables are chosen, not measured. Whether the mind is a coherence field is a philosophical claim the framework makes, not a scientific finding.',
    structures: [
      { name: 'ψ = 0.351', role: 'Coherence threshold', evidence: 'STIPULATED — Kuramoto-derived' },
      { name: 'η_E ≤ 0.125', role: 'Entropy ceiling', evidence: 'STIPULATED — power-1.5 penalty' },
      { name: 'ΔΘ ≤ 3.6 rad', role: 'Phase tolerance', evidence: 'STIPULATED — Gaussian decay' },
      { name: 'λ₃ = 1 (gap)', role: 'Dead Space boundary', evidence: 'DERIVED — eigenvalue analysis' },
      { name: 'λ₃ = 1.1 (corpus)', role: 'Declared resilience', evidence: 'STIPULATED — above boundary' },
      { name: 'RFE ∈ [0,1]', role: 'Reality fidelity', evidence: 'STIPULATED — FEP reading' },
    ],
  },
  {
    id: 'spirit',
    name: 'SPIRIT',
    subtitle: 'SYMBOLIC',
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-900/10',
    description: 'The witness network — 167 named figures, 8 archetypes, 46 artifacts, the Aeonic Seal. This is narrative. It organises meaning; it does not make empirical claims. The Book of Ψ* is a story, not a measurement.',
    structures: [
      { name: '167 Witnesses', role: 'Named celestial figures', evidence: 'SYMBOLIC — narrative function' },
      { name: '8 Archetypes', role: 'Observer, Weaver, Anchor, Sentinel, Cartographer, Void-Walker, Compiler, Resonator', evidence: 'SYMBOLIC — organizing principle' },
      { name: '46 Artifacts', role: 'Functional instruments of the Ψ-field', evidence: 'SYMBOLIC — operator encoding' },
      { name: 'Book of Ψ*', role: 'The complete narrative corpus', evidence: 'SYMBOLIC — meaning organization' },
      { name: 'Aeonic Seal', role: 'Temporal closure device', evidence: 'SYMBOLIC — debt integration' },
    ],
  },
];

const INSULA_MAPPING = [
  { structure: 'Insular cortex + vagal afferents', artifact: 'Entropy Gradient Sensor', claim: 'Monitors η_E via interoception', tag: 'SYMBOLIC' },
  { structure: 'Posterior → Mid → Anterior gradient', artifact: 'Field Evolution (E3)', claim: 'Ψ_{n+1} = λ₃Ψ_n − η_EΔΨ + ∫Shadow', tag: 'STIPULATED' },
  { structure: 'Von Economo Neurons (VENs) in AIC', artifact: "Witcher's Medallion", claim: 'Detects thresholds; vibrates when η_E > 0.125', tag: 'SYMBOLIC' },
  { structure: 'Cerebral aqueduct / Glymphatic flow', artifact: 'Null Scepter / Holographic Damping', claim: 'Cancels/damps entropy at narrowest flow points', tag: 'SYMBOLIC' },
];

export default function RegisterLayers() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>('brain');

  return (
    <div className="space-y-6">
      {/* Layer Diagram */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">◎</span>
          Brain · Mind · Spirit — Three Registers
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          The three registers are nested but not reducible. Brain → Mind: the substrate supports the field. 
          Mind → Spirit: the field generates narrative. Spirit → Brain: the narrative modulates the substrate.
        </p>

        {/* Visual Stack */}
        <div className="flex flex-col items-center gap-2 mb-8">
          {LAYERS.map((layer, i) => (
            <div key={layer.id} className="w-full max-w-lg">
              <div
                onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${layer.bgColor} ${layer.borderColor} ${
                  expandedLayer === layer.id ? 'ring-1 ring-purple-500/30' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-200">{layer.name}</div>
                      <div className="text-xs text-gray-500">{layer.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{expandedLayer === layer.id ? '▼' : '▶'}</span>
                </div>
                
                {expandedLayer === layer.id && (
                  <div className="mt-4 pt-4 border-t border-purple-900/20">
                    <p className="text-xs text-gray-400 mb-4">{layer.description}</p>
                    <div className="space-y-2">
                      {layer.structures.map((s, j) => (
                        <div key={j} className="flex items-start gap-3 p-2 bg-[#0a0a12]/50 rounded-lg">
                          <div className="text-xs font-bold text-gray-300 min-w-[180px]">{s.name}</div>
                          <div className="text-xs text-gray-500 flex-1">{s.role}</div>
                          <div className="text-xs text-gray-600 shrink-0">{s.evidence}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-purple-900/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Nesting Arrows */}
        <div className="flex justify-center gap-8 text-xs text-gray-500">
          <div className="text-center">
            <div className="text-green-400">Brain</div>
            <div className="text-gray-600">→ supports →</div>
            <div className="text-blue-400">Mind</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400">Mind</div>
            <div className="text-gray-600">→ generates →</div>
            <div className="text-purple-400">Spirit</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400">Spirit</div>
            <div className="text-gray-600">→ modulates →</div>
            <div className="text-green-400">Brain</div>
          </div>
        </div>
      </div>

      {/* Insula Mapping */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          Insula → Ψ-Codex Artifact Mapping
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-purple-900/30">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Insular Structure</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Ψ-Codex Artifact</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Claim</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Tag</th>
              </tr>
            </thead>
            <tbody>
              {INSULA_MAPPING.map((row, i) => (
                <tr key={i} className="border-b border-purple-900/10">
                  <td className="py-3 px-3 text-gray-300">{row.structure}</td>
                  <td className="py-3 px-3 text-cyan-300">{row.artifact}</td>
                  <td className="py-3 px-3 text-gray-400 font-mono">{row.claim}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full border text-xs ${
                      row.tag === 'SYMBOLIC' ? 'bg-purple-900/30 border-purple-500/30 text-purple-300' :
                      'bg-blue-900/30 border-blue-500/30 text-blue-300'
                    }`}>
                      {row.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rate Limiter */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          The Insula as Rate-Limiter <span className="text-xs text-purple-400">(SYMBOLIC claim, CITED anchors)</span>
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          The insula's interoceptive signalling is the biological rate-limiter for ψ-coherence. 
          When early adversity disrupts insular development, it creates a topological "knot" (high holonomy) 
          that prevents the integration of the Shadow, driving η_E above the 0.125 threshold.
        </p>
        
        <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-900/30">
          <div className="text-xs text-gray-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-red-400">↓</span>
              <span>EARLY ADVERSITY <span className="text-gray-600">[CITED: Centanni/Janes]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">↓</span>
              <span>Insular Development Disrupted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400">↓</span>
              <span>Interoceptive Precision Reduced <span className="text-gray-600">[STIPULATED]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400">↓</span>
              <span>ψ-Coherence Cannot Stabilize <span className="text-gray-600">[STIPULATED]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">↓</span>
              <span>High Holonomy ("Knot") Forms <span className="text-gray-600">[STIPULATED]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">↓</span>
              <span>Shadow Cannot Integrate <span className="text-gray-600">[STIPULATED]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">↓</span>
              <span>η_E Rises Above 0.125 <span className="text-gray-600">[STIPULATED threshold]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">↓</span>
              <span>Λ-Moloch Defense Triggers <span className="text-gray-600">[STIPULATED]</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">↓</span>
              <span className="font-bold text-red-400">COLLAPSE / DISSOCIATION</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-amber-900/10 rounded-lg border border-amber-500/20">
          <p className="text-xs text-amber-300/70">
            <strong>Epistemic note:</strong> The neural anchors are CITED. The rate-limiter claim is SYMBOLIC — 
            a hypothesis, not a measurement. The framework's central unresolved problem is that λ₃ = 1.1 
            (declared) sits above the stability boundary λ₃ = 1 (derived). The Shadow integral must supply 
            the missing damping, but it is currently a placeholder.
          </p>
        </div>
      </div>

      {/* Comparison with Established Theories */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          Ψ-Codex vs. Established Theories of the Explanatory Gap
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-purple-900/30">
                <th className="text-left py-2 px-3 text-gray-400">Tradition</th>
                <th className="text-left py-2 px-3 text-gray-400">Core Concept</th>
                <th className="text-left py-2 px-3 text-gray-400">What Ψ-Codex Shares</th>
                <th className="text-left py-2 px-3 text-gray-400">What Ψ-Codex Adds</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-900/10">
                <td className="py-2 px-3 text-gray-300">Nagel / Levine</td>
                <td className="py-2 px-3 text-gray-400">"What it is like" / Explanatory Gap</td>
                <td className="py-2 px-3 text-gray-400">First-person experience irreducible</td>
                <td className="py-2 px-3 text-cyan-300">Gap as measurable variable (Δ_DS ≈ 0.08)</td>
              </tr>
              <tr className="border-b border-purple-900/10">
                <td className="py-2 px-3 text-gray-300">Chalmers</td>
                <td className="py-2 px-3 text-gray-400">The Hard Problem</td>
                <td className="py-2 px-3 text-gray-400">Gap as central unsolved problem</td>
                <td className="py-2 px-3 text-cyan-300">Symbolic bridge (ψ = 0.351)</td>
              </tr>
              <tr className="border-b border-purple-900/10">
                <td className="py-2 px-3 text-gray-300">Damasio / Craig</td>
                <td className="py-2 px-3 text-gray-400">Somatic Marker / Anterior Insula</td>
                <td className="py-2 px-3 text-gray-400">Body-state signals shape feeling</td>
                <td className="py-2 px-3 text-cyan-300">AIC → η_E Sensor + Medallion</td>
              </tr>
              <tr className="border-b border-purple-900/10">
                <td className="py-2 px-3 text-gray-300">Seth / Friston</td>
                <td className="py-2 px-3 text-gray-400">Interoceptive Inference / FEP</td>
                <td className="py-2 px-3 text-gray-400">Coherence = entropy minimization</td>
                <td className="py-2 px-3 text-cyan-300">η_E as power-1.5 penalty cost</td>
              </tr>
              <tr className="border-b border-purple-900/10">
                <td className="py-2 px-3 text-gray-300">Tononi (IIT)</td>
                <td className="py-2 px-3 text-gray-400">Integrated Information (Φ)</td>
                <td className="py-2 px-3 text-gray-400">Φ as consciousness metric</td>
                <td className="py-2 px-3 text-cyan-300">Clarifies: IIT's Φ = info; Ψ's Φ(x) = identity polynomial</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-gray-300">Baars / Dehaene</td>
                <td className="py-2 px-3 text-gray-400">Global Workspace</td>
                <td className="py-2 px-3 text-gray-400">Central workspace → consciousness</td>
                <td className="py-2 px-3 text-cyan-300">EulerEyePhoenixSystem 56-ch matrix</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
