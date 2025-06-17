import React from 'react';
import { StackedNewsCards } from './StackedNewsCards';
import { NewsPanel } from './NewsPanel';
import type { NewsItem } from '@/pages/Index';

interface CompactStackedNewsProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  maxKeywords?: number;
  mode: 'full' | 'compact' | 'minimal' | 'cards' | 'stacked';
}

export const CompactStackedNews: React.FC<CompactStackedNewsProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  maxKeywords = 4,
  mode
}) => {
  
  // 如果是stacked模式，使用叠层卡片；否则使用原来的NewsPanel
  if (mode === 'stacked') {
    return (
      <div className="h-full">
        <StackedNewsCards
          news={news}
          selectedKeywords={selectedKeywords}
          onKeywordToggle={onKeywordToggle}
          onNewsSelect={onNewsSelect}
          title="最新AI投研动态"
          maxKeywords={maxKeywords}
          className="h-full"
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
