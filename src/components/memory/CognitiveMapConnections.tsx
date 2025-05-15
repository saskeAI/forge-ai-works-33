
import React from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Connection {
  source: string;
  target: string;
  strength: number;
}

interface CognitiveMapConnectionsProps {
  connections: Connection[];
  nodes: Node[];
}

export const CognitiveMapConnections: React.FC<CognitiveMapConnectionsProps> = ({ connections, nodes }) => {
  return (
    <>
      {connections.map((conn, index) => {
        const sourceNode = nodes.find(n => n.id === conn.source);
        const targetNode = nodes.find(n => n.id === conn.target);
        
        if (!sourceNode || !targetNode) return null;
        
        const thickness = conn.strength * 3;
        
        return (
          <svg key={`conn-${index}`} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <line 
              x1={`${sourceNode.x}%`} 
              y1={`${sourceNode.y}%`} 
              x2={`${targetNode.x}%`} 
              y2={`${targetNode.y}%`}
              stroke="currentColor"
              strokeOpacity={conn.strength}
              strokeWidth={thickness}
              className="text-nova-400"
            />
          </svg>
        );
      })}
    </>
  );
};
