
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ExternalLink, Clock } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  type: 'ai' | 'web' | 'mobile';
}

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onSettings: (project: Project) => void;
}

export function ProjectCard({ project, onSelect, onSettings }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Определяем иконку типа проекта
  const getTypeIcon = () => {
    switch(project.type) {
      case 'ai': return <div className="w-2 h-2 bg-forge-500 rounded-full"></div>;
      case 'web': return <div className="w-2 h-2 bg-nova-500 rounded-full"></div>;
      case 'mobile': return <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>;
      default: return null;
    }
  };
  
  // Типы проектов на русском
  const getTypeLabel = () => {
    switch(project.type) {
      case 'ai': return 'AI Проект';
      case 'web': return 'Веб Проект';
      case 'mobile': return 'Мобильный Проект';
      default: return 'Проект';
    }
  };

  return (
    <Card 
      className="hover-card cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Градиентная полоса сверху */}
      <div className="h-1 w-full bg-gradient-to-r from-nova-500 to-forge-500"></div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <span className="text-xs text-muted-foreground">{getTypeLabel()}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onSettings(project);
            }}
          >
            <Settings size={14} />
          </Button>
        </div>
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock size={12} className="mr-1" />
          <span>Обновлено {project.lastUpdated}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            window.open('#', '_blank');
          }}
        >
          <ExternalLink size={14} />
        </Button>
      </CardFooter>
      
      {/* Эффект наведения */}
      <div 
        className={`absolute inset-0 bg-primary/5 border-2 border-primary/20 rounded-lg transition-opacity duration-200 pointer-events-none
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </Card>
  );
}
