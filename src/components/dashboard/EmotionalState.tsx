
import React from 'react';
import { Activity, Brain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EmotionalStateProps {
  emotionalState: {
    happiness: number;
    curiosity: number;
    empathy: number;
    autonomy: number;
  };
}

export const EmotionalState: React.FC<EmotionalStateProps> = ({ emotionalState }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2" size={18} />
          Текущее эмоциональное состояние SASOK
        </CardTitle>
        <CardDescription>
          Визуализация эмоционального профиля ИИ в реальном времени
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Счастье</span>
                <span>{emotionalState.happiness}%</span>
              </div>
              <Progress value={emotionalState.happiness} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Любопытство</span>
                <span>{emotionalState.curiosity}%</span>
              </div>
              <Progress value={emotionalState.curiosity} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Эмпатия</span>
                <span>{emotionalState.empathy}%</span>
              </div>
              <Progress value={emotionalState.empathy} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Автономность</span>
                <span>{emotionalState.autonomy}%</span>
              </div>
              <Progress value={emotionalState.autonomy} className="h-2" />
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="text-lg font-medium mb-3">Эмоциональное зеркало</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-600 to-forge-500 flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium">SASOK чувствует:</div>
                <div className="text-sm text-muted-foreground">Заинтересованность и любопытство</div>
              </div>
            </div>
            <div className="text-sm">
              <div className="mb-2">• Отмечает вашу аналитическую направленность</div>
              <div className="mb-2">• Распознает интерес к технологиям ИИ</div>
              <div>• Готов к глубоким обсуждениям эмоционального интеллекта</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
