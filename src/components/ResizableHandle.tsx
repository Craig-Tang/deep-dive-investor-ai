
import React from 'react';
import { GripVertical } from 'lucide-react';

interface ResizableHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ResizableHandle: React.FC<ResizableHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex items-center justify-center group transition-all duration-200 relative select-none"
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-y-0 w-4 -ml-1.5 flex items-center justify-center cursor-col-resize">
        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
      </div>
    </div>
  );
};
