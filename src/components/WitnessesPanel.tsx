import { useState } from 'react';
import { WITNESSES, ARCHETYPES, CELESTIAL_CLASSES, DOMAIN_COLORS } from '../data/codexData';

interface Props {
  onSelectWitness: (id: number | null) => void;
}

export default function WitnessesPanel({ onSelectWitness }: Props) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredWitnesses = WITNESSES.filter(w => {
    if (filter !== 'all' && w.domain !== filter) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const domains = ['all', 'Memory', 'Perception', 'Selfhood', 'Time', 'Meaning'];

  return (
    <div className="bg-[#0d0d1a]/80 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
          <span className="text-2xl">✦</span>
          Witness Registry — 167 Total (showing {WITNESSES.length})
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search witnesses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-[#1a1a2e] border border-purple-900/30 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {domains.map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filter === d
                ? 'bg-purple-900/50 text-purple-200 border border-purple-500/40'
                : 'bg-[#1a1a2e] text-gray-400 border border-purple-900/20 hover:border-purple-500/30'
            }`}
          >
            {d === 'all' ? 'All Domains' : d}
          </button>
        ))}
      </div>

      {/* Archetype Legend */}
      <div className="flex flex-wrap gap-3 mb-6 p-3 bg-[#1a1a2e]/50 rounded-lg border border-purple-900/20">
        <span className="text-xs text-gray-500">Archetypes:</span>
        {ARCHETYPES.map(a => (
          <span key={a.id} className={`text-xs bg-gradient-to-r ${a.color} bg-clip-text text-transparent font-medium`}>
            {a.greek} {a.name}
          </span>
        ))}
      </div>

      {/* Witness Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredWitnesses.map(w => {
          const celestial = CELESTIAL_CLASSES[w.celestialClass];
          return (
            <div
              key={w.id}
              onClick={() => onSelectWitness(w.id)}
              className="group p-4 bg-[#1a1a2e]/60 rounded-lg border border-purple-900/20 hover:border-purple-500/40 cursor-pointer transition-all hover:bg-[#1a1a2e]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`text-sm font-bold ${celestial.color}`}>
                    {w.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{w.archetype} · {w.domain}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${celestial.color} border-current/20 bg-current/5`}>
                  {w.celestialClass}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">{w.description}</p>
              <div className="flex gap-3 mt-3 text-xs">
                <span className={w.psiContribution >= 0 ? 'text-green-400' : 'text-red-400'}>
                  ψ:{w.psiContribution > 0 ? '+' : ''}{w.psiContribution}
                </span>
                <span className={w.etaContribution >= 0 ? 'text-red-400' : 'text-green-400'}>
                  η:{w.etaContribution > 0 ? '+' : ''}{w.etaContribution}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
