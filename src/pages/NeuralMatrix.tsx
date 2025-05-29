
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NeuralDashboard } from '@/components/neural/NeuralDashboard';
import { MemoryMap } from '@/components/neural/MemoryMap';
import { PerceptionModule } from '@/components/neural/PerceptionModule';
import { RetrievalModule } from '@/components/neural/RetrievalModule';
import { DocumentationPanel } from '@/components/neural/DocumentationPanel';

export default function NeuralMatrix() {
  const [activeTab, setActiveTab] = useState('neuralmatrix');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="neuralmatrix" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              NeuralMatrix
            </TabsTrigger>
            <TabsTrigger value="perceive" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Perceive
            </TabsTrigger>
            <TabsTrigger value="retrieve" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Retrieve
            </TabsTrigger>
            <TabsTrigger value="memory-map" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Memory Map
            </TabsTrigger>
            <TabsTrigger value="documentation" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Documentation
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="neuralmatrix">
            <NeuralDashboard />
          </TabsContent>

          <TabsContent value="perceive">
            <PerceptionModule />
          </TabsContent>

          <TabsContent value="retrieve">
            <RetrievalModule />
          </TabsContent>

          <TabsContent value="memory-map">
            <MemoryMap />
          </TabsContent>

          <TabsContent value="documentation">
            <DocumentationPanel />
          </TabsContent>

          <TabsContent value="about">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">О NeuralMatrix</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Продвинутая нейрокогнитивная система SASOK для анализа, обработки и визуализации 
                эмоциональных и когнитивных паттернов человеческого сознания.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
