import React, { useMemo } from 'react';
import { StackedNewsCards } from './StackedNewsCards';
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
  const categorizedNews = useMemo(() => {
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
  }, [news]);
  return (
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
  );
};
