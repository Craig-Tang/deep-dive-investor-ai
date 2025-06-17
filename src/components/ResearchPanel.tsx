
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, BarChart3, TrendingUp, Move } from 'lucide-react';
import type { ReportBlock } from '@/pages/Index';

interface ResearchPanelProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ 
  report, 
  onDragToCanvas 
}) => {
  const getBlockIcon = (type: ReportBlock['type']) => {
    switch (type) {
      case 'summary':
        return <TrendingUp className="w-4 h-4" />;
      case 'chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'paragraph':
      default:
        return <FileText className="w-4 h-4" />;
    }
  };
  const getBlockColor = (type: ReportBlock['type']) => {
    switch (type) {
      case 'summary':
        return 'bg-muted/30 border-muted-foreground/20';
      case 'chart':
        return 'bg-accent/30 border-accent-foreground/20';
      case 'paragraph':
      default:
        return 'bg-secondary/30 border-secondary-foreground/20';
    }
  };

  const handleDragStart = (e: React.DragEvent, block: ReportBlock) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
  };
  if (!report) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-lg font-medium mb-2">深度研究报告</p>
          <p className="text-sm">使用 智研 生成详细的投资分析报告</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">投研报告</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          AI 深度分析 · 可拖拽到画布
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {report.map((block, index) => (          <Card
            key={block.id}
            className={`${getBlockColor(block.type)} border shadow-sm hover:shadow-md transition-all duration-200 cursor-move`}
            draggable
            onDragStart={(e) => handleDragStart(e, block)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getBlockIcon(block.type)}
                  <h3 className="font-semibold text-foreground">{block.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {block.type === 'summary' ? '摘要' : 
                     block.type === 'chart' ? '图表' : '段落'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                    onClick={() => onDragToCanvas(block)}
                  >
                    <Move className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {block.content}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span>块 {index + 1}</span>
                <span>·</span>
                <span>可拖拽到画布</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
