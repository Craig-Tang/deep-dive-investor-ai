
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, ExternalLink, TrendingUp, Eye, ArrowUpRight, Calendar, Timer } from 'lucide-react';
import type { NewsItem } from '@/pages/Index';

interface NewsPanelProps {
  news: NewsItem[];
  onNewsSelect: (news: NewsItem | null) => void;
  selectedNews: NewsItem | null;
  mode: 'full' | 'compact' | 'minimal' | 'cards';
  selectedKeywords?: string[];
  onKeywordToggle?: (keyword: string) => void;
}

export const NewsPanel: React.FC<NewsPanelProps> = ({ 
  news, 
  onNewsSelect, 
  selectedNews, 
  mode,
  selectedKeywords = [],
  onKeywordToggle
}) => {
  
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
    const colors: Record<string, string> = {
      '货币政策': 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      '科技股': 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
      '新能源': 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      '数字货币': 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800',
      '房地产': 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800'
    };
    return colors[category] || 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800';
  };  const renderNewsCard = (item: NewsItem) => {
    switch (mode) {
      case 'cards':
        return (
          <Card 
            key={item.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden"
            onClick={() => onNewsSelect(item)}
          >
            {/* 顶部状态栏 */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 border ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
                {item.trending && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    热门
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Badge className={`text-xs px-2 py-1 border ${getImpactColor(item.impact)}`}>
                  {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}影响
                </Badge>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>

            <CardContent className="p-4 pt-0">
              {/* 标题 */}
              <h3 className="text-lg font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              {/* 摘要 */}
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                {item.summary}
              </p>
                {/* 关键词 */}
              <div className="flex flex-wrap gap-1 mb-4">
                {item.keywords.slice(0, 4).map((keyword) => {
                  const isSelected = selectedKeywords.includes(keyword);
                  return (
                    <Badge 
                      key={keyword} 
                      variant="outline" 
                      className={`text-xs py-0.5 px-2 cursor-pointer transition-all duration-200 ${
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
                {item.keywords.length > 4 && (
                  <Badge variant="outline" className="text-xs py-0.5 px-2 bg-muted/30">
                    +{item.keywords.length - 4}
                  </Badge>
                )}
              </div>
              
              {/* 底部信息 */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
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
        );case 'minimal':
        return (
          <Card 
            key={item.id}
            className="mb-2 cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-primary/30 group"
            onClick={() => onNewsSelect(item)}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Badge className={`text-xs px-1.5 py-0.5 border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                    {item.trending && (
                      <TrendingUp className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">{item.source}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                </div>
                <Badge className={`text-xs px-1 py-0.5 border ${getImpactColor(item.impact)} flex-shrink-0`}>
                  {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );case 'compact':
        return (
          <Card 
            key={item.id}
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
                    )}
                    <Badge className={`text-xs px-1.5 py-0.5 border ${getImpactColor(item.impact)}`}>
                      {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}
                    </Badge>
                  </div>
                  
                  <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {item.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.keywords.slice(0, 3).map((keyword) => (
                      <Badge 
                        key={keyword} 
                        variant="outline" 
                        className="text-xs py-0.5 px-1.5 bg-muted/50"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  
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
        );        case 'full':
      default:
        return (
          <Card 
            key={item.id}
            className="mb-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 group bg-card/80 backdrop-blur-sm"
            onClick={() => onNewsSelect(item)}
          >
            <CardContent className="p-6">
              {/* 顶部状态栏 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs px-2 py-1 border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                  {item.trending && (
                    <Badge variant="secondary" className="text-xs px-2 py-1 text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      热门
                    </Badge>
                  )}
                </div>
                <Badge className={`text-xs px-2 py-1 border ${getImpactColor(item.impact)}`}>
                  {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}影响
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-3">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {item.summary}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.keywords.map((keyword) => (
                  <Badge 
                    key={keyword} 
                    variant="outline" 
                    className="text-xs py-1 px-2 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{item.source}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>{item.readTime}分钟阅读</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };  return (
    <div className={`h-full flex flex-col ${mode === 'cards' ? 'p-6' : mode === 'full' ? 'p-6' : mode === 'compact' ? 'p-4' : 'p-2'}`}>
      {/* AI今日总览 */}
      {mode === 'cards' && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-foreground">
              今日投资要闻总览 - {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            今日AI投资市场持续活跃，OpenAI估值突破1570亿美元引发行业关注，Anthropic发布Claude 4.0展现AGI新进展，
            投资者需重点关注大模型技术突破、AI基础设施建设和垂直领域应用三大投资主线。
            建议关注具备技术壁垒的AI芯片公司和有清晰商业模式的AI应用企业。
          </p>
        </div>
      )}
      
      <div className={`mb-6 ${mode === 'minimal' ? 'mb-3' : ''}`}>
        <div className="flex items-center justify-between">
          <div>            <h2 className={`font-bold text-foreground ${
              mode === 'minimal' ? 'text-sm' : mode === 'compact' ? 'text-xl' : 'text-3xl'
            }`}>
              {mode === 'minimal' ? '新闻' : mode === 'cards' ? '市场资讯' : '投资新闻'}
            </h2>
            {mode !== 'minimal' && (
              <p className={`text-muted-foreground mt-1 ${mode === 'cards' ? 'text-base' : 'text-sm'}`}>
                {mode === 'cards' ? '实时掌握投资机会，洞察市场趋势' : '最新的市场动态和投资资讯'}
              </p>
            )}
          </div>
          {mode === 'cards' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{news.length} 条资讯</span>
            </div>
          )}
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent ${
        mode === 'cards' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max' : 'space-y-2'
      }`}>
        {news.map(renderNewsCard)}
      </div>      <Dialog open={!!selectedNews} onOpenChange={() => onNewsSelect(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="space-y-4">
            {/* 头部状态栏 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 border ${getCategoryColor(selectedNews?.category || '')}`}>
                  {selectedNews?.category}
                </Badge>
                {selectedNews?.trending && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    热门
                  </Badge>
                )}
              </div>
              <Badge className={`text-xs px-2 py-1 border mr-5 ${getImpactColor(selectedNews?.impact || 'low')}`}>
                {selectedNews?.impact === 'high' ? '高' : selectedNews?.impact === 'medium' ? '中' : '低'}影响
              </Badge>
            </div>
            
            <DialogTitle className="text-2xl font-bold text-foreground leading-tight pr-8">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* 关键词 */}
            <div className="flex flex-wrap gap-2">
              {selectedNews?.keywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="outline" 
                  className="text-sm py-1 px-3 bg-muted/50 hover:bg-muted transition-colors"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
            
            {/* 摘要 */}
            <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                摘要
              </h4>
              <p className="text-muted-foreground leading-relaxed text-base">
                {selectedNews?.summary}
              </p>
            </div>
            
            {/* 详细内容 */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                详细内容
              </h4>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {selectedNews?.content}
                </p>
              </div>
            </div>
            
            {/* 底部信息 */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-6 border-t border-border/50">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{selectedNews?.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedNews ? formatTimeAgo(selectedNews.publishedAt) : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  <span>{selectedNews?.readTime}分钟阅读</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <span>查看原文</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
