
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ImportanceSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const ImportanceSlider: React.FC<ImportanceSliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>Важность узла</Label>
        <span className="text-sm">{Math.round(value[0] * 100)}%</span>
      </div>
      <Slider 
        defaultValue={value} 
        max={1} 
        step={0.01} 
        onValueChange={onChange}
      />
    </div>
  );
};
