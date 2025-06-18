import React, { useState } from 'react';
import { NewsPanel } from './NewsPanel';
import { ResponsiveStackedNews } from './ResponsiveStackedNews';
import { ChatPanel } from './ChatPanel';
import { ChatMessages } from './ChatMessages';
import { NewsDetailModal } from './NewsDetailModal';
import type { NewsItem, Message } from '@/pages/Index';

interface NewsChatLayoutProps {
  // 新闻相关
  news: NewsItem[];
  onNewsSelect: (news: NewsItem | null) => void;
  selectedNews: NewsItem | null;
  newsMode: 'full' | 'compact' | 'minimal' | 'cards' | 'stacked';
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
  maxKeywords?: number; // 可配置关键词显示数量
  
  // 聊天相关
  messages: Message[];
  onSendMessage: (content: string, isDeepResearch?: boolean) => void;
  isDeepResearching: boolean;
  researchProgress: number;
  suggestedQuestions: string[];
  onClearKeywords: () => void;
  
  // 布局相关
  newsRatio?: number; // 新闻区域占比，默认2/5 (40%)
  panelWidth?: number; // 当前面板宽度百分比，用于响应式布局
  chatPlaceholder?: {
    title: string;
    subtitle: string;
  };
}

export const NewsChatLayout: React.FC<NewsChatLayoutProps> = ({
  news,
  onNewsSelect,
  selectedNews,
  newsMode,
  selectedKeywords,
  onKeywordToggle,
  maxKeywords,
  messages,
  onSendMessage,
  isDeepResearching,
  researchProgress,
  suggestedQuestions,
  onClearKeywords,
  newsRatio = 2/5,
  panelWidth = 100,
  chatPlaceholder = {
    title: "AI风投研究助手",
    subtitle: "开始AI投资研究分析"
  }
}) => {
  const newsStyle = { flexBasis: `${newsRatio * 100}%` };
  const chatStyle = { flexBasis: `${(1 - newsRatio) * 100}%` };
  
  // 新闻详情弹窗状态
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // 包装发送消息函数，自动清除关键词选择
  const handleSendMessage = (content: string, isDeepResearch?: boolean) => {
    onSendMessage(content, isDeepResearch);
    // 发送消息后自动清除关键词选择
    if (selectedKeywords.length > 0) {
      onClearKeywords();
    }
  };
  
  // 处理新闻详情查看
  const handleNewsDetailSelect = (news: NewsItem) => {
    setSelectedNewsDetail(news);
    setIsDetailModalOpen(true);
  };
  
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedNewsDetail(null);
  };
  
  return (
    <div className="flex flex-col h-full">      {/* 新闻区域 */}
      <div style={newsStyle} className="min-h-0 overflow-auto border-b pb-4">        {newsMode === 'stacked' ? (
          <ResponsiveStackedNews 
            news={news} 
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={handleNewsDetailSelect}
            maxKeywords={maxKeywords}
            width={panelWidth}
          />
        ) : (
          <NewsPanel 
            news={news} 
            onNewsSelect={handleNewsDetailSelect}
            selectedNews={selectedNews}
            mode={newsMode}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            maxKeywords={maxKeywords}
          />
        )}
      </div>
      
      {/* 聊天区域 */}
      <div style={chatStyle} className="min-h-0 overflow-hidden relative flex-1">
        <ChatMessages
          messages={messages}
          isDeepResearching={isDeepResearching}
          researchProgress={researchProgress}
          placeholder={chatPlaceholder}
        />
          {/* 悬浮输入框 */}
        <div className="absolute bottom-3 left-6 right-6 z-10">
          <div className="max-w-3xl mx-auto">            <ChatPanel 
              messages={[]}
              onSendMessage={handleSendMessage}
              isDeepResearching={isDeepResearching}
              researchProgress={researchProgress}
              mode="input-only"
              selectedKeywords={selectedKeywords}
              suggestedQuestions={suggestedQuestions}
              onClearKeywords={onClearKeywords}
            />          </div>
        </div>
      </div>
      
      {/* 新闻详情弹窗 */}
      <NewsDetailModal
        item={selectedNewsDetail}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        selectedKeywords={selectedKeywords}
        onKeywordToggle={onKeywordToggle}
      />
    </div>
  );
};
