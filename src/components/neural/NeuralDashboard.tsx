
import React, { useState, useEffect } from 'react';
import { EmotionFeedbackRing } from './EmotionFeedbackRing';
import { MemoryMetrics } from './MemoryMetrics';
import { MemoryFilter } from './MemoryFilter';
import { MemoryConsole } from './MemoryConsole';
import { MemoryDecayDashboard } from './MemoryDecayDashboard';
import { SymbolicMemoryEncoding } from './SymbolicMemoryEncoding';
import { ActivityLog } from './ActivityLog';

export const NeuralDashboard: React.FC = () => {
  const [neuralEfficiency, setNeuralEfficiency] = useState(91);
  const [memoryStats, setMemoryStats] = useState({
    activeMemory: 482,
    semanticConnections: 2831,
    neuralact: 2831
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralEfficiency(prev => {
        const variation = (Math.random() - 0.5) * 4;
        return Math.max(85, Math.min(95, prev + variation));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 h-screen">
      {/* Left Panel - Memory Filter */}
      <div className="col-span-3">
        <MemoryFilter />
      </div>

      {/* Center Panel - Main Visualization */}
      <div className="col-span-6 space-y-6">
        <EmotionFeedbackRing efficiency={neuralEfficiency} />
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-cyan-400">{memoryStats.activeMemory}</div>
            <div className="text-sm text-gray-400">Active Memory</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">{memoryStats.semanticConnections}</div>
            <div className="text-sm text-gray-400">Semantic Connections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">{memoryStats.neuralact}</div>
            <div className="text-sm text-gray-400">Neuralact</div>
          </div>
        </div>

        <MemoryConsole />
      </div>

      {/* Right Panel - Metrics and Controls */}
      <div className="col-span-3 space-y-6">
        <MemoryMetrics />
        <MemoryDecayDashboard />
        <SymbolicMemoryEncoding />
        <ActivityLog />
      </div>
    </div>
  );
};
