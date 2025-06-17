
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, ExternalLink } from 'lucide-react';
import type { NewsItem } from '@/pages/Index';

interface NewsPanelProps {
  news: NewsItem[];
  onNewsSelect: (news: NewsItem | null) => void;
  selectedNews: NewsItem | null;
  mode: 'full' | 'compact' | 'minimal';
}

export const NewsPanel: React.FC<NewsPanelProps> = ({ 
  news, 
  onNewsSelect, 
  selectedNews, 
  mode 
}) => {
  const renderNewsCard = (item: NewsItem) => {
    switch (mode) {
      case 'minimal':
        return (
          <Card 
            key={item.id}
            className="mb-2 cursor-pointer hover:shadow-md transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
            onClick={() => onNewsSelect(item)}
          >
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{item.source}</span>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'compact':
        return (
          <Card 
            key={item.id}
            className="mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-md"
            onClick={() => onNewsSelect(item)}
          >
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {item.keywords.slice(0, 3).map((keyword) => (
                  <Badge 
                    key={keyword} 
                    variant="secondary" 
                    className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.source}</span>
                <span>{item.publishedAt.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'full':
      default:
        return (
          <Card 
            key={item.id}
            className="mb-6 cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:scale-[1.02]"
            onClick={() => onNewsSelect(item)}
          >
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-800 leading-tight">
                {item.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.keywords.map((keyword) => (
                  <Badge 
                    key={keyword} 
                    variant="secondary" 
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.source}</span>
                </div>
                <span>{item.publishedAt.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className={`h-full flex flex-col ${mode === 'full' ? 'p-6' : mode === 'compact' ? 'p-4' : 'p-2'}`}>
      <div className={`mb-4 ${mode === 'minimal' ? 'mb-2' : ''}`}>
        <h2 className={`font-bold text-gray-800 ${
          mode === 'minimal' ? 'text-sm' : mode === 'compact' ? 'text-lg' : 'text-2xl'
        }`}>
          {mode === 'minimal' ? '新闻' : '投资新闻'}
        </h2>
        {mode !== 'minimal' && (
          <p className="text-gray-600 text-sm mt-1">
            最新的市场动态和投资资讯
          </p>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {news.map(renderNewsCard)}
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => onNewsSelect(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 pr-8">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedNews?.keywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-800"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">摘要</h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedNews?.summary}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">详细内容</h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedNews?.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedNews?.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{selectedNews?.publishedAt.toLocaleDateString()}</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
