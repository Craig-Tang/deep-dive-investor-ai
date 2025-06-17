import React from 'react';
import ResearchDocument from './ResearchDocument';
import type { ReportBlock } from '@/pages/Index';

interface ResearchPanelProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ 
  report, 
  onDragToCanvas 
}) => {
  return (
    <div className="h-full w-full bg-background border-l border-r">
      <ResearchDocument 
        report={report}
        onDragToCanvas={onDragToCanvas}
      />
    </div>
  );
};
