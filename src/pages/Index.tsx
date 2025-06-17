import React, { useState, useRef } from 'react';
import { NewsPanel } from '@/components/NewsPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { ResearchPanel } from '@/components/ResearchPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { ResizableHandle } from '@/components/ResizableHandle';
import { useResizable } from '@/hooks/useResizable';

export type LayoutMode = 'single' | 'dual' | 'triple' | 'quad';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  isDeepResearch?: boolean;
  timestamp: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  content: string;
  source: string;
  publishedAt: Date;
}

export interface ReportBlock {
  id: string;
  title: string;
  content: string;
  type: 'paragraph' | 'chart' | 'summary';
}

const Index: React.FC = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('quad');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [researchReport, setResearchReport] = useState<ReportBlock[] | null>(null);
  const [canvasBlocks, setCanvasBlocks] = useState<ReportBlock[]>([]);
  const [isDeepResearching, setIsDeepResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);

  // 可调整宽度的面板引用
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    sizes: panelSizes,
    handleMouseDown,
    resetSizes
  } = useResizable({
    containerRef,
    initialSizes: [20, 25, 30, 25],
    minSizes: [10, 15, 20, 15]
  });

  // 模拟新闻数据
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: '美联储降息预期推动科技股上涨',
      summary: '市场对美联储可能在下次会议上降息的预期不断升温，科技股表现强劲，纳斯达克指数上涨2.3%。',
      keywords: ['美联储', '降息', '科技股', '纳斯达克'],
      content: '详细的新闻内容...',
      source: '华尔街日报',
      publishedAt: new Date()
    },
    {
      id: '2',
      title: 'AI芯片需求激增，英伟达Q4业绩超预期',
      summary: '英伟达公司发布了超出市场预期的第四季度财报，AI芯片业务继续保持强劲增长态势。',
      keywords: ['英伟达', 'AI芯片', '财报', '增长'],
      content: '详细的新闻内容...',
      source: '路透社',
      publishedAt: new Date()
    },
    {
      id: '3',
      title: '新能源汽车销量创历史新高',
      summary: '2024年全球新能源汽车销量突破1000万辆，中国市场占据主导地位。',
      keywords: ['新能源汽车', '销量', '中国市场'],
      content: '详细的新闻内容...',
      source: '彭博社',
      publishedAt: new Date()
    }
  ];

  const handleSendMessage = async (content: string, isDeepResearch: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      isDeepResearch,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (isDeepResearch) {
      setIsDeepResearching(true);
      setResearchProgress(0);
      
      const progressInterval = setInterval(() => {
        setResearchProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsDeepResearching(false);
            setResearchReport([
              {
                id: '1',
                title: '市场概况',
                content: '当前市场呈现出明显的结构性分化特征，科技股领涨大盘，投资者情绪整体偏向乐观。美联储降息预期的升温为市场提供了流动性支撑...',
                type: 'summary'
              },
              {
                id: '2',
                title: '技术分析',
                content: '从技术指标来看，纳斯达克指数已突破关键阻力位，MACD指标显示多头趋势强劲。成交量放大配合价格上涨，显示市场参与度较高...',
                type: 'chart'
              },
              {
                id: '3',
                title: '投资建议',
                content: '基于当前市场环境，建议重点关注AI相关产业链，特别是芯片设计和数据中心领域。同时关注新能源汽车板块的结构性机会...',
                type: 'paragraph'
              }
            ]);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } else {
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: '基于当前市场情况，我建议关注以下几个方面：1. 科技股在降息预期下的表现 2. AI芯片行业的长期增长潜力 3. 新能源汽车市场的发展趋势...',
          type: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleDragToCanvas = (block: ReportBlock) => {
    setCanvasBlocks(prev => [...prev, { ...block, id: Date.now().toString() }]);
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      <div className="flex h-full w-full">
        <div style={{ width: `${panelSizes[0]}%` }} className="h-full">
          <NewsPanel 
            news={mockNews} 
            onNewsSelect={setSelectedNews}
            selectedNews={selectedNews}
            mode="minimal"
          />
        </div>
        <ResizableHandle onMouseDown={(e) => handleMouseDown(e, 0)} />
        <div style={{ width: `${panelSizes[1]}%` }} className="h-full">
          <ChatPanel 
            messages={messages}
            onSendMessage={handleSendMessage}
            isDeepResearching={isDeepResearching}
            researchProgress={researchProgress}
            mode="compact"
          />
        </div>
        <ResizableHandle onMouseDown={(e) => handleMouseDown(e, 1)} />
        <div style={{ width: `${panelSizes[2]}%` }} className="h-full">
          <ResearchPanel 
            report={researchReport}
            onDragToCanvas={handleDragToCanvas}
          />
        </div>
        <ResizableHandle onMouseDown={(e) => handleMouseDown(e, 2)} />
        <div style={{ width: `${panelSizes[3]}%` }} className="h-full">
          <CanvasPanel 
            blocks={canvasBlocks}
            onBlocksChange={setCanvasBlocks}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
