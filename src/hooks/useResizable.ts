
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

  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeIndex(index);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || resizeIndex === -1 || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;
    
    const mousePercentage = (mouseX / containerWidth) * 100;
    
    const newSizes = [...sizes];
    const leftPanelIndex = resizeIndex;
    const rightPanelIndex = resizeIndex + 1;
    
    // 计算左右面板的总宽度
    const totalWidth = newSizes[leftPanelIndex] + newSizes[rightPanelIndex];
    
    // 确保不超过最小宽度限制
    const leftMinSize = minSizes[leftPanelIndex];
    const rightMinSize = minSizes[rightPanelIndex];
    
    let newLeftSize = mousePercentage;
    let newRightSize = totalWidth - newLeftSize;
    
    // 应用最小宽度限制
    if (newLeftSize < leftMinSize) {
      newLeftSize = leftMinSize;
      newRightSize = totalWidth - newLeftSize;
    } else if (newRightSize < rightMinSize) {
      newRightSize = rightMinSize;
      newLeftSize = totalWidth - newRightSize;
    }
    
    newSizes[leftPanelIndex] = newLeftSize;
    newSizes[rightPanelIndex] = newRightSize;
    
    setSizes(newSizes);
  }, [isResizing, resizeIndex, sizes, minSizes, containerRef]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeIndex(-1);
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
