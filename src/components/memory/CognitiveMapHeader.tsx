
import React from 'react';
import { CircleCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CognitiveMapHeaderProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  handleSaveMap: () => void;
  handleAddNode: () => void;
}

export const CognitiveMapHeader: React.FC<CognitiveMapHeaderProps> = ({ 
  viewMode, 
  setViewMode, 
  handleSaveMap, 
  handleAddNode 
}) => {
  return (
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
  );
};
