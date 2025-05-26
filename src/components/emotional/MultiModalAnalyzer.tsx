
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Type, FileAudio, Camera, HeartPulse, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmotionalAnalysisResult, ModalityFeatures } from '@/components/web3/types/dao.types';
import { getEmotionEmoji, formatEmotionValue, mapDominantEmotionToColor } from '@/components/web3/utils/dao.utils';

export const MultiModalAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EmotionalAnalysisResult | null>(null);
  const [inputText, setInputText] = useState('');

  const handleAnalyze = () => {
    if (!inputText && activeTab === 'text') {
      toast({
        title: "Требуется ввод",
        description: "Пожалуйста, введите текст для анализа",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Имитация анализа данных
    setTimeout(() => {
      // Генерация примерного результата
      const mockResult: EmotionalAnalysisResult = {
        timestamp: new Date().toISOString(),
        emotionalState: {
          joy: Math.random() * 0.6,
          sadness: Math.random() * 0.3,
          anger: Math.random() * 0.2,
          fear: Math.random() * 0.1,
          surprise: Math.random() * 0.2,
          neutral: Math.random() * 0.4
        },
        attentionLevel: 0.7 + Math.random() * 0.3,
        engagementLevel: 0.6 + Math.random() * 0.4,
        dominantEmotion: 'joy'
      };

      // Определение доминирующей эмоции
      let maxEmotion = 0;
      let dominantEmotion: keyof typeof mockResult.emotionalState = 'neutral';

      Object.entries(mockResult.emotionalState).forEach(([emotion, value]) => {
        if (value > maxEmotion) {
          maxEmotion = value;
          dominantEmotion = emotion as keyof typeof mockResult.emotionalState;
        }
      });

      mockResult.dominantEmotion = dominantEmotion as any;
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Анализ завершен",
        description: `Доминирующая эмоция: ${getEmotionEmoji(mockResult.dominantEmotion)} ${mockResult.dominantEmotion}`,
      });
    }, 2000);
  };

  const emotionColors: Record<string, string> = {
    joy: 'bg-green-500',
    sadness: 'bg-blue-400',
    anger: 'bg-red-500',
    fear: 'bg-purple-500',
    surprise: 'bg-yellow-400',
    neutral: 'bg-gray-400'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={18} />
          Мультимодальный анализатор
        </CardTitle>
        <CardDescription>
          Анализ эмоционального состояния на основе различных типов данных
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Type size={14} />
              Текст
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-1">
              <FileAudio size={14} />
              Голос
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Camera size={14} />
              Видео
            </TabsTrigger>
            <TabsTrigger value="biometric" className="flex items-center gap-1">
              <HeartPulse size={14} />
              Биометрия
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <div className="space-y-4">
              <textarea
                className="w-full h-32 p-3 border rounded-md resize-none"
                placeholder="Введите текст для анализа эмоций..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? "Анализируем..." : "Анализировать текст"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="voice">
            <div className="h-40 border rounded-md flex flex-col items-center justify-center text-center p-4">
              <FileAudio size={40} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Загрузите аудиофайл для анализа голосовых эмоций
              </p>
              <Button variant="outline" className="mt-4" disabled>
                Загрузить аудио (скоро)
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="video">
            <div className="h-40 border rounded-md flex flex-col items-center justify-center text-center p-4">
              <Camera size={40} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Подключите камеру или загрузите видео для анализа
              </p>
              <Button variant="outline" className="mt-4" disabled>
                Подключить камеру (скоро)
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="biometric">
            <div className="h-40 border rounded-md flex flex-col items-center justify-center text-center p-4">
              <HeartPulse size={40} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Подключите биометрические устройства для анализа
              </p>
              <Button variant="outline" className="mt-4" disabled>
                Подключить датчики (скоро)
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {analysisResult && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Результаты анализа</h3>
              <span className="text-sm text-muted-foreground">
                {new Date(analysisResult.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Эмоциональное состояние</h4>
                <div className="space-y-2">
                  {Object.entries(analysisResult.emotionalState).map(([emotion, value]) => (
                    <div key={emotion} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          {getEmotionEmoji(emotion)} {emotion}
                        </span>
                        <span>{formatEmotionValue(value)}</span>
                      </div>
                      <Progress 
                        value={value * 100} 
                        className={`h-2 ${emotionColors[emotion] || 'bg-gray-400'}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Доминирующая эмоция</h4>
                  <div className={`flex items-center justify-center p-4 rounded-lg ${mapDominantEmotionToColor(analysisResult.dominantEmotion)}`}>
                    <span className="text-3xl mr-2">{getEmotionEmoji(analysisResult.dominantEmotion)}</span>
                    <span className="text-white font-bold text-lg capitalize">{analysisResult.dominantEmotion}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Вовлеченность</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Уровень внимания</span>
                      <span>{formatEmotionValue(analysisResult.attentionLevel)}</span>
                    </div>
                    <Progress value={analysisResult.attentionLevel * 100} className="h-2 bg-blue-500" />
                  </div>
                  
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Уровень вовлеченности</span>
                      <span>{formatEmotionValue(analysisResult.engagementLevel)}</span>
                    </div>
                    <Progress value={analysisResult.engagementLevel * 100} className="h-2 bg-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Мультимодальный анализатор SASOK использует передовые алгоритмы для оценки эмоционального состояния на основе различных типов данных.
        </div>
      </CardFooter>
    </Card>
  );
};
