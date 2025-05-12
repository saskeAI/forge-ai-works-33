
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Code, 
  MessageSquare, 
  Image, 
  FileText, 
  Database, 
  LineChart, 
  BrainCircuit, 
  HelpCircle
} from 'lucide-react';

export default function AITools() {
  // Категории инструментов ИИ
  const toolCategories = [
    {
      title: "Модели и обучение",
      description: "Инструменты для работы с ИИ моделями",
      tools: [
        { name: "Обучение модели", icon: <BrainCircuit size={24} /> },
        { name: "Настройка параметров", icon: <Code2 size={24} /> },
        { name: "Валидация модели", icon: <LineChart size={24} /> },
      ]
    },
    {
      title: "Работа с текстом",
      description: "Анализ и генерация текста",
      tools: [
        { name: "Генерация текста", icon: <FileText size={24} /> },
        { name: "Чат-бот", icon: <MessageSquare size={24} /> },
        { name: "Анализ текста", icon: <Code size={24} /> },
      ]
    },
    {
      title: "Работа с изображениями",
      description: "Обработка и генерация изображений",
      tools: [
        { name: "Генерация изображений", icon: <Image size={24} /> },
        { name: "Распознавание объектов", icon: <Image size={24} /> },
      ]
    },
    {
      title: "Работа с данными",
      description: "Инструменты для работы с данными",
      tools: [
        { name: "Импорт данных", icon: <Database size={24} /> },
        { name: "Анализ данных", icon: <LineChart size={24} /> },
      ]
    }
  ];
  
  // Рекомендуемые инструменты
  const recommendedTools = [
    { name: "GPT Интеграция", description: "Интеграция с OpenAI GPT API", icon: <MessageSquare size={24} /> },
    { name: "DALL-E Генерация", description: "Создание изображений с DALL-E", icon: <Image size={24} /> },
    { name: "Анализ данных", description: "Инструменты анализа ML данных", icon: <LineChart size={24} /> }
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold heading-gradient">AI Инструменты</h1>
        <p className="text-muted-foreground">Инструменты для работы с искусственным интеллектом</p>
      </div>
      
      {/* Рекомендуемые инструменты */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Рекомендуемые инструменты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTools.map((tool, index) => (
            <Card key={index} className="hover-card cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {tool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Категории инструментов */}
      {toolCategories.map((category, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
          <p className="text-muted-foreground mb-4">{category.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category.tools.map((tool, toolIndex) => (
              <Card key={toolIndex} className="hover-card cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mb-3">
                      {tool.icon}
                    </div>
                    <h3 className="font-medium">{tool.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      {/* Нужна помощь */}
      <Card className="bg-muted/50 mt-10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-background rounded-full">
              <HelpCircle size={24} className="text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-medium">Нужна помощь с инструментами ИИ?</h3>
              <p className="text-muted-foreground">Наша документация поможет вам начать работу</p>
            </div>
            <Button className="sm:ml-auto">Открыть руководство</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
