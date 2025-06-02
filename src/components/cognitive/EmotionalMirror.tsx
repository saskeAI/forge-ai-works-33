import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Heart, Brain, Zap } from 'lucide-react';

export const EmotionalMirror: React.FC = () => {
  const [empathy, setEmpathy] = useState(75);
  const [synchrony, setSynchrony] = useState(60);
  const [depth, setDepth] = useState(80);
  const [adaptivity, setAdaptivity] = useState(90);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmpathy(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setSynchrony(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setDepth(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setAdaptivity(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const emotionalMetrics = [
    { label: 'Эмпатическая точность', value: empathy, icon: Heart, color: 'text-pink-500' },
    { label: 'Эмоциональная синхронность', value: synchrony, icon: Eye, color: 'text-blue-500' },
    { label: 'Глубина отражения', value: depth, icon: Brain, color: 'text-purple-500' },
    { label: 'Адаптивность', value: adaptivity, icon: Zap, color: 'text-yellow-500' }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Зеркало эмоций
        </CardTitle>
        <CardDescription>
          Оценка эмоционального состояния и взаимодействия
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {emotionalMetrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className="h-4 w-4" strokeWidth={2} color={metric.color} />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
        <Button variant="outline">
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};
