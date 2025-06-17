import React from 'react';
import { ResponsiveStackedNews } from './ResponsiveStackedNews';
import { NewsPanel } from './NewsPanel';
import type { NewsItem } from '@/pages/Index';

interface CompactStackedNewsProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  maxKeywords?: number;
  mode: 'full' | 'compact' | 'minimal' | 'cards' | 'stacked';
  width?: number; // 当前面板宽度百分比，用于自适应布局
}

export const CompactStackedNews: React.FC<CompactStackedNewsProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  maxKeywords = 4,
  mode,
  width = 100
}) => {
  // 如果是stacked模式，使用自适应叠层卡片；否则使用原来的NewsPanel
  if (mode === 'stacked') {
    return (
      <div className="h-full px-3">
        <ResponsiveStackedNews
          news={news}
          selectedKeywords={selectedKeywords}
          onKeywordToggle={onKeywordToggle}
          onNewsSelect={onNewsSelect}
          maxKeywords={maxKeywords}
          width={width}
        />
      </div>
    );
  }

  // 默认使用原来的NewsPanel
  return (
    <NewsPanel 
      news={news} 
      onNewsSelect={onNewsSelect}
      selectedNews={null}
      mode={mode}
      selectedKeywords={selectedKeywords}
      onKeywordToggle={onKeywordToggle}
      maxKeywords={maxKeywords}
    />
  );
};
