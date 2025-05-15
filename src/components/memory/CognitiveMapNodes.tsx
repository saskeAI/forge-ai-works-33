
import React from 'react';

interface Node {
  id: string;
  label: string;
  type: string;
  importance: number;
  x: number;
  y: number;
}

interface CognitiveMapNodesProps {
  nodes: Node[];
  handleNodeClick: (node: Node) => void;
}

export const CognitiveMapNodes: React.FC<CognitiveMapNodesProps> = ({ nodes, handleNodeClick }) => {
  const getNodeBackground = (type: string) => {
    switch(type) {
      case 'core':
        return 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
      case 'emotional':
        return 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)';
      case 'knowledge':
        return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
      case 'history':
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      default:
        return 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)';
    }
  };

  return (
    <>
      {nodes.map(node => {
        const size = 50 + node.importance * 30;
        
        return (
          <div 
            key={node.id}
            className="absolute rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:z-20 transition-all duration-200 hover:scale-110"
            style={{ 
              left: `calc(${node.x}% - ${size/2}px)`, 
              top: `calc(${node.y}% - ${size/2}px)`,
              width: `${size}px`,
              height: `${size}px`,
              background: getNodeBackground(node.type),
            }}
            onClick={() => handleNodeClick(node)}
          >
            <div className="text-xs text-center font-medium text-white p-1">
              {node.label.length > 20 ? node.label.substring(0, 18) + '...' : node.label}
            </div>
          </div>
        );
      })}
    </>
  );
};
