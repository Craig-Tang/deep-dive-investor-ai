
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
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'chart':
        return 'from-purple-50 to-violet-50 border-purple-200';
      case 'paragraph':
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  const handleDragStart = (e: React.DragEvent, block: ReportBlock) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
  };

  if (!report) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
        <div className="text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">深度研究报告</p>
          <p className="text-sm">使用 Deep Research 生成详细的投资分析报告</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
      <div className="border-b bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">投研报告</h2>
        </div>
        <p className="text-gray-600 text-sm">
          AI 深度分析 · 可拖拽到画布
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {report.map((block, index) => (
          <Card
            key={block.id}
            className={`bg-gradient-to-r ${getBlockColor(block.type)} border shadow-sm hover:shadow-md transition-all duration-200 cursor-move`}
            draggable
            onDragStart={(e) => handleDragStart(e, block)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getBlockIcon(block.type)}
                  <h3 className="font-semibold text-gray-800">{block.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {block.type === 'summary' ? '摘要' : 
                     block.type === 'chart' ? '图表' : '段落'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                    onClick={() => onDragToCanvas(block)}
                  >
                    <Move className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 leading-relaxed text-sm">
                {block.content}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
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
