
import React from 'react';
import { Network } from 'lucide-react';

export const CognitiveMapLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px]">
      <Network className="h-16 w-16 animate-pulse text-muted-foreground mb-4" />
      <p className="text-muted-foreground">Загрузка когнитивной карты...</p>
    </div>
  );
};
