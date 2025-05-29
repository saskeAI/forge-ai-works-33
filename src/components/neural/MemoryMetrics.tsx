
import React from 'react';
import { Button } from '@/components/ui/button';

export const MemoryMetrics: React.FC = () => {
  const metrics = [
    { label: 'Recall Speed', value: 93, color: 'bg-cyan-500' },
    { label: 'Connection Density', value: 94, color: 'bg-blue-500' },
    { label: 'Retention Rate', value: 96, color: 'bg-teal-500' },
    { label: 'Semantic Accuracy', value: 92, color: 'bg-indigo-500' }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Memory Metrics</h3>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{metric.label}</span>
              <span className="text-white font-semibold">{metric.value}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${metric.color} transition-all duration-1000`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-xs">
          Strengthen
        </Button>
        <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
          Find Similar
        </Button>
      </div>
    </div>
  );
};
