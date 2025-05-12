
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateProjectButtonProps {
  onClick: () => void;
  className?: string;
}

export function CreateProjectButton({ onClick, className = '' }: CreateProjectButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className={`group flex items-center space-x-2 bg-gradient-to-r from-nova-600 to-forge-500 hover:from-nova-700 hover:to-forge-600 text-white ${className}`}
    >
      <Plus size={18} className="mr-1" />
      <span>Новый проект</span>
    </Button>
  );
}
