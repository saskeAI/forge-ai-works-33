
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { NodeDetailsFields } from './form/NodeDetailsFields';
import { NodeTypeSelector } from './form/NodeTypeSelector';
import { ImportanceSlider } from './form/ImportanceSlider';
import { FormActions } from './form/FormActions';

interface CreateMemoryNodeFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export const CreateMemoryNodeForm: React.FC<CreateMemoryNodeFormProps> = ({ onClose, onSave }) => {
  const { toast } = useToast();
  const [nodeType, setNodeType] = React.useState('knowledge');
  const [importance, setImportance] = React.useState([0.75]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would validate and collect form data
    const formData = {
      name: (e.target as any).elements.name.value,
      description: (e.target as any).elements.description.value,
      type: nodeType,
      importance: importance[0],
      properties: []
    };
    
    onSave(formData);
    toast({
      title: "Узел памяти создан",
      description: `${formData.name} добавлен в семантическую сеть`
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Создание нового узла памяти</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <NodeDetailsFields />
          <NodeTypeSelector value={nodeType} onChange={setNodeType} />
          <ImportanceSlider value={importance} onChange={setImportance} />
        </CardContent>
        <FormActions onCancel={onClose} />
      </form>
    </Card>
  );
};
