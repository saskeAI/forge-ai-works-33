
import { BarChart4, Settings, Code, Database, Users, Activity } from 'lucide-react';
import { Project } from './ProjectCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{project.name}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>

        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Информация</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Code size={16} className="mr-2 text-nova-500" />
              <span>Тип: {project.type === 'ai' ? 'AI Проект' : project.type === 'web' ? 'Веб Проект' : 'Мобильный Проект'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Activity size={16} className="mr-2 text-nova-500" />
              <span>Последнее обновление: {project.lastUpdated}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users size={16} className="mr-2 text-nova-500" />
              <span>Участников: 1</span>
            </div>
          </div>
        </div>

        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Быстрые действия</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Code size={14} className="mr-2" />
              <span>Редактировать</span>
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <BarChart4 size={14} className="mr-2" />
              <span>Аналитика</span>
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Database size={14} className="mr-2" />
              <span>Данные</span>
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Settings size={14} className="mr-2" />
              <span>Настройки</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <Button className="w-full" onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}
