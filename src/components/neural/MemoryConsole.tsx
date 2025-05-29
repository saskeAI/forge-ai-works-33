
import React from 'react';
import { Button } from '@/components/ui/button';

export const MemoryConsole: React.FC = () => {
  const memoryEntries = [
    { event: "User's Birthday", emotion: "Joy", percentage: null },
    { event: "Travel Experience", emotion: "Anticipation", percentage: 96 },
    { event: "Family Gathering", emotion: "Trust", percentage: 92 },
    { event: "Stressful Day at Work", emotion: "Anxiety", percentage: null }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">Memory Console</h3>
        <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 text-xs">
          Apply Filter
        </Button>
      </div>
      
      <div className="space-y-3">
        {memoryEntries.map((entry, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-slate-800/50 rounded border border-slate-700">
            <div className="flex-1">
              <span className="text-gray-300">{entry.event}</span>
              <span className="text-cyan-400 ml-4">{entry.emotion}</span>
            </div>
            <div className="flex items-center space-x-2">
              {entry.percentage && (
                <span className="text-white font-semibold text-sm">{entry.percentage}%</span>
              )}
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400 p-1">
                →
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between">
        <span className="text-gray-400">Self-Reflection</span>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
            Add
          </Button>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-xs">
            Strengthen
          </Button>
        </div>
      </div>
    </div>
  );
};
