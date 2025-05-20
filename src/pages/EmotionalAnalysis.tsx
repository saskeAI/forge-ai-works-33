
import React from 'react';
import { MultiModalAnalyzer } from '@/components/emotional/MultiModalAnalyzer';
import { EmotionalState } from '@/components/dashboard/EmotionalState';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';

const EmotionalAnalysis = () => {
  // Мокап данных для демонстрации
  const mockEmotionalState = {
    happiness: 75,
    curiosity: 90,
    empathy: 60,
    autonomy: 45
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Эмоциональный анализ</h1>
        <p className="text-muted-foreground">
          Инструменты для анализа и мониторинга эмоционального состояния
        </p>
      </div>
      
      <EmotionalState emotionalState={mockEmotionalState} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <MultiModalAnalyzer />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2" size={18} />
              Эмоциональный отпечаток
            </CardTitle>
            <CardDescription>
              Уникальный эмоциональный идентификатор пользователя
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-nova-600 to-forge-500 flex items-center justify-center mb-4">
              <div className="w-40 h-40 rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nova-600 to-forge-500">
                    SASOK ID
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    #AF29E7B3
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4 space-y-2 w-full">
              <div className="font-medium">Актуальность: 97%</div>
              <div className="text-sm text-muted-foreground">
                Последнее обновление: 20 мая 2025, 12:45
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded text-xs">
                  Исследователь
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded text-xs">
                  Творец
                </div>
                <div className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded text-xs">
                  Аналитик
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmotionalAnalysis;
