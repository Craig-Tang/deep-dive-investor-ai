import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { History, Calendar, FileText, Palette, ChevronDown } from 'lucide-react';
import type { ReportBlock } from '@/pages/Index';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  data: ReportBlock[] | Record<string, unknown>;
}

interface HistoryDropdownProps {
  type: 'report' | 'canvas';
  onSelect?: (item: HistoryItem) => void;
}

export const HistoryDropdown: React.FC<HistoryDropdownProps> = ({
  type,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 模拟历史数据
  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      title: 'OpenAI投资分析报告',
      date: new Date(2025, 5, 17),
      type: 'report',
      data: []
    },
    {
      id: '2', 
      title: 'AI算力行业研究',
      date: new Date(2025, 5, 16),
      type: 'report',
      data: []
    },
    {
      id: '3',
      title: '投资组合分析画布',
      date: new Date(2025, 5, 15),
      type: 'canvas',
      data: {}
    },
    {
      id: '4',
      title: '风险评估模型',
      date: new Date(2025, 5, 14),
      type: 'canvas', 
      data: {}
    }
  ];

  // 过滤当前类型的历史记录
  const filteredHistory = mockHistory
    .filter(item => item.type === type)
    .slice(0, 5); // 只显示最近5条

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '今天';
    if (diffDays === 2) return '昨天';
    if (diffDays <= 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  const truncateTitle = (title: string, maxLength: number = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };
  const handleItemSelect = (item: HistoryItem) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
      >
        <History className="w-4 h-4" />
        历史记录
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-64 z-50 shadow-lg border">
          <CardContent className="p-0">
            {filteredHistory.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                暂无历史记录
              </div>
            ) : (
              <>
                {filteredHistory.map((item, index) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemSelect(item)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex-shrink-0">
                        {item.type === 'report' ? (
                          <FileText className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Palette className="w-4 h-4 text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {truncateTitle(item.title)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </button>
                    {index < filteredHistory.length - 1 && <Separator />}
                  </div>
                ))}
                <Separator />
                <div className="p-2 text-center text-xs text-muted-foreground">
                  显示最近 {filteredHistory.length} 条记录
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
