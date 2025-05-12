
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';

interface WorkspaceAreaProps {
  children: React.ReactNode;
  rightPanelOpen?: boolean;
}

export function WorkspaceArea({ children, rightPanelOpen = false }: WorkspaceAreaProps) {
  const { expanded } = useSidebar();

  return (
    <main 
      className={cn(
        "flex-1 transition-all duration-300 overflow-auto",
        rightPanelOpen && "mr-80"
      )}
    >
      {children}
    </main>
  );
}
