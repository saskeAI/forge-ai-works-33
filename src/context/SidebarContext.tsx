
import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  expanded: boolean;
  toggleSidebar: () => void;
  collapse: () => void;
  expand: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => setExpanded(prev => !prev);
  const collapse = () => setExpanded(false);
  const expand = () => setExpanded(true);

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar, collapse, expand }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
