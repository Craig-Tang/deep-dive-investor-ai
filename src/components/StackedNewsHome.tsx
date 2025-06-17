import React, { useMemo } from 'react';
import { StackedNewsCards } from './StackedNewsCards';
import { AISummary } from './AISummary';
import { categorizeNews } from '@/lib/newsUtils';
import type { NewsItem } from '@/pages/Index';

interface StackedNewsHomeProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  maxKeywords?: number;
}

export const StackedNewsHome: React.FC<StackedNewsHomeProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  maxKeywords = 4
}) => {  
  // 新闻分类逻辑
  const categorizedNews = useMemo(() => categorizeNews(news), [news]);return (
    <div className="space-y-6">
      {/* AI总结 */}
      <AISummary />
      
      {/* 三列叠层卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 h-full">
        {/* AI公司投创 */}
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

        {/* AI技术突破 */}
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

        {/* AI应用论文 */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
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
    </div>
  );
};
