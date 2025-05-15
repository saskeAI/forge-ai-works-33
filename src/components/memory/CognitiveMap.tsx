
import React, { useState, useEffect } from 'react';
import { Network, CircleCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CognitiveMapHeader } from './CognitiveMapHeader';
import { CognitiveMapNodes } from './CognitiveMapNodes';
import { CognitiveMapConnections } from './CognitiveMapConnections';
import { CognitiveMapControls } from './CognitiveMapControls';
import { CognitiveMapLoading } from './CognitiveMapLoading';

interface Node {
  id: string;
  label: string;
  type: string;
  importance: number;
  x: number;
  y: number;
}

interface Connection {
  source: string;
  target: string;
  strength: number;
}

interface CognitiveMapProps {
  initialMode?: string;
}

export const CognitiveMap = ({ initialMode = 'default' }: CognitiveMapProps) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<string>(initialMode);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would be an API call
      setIsLoading(true);
      setTimeout(() => {
        setNodes([
          { id: 'n1', label: 'Пользовательские предпочтения', type: 'core', importance: 0.9, x: 50, y: 50 },
          { id: 'n2', label: 'Эмоциональные реакции', type: 'emotional', importance: 0.8, x: 70, y: 30 },
          { id: 'n3', label: 'Коммуникационные паттерны', type: 'knowledge', importance: 0.85, x: 30, y: 70 },
          { id: 'n4', label: 'История взаимодействий', type: 'history', importance: 0.75, x: 80, y: 80 },
        ]);
        
        setConnections([
          { source: 'n1', target: 'n2', strength: 0.7 },
          { source: 'n1', target: 'n3', strength: 0.9 },
          { source: 'n2', target: 'n4', strength: 0.5 },
          { source: 'n3', target: 'n4', strength: 0.6 },
        ]);
        
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  const handleAddNode = () => {
    toast({
      title: "Создание узла памяти",
      description: "Открываю форму для создания нового узла",
    });
  };

  const handleSaveMap = () => {
    toast({
      title: "Когнитивная карта сохранена",
      description: "Текущее состояние карты было сохранено",
    });
  };

  const handleNodeClick = (node: Node) => {
    toast({
      title: `Узел: ${node.label}`,
      description: `Тип: ${node.type}, Важность: ${node.importance * 100}%`,
    });
  };

  if (isLoading) {
    return <CognitiveMapLoading />;
  }

  return (
    <div className="space-y-4">
      <CognitiveMapHeader 
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleSaveMap={handleSaveMap}
        handleAddNode={handleAddNode}
      />
      
      <div className="relative h-[500px] border rounded-lg bg-black/5 dark:bg-white/5">
        <CognitiveMapConnections connections={connections} nodes={nodes} />
        <CognitiveMapNodes nodes={nodes} handleNodeClick={handleNodeClick} />
        <CognitiveMapControls />
      </div>
      
      <div className="text-sm text-muted-foreground">
        Когнитивная карта SASOK отображает структуру связей между различными типами памяти и приоритеты обработки информации.
      </div>
    </div>
  );
};
