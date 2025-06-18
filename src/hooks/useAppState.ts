import { useLayoutState } from './useLayoutState';
import { useNewsState } from './useNewsState';
import { useChatState } from './useChatState';
import { useResearchState } from './useResearchState';
import type { NewsItem, Message, ReportBlock } from '@/pages/Index';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  tags: string[];
  summary?: string;
  data: ReportBlock[] | Record<string, unknown>;
}

export const useAppState = () => {
  const layout = useLayoutState();
  const news = useNewsState();
  const chat = useChatState();
  const research = useResearchState();

  // 组合业务逻辑
  const handleSendMessage = async (content: string, isDeepResearch?: boolean) => {
    // 切换到聊天模式
    if (layout.layoutMode === 'home') {
      layout.switchToMode('chat');
    }

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
      isDeepResearch
    };
    chat.addMessage(userMessage);

    // 模拟AI响应
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      type: 'assistant',
      timestamp: new Date(),
      isLoading: true,
      loadingProgress: 0
    };
    chat.addMessage(assistantMessage);

    if (isDeepResearch) {
      chat.startDeepResearch();
      
      // 模拟深度研究进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        chat.updateResearchProgress(i);
        chat.updateMessage(assistantMessage.id, { loadingProgress: i });
      }

      // 切换到研究模式并生成报告
      layout.switchToMode('research');
      
      // 生成模拟研究报告
      research.updateReport([
        {
          id: 'executive-summary',
          title: '执行摘要',
          content: '基于深度分析，AI投资市场正处于快速发展期...',
          type: 'summary',
          references: ['McKinsey Global Institute AI Report 2025'],
          metadata: {
            source: 'AI Investment Research Team',
            confidence: 0.95,
            lastUpdated: new Date()
          }
        }
      ]);

      chat.endDeepResearch();
      chat.updateMessage(assistantMessage.id, {
        content: '基于深度分析，我为您整理了以下AI投资研究报告...',
        isLoading: false,
        loadingProgress: undefined
      });
    } else {
      // 普通聊天响应
      await new Promise(resolve => setTimeout(resolve, 1000));
      chat.updateMessage(assistantMessage.id, {
        content: '这是一个模拟的AI回复。您可以继续提问或选择深度研究模式。',
        isLoading: false
      });
    }
  };

  const handleGenerateReport = () => {
    if (layout.layoutMode !== 'research') {
      layout.switchToMode('research');
    }
    // 生成报告逻辑...
  };
  const handleContinueResearch = (content: string) => {
    // 继续研究逻辑...
  };

  const handleExportMarkdown = () => {
    // 导出markdown逻辑...
  };
  const handleHistorySelect = (item: HistoryItem) => {
    if (item.type === 'report' && Array.isArray(item.data)) {
      research.updateReport(item.data);
      layout.switchToMode('research');
    } else if (item.type === 'canvas' && Array.isArray(item.data)) {
      research.updateCanvasBlocks(item.data);
      layout.switchToMode('research-canvas');
    }
    layout.hideHistory();
  };

  return {
    // States
    layout,
    news,
    chat,
    research,
    
    // Combined actions
    handleSendMessage,
    handleGenerateReport,
    handleContinueResearch,
    handleExportMarkdown,
    handleHistorySelect
  };
};
