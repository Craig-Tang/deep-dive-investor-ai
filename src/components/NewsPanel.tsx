import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewsCard } from './NewsCard';
import type { NewsItem } from '@/pages/Index';

interface NewsPanelProps {
  news: NewsItem[];
  onNewsSelect: (news: NewsItem | null) => void;
  selectedNews: NewsItem | null;
  mode: 'full' | 'compact' | 'minimal' | 'cards';
  selectedKeywords?: string[];
  onKeywordToggle?: (keyword: string) => void;
  maxKeywords?: number; // 可选：覆盖默认的关键词显示数量
}

export const NewsPanel: React.FC<NewsPanelProps> = ({ 
  news, 
  onNewsSelect, 
  selectedNews, 
  mode,
  selectedKeywords = [],
  onKeywordToggle,
  maxKeywords
}) => {
  
  const renderNewsCard = (item: NewsItem) => {
    return (
      <NewsCard
        key={item.id}
        item={item}
        selectedKeywords={selectedKeywords}
        onKeywordToggle={onKeywordToggle}
        onNewsSelect={onNewsSelect}
        variant={mode}
        maxKeywords={maxKeywords}
      />
    );
  };
  return (
    <div className="w-full">
      {/* 首页特殊布局 - 今日投资要闻总览 */}
      {mode === 'cards' && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border/50 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              📊 今日投资要闻总览
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              全球AI投资市场持续升温，OpenAI新轮融资推高行业估值水平，同时监管政策逐步完善为长期发展奠定基础。
              基础设施层面英伟达H200供应紧张推升成本，而应用层创新加速，投资机会向垂直领域扩散。
              建议关注具备技术壁垒的AI基础设施公司和在细分领域建立护城河的应用型公司。
            </p>
          </div>
        </div>
      )}

      {/* 新闻列表 */}
      <div className={`${
        mode === 'cards' 
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto' 
          : 'space-y-0'
      }`}>
        {news.map(renderNewsCard)}
      </div>

      {/* 新闻详情弹窗 */}
      <Dialog open={!!selectedNews} onOpenChange={() => onNewsSelect(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold pr-8">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNews && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{selectedNews.source}</span>
                <span>•</span>
                <span>{new Date(selectedNews.publishedAt).toLocaleDateString('zh-CN')}</span>
                <span>•</span>
                <span>{selectedNews.readTime}分钟阅读</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedNews.keywords.map((keyword) => {
                  const isSelected = selectedKeywords.includes(keyword);
                  return (
                    <span
                      key={keyword}
                      className={`px-2 py-1 text-xs rounded-md border cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-muted/50 hover:bg-muted border-border hover:border-primary/50'
                      }`}
                      onClick={() => onKeywordToggle?.(keyword)}
                    >
                      {keyword}
                    </span>
                  );
                })}
              </div>
                <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-muted-foreground prose-li:text-muted-foreground">
                <ReactMarkdown>{selectedNews.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};