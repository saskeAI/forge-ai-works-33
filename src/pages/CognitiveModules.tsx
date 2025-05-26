
import React from 'react';
import { MetacognitiveCore } from '@/components/cognitive/MetacognitiveCore';
import { EmotionalMirror } from '@/components/cognitive/EmotionalMirror';
import { MemoryModule } from '@/components/cognitive/MemoryModule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CognitiveModules() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Когнитивные модули SASOK</h1>
        <p className="text-muted-foreground">
          Компоненты когнитивной архитектуры для самоанализа, эмпатии и управления памятью
        </p>
      </div>

      <Tabs defaultValue="metacognitive" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metacognitive">Метакогнитивное ядро</TabsTrigger>
          <TabsTrigger value="mirror">Зеркало эмоций</TabsTrigger>
          <TabsTrigger value="memory">Модуль памяти</TabsTrigger>
        </TabsList>

        <TabsContent value="metacognitive" className="space-y-6">
          <MetacognitiveCore />
        </TabsContent>

        <TabsContent value="mirror" className="space-y-6">
          <EmotionalMirror />
        </TabsContent>

        <TabsContent value="memory" className="space-y-6">
          <MemoryModule />
        </TabsContent>
      </Tabs>
    </div>
  );
}
