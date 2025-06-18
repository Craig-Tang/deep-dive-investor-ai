import React from 'react';
import { HistoryDropdown } from './HistoryDropdown';
import ResearchDocument from '@/components/ResearchDocument';
import type { ReportBlock } from '@/pages/Index';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  data: ReportBlock[] | Record<string, unknown>;
}

interface ResearchPanelProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
  onHistorySelect?: (item: HistoryItem) => void;
  hasToolbar?: boolean;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ 
  report, 
  onDragToCanvas,
  onHistorySelect,
  hasToolbar = false
}) => {  return (
    <div className="h-full w-full bg-background border-l border-r relative animate-in fade-in-0 slide-in-from-right-6 duration-500">
      {/* 历史记录下拉菜单 - 常驻显示 */}
      <div className={`absolute ${hasToolbar ? 'top-20' : 'top-4'} right-4 z-30 animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-200`}>
        <HistoryDropdown 
          type="report"
          onSelect={onHistorySelect}
        />
      </div>
      
      <ResearchDocument 
        report={report}
        onDragToCanvas={onDragToCanvas}
      />
    </div>
  );
};
