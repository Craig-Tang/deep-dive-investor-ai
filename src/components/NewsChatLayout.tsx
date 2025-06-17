import React from 'react';
import { NewsPanel } from './NewsPanel';
import { CompactStackedNews } from './CompactStackedNews';
import { ChatPanel } from './ChatPanel';
import { ChatMessages } from './ChatMessages';
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
  chatPlaceholder = {
    title: "AI风投研究助手",
    subtitle: "开始AI投资研究分析"
  }
}) => {
  const newsStyle = { flexBasis: `${newsRatio * 100}%` };
  const chatStyle = { flexBasis: `${(1 - newsRatio) * 100}%` };
  
  return (
    <div className="flex flex-col h-full">      {/* 新闻区域 */}
      <div style={newsStyle} className="min-h-0 overflow-auto border-b">
        <CompactStackedNews 
          news={news} 
          onNewsSelect={onNewsSelect}
          mode={newsMode}
          selectedKeywords={selectedKeywords}
          onKeywordToggle={onKeywordToggle}
          maxKeywords={maxKeywords}
        />
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
          <div className="max-w-2xl mx-auto">
            <ChatPanel 
              messages={[]}
              onSendMessage={onSendMessage}
              isDeepResearching={isDeepResearching}
              researchProgress={researchProgress}
              mode="input-only"
              selectedKeywords={selectedKeywords}
              suggestedQuestions={suggestedQuestions}
              onClearKeywords={onClearKeywords}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
