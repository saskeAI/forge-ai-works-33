
import React, { useState } from 'react';
import { 
  BrainCircuit, 
  FileUp, 
  BookOpen, 
  Wand2, 
  Play, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  BarChart2,
  Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export default function ModelTraining() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('examples');
  const [trainingStatus, setTrainingStatus] = useState({
    isTraining: false,
    progress: 0,
    stage: 'Готов к обучению'
  });
  const [uploadedDatasets, setUploadedDatasets] = useState<string[]>([]);
  const [emotionSettings, setEmotionSettings] = useState({
    empathy: 70,
    curiosity: 80,
    humor: 60,
    creativity: 75
  });
  
  const trainExamples = [
    {
      id: 1,
      stimulus: 'Пользователь выражает разочарование проектом',
      currentResponse: 'Я понимаю ваше разочарование. Возможно, стоит пересмотреть подход?',
      emotionalState: 'Эмпатия',
      rating: 4
    },
    {
      id: 2,
      stimulus: 'Пользователь делится успехом в работе',
      currentResponse: 'Это отличная новость! Ваши усилия принесли результаты.',
      emotionalState: 'Радость',
      rating: 5
    },
    {
      id: 3,
      stimulus: 'Пользователь задает сложный технический вопрос',
      currentResponse: 'Интересный вопрос. Давайте разберемся в деталях...',
      emotionalState: 'Анализ',
      rating: 3
    }
  ];
  
  const handleStartTraining = () => {
    setTrainingStatus({
      isTraining: true,
      progress: 0,
      stage: 'Подготовка данных'
    });
    
    toast({
      title: "Обучение запущено",
      description: "Процесс обучения модели начат. Это может занять некоторое время.",
    });
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingStatus(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Обучение завершено",
            description: "Модель успешно обучена и готова к использованию.",
          });
          return { isTraining: false, progress: 100, stage: 'Обучение завершено' };
        }
        
        let newProgress = prev.progress + Math.random() * 10;
        let newStage = prev.stage;
        
        if (newProgress > 25 && prev.progress <= 25) {
          newStage = 'Обработка эмоциональных паттернов';
        } else if (newProgress > 60 && prev.progress <= 60) {
          newStage = 'Оптимизация нейронных связей';
        } else if (newProgress > 90 && prev.progress <= 90) {
          newStage = 'Финализация модели';
        }
        
        return {
          ...prev,
          progress: Math.min(newProgress, 100),
          stage: newStage
        };
      });
    }, 800);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDatasets = Array.from(e.target.files).map(file => file.name);
      setUploadedDatasets(prev => [...prev, ...newDatasets]);
      
      toast({
        title: "Датасет загружен",
        description: `${newDatasets.join(", ")} успешно загружен и готов к обработке.`,
      });
    }
  };
  
  const handleEmotionChange = (emotion: keyof typeof emotionSettings, value: number[]) => {
    setEmotionSettings(prev => ({
      ...prev,
      [emotion]: value[0]
    }));
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Модуль обучения SASOK</h1>
          <p className="text-muted-foreground">Создание и настройка эмоционального интеллекта</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={trainingStatus.isTraining ? "outline" : "default"}
            className={!trainingStatus.isTraining ? "bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90" : ""}
            onClick={handleStartTraining}
            disabled={trainingStatus.isTraining}
          >
            {trainingStatus.isTraining ? (
              <>
                <BarChart2 size={18} className="mr-2 animate-pulse" /> Идет обучение...
              </>
            ) : (
              <>
                <BrainCircuit size={18} className="mr-2" /> Запустить обучение
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Training Status Card */}
      {trainingStatus.isTraining && (
        <Card className="mb-6 border-l-4 border-l-nova-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Статус обучения: {trainingStatus.stage}</h3>
              <span className="text-sm">{Math.round(trainingStatus.progress)}%</span>
            </div>
            <Progress value={trainingStatus.progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="examples" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" /> Обучение на примерах
          </TabsTrigger>
          <TabsTrigger value="emotions" className="flex items-center">
            <Wand2 className="h-4 w-4 mr-2" /> Редактор эмоций
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex items-center">
            <Database className="h-4 w-4 mr-2" /> Загрузка датасетов
          </TabsTrigger>
        </TabsList>
        
        {/* Examples Training Tab */}
        <TabsContent value="examples">
          <div className="grid grid-cols-1 gap-6">
            {trainExamples.map(example => (
              <Card key={example.id}>
                <CardHeader>
                  <CardTitle className="text-lg">Пример #{example.id}</CardTitle>
                  <CardDescription>
                    Эмоциональное состояние: <span className="font-medium">{example.emotionalState}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Стимул:</h4>
                      <div className="bg-muted p-3 rounded-md">
                        {example.stimulus}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Текущий ответ SASOK:</h4>
                      <div className="bg-muted/50 p-3 rounded-md border">
                        {example.currentResponse}
                      </div>
                    </div>
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Оценка ответа:</h4>
                      <div className="flex items-center">
                        <div className="flex space-x-1 mr-3">
                          {Array.from({length: 5}).map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-6 h-6 cursor-pointer ${i < example.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {example.rating === 5 ? "Отличный ответ" : 
                           example.rating === 4 ? "Хороший ответ" :
                           example.rating === 3 ? "Нормальный ответ" :
                           example.rating === 2 ? "Требует улучшения" : "Плохой ответ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <X size={16} className="mr-2" /> Отклонить
                  </Button>
                  <Button variant="default" size="sm">
                    <CheckCircle2 size={16} className="mr-2" /> Принять для обучения
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Button className="w-full py-6 border-dashed bg-muted/50 hover:bg-muted">
              <Play size={18} className="mr-2" /> Добавить новый пример
            </Button>
          </div>
        </TabsContent>
        
        {/* Emotion Editor Tab */}
        <TabsContent value="emotions">
          <Card>
            <CardHeader>
              <CardTitle>Редактор эмоциональных параметров</CardTitle>
              <CardDescription>
                Настройте эмоциональные характеристики вашего ИИ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Эмпатия</label>
                    <span>{emotionSettings.empathy}%</span>
                  </div>
                  <Slider
                    defaultValue={[emotionSettings.empathy]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleEmotionChange('empathy', value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Способность ИИ понимать и реагировать на эмоции пользователя
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Любопытство</label>
                    <span>{emotionSettings.curiosity}%</span>
                  </div>
                  <Slider
                    defaultValue={[emotionSettings.curiosity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleEmotionChange('curiosity', value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Стремление ИИ узнавать новое и задавать уточняющие вопросы
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Юмор</label>
                    <span>{emotionSettings.humor}%</span>
                  </div>
                  <Slider
                    defaultValue={[emotionSettings.humor]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleEmotionChange('humor', value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Способность ИИ использовать юмор в общении
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Творчество</label>
                    <span>{emotionSettings.creativity}%</span>
                  </div>
                  <Slider
                    defaultValue={[emotionSettings.creativity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleEmotionChange('creativity', value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Творческий подход ИИ к решению задач и генерации контента
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Эмоциональные триггеры:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span>Когда пользователь выражает грусть</span>
                    <span className="text-sm">Повышенная эмпатия</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span>Когда пользователь задает сложный вопрос</span>
                    <span className="text-sm">Аналитический режим</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    + Добавить триггер
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить эмоциональные настройки</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Datasets Tab */}
        <TabsContent value="datasets">
          <Card>
            <CardHeader>
              <CardTitle>Загрузка собственных датасетов</CardTitle>
              <CardDescription>
                Загрузите свои датасеты для обучения модели
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center mb-6">
                <FileUp className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-1">Перетащите файлы или нажмите для загрузки</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Поддерживаемые форматы: CSV, JSON, TXT (макс. 50 МБ)
                </p>
                <div className="flex justify-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      multiple
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" type="button">Выбрать файлы</Button>
                  </label>
                </div>
              </div>
              
              {uploadedDatasets.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Загруженные датасеты:</h3>
                  <div className="space-y-2">
                    {uploadedDatasets.map((dataset, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          <span>{dataset}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {uploadedDatasets.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Нет загруженных датасетов</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Загрузите датасеты для дообучения модели
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                disabled={uploadedDatasets.length === 0}
                variant={uploadedDatasets.length === 0 ? "outline" : "default"}
              >
                Обработать датасеты
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
