
import React, { useState } from 'react';
import { 
  Settings, 
  Upload, 
  Database, 
  Brain, 
  Play, 
  Save, 
  AlertTriangle, 
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export const ModelTrainingForm = () => {
  const { toast } = useToast();
  const [trainingMethod, setTrainingMethod] = useState('supervised');
  const [learningRate, setLearningRate] = useState([0.001]);
  const [epochs, setEpochs] = useState([50]);
  const [batchSize, setBatchSize] = useState([32]);
  const [advancedMode, setAdvancedMode] = useState(false);
  
  const handleStartTraining = () => {
    toast({
      title: "Обучение модели запущено",
      description: "Процесс обучения начался. Вы будете уведомлены о его завершении.",
    });
    
    // В реальном приложении здесь были бы вызовы API для запуска обучения модели
    setTimeout(() => {
      toast({
        title: "Обучение завершено",
        description: "Модель успешно обучена и готова к использованию.",
        variant: "default"
      });
    }, 5000);
  };
  
  const handleSaveConfig = () => {
    toast({
      title: "Конфигурация сохранена",
      description: "Параметры обучения сохранены для последующего использования."
    });
  };

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Настройка обучения модели</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Базовые настройки</TabsTrigger>
            <TabsTrigger value="data">Данные</TabsTrigger>
            {advancedMode && <TabsTrigger value="advanced">Расширенные</TabsTrigger>}
          </TabsList>
          
          {/* Basic Settings */}
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label>Название модели</Label>
              <Input placeholder="Введите название модели" />
            </div>
            
            <div className="space-y-2">
              <Label>Метод обучения</Label>
              <Select defaultValue={trainingMethod} onValueChange={setTrainingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите метод обучения" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supervised">Обучение с учителем</SelectItem>
                  <SelectItem value="unsupervised">Обучение без учителя</SelectItem>
                  <SelectItem value="reinforcement">Обучение с подкреплением</SelectItem>
                  <SelectItem value="transfer">Трансферное обучение</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Скорость обучения</Label>
                <span className="text-sm">{learningRate[0]}</span>
              </div>
              <Slider 
                value={learningRate} 
                min={0.0001} 
                max={0.01} 
                step={0.0001} 
                onValueChange={setLearningRate}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Количество эпох</Label>
                <span className="text-sm">{epochs[0]}</span>
              </div>
              <Slider 
                value={epochs} 
                min={1} 
                max={200} 
                step={1} 
                onValueChange={setEpochs}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Размер пакета</Label>
                <span className="text-sm">{batchSize[0]}</span>
              </div>
              <Slider 
                value={batchSize} 
                min={1} 
                max={128} 
                step={1} 
                onValueChange={setBatchSize}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="advanced-mode" 
                checked={advancedMode} 
                onCheckedChange={setAdvancedMode}
              />
              <Label htmlFor="advanced-mode">Расширенный режим</Label>
            </div>
          </TabsContent>
          
          {/* Data Settings */}
          <TabsContent value="data" className="space-y-4">
            <div className="space-y-2">
              <Label>Источник данных</Label>
              <Select defaultValue="file">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите источник данных" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">Файл</SelectItem>
                  <SelectItem value="database">База данных</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="history">История взаимодействий</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Загрузить файл набора данных</Label>
                <Button variant="outline" size="sm">
                  <Upload size={16} className="mr-2" />
                  Выбрать файл
                </Button>
              </div>
              <div className="h-20 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground text-sm">
                Перетащите файлы сюда или нажмите кнопку выше
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Соотношение обучающей/тестовой выборки</Label>
              <Select defaultValue="80-20">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите соотношение" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70-30">70% / 30%</SelectItem>
                  <SelectItem value="80-20">80% / 20%</SelectItem>
                  <SelectItem value="90-10">90% / 10%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Предобработка данных</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="preprocessing-normalize" />
                  <Label htmlFor="preprocessing-normalize">Нормализация</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="preprocessing-augment" />
                  <Label htmlFor="preprocessing-augment">Аугментация</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="preprocessing-balance" />
                  <Label htmlFor="preprocessing-balance">Балансировка классов</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Advanced Settings */}
          {advancedMode && (
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label>Оптимизатор</Label>
                <Select defaultValue="adam">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите оптимизатор" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="adagrad">Adagrad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Функция потерь</Label>
                <Select defaultValue="crossentropy">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите функцию потерь" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crossentropy">Cross Entropy</SelectItem>
                    <SelectItem value="mse">Mean Squared Error</SelectItem>
                    <SelectItem value="bce">Binary Cross Entropy</SelectItem>
                    <SelectItem value="custom">Пользовательская</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Дополнительные параметры (JSON)</Label>
                <Textarea 
                  placeholder='{"momentum": 0.9, "weight_decay": 0.0005}'
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="early-stopping" />
                <Label htmlFor="early-stopping">Ранняя остановка</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="checkpoint" />
                <Label htmlFor="checkpoint">Сохранять контрольные точки</Label>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleSaveConfig}>
          <Save size={16} className="mr-2" />
          Сохранить настройки
        </Button>
        <Button 
          onClick={handleStartTraining}
          className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
        >
          <Play size={16} className="mr-2" />
          Начать обучение
        </Button>
      </CardFooter>
    </Card>
  );
};
