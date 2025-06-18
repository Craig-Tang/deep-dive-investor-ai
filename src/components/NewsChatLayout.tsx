import React, { useState, useRef, useEffect } from 'react';
import { NewsPanel } from './NewsPanel';
import { ResponsiveStackedNews } from './ResponsiveStackedNews';
import { ChatPanel } from './ChatPanel';
import { ChatMessages } from './ChatMessages';
import { NewsDetailModal } from './NewsDetailModal';
import type { NewsItem, Message } from '@/types/common';
import type { Task, TaskGroup } from '@/data/tasks';

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
    // 任务相关（保持兼容性，但不使用）
  taskGroups?: TaskGroup[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: () => void;
  showTasks?: boolean; // 是否显示任务栏
  
  // 布局相关
  newsRatio?: number; // 新闻区域占比
  taskRatio?: number; // 任务区域占比（保持兼容性）
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
  taskGroups = [],
  onTaskClick,
  onAddTask,
  showTasks = false, // 默认不显示任务栏
  newsRatio = 2/5, // 恢复到原来的比例
  taskRatio = 1/4,
  panelWidth = 100,
  chatPlaceholder = {
    title: "AI风投研究助手",
    subtitle: "开始AI投资研究分析"
  }
}) => {
  // 计算各区域的比例
  const chatRatio = showTasks ? (1 - newsRatio - taskRatio) : (1 - newsRatio);
  
  const newsStyle = { flexBasis: `${newsRatio * 100}%` };
  const chatStyle = { flexBasis: `${chatRatio * 100}%` };
  const taskStyle = { flexBasis: `${taskRatio * 100}%` };
  
  // 新闻详情弹窗状态
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // 新增：监听新闻区域的实际宽度
  const newsContainerRef = useRef<HTMLDivElement>(null);
  const [actualNewsWidth, setActualNewsWidth] = useState<number>(panelWidth);

  useEffect(() => {
    const updateNewsWidth = () => {
      if (newsContainerRef.current) {
        const width = newsContainerRef.current.offsetWidth;
        setActualNewsWidth(width);
      }
    };

    updateNewsWidth();
    
    const resizeObserver = new ResizeObserver(updateNewsWidth);
    if (newsContainerRef.current) {
      resizeObserver.observe(newsContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
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
  };    return (
    <div className="flex flex-col h-full">
      {/* 新闻区域 */}
      <div 
        ref={newsContainerRef}
        style={newsStyle} 
        className="min-h-0 overflow-auto border-b pb-4"
      >
        {newsMode === 'stacked' ? (
          <ResponsiveStackedNews 
            news={news} 
            selectedKeywords={selectedKeywords}
            onKeywordToggle={onKeywordToggle}
            onNewsSelect={handleNewsDetailSelect}
            maxKeywords={maxKeywords}
            width={actualNewsWidth}
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
      
      {/* 聊天区域（AI摘要） */}
      <div style={chatStyle} className="min-h-0 overflow-hidden relative flex-1">
        <ChatMessages
          messages={messages}
          isDeepResearching={isDeepResearching}
          researchProgress={researchProgress}
          placeholder={chatPlaceholder}
        />
        
        {/* 悬浮输入框 */}
        <div className="absolute bottom-3 left-6 right-6 z-10">
          <div className="max-w-3xl mx-auto">
            <ChatPanel 
              messages={[]}
              onSendMessage={handleSendMessage}
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
