import { useState } from 'react';
import type { LayoutMode } from '@/types/common';

export const useLayoutState = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('home');
  const [showCanvas, setShowCanvas] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [historyPanelType, setHistoryPanelType] = useState<'report' | 'canvas'>('report');

  const switchToMode = (mode: LayoutMode) => {
    setLayoutMode(mode);
    if (mode === 'research-canvas') {
      setShowCanvas(true);
    } else if (mode === 'research') {
      setShowCanvas(false);
    }
  };

  const toggleCanvas = () => {
    const newShowCanvas = !showCanvas;
    setShowCanvas(newShowCanvas);
    
    if (layoutMode === 'research') {
      setLayoutMode(newShowCanvas ? 'research-canvas' : 'research');
    } else if (layoutMode === 'chat' && newShowCanvas) {
      setLayoutMode('research-canvas');
    }
  };

  const showHistory = (type: 'report' | 'canvas') => {
    setHistoryPanelType(type);
    setShowHistoryPanel(true);
  };

  const hideHistory = () => {
    setShowHistoryPanel(false);
  };

  const backToHome = () => {
    setLayoutMode('home');
    setShowCanvas(false);
    setShowHistoryPanel(false);
  };

  return {
    // State
    layoutMode,
    showCanvas,
    showHistoryPanel,
    historyPanelType,
    
    // Actions
    switchToMode,
    toggleCanvas,
    showHistory,
    hideHistory,
    backToHome,
    setLayoutMode
  };
};
