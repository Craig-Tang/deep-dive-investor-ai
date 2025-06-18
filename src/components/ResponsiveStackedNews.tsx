import React, { useMemo } from 'react';
import { StackedNewsCards } from './StackedNewsCards';
import { categorizeNews } from '@/lib/newsUtils';
import type { NewsItem } from '@/pages/Index';

interface ResponsiveStackedNewsProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  maxKeywords?: number;
  width?: number; // 实际像素宽度或百分比（兼容旧用法）
}

export const ResponsiveStackedNews: React.FC<ResponsiveStackedNewsProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  maxKeywords = 4,
  width = 100
}) => {
  // 根据实际宽度决定布局模式
  const layoutMode = useMemo(() => {
    // 如果宽度大于100，说明是像素值；如果小于等于100，说明是百分比
    let actualWidth = width;
    
    if (width <= 100) {
      // 如果是百分比，估算实际像素宽度（假设容器宽度为1200px）
      actualWidth = (width / 100) * 1200;
    }
    
    // 基于像素宽度的断点
    if (actualWidth >= 800) return 'three-column';  // 三列：需要较宽空间
    if (actualWidth >= 500) return 'two-column';    // 两列：中等空间
    return 'single-column';                         // 单列：窄空间
  }, [width]);// 新闻分类逻辑（仅在三列模式下使用）
  const categorizedNews = useMemo(() => {
    if (layoutMode !== 'three-column') {
      return { all: news, investment: [], technology: [], application: [] };
    }

    return { ...categorizeNews(news), all: news };
  }, [news, layoutMode]);// 三列模式
  if (layoutMode === 'three-column') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 h-full px-2 md:px-4 pb-4">
        <div className="flex flex-col">
          <StackedNewsCards
            news={categorizedNews.investment}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={onNewsSelect}
            title="AI公司投创"
            maxKeywords={maxKeywords}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col">
          <StackedNewsCards
            news={categorizedNews.technology}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={onNewsSelect}
            title="AI技术突破"
            maxKeywords={maxKeywords}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col">
          <StackedNewsCards
            news={categorizedNews.application}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={onNewsSelect}
            title="AI应用论文"
            maxKeywords={maxKeywords}
            className="flex-1"
          />
        </div>
      </div>
    );
  }  // 两列模式
  if (layoutMode === 'two-column') {
    const halfIndex = Math.ceil(news.length / 2);
    const firstHalf = news.slice(0, halfIndex);
    const secondHalf = news.slice(halfIndex);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full px-2 md:px-4 pb-4">
        <div className="flex flex-col">
          <StackedNewsCards
            news={firstHalf}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={onNewsSelect}
            title="AI投研动态 (1)"
            maxKeywords={maxKeywords}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col">
          <StackedNewsCards
            news={secondHalf}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={onNewsSelect}
            title="AI投研动态 (2)"
            maxKeywords={maxKeywords}
            className="flex-1"
          />
        </div>
      </div>
    );
  }
  // 单列模式
  return (
    <div className="h-full px-2 md:px-4 pb-4">
      <StackedNewsCards
        news={news}
        selectedKeywords={selectedKeywords}
        onKeywordToggle={onKeywordToggle}
        onNewsSelect={onNewsSelect}
        title="AI投研动态"
        maxKeywords={maxKeywords}
        className="h-full"
      />
    </div>
  );
};
