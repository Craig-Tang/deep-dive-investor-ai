import React, { useMemo } from 'react';
import { StackedNewsCards } from './StackedNewsCards';
import type { NewsItem } from '@/pages/Index';

interface ResponsiveStackedNewsProps {
  news: NewsItem[];
  selectedKeywords: string[];
  onKeywordToggle?: (keyword: string) => void;
  onNewsSelect: (news: NewsItem) => void;
  maxKeywords?: number;
  width?: number; // 当前面板宽度百分比，用于自适应布局
}

export const ResponsiveStackedNews: React.FC<ResponsiveStackedNewsProps> = ({
  news,
  selectedKeywords,
  onKeywordToggle,
  onNewsSelect,
  maxKeywords = 4,
  width = 100
}) => {
    // 根据宽度决定布局模式 - 降低三栏的门槛以适应Chat模式
  const layoutMode = useMemo(() => {
    if (width >= 55) return 'three-column'; // 三列（降低门槛）
    if (width >= 35) return 'two-column';   // 两列（降低门槛）
    return 'single-column';                 // 单列
  }, [width]);

  // 新闻分类逻辑（仅在三列模式下使用）
  const categorizedNews = useMemo(() => {
    if (layoutMode !== 'three-column') {
      return { all: news };
    }

    // AI公司投创：包括融资、IPO、投资基金等
    const investmentNews = news.filter(item => 
      ['AI融资', '风险投资', 'IPO上市'].includes(item.category) ||
      item.keywords.some(keyword => 
        ['融资', '投资', 'IPO', '上市', '基金', '估值', '红杉', 'VC'].includes(keyword)
      )
    );

    // AI技术突破：包括新模型、技术创新、算法突破等
    const technologyNews = news.filter(item => 
      ['AI技术', 'AI基础设施'].includes(item.category) ||
      item.keywords.some(keyword => 
        ['Claude', 'GPT', '大模型', 'AGI', 'H200', '算力', '英伟达', 'AI芯片'].includes(keyword)
      )
    );

    // AI应用论文：包括行业应用、监管政策、市场分析等
    const applicationNews = news.filter(item => 
      ['AI监管', 'AI应用', '行业分析'].includes(item.category) ||
      item.keywords.some(keyword => 
        ['监管', '合规', '法案', '政策', '应用', '行业', '市场'].includes(keyword)
      ) ||
      // 如果不属于前两类，则归入应用类
      (!investmentNews.includes(item) && !technologyNews.includes(item))
    );

    return {
      investment: investmentNews,
      technology: technologyNews,
      application: applicationNews
    };
  }, [news, layoutMode]);  // 三列模式
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
