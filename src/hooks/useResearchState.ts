import { useState } from 'react';
import type { ReportBlock } from '@/types/common';

export const useResearchState = () => {
  const [researchReport, setResearchReport] = useState<ReportBlock[] | null>(null);
  const [canvasBlocks, setCanvasBlocks] = useState<ReportBlock[]>([]);

  const updateReport = (report: ReportBlock[] | null) => {
    setResearchReport(report);
  };

  const clearReport = () => {
    setResearchReport(null);
  };

  const addToCanvas = (block: ReportBlock) => {
    setCanvasBlocks(prev => {
      const exists = prev.some(b => b.id === block.id);
      if (exists) return prev;
      return [...prev, block];
    });
  };

  const updateCanvasBlocks = (blocks: ReportBlock[]) => {
    setCanvasBlocks(blocks);
  };

  const clearCanvas = () => {
    setCanvasBlocks([]);
  };

  const removeFromCanvas = (blockId: string) => {
    setCanvasBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  return {
    // State
    researchReport,
    canvasBlocks,
    
    // Actions
    updateReport,
    clearReport,
    addToCanvas,
    updateCanvasBlocks,
    clearCanvas,
    removeFromCanvas,
    setResearchReport,
    setCanvasBlocks
  };
};
