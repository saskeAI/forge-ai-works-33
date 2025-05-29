
import React from 'react';
import { Sun, Sparkles, User, Leaf } from 'lucide-react';

export const SymbolicMemoryEncoding: React.FC = () => {
  const symbols = [
    { icon: Sun, color: 'text-yellow-400' },
    { icon: Sparkles, color: 'text-cyan-400' },
    { icon: User, color: 'text-blue-400' },
    { icon: Leaf, color: 'text-green-400' }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Symbolic Memory Encoding</h3>
      
      <div className="flex justify-between">
        {symbols.map((symbol, index) => {
          const IconComponent = symbol.icon;
          return (
            <div key={index} className="text-center">
              <IconComponent className={`w-6 h-6 ${symbol.color} mx-auto`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
