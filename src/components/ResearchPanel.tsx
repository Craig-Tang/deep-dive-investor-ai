import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import ResearchDocument from './ResearchDocument';
import type { ReportBlock } from '@/pages/Index';

interface ResearchPanelProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
  onShowHistory?: () => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ 
  report, 
  onDragToCanvas,
  onShowHistory
}) => {  return (
    <div className="h-full w-full bg-background border-l border-r relative animate-in fade-in-0 slide-in-from-right-6 duration-500">
      {/* 历史记录按钮 */}
      {onShowHistory && (
        <div className="absolute top-4 right-4 z-10 animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-200">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onShowHistory}
            className="flex items-center gap-2 bg-background/80 backdrop-blur-sm"
          >
            <History className="w-4 h-4" />
            历史记录
          </Button>
        </div>
      )}
      
      <ResearchDocument 
        report={report}
        onDragToCanvas={onDragToCanvas}
      />
    </div>
  );
};
