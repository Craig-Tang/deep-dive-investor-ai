import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Calendar, Timer, ExternalLink, Share2, BookOpen } from 'lucide-react';
import type { NewsItem } from '@/pages/Index';

interface NewsDetailModalProps {
  item: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  selectedKeywords,
  onKeywordToggle
}) => {
  if (!item) return null;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}小时前`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}天前`;
    }
  };

  const getImpactColor = (impact: NewsItem['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
      case 'medium':
        return 'text-orange-500 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'AI融资': 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      'AI技术': 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
      '风险投资': 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      'AI基础设施': 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
      'IPO上市': 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800',
    };
    return categoryColors[category] || 'text-muted-foreground bg-muted border-border';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: window.location.href
      });
    } else {
      // 降级到复制链接
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(item.category)}`}>
                {item.category}
              </Badge>
              {item.trending && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-red-500">
                  <TrendingUp className="w-3 h-3" />
                  热门
                </Badge>
              )}
              <Badge className={`text-xs px-1.5 py-0.5 border ${getImpactColor(item.impact)}`}>
                影响力: {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                分享
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                原文
              </Button>
            </div>
          </div>
          
          <DialogTitle className="text-xl md:text-2xl font-bold text-left leading-tight">
            {item.title}
          </DialogTitle>
          
          <DialogDescription className="text-base text-muted-foreground mt-2">
            {item.summary}
          </DialogDescription>
          
          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{item.source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatTimeAgo(item.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              <span>{item.readTime}分钟阅读</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{item.content.length}字</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto space-y-6">
          {/* 关键词 */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">相关关键词</h4>
            <div className="flex flex-wrap gap-2">
              {item.keywords.map((keyword) => {
                const isSelected = selectedKeywords.includes(keyword);
                return (
                  <Badge 
                    key={keyword} 
                    variant="outline" 
                    className={`text-sm py-1.5 px-3 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-muted/50 hover:bg-muted border-border hover:border-primary/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onKeywordToggle?.(keyword);
                    }}
                  >
                    {keyword}
                  </Badge>
                );
              })}
            </div>
          </div>
          
          {/* 主要内容 */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">详细内容</h4>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
            </div>
          </div>
          
          {/* 如果有图片 */}
          {item.imageUrl && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">相关图片</h4>
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full max-w-2xl rounded-lg border border-border/50"
              />
            </div>
          )}
          
          {/* 相关操作 */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-border/50">
            <Button variant="default">
              <BookOpen className="w-4 h-4 mr-2" />
              深度研究
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              添加到研究
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              查看原文
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
