
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BrainCircuit, 
  Settings, 
  BarChart, 
  Play, 
  Pause,
  Save,
  AlertTriangle,
  Download,
  Upload,
  ChevronRight,
  Check,
  X,
  History,
  Layers,
  FileCode
} from 'lucide-react';
import { useRightPanel, useRightPanelContent } from '@/context/RightPanelContext';

// Компонент для правой панели с настройками модели
const ModelSettingsPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Настройки модели</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Основные параметры</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-muted-foreground">Эпохи</label>
            <input type="number" min="1" max="100" defaultValue="20" className="w-full border rounded p-1 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Размер батча</label>
            <input type="number" min="1" max="512" defaultValue="32" className="w-full border rounded p-1 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Learning Rate</label>
            <input type="number" min="0.0001" max="0.1" step="0.0001" defaultValue="0.001" className="w-full border rounded p-1 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Dropout</label>
            <input type="number" min="0" max="0.9" step="0.1" defaultValue="0.2" className="w-full border rounded p-1 text-sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Оптимизатор</h4>
        <select className="w-full border rounded p-1 text-sm">
          <option>Adam</option>
          <option>SGD</option>
          <option>RMSprop</option>
          <option>Adagrad</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Функция потерь</h4>
        <select className="w-full border rounded p-1 text-sm">
          <option>Categorical Crossentropy</option>
          <option>Binary Crossentropy</option>
          <option>Mean Squared Error</option>
          <option>Sparse Categorical Crossentropy</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Слои модели</h4>
        <div className="border rounded p-2 space-y-2 max-h-40 overflow-auto">
          <div className="text-xs bg-muted p-1 rounded flex justify-between items-center">
            <span>Dense(128, activation='relu')</span>
            <X size={12} className="cursor-pointer text-muted-foreground hover:text-red-500" />
          </div>
          <div className="text-xs bg-muted p-1 rounded flex justify-between items-center">
            <span>Dropout(0.2)</span>
            <X size={12} className="cursor-pointer text-muted-foreground hover:text-red-500" />
          </div>
          <div className="text-xs bg-muted p-1 rounded flex justify-between items-center">
            <span>Dense(64, activation='relu')</span>
            <X size={12} className="cursor-pointer text-muted-foreground hover:text-red-500" />
          </div>
          <div className="text-xs bg-muted p-1 rounded flex justify-between items-center">
            <span>Dense(10, activation='softmax')</span>
            <X size={12} className="cursor-pointer text-muted-foreground hover:text-red-500" />
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">Добавить слой</Button>
      </div>
      
      <div className="pt-2">
        <Button className="w-full">Применить настройки</Button>
      </div>
    </div>
  );
};

export default function ModelTraining() {
  const { open } = useRightPanel();
  const { setContent } = useRightPanelContent();
  const [trainingProgress, setTrainingProgress] = React.useState(45);
  const [isTraining, setIsTraining] = React.useState(false);
  
  const showSettings = () => {
    setContent({
      title: "Настройки модели",
      content: <ModelSettingsPanel />
    });
    open();
  };
  
  const toggleTraining = () => {
    setIsTraining(!isTraining);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Обучение моделей</h1>
          <p className="text-muted-foreground">Инструменты для обучения и настройки моделей ИИ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={showSettings} className="flex items-center gap-1">
            <Settings size={16} />
            <span>Настройки</span>
          </Button>
          <Button className="bg-gradient-to-r from-nova-600 to-forge-500">
            <BrainCircuit size={16} className="mr-1" />
            Новая модель
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="models">
        <TabsList className="mb-4">
          <TabsTrigger value="models" className="flex items-center gap-1">
            <BrainCircuit size={16} />
            <span>Модели</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-1">
            <Play size={16} />
            <span>Обучение</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-1">
            <BarChart size={16} />
            <span>Метрики</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Классификатор текста</CardTitle>
                  <span className="text-xs bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full font-medium">Активна</span>
                </div>
                <CardDescription>BERT-based модель для классификации текстов</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Точность:</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата обучения:</span>
                  <span className="font-medium">12.05.2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Размер модели:</span>
                  <span className="font-medium">438 MB</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2 justify-end">
                <Button variant="outline" size="sm">Экспорт</Button>
                <Button size="sm">Использовать</Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Генератор изображений</CardTitle>
                  <span className="text-xs bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full font-medium">В разработке</span>
                </div>
                <CardDescription>Diffusion-based модель для генерации изображений</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Качество:</span>
                  <span className="font-medium">78.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата обучения:</span>
                  <span className="font-medium">09.05.2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Размер модели:</span>
                  <span className="font-medium">2.1 GB</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2 justify-end">
                <Button variant="outline" size="sm">Экспорт</Button>
                <Button size="sm">Использовать</Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow border-dashed border-2">
              <CardHeader className="pb-2">
                <CardTitle>Создать новую модель</CardTitle>
                <CardDescription>Выберите тип модели для создания</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex flex-col gap-1.5">
                  <Button variant="outline" className="justify-start" size="sm">
                    <FileCode size={14} className="mr-2" />
                    <span>Обработка текста</span>
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <Layers size={14} className="mr-2" />
                    <span>Компьютерное зрение</span>
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <BrainCircuit size={14} className="mr-2" />
                    <span>Пользовательская модель</span>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end">
                <Button size="sm">Начать</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>История моделей</CardTitle>
              <CardDescription>Ранее созданные и обученные модели</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Название</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Тип</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Метрика</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Дата</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Определение эмоций</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Текст</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">87.3%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">01.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Просмотр</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Аномалии в данных</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Табличные данные</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">91.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">28.04.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Просмотр</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Распознавание лиц</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Компьютерное зрение</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">94.7%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">15.04.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Просмотр</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Обучение модели: Генератор изображений</CardTitle>
                  <CardDescription>Процесс обучения модели</CardDescription>
                </div>
                <Button 
                  variant={isTraining ? "destructive" : "default"}
                  className="flex items-center gap-1"
                  onClick={toggleTraining}
                >
                  {isTraining ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isTraining ? "Остановить" : "Продолжить"}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс обучения: Эпоха 9/20</span>
                  <span className="font-medium">{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="h-2"/>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Текущая эпоха</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loss:</span>
                      <span>0.0256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span>0.924</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Val Loss:</span>
                      <span>0.0312</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Val Accuracy:</span>
                      <span>0.912</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Время</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Начало обучения:</span>
                      <span>09:32:15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Времени прошло:</span>
                      <span>01:24:36</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Осталось примерно:</span>
                      <span>01:42:10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время на эпоху:</span>
                      <span>~00:09:30</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Журнал обучения</h3>
                <div className="bg-muted/30 rounded-md p-2 h-40 overflow-auto font-mono text-xs">
                  <div>09:32:15 - Начало обучения</div>
                  <div>09:32:18 - Загрузка данных: 100%</div>
                  <div>09:32:25 - Эпоха 1/20 - loss: 0.3412 - accuracy: 0.8123 - val_loss: 0.3251 - val_accuracy: 0.8245</div>
                  <div>09:41:52 - Эпоха 2/20 - loss: 0.2856 - accuracy: 0.8532 - val_loss: 0.2943 - val_accuracy: 0.8476</div>
                  <div>09:51:23 - Эпоха 3/20 - loss: 0.2341 - accuracy: 0.8745 - val_loss: 0.2567 - val_accuracy: 0.8612</div>
                  <div>10:01:05 - Эпоха 4/20 - loss: 0.1923 - accuracy: 0.8901 - val_loss: 0.2134 - val_accuracy: 0.8753</div>
                  <div>10:10:32 - Эпоха 5/20 - loss: 0.1567 - accuracy: 0.9034 - val_loss: 0.1876 - val_accuracy: 0.8845</div>
                  <div>10:20:12 - Эпоха 6/20 - loss: 0.1298 - accuracy: 0.9123 - val_loss: 0.1645 - val_accuracy: 0.8921</div>
                  <div>10:29:45 - Эпоха 7/20 - loss: 0.1045 - accuracy: 0.9156 - val_loss: 0.1423 - val_accuracy: 0.9001</div>
                  <div>10:39:21 - Эпоха 8/20 - loss: 0.0823 - accuracy: 0.9201 - val_loss: 0.1245 - val_accuracy: 0.9056</div>
                  <div>10:48:55 - Эпоха 9/20 - loss: 0.0634 - accuracy: 0.9238 - val_loss: 0.1098 - val_accuracy: 0.9112</div>
                  <div className="text-amber-500">10:56:51 - Предупреждение: Возможный overfitting, рассмотрите увеличение dropout</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1">
                  <AlertTriangle size={16} />
                  <span>Остановить</span>
                </Button>
                <Button variant="outline" className="flex-1 gap-1">
                  <Save size={16} />
                  <span>Сохранить чекпоинт</span>
                </Button>
                <Button className="flex-1 gap-1">
                  <Settings size={16} />
                  <span>Настройки</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Метрики обучения</CardTitle>
                <CardDescription>График изменения точности и потерь</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-muted-foreground">График метрик обучения будет отображаться здесь</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Действия</CardTitle>
                <CardDescription>Опции для управления обучением</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Чекпоинты</h4>
                  <div className="text-sm text-muted-foreground">Сохранение промежуточных результатов обучения</div>
                  <div className="flex gap-2 mt-1">
                    <Button variant="outline" size="sm" className="flex-1">Загрузить</Button>
                    <Button size="sm" className="flex-1">Сохранить</Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Параметры обучения</h4>
                  <div className="text-sm text-muted-foreground">Изменение параметров в процессе обучения</div>
                  <div className="flex gap-2 mt-1">
                    <Button variant="outline" size="sm" className="flex-1">Изменить LR</Button>
                    <Button size="sm" className="flex-1">Ранняя остановка</Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Экспорт модели</h4>
                  <div className="text-sm text-muted-foreground">Экспорт модели в различных форматах</div>
                  <div className="flex gap-2 mt-1">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      <span>ONNX</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      <span>TensorFlow</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      <span>PyTorch</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Точность (Accuracy)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">92.4%</div>
                <p className="text-xs text-muted-foreground">+2.1% от базовой модели</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Потери (Loss)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">0.0256</div>
                <p className="text-xs text-muted-foreground">-0.012 от базовой модели</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">F1-Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">0.934</div>
                <p className="text-xs text-muted-foreground">+0.024 от базовой модели</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Время обучения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">01:24:36</div>
                <p className="text-xs text-muted-foreground">-12:05 от базовой модели</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Матрица ошибок</CardTitle>
                <CardDescription>Визуализация классификации по категориям</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-muted-foreground">Матрица ошибок будет отображаться здесь</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>ROC-кривая</CardTitle>
                <CardDescription>График ROC-кривой для оценки модели</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-muted-foreground">ROC-кривая будет отображаться здесь</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>История метрик</CardTitle>
              <CardDescription>Сравнение метрик для различных версий модели</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Версия</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Дата</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Accuracy</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Loss</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">F1-Score</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    <tr className="bg-green-50 dark:bg-green-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">v1.3.0 (текущая)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">09.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">92.4%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.0256</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.934</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Check size={14} className="text-green-600" />
                          <span>Активна</span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">v1.2.1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">05.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">90.3%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.0378</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.910</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Активировать</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">v1.1.0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">01.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">87.5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.0512</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.882</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Активировать</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">v1.0.0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">28.04.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">82.6%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.0856</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">0.841</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Активировать</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
