
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Trash2, FileText, BarChart3, TrendingUp } from 'lucide-react';
import type { ReportBlock } from '@/pages/Index';

interface CanvasPanelProps {
  blocks: ReportBlock[];
  onBlocksChange: (blocks: ReportBlock[]) => void;
}

export const CanvasPanel: React.FC<CanvasPanelProps> = ({ 
  blocks, 
  onBlocksChange 
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const blockData = JSON.parse(e.dataTransfer.getData('application/json'));
      const newBlock: ReportBlock = {
        ...blockData,
        id: Date.now().toString()
      };
      onBlocksChange([...blocks, newBlock]);
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeBlock = (blockId: string) => {
    onBlocksChange(blocks.filter(block => block.id !== blockId));
  };

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
        return 'border-muted-foreground/30 bg-muted/40';
      case 'chart':
        return 'border-accent-foreground/30 bg-accent/40';
      case 'paragraph':
      default:
        return 'border-secondary-foreground/30 bg-secondary/40';
    }
  };
  return (
    <div className="h-full w-full flex flex-col bg-background border-l">
      <div className="border-b p-4 bg-muted/30 flex-shrink-0 ">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">我的画布</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">拖拽内容到这里整理</p>
      </div>
        <div 
        className="flex-1 w-full p-4 overflow-y-auto"
        onDrop={handleDrop}
        onDragOver={handleDragOver}      >{blocks.length === 0 ? (
          <div className="min-h-full w-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <div className="text-center text-muted-foreground">
              <Palette className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="font-medium">拖拽内容到画布</p>
              <p className="text-sm mt-1">从研究报告拖拽感兴趣的内容</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {blocks.map((block) => (
              <Card key={block.id} className={`w-full ${getBlockColor(block.type)} border`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getBlockIcon(block.type)}
                      <h3 className="font-medium text-sm text-foreground">{block.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {block.type === 'summary' ? '摘要' : 
                         block.type === 'chart' ? '图表' : '段落'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {block.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
