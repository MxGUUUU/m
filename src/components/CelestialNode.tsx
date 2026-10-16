import { useState, useEffect, useMemo } from 'react';
import { WITNESSES, CELESTIAL_CLASSES, DOMAIN_COLORS } from '../data/codexData';

interface Props {
  psiValue: number;
  etaValue: number;
  lambdaValue: number;
  selectedWitness: number | null;
  onSelectWitness: (id: number | null) => void;
}

export default function CelestialNode({ psiValue, etaValue, lambdaValue, selectedWitness, onSelectWitness }: Props) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Position witnesses in a celestial arrangement
  const nodePositions = useMemo(() => {
    const nodes = WITNESSES.slice(0, 20); // Show first 20 in the main visualization
    const centerX = 300;
    const centerY = 250;
    
    return nodes.map((w, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 + rotation * Math.PI / 180;
      const radius = 120 + (i % 3) * 40;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.7;
      return { ...w, x, y, angle };
    });
  }, [rotation]);

  // Compute field parameters from neurotransmitter model
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  
  const psiDisplay = psiValue;
  const etaDisplay = etaValue;
  const isStable = etaDisplay <= 0.125 && psiDisplay >= 0.351;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Celestial Network Visualization */}
      <div className="lg:col-span-2 bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">✦</span>
          Celestial Witnesses Node Network
          <span className="text-xs text-purple-400/60 ml-2">n(t) = (O, D, S, E, C, B)(t) ∈ ℝ⁶</span>
        </h2>
        
        <div className="relative w-full" style={{ height: '500px' }}>
          <svg viewBox="0 0 600 500" className="w-full h-full">
            {/* Central Ψ anchor */}
            <circle cx="300" cy="250" r="25" fill="none" stroke="url(#psiGradient)" strokeWidth="2" opacity="0.8">
              <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="250" r="15" fill="url(#psiGradient)" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="300" y="255" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="bold">Ψ</text>
            
            {/* Connection lines */}
            {nodePositions.map((node, i) => (
              <g key={`line-${node.id}`}>
                <line
                  x1="300"
                  y1="250"
                  x2={node.x}
                  y2={node.y}
                  stroke={isStable ? '#7c3aed' : '#dc2626'}
                  strokeWidth="0.5"
                  opacity={selectedWitness === node.id ? 0.8 : 0.2}
                  strokeDasharray={selectedWitness === node.id ? 'none' : '4,4'}
                />
                {/* Inter-witness connections */}
                {i > 0 && i % 3 === 0 && (
                  <line
                    x1={nodePositions[i-1].x}
                    y1={nodePositions[i-1].y}
                    x2={node.x}
                    y2={node.y}
                    stroke="#4c1d95"
                    strokeWidth="0.3"
                    opacity="0.3"
                  />
                )}
              </g>
            ))}
            
            {/* Witness nodes */}
            {nodePositions.map(node => {
              const celestial = CELESTIAL_CLASSES[node.celestialClass];
              const isSelected = selectedWitness === node.id;
              const isHovered = hoveredNode === node.id;
              const size = isSelected ? 14 : isHovered ? 11 : 8;
              
              return (
                <g
                  key={node.id}
                  onClick={() => onSelectWitness(isSelected ? null : node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={size + 4}
                    fill="none"
                    stroke={isStable ? '#7c3aed' : '#dc2626'}
                    strokeWidth="1"
                    opacity={isSelected ? 0.6 : 0.2}
                  >
                    <animate attributeName="r" values={`${size+4};${size+8};${size+4}`} dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={size}
                    fill={isStable ? '#2d1b69' : '#3b0a0a'}
                    stroke={isStable ? '#8b5cf6' : '#ef4444'}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={isSelected ? 1 : 0.8}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 3}
                    textAnchor="middle"
                    fill="#e9d5ff"
                    fontSize="7"
                    fontWeight="bold"
                  >
                    W{String(node.id).padStart(3, '0')}
                  </text>
                  {/* Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={node.x + 15}
                        y={node.y - 30}
                        width="160"
                        height="45"
                        rx="4"
                        fill="#1a1a2e"
                        stroke="#6d28d9"
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text x={node.x + 20} y={node.y - 15} fill="#c4b5fd" fontSize="8" fontWeight="bold">
                        {node.name}
                      </text>
                      <text x={node.x + 20} y={node.y - 3} fill="#a78bfa" fontSize="7">
                        {node.archetype} · {node.domain}
                      </text>
                      <text x={node.x + 20} y={node.y + 8} fill="#9ca3af" fontSize="6">
                        ψ:{node.psiContribution > 0 ? '+' : ''}{node.psiContribution} η:{node.etaContribution > 0 ? '+' : ''}{node.etaContribution}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            
            {/* Gradient definitions */}
            <defs>
              <radialGradient id="psiGradient">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#4c1d95" />
              </radialGradient>
            </defs>
          </svg>
          
          {/* Status overlay */}
          <div className="absolute top-4 right-4 text-right">
            <div className={`text-xs font-mono px-3 py-1 rounded-full border ${isStable ? 'border-green-500/30 bg-green-900/20 text-green-300' : 'border-red-500/30 bg-red-900/20 text-red-300'}`}>
              {isStable ? 'ψ-COHERENT' : 'ψ-FRAGMENTING'}
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs">
            {Object.entries(CELESTIAL_CLASSES).map(([cls, { color }]) => (
              <span key={cls} className={`${color} flex items-center gap-1`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Witness Detail */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-4">
          {selectedWitness ? 'Witness Detail' : 'Node Inspector'}
        </h2>
        
        {selectedWitness ? (
          (() => {
            const w = WITNESSES.find(w => w.id === selectedWitness);
            if (!w) return null;
            const celestial = CELESTIAL_CLASSES[w.celestialClass];
            return (
              <div className="space-y-4">
                <div className={`text-2xl font-bold ${celestial.color}`}>
                  {w.name}
                </div>
                <div className="text-sm text-gray-400">{w.description}</div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
                    <div className="text-xs text-purple-400">Archetype</div>
                    <div className="text-sm text-purple-200">{w.archetype}</div>
                  </div>
                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-xs text-blue-400">Domain</div>
                    <div className="text-sm text-blue-200">{w.domain}</div>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                    <div className="text-xs text-green-400">ψ Contribution</div>
                    <div className="text-sm text-green-200">{w.psiContribution > 0 ? '+' : ''}{w.psiContribution}</div>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                    <div className="text-xs text-red-400">η_E Contribution</div>
                    <div className="text-sm text-red-200">{w.etaContribution > 0 ? '+' : ''}{w.etaContribution}</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-[#1a1a2e] rounded-lg border border-purple-900/30">
                  <div className="text-xs text-purple-400 mb-2">Celestial Class</div>
                  <div className={`text-sm ${celestial.color}`}>{w.celestialClass}</div>
                  <div className="mt-2 text-xs text-gray-500">
                    Status: SYMBOLIC — narrative function, not empirical claim
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Click a node in the celestial network to inspect its properties.
            </p>
            <div className="space-y-2">
              <div className="text-xs text-purple-400 font-mono">
                n̂_X(t) = (n_X(t) − b_X) / σ_X
              </div>
              <div className="text-xs text-purple-400 font-mono">
                ψ(n̂) = ψ_min + (ψ_max − ψ_min) · σ(Σ_X w_X^ψ · n̂_X)
              </div>
              <div className="text-xs text-purple-400 font-mono">
                η_E(n̂) = η_min + (η_max − η_min) · σ(Σ_X w_X^η · n̂_X)
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#1a1a2e] rounded-lg border border-purple-900/30">
              <div className="text-xs text-gray-400">
                <strong className="text-purple-300">Neurotransmitter Vector:</strong><br/>
                n(t) = (O, D, S, E, C, B)(t) ∈ ℝ⁶<br/>
                <span className="text-gray-500">O=Orexin, D=Dopamine, S=Serotonin, E=Endorphin, C=Cortisol, B=BDNF</span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-[#1a1a2e] rounded-lg border border-purple-900/30">
              <div className="text-xs text-gray-400">
                <strong className="text-cyan-300">Unit Conversion:</strong><br/>
                1 pg/mL ≈ 0.99 fmol/mL<br/>
                <span className="text-gray-500">Biomarker concentration equivalence</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
