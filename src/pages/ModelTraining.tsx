
import React, { useState } from 'react';
import { 
  Brain, 
  BarChart2, 
  History, 
  Database, 
  Download, 
  RefreshCw, 
  Play,
  Pause,
  AlertTriangle,
  Check,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ModelTrainingForm } from '@/components/training/ModelTrainingForm';
import { TrainingMetricsChart } from '@/components/training/TrainingMetricsChart';
import { ModelComparison } from '@/components/training/ModelComparison';

export default function ModelTraining() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  
  // Имитация процесса обучения
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTraining && trainingProgress < 100) {
      interval = setInterval(() => {
        setTrainingProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsTraining(false);
            toast({
              title: "Обучение завершено",
              description: "Модель успешно обучена и готова к использованию.",
              variant: "success"
            });
          }
          return newProgress;
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTraining, trainingProgress, toast]);
  
  const handleStartTraining = () => {
    if (isTraining) {
      setIsTraining(false);
      toast({
        title: "Обучение приостановлено",
        description: "Вы можете возобновить обучение в любой момент."
      });
    } else {
      setIsTraining(true);
      setTrainingProgress(0);
      toast({
        title: "Обучение запущено",
        description: "Начинаю процесс обучения модели SASOK."
      });
    }
  };
  
  const handleExportModel = () => {
    toast({
      title: "Экспорт модели",
      description: "Модель подготовлена к экспорту"
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Обучение моделей</h1>
          <p className="text-muted-foreground">Настройка, обучение и анализ моделей SASOK</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={handleExportModel}
          >
            <Download size={18} className="mr-2" /> Экспорт
          </Button>
          <Button 
            variant="default"
            className={isTraining 
              ? "bg-amber-600 hover:bg-amber-700" 
              : "bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            }
            onClick={handleStartTraining}
          >
            {isTraining ? (
              <><Pause size={18} className="mr-2" /> Приостановить</>
            ) : (
              <><Play size={18} className="mr-2" /> Запустить</>
            )}
          </Button>
        </div>
      </div>
      
      {isTraining && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-500 animate-pulse" />
                  <span className="font-medium">Обучение модели в процессе...</span>
                </div>
                <span className="text-sm font-medium">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Эпоха {Math.floor(trainingProgress / 3.33)}/30</span>
                <span>Осталось примерно {Math.ceil((100 - trainingProgress) * 0.3)} мин</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" /> Дашборд
          </TabsTrigger>
          <TabsTrigger value="configure" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" /> Конфигурация
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="h-4 w-4 mr-2" /> История обучения
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex items-center">
            <Database className="h-4 w-4 mr-2" /> Наборы данных
          </TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Статус системы обучения</CardTitle>
                  <CardDescription>
                    Текущее состояние и запланированные задачи
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-500">4</div>
                        <div className="text-sm text-muted-foreground">Активные модели</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-500">2</div>
                        <div className="text-sm text-muted-foreground">В очереди</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-amber-500">85%</div>
                        <div className="text-sm text-muted-foreground">Загрузка GPU</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-500">12.6</div>
                        <div className="text-sm text-muted-foreground">GB RAM</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Недавние события</h3>
                      <ul className="space-y-2">
                        <li className="text-sm bg-muted p-2 rounded-md flex">
                          <span className="text-green-500 mr-2">●</span>
                          SASOK Core v1.0 - обучение завершено
                        </li>
                        <li className="text-sm bg-muted p-2 rounded-md flex">
                          <span className="text-amber-500 mr-2">●</span>
                          SASOK Emotional v0.8 - валидация
                        </li>
                        <li className="text-sm bg-muted p-2 rounded-md flex">
                          <span className="text-blue-500 mr-2">●</span>
                          Загрузка нового набора данных
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Предупреждения</h3>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <div className="text-sm">
                          Обнаружены признаки переобучения в модели SASOK Experimental v0.2. Рассмотрите возможность регуляризации.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <TrainingMetricsChart />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <ModelComparison />
          </div>
        </TabsContent>
        
        {/* Configure Tab */}
        <TabsContent value="configure">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ModelTrainingForm />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендации</CardTitle>
                  <CardDescription>
                    На основе анализа предыдущих моделей
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <h3 className="font-medium mb-1">Оптимизация гиперпараметров</h3>
                    <p className="text-sm text-muted-foreground">
                      Для текущего набора данных рекомендуется скорость обучения 0.0005 и размер пакета 64.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <h3 className="font-medium mb-1">Архитектура модели</h3>
                    <p className="text-sm text-muted-foreground">
                      Для задач эмоционального анализа лучшие результаты показывает архитектура Transformer с 8 слоями внимания.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <h3 className="font-medium mb-1">Предобработка данных</h3>
                    <p className="text-sm text-muted-foreground">
                      Рекомендуется применить нормализацию и аугментацию для улучшения обобщающей способности модели.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <h3 className="font-medium mb-1">Стратегия обучения</h3>
                    <p className="text-sm text-muted-foreground">
                      Рассмотрите возможность переноса знаний (transfer learning) из модели SASOK Core v1.0 для ускорения обучения.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>История обучения моделей</CardTitle>
              <CardDescription>
                Хронология процессов обучения и результаты
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-7 border-l border-dashed border-muted-foreground/20"></div>
                <ol className="relative space-y-6">
                  {[
                    {
                      date: '12 мая 2025, 10:45',
                      title: 'SASOK Experimental v0.2',
                      description: 'Обучение завершено с точностью 94%',
                      status: 'success'
                    },
                    {
                      date: '11 мая 2025, 15:30',
                      title: 'SASOK Emotional v0.8',
                      description: 'Обучение завершено с точностью 87%',
                      status: 'success'
                    },
                    {
                      date: '10 мая 2025, 09:15',
                      title: 'SASOK Core v1.0',
                      description: 'Обучение завершено с точностью 92%',
                      status: 'success'
                    },
                    {
                      date: '5 мая 2025, 14:20',
                      title: 'SASOK Prototype v0.3',
                      description: 'Обучение прервано из-за проблем с данными',
                      status: 'error'
                    },
                    {
                      date: '28 апреля 2025, 11:05',
                      title: 'SASOK Legacy v0.5',
                      description: 'Обучение завершено с точностью 79%',
                      status: 'success'
                    }
                  ].map((item, index) => (
                    <li key={index} className="ml-14 relative">
                      <div className={`absolute -left-9 p-2 rounded-full ${
                        item.status === 'success' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {item.status === 'success' ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                      </div>
                      <time className="block text-xs text-muted-foreground">{item.date}</time>
                      <h3 className="text-base font-semibold mt-0.5">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Datasets Tab */}
        <TabsContent value="datasets">
          <Card>
            <CardHeader>
              <CardTitle>Управление наборами данных</CardTitle>
              <CardDescription>
                Доступные наборы данных для обучения моделей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Эмоциональные диалоги',
                      size: '8.2 ГБ',
                      records: '1.2M',
                      lastUpdated: '11 мая 2025',
                      icon: <Brain className="h-10 w-10 text-pink-500" />
                    },
                    {
                      name: 'Паттерны коммуникации',
                      size: '5.7 ГБ',
                      records: '845K',
                      lastUpdated: '8 мая 2025',
                      icon: <BarChart2 className="h-10 w-10 text-blue-500" />
                    },
                    {
                      name: 'Контексты взаимодействий',
                      size: '12.5 ГБ',
                      records: '2.3M',
                      lastUpdated: '10 мая 2025',
                      icon: <Database className="h-10 w-10 text-green-500" />
                    }
                  ].map((dataset, index) => (
                    <Card key={index} className="bg-muted/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="p-3 bg-background rounded-lg mr-3">
                            {dataset.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{dataset.name}</h3>
                            <div className="flex flex-wrap text-xs text-muted-foreground gap-x-4 mt-1">
                              <span>Размер: {dataset.size}</span>
                              <span>Записей: {dataset.records}</span>
                              <span>Обновлено: {dataset.lastUpdated}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                                Просмотр
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                                Обновить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-medium mb-4">Загрузка нового набора данных</h3>
                  <div className="h-28 border-2 border-dashed rounded-md flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Перетащите файлы сюда или нажмите кнопку ниже
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Выбрать файлы
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Поддерживаемые форматы: CSV, JSON, JSONL, TXT. Максимальный размер: 50 ГБ
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
