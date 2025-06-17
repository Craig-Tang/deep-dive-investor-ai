import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Calendar, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import type { ReportBlock } from '@/pages/Index';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  tags: string[];
  summary?: string;
  data: ReportBlock[] | Record<string, unknown>; // ReportBlock[] for reports, canvas data for canvas
}

interface HistoryPanelProps {
  type: 'report' | 'canvas';
  onSelect: (item: HistoryItem) => void;
  onClose: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  type,
  onSelect,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟历史数据
  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      title: 'OpenAI投资分析报告',
      date: new Date(2025, 5, 17),
      type: 'report',
      tags: ['AI融资', '大模型', '投资分析'],
      summary: '基于OpenAI最新65亿美元融资的深度分析，评估其估值合理性和投资机会。',
      data: []
    },
    {
      id: '2',
      title: 'AI芯片产业投资机会',
      date: new Date(2025, 5, 16),
      type: 'report',
      tags: ['AI芯片', '英伟达', '算力'],
      summary: '分析AI芯片供需矛盾下的投资机会，重点关注算力基础设施投资。',
      data: []
    },
    {
      id: '3',
      title: '投资组合分析画布',
      date: new Date(2025, 5, 15),
      type: 'canvas',
      tags: ['投资组合', '风险评估'],
      summary: 'AI投资组合的风险收益分析和配置建议。',
      data: {}
    },
    {
      id: '4',
      title: 'AI监管政策影响研究',
      date: new Date(2025, 5, 14),
      type: 'report',
      tags: ['监管政策', '合规风险'],
      summary: '欧盟AI法案对投资决策的影响分析。',
      data: []
    }
  ];

  const filteredHistory = mockHistory
    .filter(item => item.type === type)
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-80 h-full shadow-lg animate-in slide-in-from-right-4 duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">
              {type === 'report' ? '研究报告历史' : '画布历史'}
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索历史记录..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-md bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4 space-y-3">
            {filteredHistory.map((item, index) => (
              <div key={item.id}>
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-primary/30"
                  onClick={() => onSelect(item)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {type === 'report' ? (
                            <FileText className="w-4 h-4 text-blue-500" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          )}
                          <h4 className="font-medium text-sm line-clamp-1">
                            {item.title}
                          </h4>
                        </div>
                        
                        {item.summary && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.summary}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.date)}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {index < filteredHistory.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
            
            {filteredHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">暂无{type === 'report' ? '研究报告' : '画布'}历史</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
