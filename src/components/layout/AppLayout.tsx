
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { WorkspaceArea } from './WorkspaceArea';
import { RightPanel } from './RightPanel';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState<{
    title: string;
    content: React.ReactNode;
  }>({ title: '', content: null });

  const openRightPanel = (title: string, content: React.ReactNode) => {
    setRightPanelContent({ title, content });
    setRightPanelOpen(true);
  };

  const closeRightPanel = () => {
    setRightPanelOpen(false);
  };

  // Контекст для передачи функций управления правой панелью
  const rightPanelContext = {
    open: openRightPanel,
    close: closeRightPanel,
    isOpen: rightPanelOpen,
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="h-screen flex flex-col">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <WorkspaceArea rightPanelOpen={rightPanelOpen}>
              {/* Передаем контекст правой панели в дочерние компоненты */}
              {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, { rightPanelContext });
                }
                return child;
              })}
            </WorkspaceArea>
            <RightPanel 
              title={rightPanelContent.title}
              isOpen={rightPanelOpen}
              onClose={closeRightPanel}
            >
              {rightPanelContent.content}
            </RightPanel>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
