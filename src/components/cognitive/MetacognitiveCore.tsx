
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, TrendingUp, Zap, Eye, Settings } from 'lucide-react';

interface MetacognitiveState {
  selfAnalysisLevel: number;
  learningProgress: number;
  adaptationRate: number;
  errorDetection: number;
  planningEfficiency: number;
  introspectionDepth: number;
}

export const MetacognitiveCore: React.FC = () => {
  const [cognitiveState, setCognitiveState] = useState<MetacognitiveState>({
    selfAnalysisLevel: 85,
    learningProgress: 72,
    adaptationRate: 68,
    errorDetection: 91,
    planningEfficiency: 78,
    introspectionDepth: 64
  });

  const [activeProcesses, setActiveProcesses] = useState([
    'Мониторинг внутренних процессов',
    'Анализ эффективности решений',
    'Коррекция поведенческих паттернов',
    'Прогнозирование будущих действий'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveState(prev => ({
        selfAnalysisLevel: Math.max(60, Math.min(95, prev.selfAnalysisLevel + (Math.random() - 0.5) * 5)),
        learningProgress: Math.max(50, Math.min(90, prev.learningProgress + (Math.random() - 0.5) * 3)),
        adaptationRate: Math.max(40, Math.min(85, prev.adaptationRate + (Math.random() - 0.5) * 4)),
        errorDetection: Math.max(70, Math.min(98, prev.errorDetection + (Math.random() - 0.5) * 2)),
        planningEfficiency: Math.max(55, Math.min(88, prev.planningEfficiency + (Math.random() - 0.5) * 3)),
        introspectionDepth: Math.max(45, Math.min(80, prev.introspectionDepth + (Math.random() - 0.5) * 4))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (value: number) => {
    if (value >= 80) return <Badge variant="default" className="bg-green-100 text-green-800">Оптимально</Badge>;
    if (value >= 60) return <Badge variant="secondary">Норма</Badge>;
    return <Badge variant="destructive">Требует внимания</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-nova-600" size={24} />
          Метакогнитивное ядро SASOK
        </CardTitle>
        <CardDescription>
          Центральная система самоанализа, самообучения и самоадаптации
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Самоанализ</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.selfAnalysisLevel)}`}>
                {cognitiveState.selfAnalysisLevel.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.selfAnalysisLevel} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm font-medium">Обучение</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.learningProgress)}`}>
                {cognitiveState.learningProgress.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.learningProgress} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-500" />
                <span className="text-sm font-medium">Адаптация</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.adaptationRate)}`}>
                {cognitiveState.adaptationRate.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.adaptationRate} className="h-2" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-red-500" />
                <span className="text-sm font-medium">Детекция ошибок</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.errorDetection)}`}>
                {cognitiveState.errorDetection.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.errorDetection} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-purple-500" />
                <span className="text-sm font-medium">Планирование</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.planningEfficiency)}`}>
                {cognitiveState.planningEfficiency.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.planningEfficiency} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-indigo-500" />
                <span className="text-sm font-medium">Интроспекция</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(cognitiveState.introspectionDepth)}`}>
                {cognitiveState.introspectionDepth.toFixed(0)}%
              </span>
            </div>
            <Progress value={cognitiveState.introspectionDepth} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Активные процессы</h4>
          <div className="space-y-2">
            {activeProcesses.map((process, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <span className="text-sm">{process}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Активен</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Общий статус системы</h4>
          <div className="flex items-center justify-between">
            <span>Когнитивная производительность:</span>
            {getStatusBadge(Math.round((Object.values(cognitiveState).reduce((a, b) => a + b, 0)) / Object.values(cognitiveState).length))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
