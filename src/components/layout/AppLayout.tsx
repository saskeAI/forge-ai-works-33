
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { WorkspaceArea } from './WorkspaceArea';
import { RightPanel } from './RightPanel';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { RightPanelProvider, useRightPanel, useRightPanelContent } from '@/context/RightPanelContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Inner component that uses the context
function AppLayoutInner({ children }: AppLayoutProps) {
  const { isOpen, close } = useRightPanel();
  const [content, setContent] = React.useState<{
    title: string;
    content: React.ReactNode;
  }>({ title: '', content: null });

  // Get content from the right panel context
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rightPanelContent') {
        try {
          const newContent = JSON.parse(e.newValue || '{}');
          setContent(newContent);
        } catch (error) {
          console.error('Failed to parse right panel content', error);
        }
      }
    };

    // Listen for storage events to update content across components
    window.addEventListener('storage', handleStorageChange);
    
    // Try to get initial content
    try {
      const storedContent = localStorage.getItem('rightPanelContent');
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      }
    } catch (error) {
      console.error('Failed to parse initial right panel content', error);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <WorkspaceArea rightPanelOpen={isOpen}>
          {children}
        </WorkspaceArea>
        <RightPanel 
          title={content.title}
          isOpen={isOpen}
          onClose={close}
        >
          {content.content}
        </RightPanel>
      </div>
    </div>
  );
}

// Wrapper component that provides the context
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <RightPanelProvider>
          <AppLayoutInner>
            {children}
          </AppLayoutInner>
        </RightPanelProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
