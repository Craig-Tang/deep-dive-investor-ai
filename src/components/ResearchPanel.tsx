import React from 'react';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    <div className="h-full w-full flex flex-col bg-background border-l border-r animate-in fade-in-0 slide-in-from-right-6 duration-500">
      {/* 标题栏 */}
      <div className="border-b p-4 bg-muted/30 flex-shrink-0 animate-in fade-in-0 slide-in-from-top-2 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-2 duration-700 delay-200">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">智研报告</h2>
            <Badge variant="outline" className="text-xs animate-in fade-in-0 zoom-in-95 duration-500 delay-300">
              {report ? report.length : 0} 个报告块
            </Badge>
          </div>
          <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-right-2 duration-700 delay-200">
            {/* 历史记录按钮 */}
            <HistoryDropdown 
              type="report"
              onSelect={onHistorySelect}
            />
          </div>
        </div>
      </div>
        {/* 报告内容 */}
      <div className="flex-1 overflow-hidden">
        <ResearchDocument 
          report={report}
          onDragToCanvas={onDragToCanvas}
        />
      </div>
    </div>
  );
};
