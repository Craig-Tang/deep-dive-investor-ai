
import React from 'react';
import { GripVertical } from 'lucide-react';

interface ResizableHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ResizableHandle: React.FC<ResizableHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="w-2 bg-border hover:bg-primary/50 cursor-col-resize flex items-center justify-center group transition-all duration-200 relative select-none shrink-0"
      onMouseDown={onMouseDown}
      style={{ zIndex: 10 }}
    >
      <div 
        className="absolute inset-y-0 w-6 -ml-2 flex items-center justify-center cursor-col-resize"
        onMouseDown={onMouseDown}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
      </div>
    </div>
  );
};
