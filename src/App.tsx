import { useState, useEffect, useCallback, useRef } from 'react';
import CelestialNode from './components/CelestialNode';
import WitnessesPanel from './components/WitnessesPanel';
import ArtifactsPanel from './components/ArtifactsPanel';
import PsiAnchorDisplay from './components/PsiAnchorDisplay';
import FieldEvolution from './components/FieldEvolution';
import FiveDomains from './components/FiveDomains';
import StressTrajectory from './components/StressTrajectory';
import EquationPanel from './components/EquationPanel';
import RegisterLayers from './components/RegisterLayers';

type TabType = 'witnesses' | 'artifacts' | 'anchors' | 'fields' | 'domains' | 'stress' | 'equations' | 'registers';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('witnesses');
  const [psiValue, setPsiValue] = useState(0.351);
  const [etaValue, setEtaValue] = useState(0.125);
  const [lambdaValue, setLambdaValue] = useState(1.1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedWitness, setSelectedWitness] = useState<number | null>(null);
  const animFrameRef = useRef<number>(0);

  // Simulate field evolution
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.016;
      const psiNoise = 0.351 + 0.05 * Math.sin(t * 0.7) + 0.02 * Math.cos(t * 1.3);
      const etaNoise = 0.125 + 0.03 * Math.sin(t * 0.5) + 0.01 * Math.cos(t * 2.1);
      setPsiValue(psiNoise);
      setEtaValue(etaNoise);
      setIsCollapsed(etaNoise > 0.125);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'witnesses', label: 'Celestial Witnesses', icon: '✦' },
    { id: 'artifacts', label: 'Artifacts', icon: '◈' },
    { id: 'anchors', label: 'Ψ-Anchors', icon: '⊛' },
    { id: 'fields', label: 'Field Evolution', icon: '∿' },
    { id: 'domains', label: 'Five Domains', icon: '⬡' },
    { id: 'stress', label: 'Stress/Collapse', icon: '⚡' },
    { id: 'equations', label: 'Equations', icon: '∑' },
    { id: 'registers', label: 'Brain·Mind·Spirit', icon: '◎' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-gray-100 overflow-x-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#0d0d20] to-[#0a0a12]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(1px 1px at 20px 30px, #fff, transparent),
                           radial-gradient(1px 1px at 40px 70px, #aaf, transparent),
                           radial-gradient(1px 1px at 50px 160px, #fff, transparent),
                           radial-gradient(1px 1px at 90px 40px, #faf, transparent),
                           radial-gradient(1px 1px at 130px 80px, #fff, transparent),
                           radial-gradient(1px 1px at 160px 120px, #aff, transparent)`,
          backgroundSize: '200px 200px'
        }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-900/30 backdrop-blur-sm bg-[#0a0a12]/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ψ-Codex
              </div>
              <div className="text-sm text-purple-300/60 font-mono">
                v∞ :: Celestial Witnesses Demo
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs font-mono">
              <div className={`flex items-center gap-2 ${isCollapsed ? 'text-red-400' : 'text-green-400'}`}>
                <span className={`w-2 h-2 rounded-full ${isCollapsed ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                {isCollapsed ? 'Λ-MOLOCH ACTIVE' : 'ψ-STABLE'}
              </div>
              <div className="text-purple-300/60">
                ψ={psiValue.toFixed(3)} | η_E={etaValue.toFixed(3)} | λ₃={lambdaValue.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 border-b border-purple-900/20 backdrop-blur-sm bg-[#0a0a12]/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-900/40 text-purple-200 border border-purple-500/30 shadow-lg shadow-purple-900/20'
                    : 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/20'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'witnesses' && (
          <div className="space-y-6">
            <CelestialNode
              psiValue={psiValue}
              etaValue={etaValue}
              lambdaValue={lambdaValue}
              selectedWitness={selectedWitness}
              onSelectWitness={setSelectedWitness}
            />
            <WitnessesPanel onSelectWitness={setSelectedWitness} />
          </div>
        )}
        {activeTab === 'artifacts' && <ArtifactsPanel />}
        {activeTab === 'anchors' && (
          <PsiAnchorDisplay
            psiValue={psiValue}
            etaValue={etaValue}
            lambdaValue={lambdaValue}
          />
        )}
        {activeTab === 'fields' && (
          <FieldEvolution
            psiValue={psiValue}
            etaValue={etaValue}
            lambdaValue={lambdaValue}
          />
        )}
        {activeTab === 'domains' && <FiveDomains />}
        {activeTab === 'stress' && (
          <StressTrajectory
            psiValue={psiValue}
            etaValue={etaValue}
          />
        )}
        {activeTab === 'equations' && <EquationPanel />}
        {activeTab === 'registers' && <RegisterLayers />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-900/20 mt-12 py-6 text-center text-xs text-purple-400/40 font-mono">
        <p>Ψ-Codex :: 167 Witnesses · 8 Archetypes · 46 Artifacts · Book of Ψ*</p>
        <p className="mt-1">1 pg/mL ≈ 0.99 fmol/mL :: λ₃=1 at Dead Space Gap :: ψ=0.351 anchor</p>
      </footer>
    </div>
  );
}

export default App;
