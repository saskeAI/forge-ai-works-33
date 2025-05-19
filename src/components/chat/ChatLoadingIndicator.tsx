
import React from 'react';
import { Bot } from 'lucide-react';

export const ChatLoadingIndicator: React.FC = () => {
  return (
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
  );
};
