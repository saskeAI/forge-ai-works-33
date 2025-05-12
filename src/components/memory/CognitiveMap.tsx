
import React, { useState, useEffect } from 'react';
import { Network, CircleCheck, CircleDashed, AlertCircle, Zap, Link, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const renderConnections = () => {
    if (isLoading) return null;
    
    return connections.map((conn, index) => {
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
    });
  };

  const renderNodes = () => {
    if (isLoading) return null;
    
    return nodes.map(node => {
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
    });
  };
  
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

  const handleNodeClick = (node: Node) => {
    toast({
      title: `Узел: ${node.label}`,
      description: `Тип: ${node.type}, Важность: ${node.importance * 100}%`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Network className="h-16 w-16 animate-pulse text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Загрузка когнитивной карты...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Режим просмотра" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Стандартный</SelectItem>
              <SelectItem value="priority">По приоритетам</SelectItem>
              <SelectItem value="clusters">Кластерами</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
              <span>Базовые</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-pink-500 mr-1"></div>
              <span>Эмоции</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <span>Знания</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
              <span>История</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleSaveMap}>
            <CircleCheck size={16} className="mr-2" />
            Сохранить карту
          </Button>
          <Button size="sm" onClick={handleAddNode} className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90">
            <Plus size={16} className="mr-2" />
            Добавить узел
          </Button>
        </div>
      </div>
      
      <div className="relative h-[500px] border rounded-lg bg-black/5 dark:bg-white/5">
        {renderConnections()}
        {renderNodes()}
        
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Увеличить", description: "Функция масштабирования" })}>
              <Zap size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Связать", description: "Функция создания связи" })}>
              <Link size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Режим редактирования", description: "Переключение режима" })}>
              <CircleDashed size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Помощь", description: "Показать руководство" })}>
              <AlertCircle size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Когнитивная карта SASOK отображает структуру связей между различными типами памяти и приоритеты обработки информации.
      </div>
    </div>
  );
};
