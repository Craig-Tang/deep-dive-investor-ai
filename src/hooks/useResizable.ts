
import { useState, useCallback, useEffect, RefObject } from 'react';

interface UseResizableProps {
  containerRef: RefObject<HTMLElement>;
  initialSizes: number[];
  minSizes: number[];
}

export const useResizable = ({ containerRef, initialSizes, minSizes }: UseResizableProps) => {
  const [sizes, setSizes] = useState<number[]>(initialSizes);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeIndex, setResizeIndex] = useState<number>(-1);
  const [startMouseX, setStartMouseX] = useState<number>(0);
  const [startSizes, setStartSizes] = useState<number[]>([]);

  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeIndex(index);
    setStartMouseX(e.clientX);
    setStartSizes([...sizes]);
  }, [sizes]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || resizeIndex === -1 || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    
    // 计算鼠标移动的距离（像素）
    const deltaX = e.clientX - startMouseX;
    // 转换为百分比
    const deltaPercentage = (deltaX / containerWidth) * 100;
    
    const newSizes = [...startSizes];
    const leftPanelIndex = resizeIndex;
    const rightPanelIndex = resizeIndex + 1;
    
    // 计算新的面板大小
    let newLeftSize = startSizes[leftPanelIndex] + deltaPercentage;
    let newRightSize = startSizes[rightPanelIndex] - deltaPercentage;
    
    // 确保不超过最小宽度限制
    const leftMinSize = minSizes[leftPanelIndex];
    const rightMinSize = minSizes[rightPanelIndex];
    
    if (newLeftSize < leftMinSize) {
      const difference = leftMinSize - newLeftSize;
      newLeftSize = leftMinSize;
      newRightSize -= difference;
    } else if (newRightSize < rightMinSize) {
      const difference = rightMinSize - newRightSize;
      newRightSize = rightMinSize;
      newLeftSize -= difference;
    }
    
    newSizes[leftPanelIndex] = newLeftSize;
    newSizes[rightPanelIndex] = newRightSize;
    
    setSizes(newSizes);
  }, [isResizing, resizeIndex, startMouseX, startSizes, minSizes, containerRef]);
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeIndex(-1);
    setStartMouseX(0);
    setStartSizes([]);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const resetSizes = useCallback(() => {
    setSizes(initialSizes);
  }, [initialSizes]);

  return {
    sizes,
    handleMouseDown,
    resetSizes,
    isResizing
  };
};
