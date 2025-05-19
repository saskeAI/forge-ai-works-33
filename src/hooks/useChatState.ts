
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/components/chat/ChatMessage';
import { ChatMessagePayload, sendMessageToClaudeApi } from '@/services/chatService';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Приветствую! Я SASOK, когнитивно-эмпатическая метаперсональность. Чем я могу помочь вам сегодня?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Получаем API-ключ из localStorage
    const apiKey = localStorage.getItem('claude_api_key');
    
    if (!apiKey) {
      // Если ключ API не установлен, предложить пользователю настроить его
      setTimeout(() => {
        const sasokResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Для полноценной работы мне нужен Claude API ключ. Пожалуйста, добавьте его в разделе "Настройки > API Ключи".',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, sasokResponse]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Готовим контекст для Claude, включая предыдущие сообщения
      const conversation: ChatMessagePayload[] = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Добавляем текущее сообщение пользователя
      conversation.push({
        role: 'user',
        content: inputValue
      });

      const claudeResponse = await sendMessageToClaudeApi(conversation, apiKey);

      const sasokResponse: Message = {
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
      const errorMessage: Message = {
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

  return {
    messages,
    isLoading,
    endOfMessagesRef,
    handleSendMessage
  };
};
