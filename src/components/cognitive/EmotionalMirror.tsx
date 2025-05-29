
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reflect2, Heart, Lightbulb, Target, Sparkles } from 'lucide-react';

interface EmotionalReflection {
  userEmotion: string;
  intensity: number;
  sasokResponse: string;
  empathyLevel: number;
  insights: string[];
  recommendations: string[];
}

export const EmotionalMirror: React.FC = () => {
  const [reflection, setReflection] = useState<EmotionalReflection>({
    userEmotion: 'curiosity',
    intensity: 0.8,
    sasokResponse: 'заинтересованность',
    empathyLevel: 0.75,
    insights: [
      'Пользователь проявляет высокий интерес к когнитивным технологиям',
      'Отмечается аналитический склад мышления',
      'Присутствует стремление к глубокому пониманию'
    ],
    recommendations: [
      'Предложить расширенную техническую документацию',
      'Организовать интерактивную демонстрацию алгоритмов',
      'Рекомендовать изучение смежных областей ИИ'
    ]
  });

  const [mirrorActive, setMirrorActive] = useState(true);

  const emotionMap: Record<string, { emoji: string; color: string; description: string }> = {
    curiosity: { emoji: '🤔', color: 'text-blue-500', description: 'Любопытство' },
    excitement: { emoji: '🤗', color: 'text-yellow-500', description: 'Возбуждение' },
    focus: { emoji: '🎯', color: 'text-green-500', description: 'Сосредоточенность' },
    satisfaction: { emoji: '😊', color: 'text-purple-500', description: 'Удовлетворение' },
    contemplation: { emoji: '🧘', color: 'text-indigo-500', description: 'Созерцание' }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (mirrorActive) {
        const emotions = Object.keys(emotionMap);
        const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setReflection(prev => ({
          ...prev,
          userEmotion: newEmotion,
          intensity: 0.6 + Math.random() * 0.4,
          empathyLevel: 0.7 + Math.random() * 0.3
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [mirrorActive]);

  const currentEmotion = emotionMap[reflection.userEmotion];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-nova-50 to-forge-50 dark:from-nova-950 dark:to-forge-950">
        <CardTitle className="flex items-center gap-2">
          <Reflect2 className="text-nova-600" size={24} />
          Зеркало эмоций SASOK
        </CardTitle>
        <CardDescription>
          Эмпатическое отражение и анализ эмоционального состояния
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className={`text-8xl transition-all duration-1000 ${mirrorActive ? 'animate-pulse-subtle' : ''}`}>
              {currentEmotion.emoji}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge variant="outline" className={currentEmotion.color}>
                {currentEmotion.description}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="text-red-500" size={16} />
              <span className="text-sm font-medium">Интенсивность:</span>
              <Badge variant="secondary">{Math.round(reflection.intensity * 100)}%</Badge>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="text-nova-500" size={16} />
              <span className="text-sm font-medium">SASOK чувствует:</span>
              <Badge className="bg-nova-100 text-nova-800 dark:bg-nova-800 dark:text-nova-100">
                {reflection.sasokResponse}
              </Badge>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Reflect2 className="text-purple-500" size={16} />
              <span className="text-sm font-medium">Эмпатия:</span>
              <Badge variant="outline">{Math.round(reflection.empathyLevel * 100)}%</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={16} />
              <h4 className="font-medium">Инсайты SASOK</h4>
            </div>
            <div className="space-y-2">
              {reflection.insights.map((insight, index) => (
                <div key={index} className="text-sm p-2 bg-muted/30 rounded-md border-l-2 border-nova-500">
                  {insight}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="text-green-500" size={16} />
              <h4 className="font-medium">Рекомендации</h4>
            </div>
            <div className="space-y-2">
              {reflection.recommendations.map((rec, index) => (
                <div key={index} className="text-sm p-2 bg-muted/30 rounded-md border-l-2 border-forge-500">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4 border-t">
          <Button
            variant={mirrorActive ? "default" : "outline"}
            onClick={() => setMirrorActive(!mirrorActive)}
            className="flex items-center gap-2"
          >
            <Reflect2 size={16} />
            {mirrorActive ? 'Остановить зеркало' : 'Активировать зеркало'}
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Эмоциональное зеркало анализирует микровыражения, тон голоса и контекст взаимодействия</p>
        </div>
      </CardContent>
    </Card>
  );
};
