
import React, { useEffect } from 'react';
import { Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatLoadingIndicator } from '@/components/chat/ChatLoadingIndicator';
import { ApiKeyNotice } from '@/components/chat/ApiKeyNotice';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChatState } from '@/hooks/useChatState';

export const SasokChat: React.FC = () => {
  const { messages, isLoading, endOfMessagesRef, handleSendMessage } = useChatState();

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
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <ChatLoadingIndicator />}
          <div ref={endOfMessagesRef} />
        </div>
        
        {/* Уведомление о необходимости API-ключа */}
        {!localStorage.getItem('claude_api_key') && <ApiKeyNotice />}
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
