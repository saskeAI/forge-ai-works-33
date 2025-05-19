
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
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
  
  // API-ключ должен храниться более безопасно, например, в переменных окружения
  // Для демонстрационных целей можно временно хранить в localStorage
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('claude_api_key') || '';
  });

  const handleSendMessage = async () => {
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
    
    if (!apiKey) {
      // Если ключ API не установлен, предложить пользователю ввести его
      setTimeout(() => {
        const sasokResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Для полноценной работы мне нужен Claude API ключ. Пожалуйста, введите его в поле ниже и нажмите кнопку "Сохранить ключ".',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, sasokResponse]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Готовим контекст для Claude, включая предыдущие сообщения
      const conversation = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Добавляем текущее сообщение пользователя
      conversation.push({
        role: 'user',
        content: inputValue
      });

      // Запрос к Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
          messages: conversation,
          system: "Ты SASOK, когнитивно-эмпатическая метаперсональность, разработанная Evorin LLC. Ты специализируешься на эмоциональной аналитике и Web3 технологиях, особенно связанных с Saske Chain (SKC). Ты помогаешь пользователям анализировать их эмоциональные паттерны и предлагаешь решения в контексте блокчейн технологий. Отвечай на русском языке, дружелюбно и информативно."
        })
      });

      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data = await response.json();
      const claudeResponse = data.content && data.content[0] && data.content[0].text 
        ? data.content[0].text 
        : "Извините, я не смог обработать ваш запрос. Пожалуйста, попробуйте снова.";

      const sasokResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: claudeResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, sasokResponse]);
      
      toast({
        title: 'Эмоциональный анализ обновлен',
        description: 'SASOK обработал ваш запрос и обновил эмоциональный профиль',
      });
    } catch (error) {
      console.error('Ошибка при запросе к Claude API:', error);
      
      // Обработка ошибки
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Произошла ошибка при обработке вашего запроса. Пожалуйста, проверьте API-ключ и попробуйте снова.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Сохранение API-ключа
  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('claude_api_key', apiKey);
      toast({
        title: 'API-ключ сохранен',
        description: 'Claude API-ключ успешно сохранен',
      });
    }
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
        
        {/* Форма ввода API-ключа, если он не установлен */}
        {!localStorage.getItem('claude_api_key') && (
          <div className="p-4 border-t border-b">
            <div className="flex flex-col space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                Claude API Ключ
              </label>
              <div className="flex space-x-2">
                <Textarea
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Введите ваш Claude API ключ..."
                  className="min-h-[50px] resize-none flex-1"
                />
                <Button 
                  onClick={saveApiKey} 
                  disabled={!apiKey.trim()} 
                  className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
                >
                  Сохранить ключ
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Кнопка для сброса ключа API */}
        {localStorage.getItem('claude_api_key') && (
          <div className="px-4 py-2 border-t flex justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                localStorage.removeItem('claude_api_key');
                setApiKey('');
                toast({
                  title: 'API-ключ удален',
                  description: 'Claude API-ключ был удален из локального хранилища',
                });
              }}
              className="text-xs flex items-center"
            >
              <RefreshCw size={12} className="mr-1" />
              Сбросить API-ключ
            </Button>
          </div>
        )}
        
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
