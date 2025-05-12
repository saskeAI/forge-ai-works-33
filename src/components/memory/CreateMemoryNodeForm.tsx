
import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface CreateMemoryNodeFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export const CreateMemoryNodeForm = ({ onClose, onSave }: CreateMemoryNodeFormProps) => {
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
          <div className="space-y-2">
            <Label htmlFor="name">Название узла</Label>
            <Input id="name" name="name" placeholder="Введите название узла памяти" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea 
              id="description" 
              name="description"
              placeholder="Детальное описание содержимого узла памяти"
              className="resize-none min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Тип узла</Label>
            <RadioGroup defaultValue={nodeType} onValueChange={setNodeType} className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="core" id="core" />
                <Label htmlFor="core" className="text-blue-500">Базовый</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emotional" id="emotional" />
                <Label htmlFor="emotional" className="text-pink-500">Эмоциональный</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="knowledge" id="knowledge" />
                <Label htmlFor="knowledge" className="text-green-500">Знания</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="history" id="history" />
                <Label htmlFor="history" className="text-yellow-500">История</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Важность узла</Label>
              <span className="text-sm">{Math.round(importance[0] * 100)}%</span>
            </div>
            <Slider 
              defaultValue={importance} 
              max={1} 
              step={0.01} 
              onValueChange={setImportance}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            <X size={16} className="mr-2" />
            Отмена
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90">
            <Check size={16} className="mr-2" />
            Создать узел
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
