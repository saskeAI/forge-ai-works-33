
import React from 'react';
import { Brain, Lightbulb, Heart, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MetricProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const Metric = ({ title, value, icon, color, description }: MetricProps) => {
  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full ${color} mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{Math.round(value * 100)}%</span>
          <span className="text-xs text-muted-foreground">
            {value < 0.3 ? "Начальный" : value < 0.6 ? "Развивающийся" : "Продвинутый"}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full" 
            style={{
              width: `${value * 100}%`,
              background: getGradient(value)
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const getGradient = (value: number) => {
  if (value < 0.3) return 'linear-gradient(90deg, #fde047 0%, #eab308 100%)';
  if (value < 0.7) return 'linear-gradient(90deg, #a3e635 0%, #65a30d 100%)';
  return 'linear-gradient(90deg, #34d399 0%, #059669 100%)';
};

export const SymbiosisMetrics = () => {
  const { toast } = useToast();
  
  const metrics: MetricProps[] = [
    {
      title: "Когнитивная гармония",
      value: 0.82,
      icon: <Brain size={20} className="text-white" />,
      color: "bg-blue-600",
      description: "Соответствие мыслительных процессов"
    },
    {
      title: "Эмоциональный резонанс",
      value: 0.67,
      icon: <Heart size={20} className="text-white" />,
      color: "bg-pink-600",
      description: "Совпадение эмоциональных реакций"
    },
    {
      title: "Адаптивное обучение",
      value: 0.91,
      icon: <Lightbulb size={20} className="text-white" />,
      color: "bg-amber-600",
      description: "Скорость усвоения новых шаблонов"
    },
    {
      title: "Прогнозирование действий",
      value: 0.58,
      icon: <Zap size={20} className="text-white" />,
      color: "bg-purple-600",
      description: "Точность предсказания поведения"
    }
  ];
  
  const handleAdjustAutonomy = () => {
    toast({
      title: "Настройка автономии",
      description: "Открываю панель настройки уровня автономии SASOK"
    });
  };
  
  const totalSymbiosis = metrics.reduce((acc, curr) => acc + curr.value, 0) / metrics.length;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <div className="p-2 rounded-full bg-gradient-to-r from-nova-600 to-forge-500 mr-3">
              <Brain size={20} className="text-white" />
            </div>
            Общий индекс симбиоза
          </CardTitle>
          <CardDescription>
            Уровень синхронизации SASOK с вашими паттернами мышления и коммуникации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-nova-500" 
                    style={{ width: `${totalSymbiosis * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-right">
                {Math.round(totalSymbiosis * 100)}%
              </div>
            </div>
            
            <div className="text-sm">
              <p>
                {totalSymbiosis < 0.4 
                  ? "SASOK находится на начальном этапе симбиоза. Продолжайте взаимодействие для улучшения показателей."
                  : totalSymbiosis < 0.7 
                    ? "SASOK достиг хорошего уровня симбиоза. Он уже хорошо понимает ваши паттерны коммуникации."
                    : "SASOK достиг высокого уровня симбиоза с вашими паттернами мышления и коммуникации."}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAdjustAutonomy}
            >
              <Settings size={16} className="mr-2" />
              Настроить уровень автономии
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <Metric key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};
