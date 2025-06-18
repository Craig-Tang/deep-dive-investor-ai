import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Palette } from 'lucide-react';
import { ResizableHandle } from '@/components/ResizableHandle';
import { useResizable } from '@/hooks/useResizable';
import type { LayoutConfig, PanelConfig } from '@/types/layout';

interface LayoutManagerProps {
  config: LayoutConfig;
  children: React.ReactNode;
  onModeSwitch: (mode: string) => void;
  onCanvasToggle: () => void;
  onBackToHome: () => void;
  showCanvas: boolean;
  currentMode: string;
}

interface PanelSlotProps {
  config: PanelConfig;
  width?: string;
  actualWidth?: number; // 新增：实际像素宽度
  children: React.ReactNode;
}

const PanelSlot: React.FC<PanelSlotProps> = ({ config, width, actualWidth, children }) => {
  return (
    <div 
      className="h-full"
      style={{ width: width || `${config.width}%` }}
      data-actual-width={actualWidth} // 传递实际宽度用于调试
    >
      {children}
    </div>
  );
};

export const LayoutManager: React.FC<LayoutManagerProps> = ({
  config,
  children,
  onModeSwitch,
  onCanvasToggle,
  onBackToHome,
  showCanvas,
  currentMode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1200); // 默认宽度

  // 监听容器宽度变化
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 两面板模式的尺寸控制
  const {
    sizes: twoPanelSizes,
    handleMouseDown: handleTwoPanelMouseDown,
  } = useResizable({
    containerRef,
    initialSizes: config.panels.length === 2 
      ? config.panels.map(p => p.width || 50)
      : [60, 40],
    minSizes: config.panels.length === 2 
      ? config.panels.map(p => p.minWidth || 20)
      : [40, 30]
  });

  // 三面板模式的尺寸控制
  const {
    sizes: threePanelSizes,
    handleMouseDown: handleThreePanelMouseDown,
  } = useResizable({
    containerRef,
    initialSizes: config.panels.length === 3 
      ? config.panels.map(p => p.width || 33)
      : [50, 25, 25],
    minSizes: config.panels.length === 3 
      ? config.panels.map(p => p.minWidth || 20)
      : [30, 20, 20]
  });
  // 渲染工具栏
  const renderToolbar = () => {
    if (!config.hasToolbar) return null;

    if (config.mode === 'home') {
      return (
        <div className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <Button 
            variant="ghost" 
            onClick={onBackToHome}
            className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-100 hover:scale-105 transition-transform text-lg font-semibold"
          >
            Cybernaut
          </Button>
          
          <div className="flex gap-2 animate-in fade-in-0 slide-in-from-right-2 duration-500 delay-100">
            <Button 
              variant="outline" 
              onClick={() => onModeSwitch('research')}
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              智研报告
            </Button>            <Button 
              variant="outline" 
              onClick={() => onModeSwitch('research-canvas')}
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <Palette className="w-4 h-4" />
              智选
            </Button>
          </div>
        </div>
      );
    }

    return (      <div className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20 animate-in fade-in-0 slide-in-from-top-2 duration-300">
        <Button 
          variant="ghost" 
          onClick={onBackToHome}
          className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-100 hover:scale-105 transition-transform"
        >
          ← 返回首页
        </Button>
        
        <div className="flex gap-2 animate-in fade-in-0 slide-in-from-right-2 duration-500 delay-100">
          <Button 
            variant={currentMode.includes('research') ? 'default' : 'outline'} 
            onClick={() => onModeSwitch(currentMode === 'research' ? 'chat' : 'research')}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4" />
            智研报告          </Button>          <Button 
            variant={showCanvas ? 'default' : 'outline'} 
            onClick={onCanvasToggle}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Palette className="w-4 h-4" />
            智选
          </Button>
        </div>
      </div>
    );
  };
  // 渲染面板内容
  const renderPanels = () => {
    const panels = React.Children.toArray(children);
    
    if (config.type === 'overlay') {
      return (
        <div className="h-full relative">
          {panels}
        </div>
      );
    }

    if (config.type === 'single') {
      // 单面板模式，居中显示，和首页相同的宽度
      return (
        <div className="h-full flex justify-center">
          <div className="w-full max-w-7xl px-4">
            {panels[0]}
          </div>
        </div>
      );
    }

    if (config.type === 'horizontal') {
      const sizes = config.panels.length === 3 ? threePanelSizes : twoPanelSizes;
      const handleMouseDown = config.panels.length === 3 ? handleThreePanelMouseDown : handleTwoPanelMouseDown;
      
      return (
        <div className="flex h-full">
          {config.panels.map((panelConfig, index) => (
            <React.Fragment key={panelConfig.key}>
              <PanelSlot
                config={panelConfig}
                width={`${sizes[index]}%`}
              >
                {panels[index]}
              </PanelSlot>
              
              {config.resizable && index < config.panels.length - 1 && (
                <ResizableHandle 
                  onMouseDown={(e) => handleMouseDown(e, index)} 
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return panels;
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-background overflow-hidden"
    >
      {renderToolbar()}
      
      <div className={config.hasToolbar ? "h-[calc(100vh-4rem)]" : "h-full"}>
        {renderPanels()}
      </div>
    </div>
  );
};

export { PanelSlot };
