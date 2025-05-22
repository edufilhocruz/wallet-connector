
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface TimeRangeToggleProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TimeRangeToggle: React.FC<TimeRangeToggleProps> = ({ value, onValueChange }) => {
  return (
    <ToggleGroup 
      type="single" 
      value={value}
      onValueChange={(value) => value && onValueChange(value)}
      className="justify-end"
    >
      <ToggleGroupItem value="1D">1D</ToggleGroupItem>
      <ToggleGroupItem value="1W">1W</ToggleGroupItem>
      <ToggleGroupItem value="1M">1M</ToggleGroupItem>
      <ToggleGroupItem value="YTD">YTD</ToggleGroupItem>
      <ToggleGroupItem value="1Y">1Y</ToggleGroupItem>
    </ToggleGroup>
  );
};
