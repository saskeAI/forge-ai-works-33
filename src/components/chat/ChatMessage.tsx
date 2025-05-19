
import React from 'react';
import { Sparkles, User } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
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
  );
};
