import React from 'react';
import { LayoutManager } from '@/components/LayoutManager';
import { StackedNewsHome } from '@/components/StackedNewsHome';
import { NewsChatLayout } from '@/components/NewsChatLayout';
import { ResearchPanel } from '@/components/ResearchPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { NewsDetailModal } from '@/components/NewsDetailModal';
import { useAppState } from '@/hooks/useAppState';
import { LAYOUT_CONFIGS } from '@/types/layout';
import { mockNews } from '@/data/mockNews';

// 保留原有的类型定义
export type LayoutMode = 'home' | 'chat' | 'research' | 'research-canvas';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  isDeepResearch?: boolean;
  timestamp: Date;
  isLoading?: boolean;
  loadingProgress?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  content: string;
  source: string;
  publishedAt: Date;
  category: string;
  impact: 'high' | 'medium' | 'low';
  imageUrl?: string;
  readTime: number;
  trending?: boolean;
}

export interface ReportBlock {
  id: string;
  title: string;
  content: string;
  type: 'paragraph' | 'chart' | 'summary' | 'quote' | 'list' | 'heading';
  references?: string[];
  metadata?: {
    source?: string;
    confidence?: number;
    lastUpdated?: Date;
  };
}

const Index: React.FC = () => {
  const {
    layout,
    news,
    chat,
    research,
    handleSendMessage,
    handleGenerateReport,
    handleContinueResearch,
    handleExportMarkdown,
    handleHistorySelect
  } = useAppState();

  // 获取当前布局配置
  const currentConfig = LAYOUT_CONFIGS[layout.layoutMode];
  // 渲染首页内容
  const renderHomeContent = () => (
    <>
      {/* 新闻卡片主界面 */}
      <div className="h-full pb-32 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <StackedNewsHome 
            news={mockNews} 
            selectedKeywords={news.selectedKeywords}
            onKeywordToggle={news.handleKeywordToggle}
            onNewsSelect={news.openNewsDetail}
            maxKeywords={4}
          />
        </div>
      </div>

      {/* 悬浮的输入框 */}
      <div className="fixed bottom-8 left-8 right-8 z-50">
        <div className="max-w-3xl mx-auto">
          <ChatPanel
            messages={[]}
            onSendMessage={handleSendMessage}
            isDeepResearching={false}
            researchProgress={0}
            mode="input-only"
            selectedKeywords={news.selectedKeywords}
            suggestedQuestions={chat.suggestedQuestions}
            onClearKeywords={news.clearKeywords}
          />
        </div>
      </div>
    </>
  );

  // 渲染新闻+聊天布局
  const renderNewsChatLayout = () => (
    <NewsChatLayout
      news={mockNews}
      onNewsSelect={news.setSelectedNews}
      selectedNews={news.selectedNews}
      newsMode="stacked"
      selectedKeywords={news.selectedKeywords}
      onKeywordToggle={news.handleKeywordToggle}
      maxKeywords={4}
      messages={chat.messages}
      onSendMessage={handleSendMessage}
      isDeepResearching={chat.isDeepResearching}
      researchProgress={chat.researchProgress}
      suggestedQuestions={chat.suggestedQuestions}
      onClearKeywords={news.clearKeywords}
      chatPlaceholder={{
        title: layout.layoutMode === 'chat' ? "AI投资分析助手" : "深度投研对话",
        subtitle: layout.layoutMode === 'chat' 
          ? "输入您的AI投资问题，获得专业分析"
          : "输入研究主题，获得详细投资分析报告"
      }}
    />
  );

  // 渲染研究面板
  const renderResearchPanel = () => (
    <ResearchPanel 
      report={research.researchReport}
      onDragToCanvas={research.addToCanvas}
      onHistorySelect={handleHistorySelect}
      hasToolbar={currentConfig.hasToolbar}
    />
  );

  // 渲染画布面板
  const renderCanvasPanel = () => (
    <CanvasPanel 
      blocks={research.canvasBlocks}
      onBlocksChange={research.updateCanvasBlocks}
      onGenerateReport={handleGenerateReport}
      onContinueResearch={handleContinueResearch}
      onExportMarkdown={handleExportMarkdown}
      onHistorySelect={handleHistorySelect}
      hasToolbar={currentConfig.hasToolbar}
    />
  );

  // 根据布局模式渲染相应的内容
  const renderContent = () => {
    switch (layout.layoutMode) {
      case 'home':
        return [renderHomeContent()];
      
      case 'chat':
        return [renderNewsChatLayout()];
      
      case 'research':
        return [
          renderNewsChatLayout(),
          renderResearchPanel()
        ];
      
      case 'research-canvas':
        return [
          renderNewsChatLayout(),
          renderResearchPanel(),
          renderCanvasPanel()
        ];
      
      default:
        return [renderHomeContent()];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LayoutManager
        config={currentConfig}
        onModeSwitch={layout.switchToMode}
        onCanvasToggle={layout.toggleCanvas}
        onBackToHome={layout.backToHome}
        showCanvas={layout.showCanvas}
        currentMode={layout.layoutMode}
      >
        {renderContent()}
      </LayoutManager>

      {/* 新闻详情弹窗 */}
      <NewsDetailModal
        item={news.selectedNewsDetail}
        isOpen={news.isDetailModalOpen}
        onClose={news.closeNewsDetail}
        selectedKeywords={news.selectedKeywords}
        onKeywordToggle={news.handleKeywordToggle}
      />
    </div>
  );
};

export default Index;
