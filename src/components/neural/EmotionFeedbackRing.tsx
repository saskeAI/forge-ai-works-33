
import React, { useState, useEffect } from 'react';

interface EmotionFeedbackRingProps {
  efficiency: number;
}

export const EmotionFeedbackRing: React.FC<EmotionFeedbackRingProps> = ({ efficiency }) => {
  const [nodes, setNodes] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const newNodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setNodes(newNodes);

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        opacity: 0.2 + Math.random() * 0.8
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [efficiency]);

  const circumference = 2 * Math.PI * 90;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (efficiency / 100) * circumference;

  return (
    <div className="relative">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">Emotion Feedback</h3>
      </div>
      
      <div className="relative w-80 h-80 mx-auto">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#1e293b"
            strokeWidth="4"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Neural network nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-40 h-40">
            {nodes.map((node, index) => (
              <div
                key={index}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full transition-opacity duration-1000"
                style={{
                  left: `${(node.x / 300) * 100}%`,
                  top: `${(node.y / 300) * 100}%`,
                  opacity: node.opacity
                }}
              />
            ))}
            
            {/* Connections between nodes */}
            <svg className="absolute inset-0 w-full h-full">
              {nodes.slice(0, 10).map((node, index) => {
                const nextNode = nodes[(index + 1) % 10];
                return (
                  <line
                    key={index}
                    x1={`${(node.x / 300) * 100}%`}
                    y1={`${(node.y / 300) * 100}%`}
                    x2={`${(nextNode.x / 300) * 100}%`}
                    y2={`${(nextNode.y / 300) * 100}%`}
                    stroke="#06b6d4"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{efficiency}%</div>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
          <span className="text-sm text-gray-400">Self-Reflection</span>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
          <span className="text-sm text-gray-400">Structural Efficiency</span>
        </div>
      </div>
    </div>
  );
};
