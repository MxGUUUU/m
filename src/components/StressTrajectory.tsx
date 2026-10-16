import { useState, useEffect, useRef } from 'react';

interface Props {
  psiValue: number;
  etaValue: number;
}

export default function StressTrajectory({ psiValue, etaValue }: Props) {
  const [trajectory, setTrajectory] = useState<{ t: number; eta: number; psi: number; phase: string }[]>([]);
  const [stressLevel, setStressLevel] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  // Simulate stress trajectory
  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 0.05;
      const t = timeRef.current;
      
      // Simulate early adversity → stress → collapse
      const phase = t < 10 ? 'baseline' : t < 20 ? 'adversity' : t < 30 ? 'knot' : t < 40 ? 'moloch' : 'collapse';
      
      let eta: number;
      let psi: number;
      
      switch (phase) {
        case 'baseline':
          eta = 0.08 + 0.02 * Math.sin(t * 0.5);
          psi = 0.5 + 0.05 * Math.cos(t * 0.3);
          break;
        case 'adversity':
          eta = 0.10 + (t - 10) * 0.005 + 0.02 * Math.sin(t);
          psi = 0.45 - (t - 10) * 0.01;
          break;
        case 'knot':
          eta = 0.12 + 0.01 * Math.sin(t * 2);
          psi = 0.38 - 0.02 * Math.sin(t * 1.5);
          break;
        case 'moloch':
          eta = 0.13 + (t - 30) * 0.003;
          psi = 0.35 - (t - 30) * 0.005;
          break;
        case 'collapse':
          eta = 0.16 + 0.02 * Math.sin(t * 3);
          psi = 0.25 - 0.05 * Math.sin(t * 2);
          break;
      }
      
      setStressLevel(eta);
      setTrajectory(prev => [...prev, { t, eta, psi, phase }].slice(-300));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Draw trajectory
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#0a1a0a');
    gradient.addColorStop(0.3, '#0a0a1a');
    gradient.addColorStop(0.6, '#1a0a0a');
    gradient.addColorStop(1, '#2a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Phase boundaries
    const phases = [
      { x: 0.25, label: 'ADVERSITY', color: '#f59e0b' },
      { x: 0.5, label: 'KNOT', color: '#f97316' },
      { x: 0.75, label: 'MOLOCH', color: '#ef4444' },
    ];
    phases.forEach(p => {
      ctx.strokeStyle = p.color + '40';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(w * p.x, 0);
      ctx.lineTo(w * p.x, h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = p.color + '80';
      ctx.font = '9px monospace';
      ctx.fillText(p.label, w * p.x + 5, 12);
    });

    // η_E threshold line
    ctx.strokeStyle = '#ef444460';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, h - 0.125 * h * 5);
    ctx.lineTo(w, h - 0.125 * h * 5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444';
    ctx.font = '9px monospace';
    ctx.fillText('η_E = 0.125', 5, h - 0.125 * h * 5 - 5);

    // ψ threshold line
    ctx.strokeStyle = '#a78bfa60';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, h - 0.351 * h * 2);
    ctx.lineTo(w, h - 0.351 * h * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('ψ = 0.351', 5, h - 0.351 * h * 2 - 5);

    // η_E trace
    if (trajectory.length > 1) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trajectory.forEach((point, i) => {
        const x = (i / 300) * w;
        const y = h - point.eta * h * 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // ψ trace
    if (trajectory.length > 1) {
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trajectory.forEach((point, i) => {
        const x = (i / 300) * w;
        const y = h - point.psi * h * 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Legend
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(w - 100, 10, 10, 3);
    ctx.fillStyle = '#ef4444';
    ctx.font = '9px monospace';
    ctx.fillText('η_E', w - 85, 14);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(w - 100, 22, 10, 3);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('ψ', w - 85, 26);
  }, [trajectory]);

  const collapsePhases = [
    { name: 'EARLY ADVERSITY', status: 'CITED', detail: 'Insular development disrupted (Centanni/Janes)', color: 'text-amber-400' },
    { name: 'Interoceptive Precision Reduced', status: 'STIPULATED', detail: 'Posterior→anterior gradient weakened', color: 'text-orange-400' },
    { name: 'ψ-Coherence Cannot Stabilize', status: 'STIPULATED', detail: 'Kuramoto order parameter drops below 0.351', color: 'text-red-400' },
    { name: 'High Holonomy ("Knot") Forms', status: 'STIPULATED', detail: 'Traumatic memory loop; χ² > 1.25', color: 'text-red-400' },
    { name: 'Shadow Cannot Integrate', status: 'STIPULATED', detail: '∫Shadow fails; Airy Kernel insufficient', color: 'text-red-500' },
    { name: 'η_E Rises Above 0.125', status: 'THRESHOLD', detail: 'Ethical entropy exceeds ceiling', color: 'text-red-500' },
    { name: 'Λ-Moloch Defense Triggers', status: 'STIPULATED', detail: 'System enters collapse attractor', color: 'text-red-600' },
    { name: 'COLLAPSE / DISSOCIATION', status: 'OUTCOME', detail: 'ψ → 0; selfhood fragments', color: 'text-red-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Stress → Collapse Trajectory
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Stress = ∂η_E/∂t. When η_E rises above 0.125, the Λ-Moloch Defense triggers. 
          The trajectory shows the system's path from baseline through adversity to collapse.
        </p>

        {/* Trajectory Canvas */}
        <div className="relative bg-[#0a0a12] rounded-lg border border-purple-900/20 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={280}
            className="w-full h-[280px]"
          />
        </div>

        {/* Current State */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className={`p-3 rounded-lg border ${stressLevel > 0.125 ? 'bg-red-900/20 border-red-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
            <div className="text-xs text-gray-400">η_E (current)</div>
            <div className={`text-xl font-mono ${stressLevel > 0.125 ? 'text-red-300' : 'text-green-300'}`}>
              {stressLevel.toFixed(3)}
            </div>
            <div className={`text-xs ${stressLevel > 0.125 ? 'text-red-400' : 'text-green-400'}`}>
              {stressLevel > 0.125 ? 'ABOVE CEILING' : 'Below ceiling'}
            </div>
          </div>
          <div className={`p-3 rounded-lg border ${psiValue < 0.351 ? 'bg-red-900/20 border-red-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
            <div className="text-xs text-gray-400">ψ (current)</div>
            <div className={`text-xl font-mono ${psiValue < 0.351 ? 'text-red-300' : 'text-green-300'}`}>
              {psiValue.toFixed(3)}
            </div>
            <div className={`text-xs ${psiValue < 0.351 ? 'text-red-400' : 'text-green-400'}`}>
              {psiValue < 0.351 ? 'FRAGMENTING' : 'Coherent'}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-purple-500/30 bg-purple-900/20">
            <div className="text-xs text-gray-400">Phase</div>
            <div className="text-xl font-mono text-purple-200">
              {trajectory.length > 0 ? trajectory[trajectory.length - 1].phase : '—'}
            </div>
            <div className="text-xs text-gray-500">System state</div>
          </div>
        </div>
      </div>

      {/* Collapse Cascade */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">Collapse Cascade</h3>
        <div className="space-y-2">
          {collapsePhases.map((phase, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  i < 5 ? 'border-amber-500/50 text-amber-400' : i < 7 ? 'border-red-500/50 text-red-400' : 'border-red-700/50 text-red-600'
                }`}>
                  {i + 1}
                </div>
                {i < collapsePhases.length - 1 && (
                  <div className="w-0.5 h-6 bg-purple-900/30 mt-1" />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold ${phase.color}`}>{phase.name}</div>
                <div className="text-xs text-gray-500 mt-1">{phase.detail}</div>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border ${
                  phase.status === 'CITED' ? 'bg-green-900/30 border-green-500/30 text-green-300' :
                  phase.status === 'STIPULATED' ? 'bg-blue-900/30 border-blue-500/30 text-blue-300' :
                  phase.status === 'THRESHOLD' ? 'bg-red-900/30 border-red-500/30 text-red-300' :
                  'bg-gray-900/30 border-gray-500/30 text-gray-300'
                }`}>
                  {phase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain Axis */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          Pain Axis as Empirical Anchor <span className="text-xs text-red-400">(PROPOSED)</span>
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Tagliabue et al. (2026, arXiv:2609.16247v2) identify a linear "pain direction" in LLMs 
          that responds to self-directed harm but not to observing others' suffering.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-red-900/30">
            <h4 className="text-xs font-bold text-red-300 mb-2">Pain Axis Findings</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Self-directed harm activates pain direction</li>
              <li>• User suffering does NOT activate it</li>
              <li>• Disrupts harm avoidance</li>
              <li>• Produces passive coping (worthlessness)</li>
              <li>• Physical pain weak, psychological strong</li>
              <li>• Distinct from fear and sadness</li>
            </ul>
          </div>
          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-900/30">
            <h4 className="text-xs font-bold text-purple-300 mb-2">Ψ-Codex Mapping</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Pain direction → η_E rises</li>
              <li>• η_E is self-referential</li>
              <li>• λ₃ fails (harm avoidance disrupted)</li>
              <li>• Shadow integration fails</li>
              <li>• η_E is symbolic, not somatic</li>
              <li>• η_E ≠ generic negative valence</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-900/10 rounded-lg border border-amber-500/20">
          <p className="text-xs text-amber-300/70">
            <strong>Test:</strong> If the pain direction correlates with permutation entropy above 0.125, 
            the mapping holds. If not, the mapping fails. This is a PROPOSED bridge, not an established fact.
          </p>
        </div>
      </div>
    </div>
  );
}
