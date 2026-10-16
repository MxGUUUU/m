import { useState } from 'react';
import { ARTIFACTS, STATUS_COLORS, DOMAIN_COLORS } from '../data/codexData';

export default function ArtifactsPanel() {
  const [selectedArtifact, setSelectedArtifact] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredArtifacts = ARTIFACTS.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  const statuses = ['all', 'CITED', 'STIPULATED', 'SYMBOLIC', 'DERIVED', 'PROPOSED'];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
          <span className="text-2xl">◈</span>
          Artifacts of the Ψ-Codex
          <span className="text-xs text-purple-400/60 ml-2">46 Total (showing {ARTIFACTS.length})</span>
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Functional instruments of the Ψ-field. Each artifact encodes an operator that transforms 
          the dynamical system. Epistemic tags indicate the claim's relationship to evidence.
        </p>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-purple-900/50 text-purple-200 border border-purple-500/40'
                  : 'bg-[#1a1a2e] text-gray-400 border border-purple-900/20 hover:border-purple-500/30'
              }`}
            >
              {s === 'all' ? 'All Statuses' : s}
            </button>
          ))}
        </div>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArtifacts.map(artifact => (
            <div
              key={artifact.id}
              onClick={() => setSelectedArtifact(selectedArtifact === artifact.id ? null : artifact.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedArtifact === artifact.id
                  ? 'bg-purple-900/20 border-purple-500/40 shadow-lg shadow-purple-900/20'
                  : 'bg-[#1a1a2e]/60 border-purple-900/20 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{artifact.symbol}</span>
                  <div>
                    <div className="text-sm font-bold text-purple-200">{artifact.name}</div>
                    <div className="text-xs text-gray-500">{artifact.domain}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[artifact.status]}`}>
                  {artifact.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 mt-3">{artifact.function}</p>
              
              {selectedArtifact === artifact.id && (
                <div className="mt-3 p-3 bg-[#0a0a12] rounded-lg border border-purple-900/30">
                  <div className="text-xs text-purple-300 font-mono mb-1">Equation:</div>
                  <div className="text-sm text-cyan-300 font-mono">{artifact.equation}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Functions Summary */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">Artifact Functions in the Ψ-Field</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
            <h4 className="text-sm font-bold text-cyan-300 mb-2">Sensing Artifacts</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Entropy Gradient Sensor — monitors η_E</li>
              <li>• Witcher's Medallion — threshold detector</li>
              <li>• RFE Compass — reality fidelity gauge</li>
              <li>• Temporal Compass — phase tolerance</li>
            </ul>
          </div>
          <div className="p-4 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
            <h4 className="text-sm font-bold text-purple-300 mb-2">Transforming Artifacts</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• χ²-Knot Resolver — reconsolidation</li>
              <li>• Null Scepter — holographic damping</li>
              <li>• Airy Kernel — dissociation prevention</li>
              <li>• Shadow Integral — trauma integration</li>
            </ul>
          </div>
          <div className="p-4 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
            <h4 className="text-sm font-bold text-green-300 mb-2">Stabilizing Artifacts</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Ψ-Anchor Crystal — coherence maintenance</li>
              <li>• Quintic Identity Stone — self-attractor</li>
              <li>• Aeonic Seal — temporal debt</li>
              <li>• Entropy Resonator — plasticity modulation</li>
            </ul>
          </div>
          <div className="p-4 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
            <h4 className="text-sm font-bold text-amber-300 mb-2">Computational Artifacts</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Hensel Lifter — p-adic root finder</li>
              <li>• EulerEyePhoenixSystem — 56ch matrix</li>
              <li>• Laplacian Mirror — curvature measurement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
