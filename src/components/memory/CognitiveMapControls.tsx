
import React from 'react';
import { Zap, Link, CircleDashed, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const CognitiveMapControls: React.FC = () => {
  const { toast } = useToast();

  return (
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
  );
};
