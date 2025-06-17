import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, ArrowUpRight, Calendar, Timer } from 'lucide-react';
import { formatTimeAgo, getImpactColor, getCategoryColor, getImpactText } from '@/lib/newsUtils';
import type { NewsItem } from '@/pages/Index';

interface NewsCardProps {
  item: NewsItem;
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  variant: 'full' | 'compact' | 'minimal' | 'cards';
  maxKeywords?: number; // 可配置的关键词显示数量
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  variant,
  maxKeywords
}) => {
  
  // 根据variant自动确定显示的关键词数量，但允许通过maxKeywords覆盖
  const getMaxKeywords = () => {
    if (maxKeywords !== undefined) return maxKeywords;
    
    switch (variant) {
      case 'full':
      case 'cards':
        return 4;
      case 'compact':
        return 3;
      case 'minimal':
        return 2;
      default:
        return 3;
    }
  };

  const keywordCount = getMaxKeywords();

  // 渲染关键词组件
  const renderKeywords = () => (
    <div className="flex flex-wrap gap-1 mb-3">
      {item.keywords.slice(0, keywordCount).map((keyword) => {
        const isSelected = selectedKeywords.includes(keyword);
        return (
          <Badge 
            key={keyword} 
            variant="outline" 
            className={`text-xs py-0.5 ${
              variant === 'compact' ? 'px-1.5' : 'px-2'
            } cursor-pointer transition-all duration-200 ${
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
      {item.keywords.length > keywordCount && (
        <Badge variant="outline" className={`text-xs py-0.5 ${
          variant === 'compact' ? 'px-1.5' : 'px-2'
        } bg-muted/30`}>
          +{item.keywords.length - keywordCount}
        </Badge>
      )}
    </div>
  );

  // 根据variant渲染不同的卡片样式
  switch (variant) {    case 'cards':
      return (
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group"
          onClick={() => onNewsSelect(item)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
                {item.trending && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-red-500">
                    <TrendingUp className="w-3 h-3" />
                  </Badge>                )}
                <Badge className={`text-xs px-1.5 py-0.5 border ${getImpactColor(item.impact)}`}>
                  {getImpactText(item.impact)}
                </Badge>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </CardHeader>
            <CardContent className="pt-0">
            <p className="text-muted-foreground text-base line-clamp-3 mb-3">
              {item.summary}
            </p>
            
            {renderKeywords()}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{item.source}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatTimeAgo(item.publishedAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                <span>{item.readTime}分钟</span>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case 'compact':
      return (
        <Card 
          className="mb-3 cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group"
          onClick={() => onNewsSelect(item)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                  {item.trending && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-red-500">
                      <TrendingUp className="w-3 h-3" />
                    </Badge>
                  )}                  <Badge className={`text-xs px-1.5 py-0.5 border ${getImpactColor(item.impact)}`}>
                    {getImpactText(item.impact)}
                  </Badge>
                </div>
                
                <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {item.summary}
                </p>
                
                {renderKeywords()}
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium">{item.source}</span>
                  <span>{formatTimeAgo(item.publishedAt)}</span>
                  <span>{item.readTime}分钟阅读</span>
                </div>
              </div>
              
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card 
          className="mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group"
          onClick={() => onNewsSelect(item)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(item.category)}`}>
                {item.category}
              </Badge>
              {item.trending && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-red-500">
                  <TrendingUp className="w-3 h-3" />
                </Badge>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {item.summary}
            </p>
            
            {renderKeywords()}
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium">{item.source}</span>
              <span>{formatTimeAgo(item.publishedAt)}</span>
              <span>{item.readTime}分钟阅读</span>
            </div>
          </CardContent>
        </Card>
      );
  }
};
