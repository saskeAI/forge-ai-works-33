
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const MemoryFilter: React.FC = () => {
  const [filters, setFilters] = useState({
    emotion: true,
    context: true,
    opacity: false
  });

  const [memoryTypes, setMemoryTypes] = useState({
    highToLow: true,
    emotionalInterosity: true,
    episodic: true,
    semanticProcedural: true,
    recentPast: false
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Memory Filter</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-gray-300">Emotion</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-gray-300">Context</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-gray-300">Opacity</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-300 mb-3">Timeframe</h4>
          <Button className="w-full bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700">
            Apply Filter →
          </Button>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Memory Filter</h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox checked className="border-cyan-500 data-[state=checked]:bg-cyan-500" />
            <span className="text-gray-300 text-sm">High to Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked className="border-cyan-500 data-[state=checked]:bg-cyan-500" />
            <span className="text-gray-300 text-sm">Emotional Interosity</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked className="border-cyan-500 data-[state=checked]:bg-cyan-500" />
            <span className="text-gray-300 text-sm">Episodic</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked className="border-cyan-500 data-[state=checked]:bg-cyan-500" />
            <span className="text-gray-300 text-sm">Semantic & Procedural</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox className="border-cyan-500" />
            <span className="text-gray-300 text-sm">Recent, Past</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-sm text-gray-400 mb-2">Active Memory Nodes <span className="text-cyan-400 font-semibold">482</span></div>
          <div className="text-sm text-gray-400 mb-4">Semantic Connections <span className="text-cyan-400 font-semibold">2831</span></div>
          
          <Button className="w-full bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700 mb-2">
            Apply Filter
          </Button>
          <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
