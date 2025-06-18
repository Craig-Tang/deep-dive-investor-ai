import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GripVertical, ExternalLink, Quote, Calendar, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export interface ReportBlock {
  id: string;
  title: string;
  content: string;
  type: 'paragraph' | 'chart' | 'summary' | 'quote' | 'list' | 'heading';
  references?: string[];
  metadata?: {
    source?: string;
    confidence?: number;
    lastUpdated?: Date;
  };
}

interface ResearchDocumentProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
}

const ResearchDocument: React.FC<ResearchDocumentProps> = ({ report, onDragToCanvas }) => {
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, block: ReportBlock) => {
    console.log('Drag started for block:', block.title);
    setDraggedBlock(block.id);
    e.dataTransfer.setData('application/json', JSON.stringify(block));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    console.log('Drag ended');
    setDraggedBlock(null);
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'summary': return <TrendingUp className="w-4 h-4" />;
      case 'quote': return <Quote className="w-4 h-4" />;
      default: return <GripVertical className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'bg-gray-500';
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-lg font-medium">深度研究报告</p>
          <p className="text-sm">开始对话以生成详细的投资分析报告</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* 报告标题 */}
        <div className="text-center space-y-2 pb-6 border-b animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-100">
          <h1 className="text-3xl font-bold text-foreground">AI投资深度研究报告</h1>
          <p className="text-muted-foreground">基于最新市场数据和行业洞察的综合分析</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('zh-CN')}</span>
          </div>
        </div>        {/* 报告内容 */}
        <div className="space-y-8">
          {report.map((block, index) => (
            <Card 
              key={block.id}
              className={`group transition-all duration-200 hover:shadow-md animate-in fade-in-0 slide-in-from-left-4 ${
                draggedBlock === block.id ? 'opacity-50 scale-95' : ''
              }`}
              style={{
                animationDelay: `${200 + index * 150}ms`,
                animationDuration: '600ms'
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  {/* 拖拽手柄 */}
                  <div
                    className="flex items-center gap-1 cursor-grab active:cursor-grabbing opacity-60 hover:opacity-100 transition-opacity px-1 py-2 rounded hover:bg-muted/50"
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                    onDragEnd={handleDragEnd}
                    title="拖拽到智选"
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{block.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {block.type === 'summary' ? '摘要' : 
                         block.type === 'paragraph' ? '分析' : 
                         block.type === 'chart' ? '图表' : '其他'}
                      </Badge>
                    </div>

                    {/* 元数据 */}
                    {block.metadata && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {block.metadata.source && (
                          <span>来源: {block.metadata.source}</span>
                        )}
                        {block.metadata.confidence && (
                          <div className="flex items-center gap-1">
                            <span>可信度:</span>
                            <div className={`w-2 h-2 rounded-full ${getConfidenceColor(block.metadata.confidence)}`}></div>
                            <span>{(block.metadata.confidence * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 拖到智选按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDragToCanvas(block)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* 内容 */}
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-foreground">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-foreground mt-4">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-medium mb-2 text-foreground mt-3">{children}</h3>,
                      p: ({ children }) => <p className="mb-3 text-foreground leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="mb-3 pl-4 space-y-1">{children}</ul>,
                      li: ({ children }) => <li className="text-foreground">{children}</li>,
                      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4 bg-muted/20 py-2 rounded-r">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {block.content}
                  </ReactMarkdown>
                </div>

                {/* 引用 */}
                {block.references && block.references.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Quote className="w-3 h-3" />
                        参考资料
                      </h4>
                      <div className="space-y-1">
                        {block.references.map((ref, refIndex) => (
                          <div key={refIndex} className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                            [{refIndex + 1}] {ref}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>        {/* 报告结尾 */}
        <div className="text-center py-8 border-t text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-1000">
          <p>本报告由AI投资研究助手生成，仅供参考，不构成投资建议</p>
          <p className="mt-1">最后更新: {new Date().toLocaleString('zh-CN')}</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchDocument;
