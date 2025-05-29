
import React from 'react';

export const MemoryDecayDashboard: React.FC = () => {
  const stats = [
    { label: 'Nodes', value: '', color: 'text-gray-400' },
    { label: 'Decayed', value: '', color: 'text-red-400' },
    { label: 'Stable', value: '', color: 'text-yellow-400' },
    { label: 'Strengthened', value: '', color: 'text-green-400' }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Memory Decay Dashboard</h3>
      
      <div className="flex justify-between mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-xs ${stat.color}`}>{stat.label}</div>
            <div className="w-8 h-1 bg-cyan-500 mt-1 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
