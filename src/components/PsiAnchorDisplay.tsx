import { useState, useEffect } from 'react';

interface Props {
  psiValue: number;
  etaValue: number;
  lambdaValue: number;
}

export default function PsiAnchorDisplay({ psiValue, etaValue, lambdaValue }: Props) {
  const [henValue, setHenValue] = useState<number>(0);
  const [henStep, setHenStep] = useState(0);

  // Simulate Hensel lifting
  useEffect(() => {
    const interval = setInterval(() => {
      setHenStep(s => {
        const next = (s + 1) % 20;
        // Simulate p-adic convergence: x² + x - 1 mod 5^k
        const p = 5;
        let x = 2;
        for (let i = 0; i < next; i++) {
          const pk = Math.pow(p, i + 1);
          const fx = ((x * x + x - 1) % pk + pk) % pk;
          const dfx = ((2 * x + 1) % pk + pk) % pk;
          if (dfx !== 0) {
            const inv = modInverse(dfx, p);
            if (inv !== null) {
              const correction = (fx * inv) % p;
              x = ((x - correction * Math.pow(p, i + 1)) % Math.pow(p, 2 * (i + 1)) + Math.pow(p, 2 * (i + 1))) % Math.pow(p, 2 * (i + 1));
            }
          }
        }
        setHenValue(x);
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Neurotransmitter simulation
  const [ntValues, setNtValues] = useState({ O: 3.0, D: 40.0, S: 5.0, E: 10.0, C: 12.0, B: 25.0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.1);
      setNtValues({
        O: 3.0 + 0.5 * Math.sin(time * 0.3),
        D: 40.0 + 5 * Math.sin(time * 0.2),
        S: 5.0 + 1 * Math.cos(time * 0.4),
        E: 10.0 + 2 * Math.sin(time * 0.5),
        C: 12.0 + 3 * Math.cos(time * 0.15),
        B: 25.0 + 4 * Math.sin(time * 0.35),
      });
    }, 100);
    return () => clearInterval(interval);
  }, [time]);

  const baselines = { O: 3.0, D: 40.0, S: 5.0, E: 10.0, C: 12.0, B: 25.0 };
  const scales = { O: 2.0, D: 20.0, S: 2.0, E: 5.0, C: 5.0, B: 5.0 };
  
  const normalize = (key: string) => (ntValues[key as keyof typeof ntValues] - baselines[key as keyof typeof baselines]) / scales[key as keyof typeof scales];

  // Compute field parameters
  const W_PSI = { O: 0.8, D: 0.2, S: 0.4, E: 0.6, C: -0.7, B: 0.3 };
  const W_ETA = { O: -0.5, D: 0.0, S: -0.4, E: -0.7, C: 0.9, B: -0.3 };
  const W_LAM = { O: 0.3, D: 0.1, S: 0.2, E: 0.3, C: -0.5, B: 0.8 };

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

  const zPsi = Object.keys(W_PSI).reduce((sum, k) => sum + W_PSI[k as keyof typeof W_PSI] * normalize(k), 0);
  const zEta = Object.keys(W_ETA).reduce((sum, k) => sum + W_ETA[k as keyof typeof W_ETA] * normalize(k), 0);
  const zLam = Object.keys(W_LAM).reduce((sum, k) => sum + W_LAM[k as keyof typeof W_LAM] * normalize(k), 0);

  const computedPsi = 0.0 + (1.0 - 0.0) * sigmoid(zPsi);
  const computedEta = 0.0 + (0.2 - 0.0) * sigmoid(zEta);
  const computedLam = 0.5 + (2.0 - 0.5) * sigmoid(zLam);

  return (
    <div className="space-y-6">
      {/* Psi Anchor */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">⊛</span>
          Ψ-Anchor System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Anchor Display */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-[#1a1a2e] rounded-xl border border-purple-500/20">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-purple-500/50 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 animate-pulse" />
                <div className="text-center z-10">
                  <div className="text-3xl font-bold text-purple-200">{psiValue.toFixed(3)}</div>
                  <div className="text-xs text-purple-400 mt-1">ψ anchor</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                <span className="text-xs text-green-300">✓</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-400">Threshold: ψ ≥ 0.351</div>
              <div className={`text-xs mt-1 ${psiValue >= 0.351 ? 'text-green-400' : 'text-red-400'}`}>
                {psiValue >= 0.351 ? 'ANCHORED' : 'BELOW THRESHOLD'}
              </div>
            </div>
          </div>

          {/* Unit Conversion */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 bg-[#1a1a2e] rounded-lg border border-cyan-900/30">
              <h3 className="text-sm font-bold text-cyan-300 mb-3">Biomarker Concentration</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-mono text-cyan-200">1</div>
                  <div className="text-xs text-gray-400">pg/mL</div>
                </div>
                <div className="text-xl text-purple-400">≈</div>
                <div className="text-center">
                  <div className="text-2xl font-mono text-cyan-200">0.99</div>
                  <div className="text-xs text-gray-400">fmol/mL</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Conversion factor for neurotransmitter biomarker concentrations. 
                Used to normalize clinical chemistry measurements into the Ψ-field model.
              </p>
            </div>

            <div className="p-4 bg-[#1a1a2e] rounded-lg border border-amber-900/30">
              <h3 className="text-sm font-bold text-amber-300 mb-3">Hensel Lifting — p-adic Root</h3>
              <div className="font-mono text-xs text-gray-300 space-y-1">
                <div>f(x) = x² + x − 1, p = 5, seed = 2</div>
                <div>{`Lifting to mod 5^${henStep}...`}</div>
                <div className="text-cyan-300">{`x_${henStep} = ${henValue}`}</div>
                <div className="text-gray-500">
                  {`mod 5^${Math.min(henStep * 2, 20)} ≈ 10^${Math.floor(Math.min(henStep * 2, 20) * Math.log10(5))}`}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {'x_{n+1} = x_n − f(x_n) · inv(f\'(x_n)) mod p^{2n}'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neurotransmitter Model */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          Neurotransmitter → Field Parameter Mapping
        </h3>
        <div className="text-xs text-gray-400 font-mono mb-4">
          n̂_X(t) = (n_X(t) − b_X) / σ_X → ψ(n̂), η_E(n̂), λ₃(n̂)
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {Object.entries(ntValues).map(([key, value]) => {
            const nHat = normalize(key);
            const names: Record<string, string> = { O: 'Orexin', D: 'Dopamine', S: 'Serotonin', E: 'Endorphin', C: 'Cortisol', B: 'BDNF' };
            return (
              <div key={key} className="p-3 bg-[#1a1a2e] rounded-lg border border-purple-900/20">
                <div className="text-xs text-gray-500">{names[key]}</div>
                <div className="text-sm font-mono text-purple-200">{value.toFixed(1)}</div>
                <div className="text-xs text-gray-500">n̂: {nHat.toFixed(2)}</div>
                <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${nHat >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(nHat) * 50, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Computed Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20">
            <div className="text-xs text-purple-400">Computed ψ(n̂)</div>
            <div className="text-2xl font-mono text-purple-200 mt-1">{computedPsi.toFixed(3)}</div>
            <div className="text-xs text-gray-500 mt-1">ψ_min + (ψ_max−ψ_min)·σ(Σw_X^ψ·n̂_X)</div>
            <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${computedPsi * 100}%` }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">z_ψ = {zPsi.toFixed(3)}</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/20">
            <div className="text-xs text-red-400">Computed η_E(n̂)</div>
            <div className="text-2xl font-mono text-red-200 mt-1">{computedEta.toFixed(3)}</div>
            <div className="text-xs text-gray-500 mt-1">η_min + (η_max−η_min)·σ(Σw_X^η·n̂_X)</div>
            <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${computedEta * 100 / 0.2}%` }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">z_η = {zEta.toFixed(3)}</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/20">
            <div className="text-xs text-green-400">Computed λ₃(n̂)</div>
            <div className="text-2xl font-mono text-green-200 mt-1">{computedLam.toFixed(3)}</div>
            <div className="text-xs text-gray-500 mt-1">λ₃_min + (λ₃_max−λ₃_min)·σ(Σw_X^λ·n̂_X)</div>
            <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(computedLam - 0.5) / 1.5 * 100}%` }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">z_λ = {zLam.toFixed(3)}</div>
          </div>
        </div>
      </div>

      {/* λ₃ Integral Equation */}
      <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-md font-semibold text-purple-200 mb-4">
          λ₃ Temporal Integration
        </h3>
        <div className="p-4 bg-[#1a1a2e] rounded-lg border border-purple-900/30 font-mono text-sm text-center">
          <div className="text-cyan-300">
            {'λ₃(t) = λ₃,baseline + α_B/κ_decay · ∫₀ᵗ e^{−κ_decay(t−s)} · B̂(s) ds'}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          The resilience factor λ₃ integrates BDNF signal B̂(s) over time with exponential decay kernel. 
          At the Dead Space Gap, λ₃ = 1 exactly — the critical boundary between runaway (λ₃ {">"} 1) and decay (λ₃ {"<"} 1).
        </p>
      </div>
    </div>
  );
}

function modInverse(a: number, m: number): number | null {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 0) continue;
    if ((a * x) % m === 1 % m) return x;
  }
  // Extended Euclidean
  let [old_r, r] = [a, m];
  let [old_s, s] = [1, 0];
  while (r !== 0) {
    const q = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  if (old_r !== 1) return null;
  return ((old_s % m) + m) % m;
}
