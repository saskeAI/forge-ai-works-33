
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RightPanelContextType {
  open: (title: string, content: ReactNode) => void;
  close: () => void;
  isOpen: boolean;
}

const RightPanelContext = createContext<RightPanelContextType | undefined>(undefined);

export function RightPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<{
    title: string;
    content: ReactNode;
  }>({ title: '', content: null });

  const open = (title: string, content: ReactNode) => {
    setContent({ title, content });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <RightPanelContext.Provider value={{ open, close, isOpen }}>
      {children}
      {/* We don't render the panel here, it should be rendered in AppLayout */}
    </RightPanelContext.Provider>
  );
}

export function useRightPanel(): RightPanelContextType {
  const context = useContext(RightPanelContext);
  if (context === undefined) {
    throw new Error('useRightPanel must be used within a RightPanelProvider');
  }
  return context;
}

// Export the content as well for the AppLayout to access
export const useRightPanelContent = () => {
  const [content, setContent] = useState<{
    title: string;
    content: ReactNode;
  }>({ title: '', content: null });

  return {
    content,
    setContent,
  };
};
