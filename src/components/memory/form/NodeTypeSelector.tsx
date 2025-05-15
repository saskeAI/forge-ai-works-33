
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface NodeTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const NodeTypeSelector: React.FC<NodeTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label>Тип узла</Label>
      <RadioGroup defaultValue={value} onValueChange={onChange} className="flex space-x-2">
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
  );
};
