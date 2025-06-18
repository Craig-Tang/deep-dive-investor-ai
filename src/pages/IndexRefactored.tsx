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
import type { NewsItem, Message, ReportBlock } from '@/pages/Index';

// 模拟新闻数据
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI完成新一轮65亿美元融资，估值达1570亿美元',
    summary: 'OpenAI宣布完成新一轮融资，由Thrive Capital领投，微软、英伟达等科技巨头跟投。此轮融资使OpenAI成为全球估值最高的AI初创公司，资金将用于扩大计算能力和人才招聘。',
    keywords: ['OpenAI', '融资', '估值', 'AI初创'],
    content: 'OpenAI今日宣布完成65亿美元的C轮融资，由Thrive Capital领投，微软、英伟达、软银愿景基金等知名投资机构参与跟投。此轮融资后，OpenAI的估值达到1570亿美元，成为全球估值最高的AI初创公司。CEO Sam Altman表示，新资金将主要用于扩大GPU集群规模、招聘顶尖AI人才以及加速AGI研发进程。分析师认为，这一估值反映了投资者对生成式AI长期前景的信心...',
    source: 'TechCrunch',
    publishedAt: new Date('2025-06-17'),
    category: '融资',
    impact: 'high',
    readTime: 3,
    trending: true
  },
  // 可以添加更多模拟数据...
];

const IndexRefactored: React.FC = () => {
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
      newsRatio={0.45}
      chatPlaceholder={{
        title: layout.layoutMode === 'chat' ? "开始对话" : "深度研究",
        subtitle: layout.layoutMode === 'chat' 
          ? "输入您的AI投资问题，获得专业分析"
          : "输入研究主题，获得详细投资分析报告"
      }}
    />
  );  // 渲染研究面板
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
    <>
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
    </>
  );
};

export default IndexRefactored;
