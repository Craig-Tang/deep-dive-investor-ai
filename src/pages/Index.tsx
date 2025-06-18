import React from 'react';
import { LayoutManager } from '@/components/LayoutManager';
import { StackedNewsHome } from '@/components/StackedNewsHome';
import { NewsChatLayout } from '@/components/NewsChatLayout';
import { ResearchPanel } from '@/components/ResearchPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { NewsDetailModal } from '@/components/NewsDetailModal';
import { TaskDetailModal } from '@/components/TaskDetailModal';
import { TaskPanel } from '@/components/TaskPanel';
import { useAppState } from '@/hooks/useAppState';
import { LAYOUT_CONFIGS } from '@/types/layout';
import { mockNews, mockTasks, getTaskGroups } from '@/data';
import { useLayoutState } from '@/hooks/useLayoutState';
import { useState } from 'react';
import type { Task } from '@/data/tasks';

const Index: React.FC = () => {
  // 任务详情弹窗状态
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  
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
  
  // 任务处理函数
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };
  
  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };
  
  const handleTaskToggleStatus = (task: Task) => {
    console.log('Toggle task status:', task);
    // TODO: 实现任务状态切换逻辑
    handleCloseTaskDetail();
  };  // 渲染首页内容
  const renderHomeContent = () => {
    // 获取任务数据
    const taskGroups = getTaskGroups(mockTasks).map(group => ({
      ...group,
      tasks: group.tasks.sort((a, b) => {
        // 按状态排序：overdue > in-progress > pending > completed
        const statusPriority = {
          'overdue': 0,
          'in-progress': 1,
          'pending': 2,
          'completed': 3
        };
        
        if (statusPriority[a.status] !== statusPriority[b.status]) {
          return statusPriority[a.status] - statusPriority[b.status];
        }
        
        // 然后按优先级排序
        const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        
        // 最后按截止时间排序
        if (a.deadline && b.deadline) {
          return a.deadline.getTime() - b.deadline.getTime();
        }
        
        return a.createdAt.getTime() - b.createdAt.getTime();
      })
    }));

    return (
      <div className="flex h-full">
        {/* 主内容区域：新闻卡片 */}
        <div className="flex-1 overflow-hidden">
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
          <div className="fixed bottom-8 left-8 right-80 z-50">
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
        </div>

        {/* 右侧任务面板 */}
        <div className="w-80 border-l bg-muted/20 overflow-hidden">
          <TaskPanel
            taskGroups={taskGroups}
            onTaskClick={handleTaskClick}
            onAddTask={() => {
              console.log('Add task clicked');
              // TODO: 实现添加任务逻辑
            }}
            className="h-full border-0 shadow-none bg-transparent"
          />
        </div>
      </div>
    );  };// 渲染新闻+聊天布局
  const renderNewsChatLayout = (actualWidth?: number) => {
    // 根据当前布局模式获取面板宽度百分比
    const newsChatPanel = currentConfig.panels.find(p => p.key === 'news-chat');
    const panelWidthPercent = newsChatPanel?.width || 100;
    
    // 如果提供了实际宽度，使用它；否则使用百分比作为备用
    const effectiveWidth = actualWidth || panelWidthPercent;
    
    return (
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
        showTasks={false}
        panelWidth={effectiveWidth}
        chatPlaceholder={{
          title: layout.layoutMode === 'chat' ? "AI投资分析助手" : "深度投研对话",
          subtitle: layout.layoutMode === 'chat' 
            ? "输入您的AI投资问题，获得专业分析"
            : "输入研究主题，获得详细投资分析报告"
        }}
      />
    );
  };

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
      </LayoutManager>      {/* 新闻详情弹窗 */}
      <NewsDetailModal
        item={news.selectedNewsDetail}
        isOpen={news.isDetailModalOpen}
        onClose={news.closeNewsDetail}
        selectedKeywords={news.selectedKeywords}
        onKeywordToggle={news.handleKeywordToggle}
      />
      
      {/* 任务详情弹窗 */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskDetailOpen}
        onClose={handleCloseTaskDetail}
        onToggleStatus={handleTaskToggleStatus}
      />
    </div>
  );
};

export default Index;
