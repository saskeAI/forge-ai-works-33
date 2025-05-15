
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface FormActionsProps {
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <CardFooter className="flex justify-between">
      <Button type="button" variant="outline" onClick={onCancel}>
        <X size={16} className="mr-2" />
        Отмена
      </Button>
      <Button type="submit" className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90">
        <Check size={16} className="mr-2" />
        Создать узел
      </Button>
    </CardFooter>
  );
};
