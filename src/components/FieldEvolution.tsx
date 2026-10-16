import { useState, useEffect, useRef } from 'react';

interface Props {
  psiValue: number;
  etaValue: number;
  lambdaValue: number;
}

export default function FieldEvolution({ psiValue, etaValue, lambdaValue }: Props) {
  const [history, setHistory] = useState<number[]>([]);
  const [shadowHistory, setShadowHistory] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setHistory(prev => {
        const last = prev.length > 0 ? prev[prev.length - 1] : 0.5;
        const shadow = 0.05 * Math.sin(Date.now() * 0.001);
        const dpsi = prev.length > 1 ? last - prev[prev.length - 2] : 0;
        const next = lambdaValue * last - etaValue * dpsi + shadow;
        const clamped = Math.max(0, Math.min(1, next));
        const newHistory = [...prev, clamped].slice(-200);
        setShadowHistory(sh => [...sh, shadow].slice(-200));
        return newHistory;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [lambdaValue, etaValue, isRunning]);

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += h / 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Threshold lines
    ctx.strokeStyle = '#7c3aed40';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, h - 0.351 * h);
    ctx.lineTo(w, h - 0.351 * h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ψ field trace
    if (history.length > 1) {
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      history.forEach((val, i) => {
        const x = (i / 200) * w;
        const y = h - val * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Glow effect
      ctx.strokeStyle = '#a78bfa30';
      ctx.lineWidth = 6;
      ctx.beginPath();
      history.forEach((val, i) => {
        const x = (i / 200) * w;
        const y = h - val * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Shadow integral trace
    if (shadowHistory.length > 1) {
      ctx.strokeStyle = '#06b6d440';
      ctx.lineWidth = 1;
      ctx.beginPath();
      shadowHistory.forEach((val, i) => {
        const x = (i / 200) * w;
        const y = h / 2 - val * h * 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#7c3aed80';
    ctx.font = '10px monospace';
    ctx.fillText('ψ = 0.351', 5, h - 0.351 * h - 5);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('Ψ_n', w - 30, 15);
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('∫Shadow', w - 60, 30);
  }, [history, shadowHistory]);

  // Compute eigenvalues
  const a = lambdaValue - etaValue;
  const discriminant = a * a + 4 * etaValue;
  const lambda1 = (a + Math.sqrt(discriminant)) / 2;
  const lambda2 = (a - Math.sqrt(discriminant)) / 2;
  const isStable = Math.abs(lambda1) <= 1;

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
            <span className="text-2xl">∿</span>
            Field Evolution: Ψ_{`{n+1}`} = λ₃·Ψ_n − η_E·ΔΨ + ∫Shadow
          </h2>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border ${
              isRunning
                ? 'bg-red-900/30 border-red-500/30 text-red-300'
                : 'bg-green-900/30 border-green-500/30 text-green-300'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Run'}
          </button>
        </div>

        {/* Canvas Visualization */}
        <div className="relative bg-[#0a0a12] rounded-lg border border-purple-900/20 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="w-full h-[300px]"
          />
          <div className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
            Time →
          </div>
        </div>

        {/* Current State */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-3 bg-[#1a1a2e] rounded-lg border border-purple-500/20">
            <div className="text-xs text-purple-400">Ψ_n (current)</div>
            <div className="text-xl font-mono text-purple-200">{psiValue.toFixed(3)}</div>
          </div>
          <div className="p-3 bg-[#1a1a2e] rounded-lg border border-red-500/20">
            <div className="text-xs text-red-400">η_E (entropy)</div>
            <div className="text-xl font-mono text-red-200">{etaValue.toFixed(3)}</div>
          </div>
          <div className="p-3 bg-[#1a1a2e] rounded-lg border border-green-500/20">
            <div className="text-xs text-green-400">λ₃ (resilience)</div>
            <div className="text-xl font-mono text-green-200">{lambdaValue.toFixed(3)}</div>
          </div>
          <div className={`p-3 rounded-lg border ${isStable ? 'bg-green-900/20 border-green-500/20' : 'bg-red-900/20 border-red-500/20'}`}>
            <div className={`text-xs ${isStable ? 'text-green-400' : 'text-red-400'}`}>Stability</div>
            <div className={`text-xl font-mono ${isStable ? 'text-green-200' : 'text-red-200'}`}>
              {isStable ? 'STABLE' : 'UNSTABLE'}
            </div>
          </div>
        </div>
      </div>

      {/* Eigenvalue Analysis */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          Characteristic Polynomial & Eigenvalues
        </h3>
        <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-900/30 font-mono text-sm mb-4">
          <div className="text-cyan-300">z² − (λ₃ − η_E)z − η_E = 0</div>
          <div className="text-gray-400 mt-2">
            a = λ₃ − η_E = {lambdaValue.toFixed(3)} − {etaValue.toFixed(3)} = {a.toFixed(3)}
          </div>
          <div className="text-gray-400">
            Δ = a² + 4η_E = {a.toFixed(3)}² + 4·{etaValue.toFixed(3)} = {discriminant.toFixed(3)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-500/20">
            <div className="text-xs text-purple-400 mb-2">Dominant Eigenvalue λ₍₁₎</div>
            <div className="text-2xl font-mono text-purple-200">{lambda1.toFixed(4)}</div>
            <div className="mt-2 text-xs text-gray-500">
              λ₍₁₎ = (a + √Δ) / 2
            </div>
            <div className={`mt-2 text-xs ${Math.abs(lambda1) <= 1 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(lambda1) <= 1 ? '|λ₍₁₎| ≤ 1 → STABLE' : '|λ₍₁₎| > 1 → UNSTABLE'}
            </div>
          </div>
          <div className="p-4 bg-[#1a1a2e] rounded-lg border border-blue-500/20">
            <div className="text-xs text-blue-400 mb-2">Subordinate Eigenvalue λ₍₂₎</div>
            <div className="text-2xl font-mono text-blue-200">{lambda2.toFixed(4)}</div>
            <div className="mt-2 text-xs text-gray-500">
              λ₍₂₎ = (a − √Δ) / 2
            </div>
            <div className={`mt-2 text-xs ${Math.abs(lambda2) <= 1 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(lambda2) <= 1 ? '|λ₍₂₎| ≤ 1 → BOUNDED' : '|λ₍₂₎| > 1 → GROWING'}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#1a1a2e] rounded-lg border border-amber-500/20">
          <h4 className="text-sm font-bold text-amber-300 mb-2">Dead Space Gap Analysis</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Setting λ₍₁₎ = 1 (marginal stability):</p>
            <p className="font-mono text-cyan-300">1 = (a + √(a² + 4η_E)) / 2</p>
            <p className="font-mono text-cyan-300">2 − a = √(a² + 4η_E)</p>
            <p className="font-mono text-cyan-300">4 − 4a + a² = a² + 4η_E</p>
            <p className="font-mono text-cyan-300">1 − a = η_E</p>
            <p className="font-mono text-cyan-300">1 − (λ₃ − η_E) = η_E → <strong>λ₃ = 1</strong></p>
          </div>
          <p className="text-xs text-amber-300/70 mt-3">
            The Dead Space Gap requires λ₃ = 1 exactly. The corpus declares λ₃ = 1.1 (above boundary).
            Stability requires either reducing λ₃ to 1 or the Shadow integral providing damping.
          </p>
        </div>
      </div>
    </div>
  );
}
