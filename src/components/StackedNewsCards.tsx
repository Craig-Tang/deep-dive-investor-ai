import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, TrendingUp, ArrowUpRight, Calendar, Timer } from 'lucide-react';
import type { NewsItem } from '@/pages/Index';

interface StackedNewsCardsProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  title: string;
  maxKeywords?: number;
  className?: string;
}

export const StackedNewsCards: React.FC<StackedNewsCardsProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  title,
  maxKeywords = 4,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };
  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (containerRef.current && containerRef.current.contains(document.activeElement)) {
        if (event.key === 'ArrowLeft') {
          setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
        } else if (event.key === 'ArrowRight') {
          setCurrentIndex((prev) => (prev + 1) % news.length);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [news.length]);  // 滚轮事件处理
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    }
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    }
  };  // 自动播放功能（已禁用）
  const startAutoPlay = useCallback(() => {
    // 自动播放已禁用
    return;
  }, []);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  }, []);
  
  // 组件挂载时清理定时器
  useEffect(() => {
    return () => stopAutoPlay();
  }, [stopAutoPlay]);

  // 禁用悬停时的自动播放逻辑
  // useEffect(() => {
  //   if (isHovered) {
  //     stopAutoPlay();
  //   } else {
  //     startAutoPlay();
  //   }
  // }, [isHovered, startAutoPlay, stopAutoPlay]);
  // 渲染关键词
  const renderKeywords = (item: NewsItem) => (
    <div className="flex flex-wrap gap-1.5">
      {item.keywords.slice(0, maxKeywords).map((keyword) => {
        const isSelected = selectedKeywords.includes(keyword);
        return (
          <Badge 
            key={keyword} 
            variant="outline" 
            className={`text-xs py-1 px-2 cursor-pointer transition-all duration-200 ${
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
      {item.keywords.length > maxKeywords && (
        <Badge variant="outline" className="text-xs py-1 px-2 bg-muted/30">
          +{item.keywords.length - maxKeywords}
        </Badge>
      )}
    </div>
  );

  if (!news.length) {
    return (
      <div className={`relative ${className}`}>
        {/* 标题 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <div className="h-1 w-12 bg-primary rounded-full"></div>
        </div>
        
        {/* 空状态 */}
        <div className="h-80 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">📰</div>
            <p>暂无{title}数据</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* 标题 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <div className="h-1 w-12 bg-primary rounded-full"></div>
      </div>      {/* 叠层卡片容器 */}
      <div 
        ref={containerRef}
        className="relative h-80 focus:outline-none"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {news.map((item, index) => {
          const position = (index - currentIndex + news.length) % news.length;
          const isActive = position === 0;
          const isVisible = position <= 2; // 显示前3张卡片
          
          if (!isVisible) return null;

          return (
            <Card
              key={`${item.id}-${index}`}
              className={`absolute inset-0 cursor-pointer transition-all duration-500 ease-out ${
                isActive
                  ? 'z-30 transform-none shadow-2xl'
                  : position === 1
                  ? 'z-20 transform translate-x-2 translate-y-2 scale-95 shadow-lg'
                  : 'z-10 transform translate-x-4 translate-y-4 scale-90 shadow-md'
              } ${isActive ? 'hover:shadow-3xl' : ''} border-border/50 hover:border-primary/30 group`}
              style={{
                transform: isActive 
                  ? 'perspective(1000px) rotateX(0deg) rotateY(0deg)' 
                  : position === 1
                  ? 'perspective(1000px) rotateX(5deg) rotateY(-5deg) translateX(8px) translateY(8px) scale(0.95)'
                  : 'perspective(1000px) rotateX(10deg) rotateY(-10deg) translateX(16px) translateY(16px) scale(0.9)',
                opacity: isActive ? 1 : position === 1 ? 0.7 : 0.4
              }}
              onClick={() => isActive ? onNewsSelect(item) : goToCard(index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                    {item.trending && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-red-500">
                        <TrendingUp className="w-3 h-3" />
                      </Badge>
                    )}
                    <Badge className={`text-xs px-1.5 py-0.5 border ${getImpactColor(item.impact)}`}>
                      {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}
                    </Badge>
                  </div>
                  {isActive && (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                
                <h4 className="text-base font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {item.summary}
                </p>
                
                {isActive && renderKeywords(item)}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{item.source}</span>
                    </div>
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    <span>{item.readTime}分钟</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}        {/* 悬停时显示的导航箭头 */}
        {isHovered && news.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={prevCard}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={nextCard}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* 移动端始终显示的导航箭头 */}
        <div className="md:hidden">
          {news.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={prevCard}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={nextCard}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 底部进度指示器 */}
      {news.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {news.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      )}

      {/* 数字指示器 */}
      <div className="absolute top-4 right-4 z-40 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-muted-foreground">
        {currentIndex + 1} / {news.length}
      </div>
    </div>
  );
};
