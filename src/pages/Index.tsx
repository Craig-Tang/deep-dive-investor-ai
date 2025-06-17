import React, { useState, useRef, useEffect } from 'react';
import { NewsPanel } from '@/components/NewsPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { NewsChatLayout } from '@/components/NewsChatLayout';
import { ResearchPanel } from '@/components/ResearchPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { ChatInput } from '@/components/ChatInput';
import { ResizableHandle } from '@/components/ResizableHandle';
import { GeminiLoader } from '@/components/GeminiLoader';
import { useResizable } from '@/hooks/useResizable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, MessageSquare, User, Bot, Sparkles } from 'lucide-react';

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
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [researchReport, setResearchReport] = useState<ReportBlock[] | null>(null);
  const [canvasBlocks, setCanvasBlocks] = useState<ReportBlock[]>([]);
  const [isDeepResearching, setIsDeepResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);  // 可调整宽度的面板引用
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 两面板模式：左侧和中间面板的尺寸控制（没有画布时）
  const {
    sizes: twoPanelSizes,
    handleMouseDown: handleTwoPanelMouseDown,
  } = useResizable({
    containerRef,
    initialSizes: [60, 40], // 左侧60%，中间40%
    minSizes: [40, 30]
  });

  // 三面板模式：所有面板的尺寸控制（有画布时）
  const {
    sizes: threePanelSizes,
    handleMouseDown: handleThreePanelMouseDown,
  } = useResizable({
    containerRef,
    initialSizes: [50, 25, 25], // 左侧50%，中间25%，右侧25%
    minSizes: [30, 20, 20]
  });  // 模拟新闻数据
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'OpenAI完成新一轮65亿美元融资，估值达1570亿美元',
      summary: 'OpenAI宣布完成新一轮融资，由Thrive Capital领投，微软、英伟达等科技巨头跟投。此轮融资使OpenAI成为全球估值最高的AI初创公司，资金将用于扩大计算能力和人才招聘。',
      keywords: ['OpenAI', '融资', '估值', 'AI初创'],
      content: 'OpenAI今日宣布完成65亿美元的C轮融资，由Thrive Capital领投，微软、英伟达、软银愿景基金等知名投资机构参与跟投。此轮融资后，OpenAI的估值达到1570亿美元，成为全球估值最高的AI初创公司。CEO Sam Altman表示，新资金将主要用于扩大GPU集群规模、招聘顶尖AI人才以及加速AGI研发进程。分析师认为，这一估值反映了投资者对生成式AI长期前景的信心...',
      source: 'TechCrunch',
      publishedAt: new Date(2025, 5, 17, 9, 30),
      category: 'AI融资',
      impact: 'high',
      readTime: 4,
      trending: true
    },
    {
      id: '2',
      title: 'Anthropic推出Claude 4.0，AGI能力取得重大突破',
      summary: 'Anthropic发布新一代大模型Claude 4.0，在推理、代码生成和多模态理解方面显著超越GPT-4。该模型在多项基准测试中创下新纪录，被认为是向AGI迈进的重要里程碑。',
      keywords: ['Anthropic', 'Claude 4.0', 'AGI', '大模型'],
      content: 'Anthropic昨日正式发布Claude 4.0大模型，该模型在数学推理、代码生成、图像理解等关键能力上全面超越GPT-4。在最新的MMLU基准测试中，Claude 4.0得分达到96.2%，创下历史新高。公司CTO表示，Claude 4.0具备了初步的自主学习和复杂推理能力，标志着向通用人工智能(AGI)迈出了重要一步。多位AI专家认为，这一突破将重新定义AI产业格局...',
      source: 'Nature AI',
      publishedAt: new Date(2025, 5, 17, 8, 15),
      category: 'AI技术',
      impact: 'high',
      readTime: 5,
      trending: true
    },
    {
      id: '3',
      title: '红杉资本宣布设立20亿美元AI专项基金',
      summary: '红杉资本宣布设立专门的AI投资基金，规模达20亿美元，重点关注AI基础设施、应用层创新和垂直行业AI解决方案。这是迄今为止规模最大的AI专项基金。',
      keywords: ['红杉资本', 'AI基金', '风险投资', '基础设施'],
      content: '红杉资本今日宣布设立规模达20亿美元的AI专项基金，专注投资AI领域的早期到成长期项目。基金将重点关注三个方向：AI芯片和基础设施、AI原生应用以及传统行业的AI改造。红杉合伙人表示，生成式AI正在重塑所有行业，现在是投资AI的黄金时期。该基金已完成首笔投资，向AI安全初创公司Scale AI投资1.5亿美元。业内人士认为，这一举措将进一步推动AI行业的快速发展...',
      source: 'VentureBeat',
      publishedAt: new Date(2025, 5, 17, 7, 45),
      category: '风险投资',
      impact: 'high',
      readTime: 3
    },
    {
      id: '4',
      title: '英伟达H200芯片供不应求，AI训练成本持续上涨',
      summary: '英伟达最新的H200 GPU严重供不应求，交付周期延长至8-12个月。AI公司纷纷抢购算力资源，大模型训练成本较去年同期上涨150%，成为制约AI创业公司发展的关键因素。',
      keywords: ['英伟达', 'H200', '算力短缺', 'AI成本'],
      content: '据多家AI公司反映，英伟达H200 GPU的供应严重不足，目前订单交付周期已延长至8-12个月。这导致AI训练成本大幅上涨，GPT规模模型的训练费用较去年同期上涨150%。多家AI初创公司被迫调整产品路线图，优先考虑模型优化而非规模扩张。分析师指出，算力瓶颈正成为AI行业发展的最大制约因素，谁能解决算力供应问题，谁就能在AI竞赛中占据优势...',
      source: 'AI硬件观察',
      publishedAt: new Date(2025, 5, 17, 6, 20),
      category: 'AI基础设施',
      impact: 'high',
      readTime: 3
    },
    {
      id: '5',
      title: 'AI独角兽Hugging Face考虑IPO，估值或达200亿美元',
      summary: 'AI开源平台Hugging Face正与投行接洽，考虑在2025年下半年进行IPO。知情人士透露，公司估值可能达到200亿美元，将成为今年最大规模的AI公司上市案例。',
      keywords: ['Hugging Face', 'IPO', '开源AI', '上市'],
      content: 'AI开源平台Hugging Face正在考虑于2025年下半年进行首次公开募股(IPO)。据知情人士透露，公司已与高盛、摩根士丹利等投行进行初步接洽，预期估值可能达到200亿美元。Hugging Face作为全球最大的AI模型开源社区，拥有超过100万注册开发者和50万个AI模型。公司年收入已突破5亿美元，主要来自企业级服务和云计算业务。如果成功上市，将成为继OpenAI之后又一个AI独角兽成功案例...',
      source: 'Bloomberg',
      publishedAt: new Date(2025, 5, 17, 5, 10),
      category: 'IPO上市',
      impact: 'medium',
      readTime: 4
    },
    {
      id: '6',
      title: '欧盟AI法案正式生效，合规成本成投资新考量',
      summary: '欧盟人工智能法案正式生效，对高风险AI系统实施严格监管。AI公司需投入大量资源确保合规，合规成本成为风投评估AI项目的重要指标。',
      keywords: ['欧盟AI法案', '监管合规', '投资风险', '政策影响'],
      content: '欧盟《人工智能法案》今日正式生效，这是全球首部全面的AI监管法律。法案将AI系统分为四个风险等级，对高风险AI应用实施严格的合规要求。据估算，大型AI公司可能需要投入数千万美元确保合规。这一变化已经影响到风投的投资决策，合规成本和监管风险成为评估AI项目的重要指标。多家AI初创公司表示将设立专门的合规团队，部分投资机构也开始重新评估欧洲AI项目的投资价值...',
      source: 'EuroAI Policy',
      publishedAt: new Date(2025, 5, 16, 16, 30),
      category: 'AI监管',
      impact: 'medium',
      readTime: 3
    }
  ];  // 关键词选择处理
  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => {
      const newKeywords = prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword];
      
      // 基于关键词生成问题推荐
      generateQuestionSuggestions(newKeywords);
      return newKeywords;
    });
  };

  // 基于关键词生成意图识别和问题推荐
  const generateQuestionSuggestions = (keywords: string[]) => {
    if (keywords.length === 0) {
      setSuggestedQuestions([]);
      return;
    }

    const suggestions: string[] = [];
    
    // 基于关键词组合生成相关问题
    if (keywords.includes('OpenAI') || keywords.includes('估值')) {
      suggestions.push('分析OpenAI当前估值的合理性和投资风险');
    }
    if (keywords.includes('融资') || keywords.includes('AI初创')) {
      suggestions.push('梳理当前AI领域的投资热点和估值趋势');
    }
    if (keywords.includes('IPO') || keywords.includes('上市')) {
      suggestions.push('评估AI公司IPO的市场时机和投资机会');
    }
    if (keywords.includes('监管') || keywords.includes('AI法案')) {
      suggestions.push('分析AI监管政策对投资的影响和应对策略');
    }
    if (keywords.some(k => ['Claude', 'GPT', '大模型'].includes(k))) {
      suggestions.push('对比分析主流AI大模型的技术优势和商业前景');
    }
    
    // 通用投资分析问题
    if (keywords.length > 1) {
      suggestions.push(`深度研究${keywords.join('、')}相关的投资机会`);
    }
    
    setSuggestedQuestions(suggestions.slice(0, 4));
  };

  const handleClearKeywords = () => {
    setSelectedKeywords([]);
    setSuggestedQuestions([]);
  };

  const handleGenerateReport = () => {
    // 模拟生成报告功能
    console.log('生成报告功能');
    // TODO: 实现基于画布内容生成结构化报告
  };

  const handleContinueResearch = (content: string) => {
    // 基于画布内容继续研究
    const researchQuery = `基于以下内容进行进一步分析：${content}`;
    handleSendMessage(researchQuery, true);
  };

  const handleExportMarkdown = () => {
    // 导出markdown功能在CanvasPanel中实现
    console.log('导出Markdown功能');
  };

  const handleSendMessage = async (content: string, isDeepResearch: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      isDeepResearch,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);    if (isDeepResearch) {
      // 如果当前是home模式，先切换到chat模式进行加载
      if (layoutMode === 'home') {
        setLayoutMode('chat');
      }
      // 不立即切换到research模式，等加载完成后再切换
      
      setIsDeepResearching(true);
      setResearchProgress(0);
      
      // 立即添加一个加载中的AI消息
      const loadingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        type: 'assistant',
        isDeepResearch: true,
        timestamp: new Date(),
        isLoading: true,
        loadingProgress: 0
      };
      
      setMessages(prev => [...prev, loadingMessage]);
      
      const progressInterval = setInterval(() => {
        setResearchProgress(prev => {
          const newProgress = prev + 10;
          
          // 更新加载消息的进度
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === loadingMessage.id 
                ? { ...msg, loadingProgress: newProgress }
                : msg
            )
          );
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsDeepResearching(false);
            
            // 加载完成后切换到research模式
            setLayoutMode('research');
            
            // 替换加载消息为实际内容
            setMessages(prevMessages => 
              prevMessages.map(msg => 
                msg.id === loadingMessage.id 
                  ? { 
                      ...msg, 
                      content: '基于深度分析，我为您整理了以下AI投资研究报告。当前AI市场正处于快速发展期，大模型技术突破推动产业格局重塑，投资机会主要集中在基础设施、应用层和垂直领域。建议重点关注算力供应链、AI原生应用和行业AI解决方案的投资机会。',
                      isLoading: false,
                      loadingProgress: undefined
                    }
                  : msg
              )
            );            setResearchReport([
              {
                id: 'executive-summary',
                title: '执行摘要',
                content: '人工智能产业正处于爆发式增长期，预计2025年全球AI市场规模将达到5,940亿美元。大语言模型技术的突破性进展催生了新一轮投资热潮，头部AI公司估值快速攀升。OpenAI最新估值达1,570亿美元，Anthropic、Mistral等公司也相继完成大规模融资。',
                type: 'summary',
                references: ['McKinsey Global Institute AI Report 2025', 'PitchBook AI Investment Data'],
                metadata: {
                  source: 'AI Investment Research Team',
                  confidence: 0.95,
                  lastUpdated: new Date()
                }
              },
              {
                id: 'market-overview',
                title: '市场概况与趋势分析',
                content: `## 全球AI市场规模与增长

全球人工智能市场正经历前所未有的增长速度。根据IDC最新报告，2025年全球AI支出预计将达到1,540亿美元，同比增长36.8%。其中，生成式AI细分市场表现尤为突出，占据整体市场份额的31.2%。

### 关键增长驱动因素

**技术突破**：大语言模型（LLM）能力的显著提升，特别是在推理、代码生成和多模态理解方面的进展，为AI应用开辟了更广阔的市场空间。

**企业采用加速**：财富500强企业中，已有78%开始部署生成式AI解决方案，较2024年增长142%。

**投资热潮**：2025年上半年，AI领域风险投资总额已达520亿美元，超过2024年全年的480亿美元。

### 区域市场表现

- **北美**：占据全球AI市场65%份额，以技术创新和大型科技公司为主导
- **中国**：市场份额约20%，在计算机视觉和语音识别领域具有优势  
- **欧洲**：份额约12%，在AI监管和伦理AI方面引领全球`,
                type: 'paragraph',
                references: [
                  'IDC Worldwide Artificial Intelligence Spending Guide 2025',
                  'Fortune 500 AI Adoption Survey 2025',
                  'CB Insights State of AI Report 2025'
                ],
                metadata: {
                  source: 'Market Research Division',
                  confidence: 0.92,
                  lastUpdated: new Date()
                }
              },
              {
                id: 'investment-landscape',
                title: '投资格局与机会分析',
                content: `## AI投资三层架构

当前AI投资机会可分为三个核心层次，每层都有其独特的风险收益特征：

### 1. 基础设施层（Infrastructure Layer）
**市场特征**：高壁垒、大规模资本需求、长期回报稳定

**核心投资标的**：
- **AI芯片设计**：英伟达H200/H100供不应求，Cerebras、Graphcore等专用AI芯片厂商估值攀升
- **云计算平台**：AWS、Azure、GCP在AI训练和推理服务上投入巨资
- **数据中心**：AI专用数据中心建设热潮，液冷技术、高密度计算成为关键

> *"GPU是新时代的石油，谁掌控了算力，谁就掌控了AI的未来。"* —— 英伟达CEO黄仁勋

### 2. 模型层（Model Layer）  
**市场特征**：技术密集、人才竞争激烈、赢家通吃效应明显

**投资亮点**：
- **大模型开发**：OpenAI、Anthropic、Mistral领衔，开源模型生态快速发展
- **AI框架平台**：Hugging Face、LangChain等开发者生态价值凸显
- **专业模型**：医疗AI、金融AI、法律AI等垂直领域专用模型

### 3. 应用层（Application Layer）
**市场特征**：商业化速度快、用户获取成本低、市场空间巨大

**热门赛道**：
- **AI助手与工具**：Notion AI、Jasper、Copy.ai等生产力工具
- **代码生成**：GitHub Copilot、Cursor、Replit等开发者工具  
- **创意内容**：Midjourney、Runway、ElevenLabs等内容生成平台`,
                type: 'paragraph',
                references: [
                  'Andreessen Horowitz AI Investment Thesis 2025',
                  'Sequoia Capital AI Market Map',
                  'Goldman Sachs AI Investment Report'
                ],
                metadata: {
                  source: 'Investment Strategy Team',
                  confidence: 0.89,
                  lastUpdated: new Date()
                }
              },
              {
                id: 'risk-analysis',
                title: '风险评估与监管环境',
                content: `## 主要投资风险

### 技术风险
- **技术路线不确定性**：Transformer架构是否会被新技术超越
- **算力瓶颈**：GPU供应短缺可能持续至2026年
- **模型同质化**：开源模型普及可能侵蚀商业模型护城河

### 市场风险  
- **估值泡沫**：部分AI公司估值脱离基本面，存在回调风险
- **竞争加剧**：科技巨头大举进入，创业公司面临激烈竞争
- **商业化挑战**：从技术demo到规模化商业应用仍有距离

### 监管风险
**欧盟AI法案**已于2025年6月正式生效，对高风险AI系统实施严格监管：
- 禁止某些AI应用（如社会信用评分系统）
- 高风险AI系统需要进行合规性评估
- 违规企业可能面临最高全球年营业额7%的罚款

**美国AI监管**正在加速推进，拟对大型AI模型实施安全测试要求。

**中国AI监管**聚焦算法安全和数据保护，对境外数据传输实施严格限制。`,
                type: 'paragraph',
                references: [
                  'EU AI Act Official Text 2025',
                  'NIST AI Risk Management Framework',
                  'CAC AI Algorithm Management Regulations'
                ],
                metadata: {
                  source: 'Legal & Compliance Team',
                  confidence: 0.97,
                  lastUpdated: new Date()
                }
              },
              {
                id: 'investment-recommendations',
                title: '投资建议与配置策略',
                content: `## 投资组合建议

### 短期配置（6-12个月）
**权重：35%**
- **AI基础设施**：重点关注GPU供应链上游，如台积电、ASML等半导体设备商
- **AI安全合规**：随着监管趋严，合规解决方案需求激增
- **多模态AI应用**：图像、视频、音频AI应用商业化加速

### 中期配置（1-3年）  
**权重：45%**
- **边缘AI芯片**：随着AI推理本地化趋势，边缘计算芯片需求增长
- **行业专用大模型**：医疗、金融、法律等垂直领域AI解决方案
- **AI+传统行业**：制造业、零售业、教育行业的AI改造机会

### 长期配置（3-5年）
**权重：20%**
- **AGI基础研究**：通用人工智能相关的前沿技术投资
- **量子计算+AI**：量子机器学习可能带来的技术变革
- **脑机接口**：下一代人机交互技术

## 投资策略建议

### 组合投资原则
1. **分散风险**：不同层次、不同阶段的项目组合
2. **持续投资**：采用分批投资策略，应对估值波动
3. **深度调研**：重点关注技术可行性和商业化路径

### 尽职调查要点
- **技术壁垒**：核心技术是否具有可防御性
- **团队实力**：是否具备顶尖AI人才
- **数据优势**：是否拥有独特的训练数据
- **商业模式**：是否有清晰的盈利路径
- **监管合规**：是否满足各地区监管要求

*预计回报：基础设施层IRR 15-25%，模型层IRR 25-50%，应用层IRR 20-40%*`,
                type: 'paragraph',
                references: [
                  'BCG AI Investment ROI Analysis 2025',
                  'Bain Capital AI Portfolio Performance Report',
                  'MIT Technology Review AI Investment Guide'
                ],
                metadata: {
                  source: 'Portfolio Management Team',
                  confidence: 0.87,
                  lastUpdated: new Date()
                }
              }
            ]);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    } else {
      // 进入普通聊天模式
      if (layoutMode === 'home') {
        setLayoutMode('chat');
      }
      
      setTimeout(() => {        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: '基于当前AI市场动态，我建议重点关注以下投资机会：1. 大模型基础设施领域的芯片和算力供应商 2. 垂直行业AI应用的早期项目 3. AI安全和合规解决方案提供商 4. 开源AI生态的商业化机会...',
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
    return (      <div className="h-screen w-full bg-background overflow-hidden relative">
        {/* 新闻卡片主界面 */}
        <div className="h-full pb-28 overflow-auto">          <div className="p-6">
            <NewsPanel 
              news={mockNews} 
              onNewsSelect={setSelectedNews}
              selectedNews={selectedNews}
              mode="cards"
              selectedKeywords={selectedKeywords}
              onKeywordToggle={handleKeywordToggle}
            />
          </div>
        </div>        {/* 悬浮的输入框 */}
        <div className="fixed bottom-8 left-8 right-8 z-50">
          <div className="max-w-3xl mx-auto">
            <ChatPanel
              messages={[]}
              onSendMessage={handleSendMessage}
              isDeepResearching={false}
              researchProgress={0}
              mode="input-only"
              selectedKeywords={selectedKeywords}
              suggestedQuestions={suggestedQuestions}
              onClearKeywords={handleClearKeywords}
            />
          </div>
        </div>
      </div>
    );
  }
  // 普通聊天模式
  if (layoutMode === 'chat') {
    return (
      <div className="h-screen w-full bg-background overflow-hidden relative">
        {/* 顶部返回按钮 */}
        <div className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center px-4 flex-shrink-0">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="flex items-center gap-2"
          >
            ← 返回首页
          </Button>
        </div>        {/* 新闻-聊天组合布局 */}
        <div style={{height: 'calc(100vh - 4rem)'}}>
          <NewsChatLayout
            news={mockNews}
            onNewsSelect={setSelectedNews}
            selectedNews={selectedNews}
            newsMode="compact"
            selectedKeywords={selectedKeywords}
            onKeywordToggle={handleKeywordToggle}
            maxKeywords={4} // 聊天模式下也显示4个关键词，保持与首页一致
            messages={messages}
            onSendMessage={handleSendMessage}
            isDeepResearching={isDeepResearching}
            researchProgress={researchProgress}
            suggestedQuestions={suggestedQuestions}
            onClearKeywords={handleClearKeywords}
            chatPlaceholder={{
              title: "开始对话",
              subtitle: "输入您的AI投资问题，获得专业分析"
            }}
          />
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
      </div>      {/* 主内容区域 */}
      <div className="flex h-[calc(100vh-4rem)] relative">        {/* 左侧：新闻 + 聊天 */}
        <div style={{ width: showCanvas ? `${threePanelSizes[0]}%` : `${twoPanelSizes[0]}%` }} className="h-full flex flex-col relative">
          <NewsChatLayout
            news={mockNews}
            onNewsSelect={setSelectedNews}
            selectedNews={selectedNews}
            newsMode="compact"
            selectedKeywords={selectedKeywords}
            onKeywordToggle={handleKeywordToggle}
            maxKeywords={4} // 研究模式下也显示4个关键词，保持一致性
            messages={messages}
            onSendMessage={handleSendMessage}
            isDeepResearching={isDeepResearching}
            researchProgress={researchProgress}
            suggestedQuestions={suggestedQuestions}
            onClearKeywords={handleClearKeywords}
          />
        </div><ResizableHandle onMouseDown={(e) => showCanvas ? handleThreePanelMouseDown(e, 0) : handleTwoPanelMouseDown(e, 0)} />

        {/* 中间：研究报告 */}
        <div style={{ width: showCanvas ? `${threePanelSizes[1]}%` : `${twoPanelSizes[1]}%` }} className="h-full">
          <ResearchPanel 
            report={researchReport}
            onDragToCanvas={handleDragToCanvas}
          />
        </div>        {/* 右侧：画布（可选） */}
        {showCanvas && (
          <>
            <ResizableHandle onMouseDown={(e) => handleThreePanelMouseDown(e, 1)} />
            <div style={{ width: `${threePanelSizes[2]}%` }} className="h-full w-full">              <CanvasPanel 
                blocks={canvasBlocks}
                onBlocksChange={setCanvasBlocks}
                onGenerateReport={handleGenerateReport}
                onContinueResearch={handleContinueResearch}
                onExportMarkdown={handleExportMarkdown}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
