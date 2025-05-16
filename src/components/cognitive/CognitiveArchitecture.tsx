
import React from 'react';
import { Layers, Database, Brain, Code, Shield, Zap, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ArchitectureModule {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  technologies: string[];
  icon: React.ElementType;
  progress: number;
}

export const CognitiveArchitecture: React.FC = () => {
  const { toast } = useToast();

  const architectureModules: ArchitectureModule[] = [
    {
      id: 'core',
      name: 'Ядро (Core)',
      description: 'Центральный модуль обработки данных и координации когнитивных процессов',
      status: 'in-progress',
      technologies: ['Python 3.11', 'Redis'],
      icon: Layers,
      progress: 35,
    },
    {
      id: 'memory',
      name: 'Долговременная память',
      description: 'Хранение и индексирование эмбеддингов для семантического поиска',
      status: 'planned',
      technologies: ['PostgreSQL', 'pgvector'],
      icon: Database,
      progress: 15,
    },
    {
      id: 'emotional',
      name: 'Эмоциональный анализатор',
      description: 'Распознавание и адаптация к эмоциональному состоянию пользователя',
      status: 'in-progress',
      technologies: ['OpenCV', 'EEGLib'],
      icon: Brain,
      progress: 45,
    },
    {
      id: 'generator',
      name: 'Генератор кода',
      description: 'Автоматическая генерация кода на основе спецификаций и требований',
      status: 'planned',
      technologies: ['GPT-4', 'Codex'],
      icon: Code,
      progress: 10,
    },
    {
      id: 'security',
      name: 'Когнитивный файрвол',
      description: 'Защита от когнитивных атак и манипуляций',
      status: 'planned',
      technologies: ['OAuth 2.1', 'SSL Pinning'],
      icon: Shield,
      progress: 5,
    },
    {
      id: 'bci',
      name: 'Нейроинтерфейсы',
      description: 'Интеграция с устройствами считывания биосигналов',
      status: 'planned',
      technologies: ['BCI2000', 'OpenBCI'],
      icon: Zap,
      progress: 20,
    },
    {
      id: 'devops',
      name: 'Инфраструктура',
      description: 'Автоматическое развертывание и масштабирование системы',
      status: 'planned',
      technologies: ['Terraform', 'Kubernetes'],
      icon: Network,
      progress: 8,
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    toast({
      title: `Модуль: ${architectureModules.find(m => m.id === moduleId)?.name}`,
      description: "Подробная информация будет доступна в следующем обновлении",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Когнитивная архитектура SASOK</h2>
        <p className="text-muted-foreground">
          Модульная система с нейроадаптацией для ИИ-ассистентов
        </p>
      </div>

      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Модули</TabsTrigger>
          <TabsTrigger value="architecture">Архитектура</TabsTrigger>
          <TabsTrigger value="roadmap">Дорожная карта</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectureModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <module.icon className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        module.status === 'completed' ? 'default' :
                        module.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                    >
                      {module.status === 'completed' ? 'Завершен' :
                       module.status === 'in-progress' ? 'В разработке' : 'Запланирован'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{module.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Прогресс</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {module.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleModuleClick(module.id)}
                  >
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="architecture" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Схема архитектуры</CardTitle>
              <CardDescription>
                Взаимодействие модулей когнитивной системы SASOK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 bg-muted/30 rounded-md">
                <div className="text-center">
                  <Brain size={64} className="mx-auto text-primary/60" />
                  <p className="mt-4 text-muted-foreground">
                    Интерактивная схема архитектуры будет доступна в следующей версии
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Дорожная карта разработки</CardTitle>
              <CardDescription>
                План реализации модулей когнитивной системы SASOK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative pl-8 pb-8 border-l border-muted">
                  <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-lg">Фаза 1: Прототип</h3>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• Архитектурный дизайн</p>
                    <p>• Выбор технологического стека</p>
                    <p>• MVP для Core Memory Stack</p>
                    <p>• Интеграция с GPT-4 через streaming API</p>
                  </div>
                </div>
                
                <div className="relative pl-8 pb-8 border-l border-muted">
                  <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-lg">Фаза 2: Релизная версия</h3>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• Реализация всех 7 слоев</p>
                    <p>• Настройка Cognitive Firewall</p>
                    <p>• Обучение моделей для Affective Oscillator</p>
                    <p>• Нагрузочные тесты (Locust, k6)</p>
                    <p>• Пентест (OWASP Top-10)</p>
                  </div>
                </div>
                
                <div className="relative pl-8 pb-0 border-l border-muted">
                  <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-lg">Фаза 3: Продакшн</h3>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• CI/CD через ArgoCD</p>
                    <p>• Мониторинг (Prometheus + Grafana)</p>
                    <p>• Развертывание в облачной инфраструктуре</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
