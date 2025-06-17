import React, { useState, useRef } from 'react';
import { NewsPanel } from '@/components/NewsPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { ResearchPanel } from '@/components/ResearchPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { ResizableHandle } from '@/components/ResizableHandle';
import { useResizable } from '@/hooks/useResizable';
import { Button } from '@/components/ui/button';
import { Palette, MessageSquare } from 'lucide-react';

export type LayoutMode = 'home' | 'chat' | 'research' | 'research-canvas';

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
  type: 'paragraph' | 'chart' | 'summary';
}

const Index: React.FC = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [researchReport, setResearchReport] = useState<ReportBlock[] | null>(null);
  const [canvasBlocks, setCanvasBlocks] = useState<ReportBlock[]>([]);
  const [isDeepResearching, setIsDeepResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);

  // 可调整宽度的面板引用
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    sizes: panelSizes,
    handleMouseDown,
    resetSizes
  } = useResizable({
    containerRef,
    initialSizes: showCanvas ? [50, 25, 25] : [60, 40],
    minSizes: showCanvas ? [30, 20, 20] : [40, 30]
  });
  // 模拟新闻数据
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: '美联储降息预期推动科技股上涨',
      summary: '市场对美联储可能在下次会议上降息的预期不断升温，科技股表现强劲，纳斯达克指数上涨2.3%。投资者对AI和半导体板块格外关注，认为降息环境将有利于科技股的进一步上涨。',
      keywords: ['美联储', '降息', '科技股', '纳斯达克'],
      content: '美联储官员近期释放出可能在下次货币政策会议上降息的信号，这一预期推动了美国股市的强劲上涨。纳斯达克综合指数在本交易日上涨2.3%，创下近三个月来的最大单日涨幅。科技股成为本轮上涨的主要推动力，苹果、微软、谷歌等大型科技公司股价均出现显著上涨。分析师认为，降息环境将降低企业融资成本，特别有利于高成长性的科技公司...',
      source: '华尔街日报',
      publishedAt: new Date(2025, 5, 17, 9, 30),
      category: '货币政策',
      impact: 'high',
      readTime: 3,
      trending: true
    },
    {
      id: '2',
      title: 'AI芯片需求激增，英伟达Q4业绩超预期',
      summary: '英伟达公司发布了超出市场预期的第四季度财报，AI芯片业务继续保持强劲增长态势。数据中心业务营收同比增长427%，推动股价盘后大涨8%。',
      keywords: ['英伟达', 'AI芯片', '财报', '增长'],
      content: '英伟达公司昨日发布的第四季度财报显示，该公司营收达到220亿美元，同比增长22%，远超华尔街预期的204亿美元。其中，数据中心业务表现尤为亮眼，营收达到184亿美元，同比激增427%。这主要得益于全球对AI芯片需求的爆发式增长。公司CEO黄仁勋表示，生成式AI的快速发展为公司带来了前所未有的机遇，预计这一趋势将持续数年...',
      source: '路透社',
      publishedAt: new Date(2025, 5, 17, 8, 15),
      category: '科技股',
      impact: 'high',
      readTime: 4,
      trending: true
    },
    {
      id: '3',
      title: '新能源汽车销量创历史新高',
      summary: '2024年全球新能源汽车销量突破1000万辆，中国市场占据主导地位。比亚迪、特斯拉等头部企业竞争激烈，推动整个行业技术创新和成本降低。',
      keywords: ['新能源汽车', '销量', '中国市场'],
      content: '据最新行业报告显示，2024年全球新能源汽车销量首次突破1000万辆大关，达到1080万辆，同比增长35%。中国市场继续保持全球领先地位，占全球销量的60%以上。比亚迪以310万辆的年销量超越特斯拉，成为全球最大的新能源汽车制造商。业内专家认为，随着电池技术的不断进步和充电基础设施的完善，新能源汽车的普及速度将进一步加快...',
      source: '彭博社',
      publishedAt: new Date(2025, 5, 17, 7, 45),
      category: '新能源',
      impact: 'medium',
      readTime: 3
    },
    {
      id: '4',
      title: '中国央行降准释放流动性1.2万亿',
      summary: '中国人民银行宣布下调存款准备金率0.5个百分点，向市场释放长期流动性约1.2万亿元。此举旨在支持实体经济发展，稳定市场预期。',
      keywords: ['央行', '降准', '流动性', '货币政策'],
      content: '中国人民银行今日宣布，自明日起下调金融机构存款准备金率0.5个百分点，此次降准将向市场释放长期流动性约1.2万亿元。这是央行今年以来第二次实施降准操作。央行相关负责人表示，此次降准主要目的是优化银行资金结构，增强银行资金投放能力，支持实体经济发展。市场分析师认为，这一政策信号表明货币政策将保持适度宽松态势...',
      source: '新华财经',
      publishedAt: new Date(2025, 5, 17, 6, 20),
      category: '货币政策',
      impact: 'high',
      readTime: 2
    },
    {
      id: '5',
      title: '比特币重回7万美元关口',
      summary: '比特币价格重新站上7万美元，24小时涨幅超过8%。机构投资者持续入场，ETF资金流入创下新高，加密货币市场情绪转暖。',
      keywords: ['比特币', '加密货币', 'ETF', '价格'],
      content: '比特币价格在经历了数周的震荡后，今日强势突破7万美元关口，最高触及70,850美元，24小时涨幅达到8.3%。这一上涨主要受益于机构资金的持续流入。据统计，过去一周比特币ETF净流入资金超过15亿美元，创下今年以来新高。分析师认为，随着更多传统金融机构接受加密货币，比特币的长期前景依然乐观...',
      source: 'CoinDesk',
      publishedAt: new Date(2025, 5, 17, 5, 10),
      category: '数字货币',
      impact: 'medium',
      readTime: 2
    },
    {
      id: '6',
      title: '房地产政策再现松动信号',
      summary: '多个一线城市传出房地产政策优化消息，包括降低首付比例、放宽购房资格等。市场预期政策底部已现，地产股集体反弹。',
      keywords: ['房地产', '政策', '首付', '地产股'],
      content: '继上海、深圳等一线城市陆续出台房地产政策优化措施后，北京也传出相关政策调整的消息。市场人士透露，相关部门正在研究进一步降低首付比例、放宽非户籍人口购房资格等措施。受此消息影响，地产股今日集体反弹，万科A涨停，保利发展、招商蛇口等龙头房企股价均出现大幅上涨。分析师认为，这表明房地产政策已经触底...',
      source: '21世纪经济报道',
      publishedAt: new Date(2025, 5, 16, 16, 30),
      category: '房地产',
      impact: 'medium',
      readTime: 3
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
      setLayoutMode('research');
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
      // 进入普通聊天模式
      if (layoutMode === 'home') {
        setLayoutMode('chat');
      }
      
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

  const handleCanvasToggle = () => {
    setShowCanvas(!showCanvas);
  };

  const handleBackToHome = () => {
    setLayoutMode('home');
    setMessages([]);
    setResearchReport(null);
    setCanvasBlocks([]);
    setShowCanvas(false);
  };  // 首页布局
  if (layoutMode === 'home') {
    return (
      <div className="h-screen w-full bg-background overflow-hidden relative">
        {/* 新闻卡片主界面 */}
        <div className="h-full pb-40 overflow-auto">
          <div className="p-6">
            <NewsPanel 
              news={mockNews} 
              onNewsSelect={setSelectedNews}
              selectedNews={selectedNews}
              mode="cards"
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
            />
          </div>
        </div>
      </div>
    );
  }

  // 普通聊天模式
  if (layoutMode === 'chat') {
    return (
      <div className="h-screen w-full bg-background overflow-hidden">
        <div className="flex flex-col h-full">
          {/* 顶部返回按钮 */}
          <div className="p-4 border-b bg-card/80 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              onClick={handleBackToHome}
              className="mb-2"
            >
              ← 返回首页
            </Button>
          </div>
          
          {/* 压缩的新闻展示 */}
          <div className="h-48 border-b overflow-auto">
            <NewsPanel 
              news={mockNews} 
              onNewsSelect={setSelectedNews}
              selectedNews={selectedNews}
              mode="compact"
            />
          </div>
          
          {/* 聊天界面 */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel 
              messages={messages}
              onSendMessage={handleSendMessage}
              isDeepResearching={isDeepResearching}
              researchProgress={researchProgress}
              mode="chat"
            />
          </div>
        </div>
      </div>
    );
  }
  // 深度研究模式
  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-background overflow-hidden"
    >
      {/* 顶部工具栏 */}
      <div className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4">
        <Button 
          variant="ghost" 
          onClick={handleBackToHome}
        >
          ← 返回首页
        </Button>
        
        <div className="flex gap-2">
          {layoutMode === 'research' && researchReport && (
            <Button 
              variant="outline" 
              onClick={handleCanvasToggle}
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              画布
            </Button>
          )}
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 左侧：新闻 + 聊天 */}
        <div style={{ width: showCanvas ? `${panelSizes[0]}%` : `${panelSizes[0]}%` }} className="h-full flex flex-col">
          {/* 新闻区域 */}
          <div className="h-48 border-b overflow-auto">
            <NewsPanel 
              news={mockNews} 
              onNewsSelect={setSelectedNews}
              selectedNews={selectedNews}
              mode="compact"
            />
          </div>
          
          {/* 聊天区域 */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel 
              messages={messages}
              onSendMessage={handleSendMessage}
              isDeepResearching={isDeepResearching}
              researchProgress={researchProgress}
              mode="chat"
            />
          </div>
        </div>

        <ResizableHandle onMouseDown={(e) => handleMouseDown(e, 0)} />

        {/* 中间：研究报告 */}
        <div style={{ width: showCanvas ? `${panelSizes[1]}%` : `${panelSizes[1]}%` }} className="h-full">
          <ResearchPanel 
            report={researchReport}
            onDragToCanvas={handleDragToCanvas}
          />
        </div>

        {/* 右侧：画布（可选） */}
        {showCanvas && (
          <>
            <ResizableHandle onMouseDown={(e) => handleMouseDown(e, 1)} />
            <div style={{ width: `${panelSizes[2]}%` }} className="h-full">
              <CanvasPanel 
                blocks={canvasBlocks}
                onBlocksChange={setCanvasBlocks}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
