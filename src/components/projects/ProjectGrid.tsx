
import { ProjectCard, Project } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onSettingsProject: (project: Project) => void;
}

export function ProjectGrid({ projects, onSelectProject, onSettingsProject }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onSelect={onSelectProject} 
          onSettings={onSettingsProject} 
        />
      ))}
    </div>
  );
}
