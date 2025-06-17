
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Trash2, Edit3, FileText, BarChart3, TrendingUp } from 'lucide-react';
import type { ReportBlock } from '@/pages/Index';

interface CanvasPanelProps {
  blocks: ReportBlock[];
  onBlocksChange: (blocks: ReportBlock[]) => void;
}

export const CanvasPanel: React.FC<CanvasPanelProps> = ({ 
  blocks, 
  onBlocksChange 
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const removeBlock = (blockId: string) => {
    onBlocksChange(blocks.filter(block => block.id !== blockId));
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    onBlocksChange(newBlocks);
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
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'chart':
        return 'from-purple-50 to-violet-50 border-purple-200';
      case 'paragraph':
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
      <div className="border-b bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">我的画布</h2>
        </div>
        <p className="text-gray-600 text-sm">
          拖拽内容到这里 · 个性化整理
        </p>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {blocks.length === 0 ? (
          <div 
            className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50"
            onDragEnter={(e) => e.preventDefault()}
          >
            <div className="text-center text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">拖拽内容到画布</p>
              <p className="text-sm">从研究报告中拖拽感兴趣的内容到这里</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className={`relative ${
                  dragOverIndex === index ? 'opacity-50' : ''
                }`}
                onDragEnter={(e) => handleDragEnter(e, index)}
              >
                <Card
                  className={`bg-gradient-to-r ${getBlockColor(block.type)} border shadow-sm hover:shadow-md transition-all duration-200`}
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
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                          onClick={() => removeBlock(block.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {block.content}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span>已添加到画布</span>
                      <span>·</span>
                      <span>可编辑</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
