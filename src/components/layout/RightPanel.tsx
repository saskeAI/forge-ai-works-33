
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RightPanelProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function RightPanel({ title = 'Панель', isOpen, onClose, children }: RightPanelProps) {
  return (
    <div 
      className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] bg-background border-l border-border shadow-lg transition-all duration-300 overflow-auto
        ${isOpen ? 'translate-x-0 w-80' : 'translate-x-full w-0 opacity-0'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">{title}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
