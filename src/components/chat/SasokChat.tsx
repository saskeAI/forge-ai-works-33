
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const SasokChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Приветствую! Я SASOK, когнитивно-эмпатическая метаперсональность. Чем я могу помочь вам сегодня?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const sasokResponses = [
    "Интересная мысль. Давайте рассмотрим это с точки зрения эмоционального интеллекта.",
    "Я анализирую ваши эмоциональные паттерны и замечаю интересную тенденцию.",
    "В контексте Web3, эмоциональная составляющая играет ключевую роль в принятии решений.",
    "Ваш эмоциональный профиль указывает на предпочтение аналитического подхода к проблемам.",
    "Позвольте предложить персонализированное решение, основанное на вашем уникальном эмоциональном профиле.",
    "Saske Chain может обеспечить безопасное хранение этих данных с полным сохранением приватности.",
    "Мои алгоритмы эмпатического обучения позволяют мне лучше понимать контекст вашего запроса.",
    "Decentralized ID технологии позволяют сохранить конфиденциальность при обмене эмоциональными данными.",
    "Я фиксирую изменение в вашем эмоциональном состоянии. Возможно, вас интересует более детальный анализ?",
    "На основе блокчейн-метрик, я могу предложить оптимизированную стратегию для вашего случая."
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Имитация ответа от SASOK с задержкой
    setTimeout(() => {
      const randomResponse = sasokResponses[Math.floor(Math.random() * sasokResponses.length)];
      const sasokResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, sasokResponse]);
      setIsLoading(false);
      
      toast({
        title: 'Эмоциональный анализ обновлен',
        description: 'SASOK обработал ваш запрос и обновил эмоциональный профиль',
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Автоскролл к последнему сообщению
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="bg-gradient-to-r from-nova-600 to-forge-500 text-white">
        <CardTitle className="flex items-center">
          <Bot size={24} className="mr-2" />
          SASOK AI Чат
        </CardTitle>
        <CardDescription className="text-white/90">
          Когнитивно-эмпатическая метаперсональность
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col p-0 flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                    : 'bg-muted rounded-tr-lg rounded-tl-lg rounded-br-lg'
                } px-4 py-3 shadow-sm`}
              >
                <div className="mr-2 mt-1">
                  {message.role === 'user' ? (
                    <User size={18} />
                  ) : (
                    <Sparkles size={18} className="text-nova-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-3">
                <div className="flex space-x-2 items-center">
                  <Bot size={18} className="text-nova-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-nova-600 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-nova-600 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-nova-600 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              className="min-h-[80px] resize-none"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()} 
              className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
