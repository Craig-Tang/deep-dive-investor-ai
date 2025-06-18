import { useEffect, useCallback, useMemo } from 'react';
import { useLayoutState } from './useLayoutState';
import { useNewsState } from './useNewsState';
import { useChatState } from './useChatState';
import { useResearchState } from './useResearchState';
import type { NewsItem, Message, ReportBlock } from '@/types/common';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  data: ReportBlock[] | Record<string, unknown>;
}

export const useAppState = () => {
  const layout = useLayoutState();
  const news = useNewsState();
  const chat = useChatState();
  const research = useResearchState();  // 监听关键词变化，自动更新推荐问题
  useEffect(() => {
    const keywords = news.selectedKeywords;
    
    const generateAndSetSuggestions = () => {
      if (keywords.length === 0) {
        // 没有关键词时使用默认推荐问题
        chat.setSuggestions([
          '分析OpenAI融资对AI行业的影响',
          '评估当前AI投资风险',
          '推荐AI细分领域投资机会',
          '对比主要AI公司估值'
        ]);
        return;
      }

      // 基于关键词生成动态问题
      const keywordText = keywords.join('、');
      const suggestions: string[] = [];

      // 根据关键词类型选择合适的模板
      if (keywords.some(k => 
        k.includes('投资') || k.includes('基金') || k.includes('估值') || 
        k.includes('融资') || k.includes('IPO') || k.includes('股价')
      )) {
        suggestions.push(`深入研究${keywordText}的投资前景`);
        suggestions.push(`分析${keywordText}相关公司的估值水平`);
        suggestions.push(`评估${keywordText}领域的投资机会与风险`);
      } else if (keywords.some(k => 
        k.includes('AI') || k.includes('人工智能') || k.includes('机器学习') || 
        k.includes('算法') || k.includes('模型') || k.includes('技术')
      )) {
        suggestions.push(`${keywordText}技术发展趋势分析`);
        suggestions.push(`评估${keywordText}的技术壁垒与竞争优势`);
        suggestions.push(`${keywordText}领域的技术突破对投资的影响`);
      } else if (keywords.some(k => 
        k.includes('市场') || k.includes('行业') || k.includes('趋势') || 
        k.includes('发展') || k.includes('增长') || k.includes('规模')
      )) {
        suggestions.push(`${keywordText}市场规模与增长预期`);
        suggestions.push(`${keywordText}行业竞争格局深度解析`);
        suggestions.push(`${keywordText}的市场机会与挑战分析`);
      } else if (keywords.some(k => 
        k.includes('公司') || k.includes('企业') || k.includes('OpenAI') || 
        k.includes('谷歌') || k.includes('微软') || k.includes('百度')
      )) {
        suggestions.push(`${keywordText}相关龙头企业投资价值分析`);
        suggestions.push(`对比${keywordText}领域主要公司的竞争力`);
        suggestions.push(`${keywordText}赛道的投资标的推荐`);
      } else {
        suggestions.push(`深入研究${keywordText}的投资前景`);
        suggestions.push(`分析${keywordText}的市场机会`);
        suggestions.push(`评估${keywordText}相关的投资风险`);
      }

      // 限制为3个问题
      chat.setSuggestions(suggestions.slice(0, 3));
    };

    generateAndSetSuggestions();
  }, [news.selectedKeywords, chat]); // 依赖关键词变化和chat

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
          content: `基于深度分析，AI投资市场正处于快速发展期。本报告通过多维度分析得出以下核心结论：

**市场概况**：
- 全球AI市场规模预计从2024年的1,840亿美元增长至2030年的1.8万亿美元
- 年复合增长率达43.7%，远超传统科技行业
- 投资热点集中在大模型、算力基础设施、AI应用三大赛道

**关键趋势**：
1. **技术成熟度提升**：GPT、Claude等大模型性能持续优化，商业化应用加速
2. **成本结构优化**：模型训练和推理成本快速下降，使更多企业能够采用AI技术
3. **监管环境明朗**：主要国家AI监管框架逐步完善，为行业发展提供指引
4. **产业生态完善**：从芯片到应用的完整产业链已基本形成

**投资建议**：
重点关注具备技术护城河、商业化路径清晰、市场空间广阔的优质标的。建议采用分层配置策略，核心持仓英伟达、微软等龙头企业，适度配置成长性标的如百度、AMD等。`,
          type: 'summary',
          references: ['McKinsey Global Institute AI Report 2025', 'PwC AI Analysis 2025', 'IDC AI Market Forecast'],
          metadata: {
            source: 'AI Investment Research Team',
            confidence: 0.95,
            lastUpdated: new Date()
          }
        },
        {
          id: 'market-analysis',
          title: '市场深度分析',
          content: `## 宏观环境分析

**政策环境**：
全球主要国家均将AI视为战略性新兴产业，政策支持力度空前。美国通过《CHIPS法案》加强半导体产业链建设；中国发布《数据二十条》释放数据要素价值；欧盟《AI法案》确立全球首个AI监管框架。

**技术发展**：
- **大模型演进**：参数规模增长放缓，效率优化成为新重点
- **多模态突破**：文本、图像、视频、音频等多模态AI技术日趋成熟
- **边缘计算**：AI芯片性能提升，端侧部署成为可能
- **自主决策**：AI Agent技术突破，智能体能力显著增强

**资本流向**：
2024年全球AI投资达1,250亿美元，其中：
- 基础设施投资占45%（563亿美元）
- 应用开发占35%（438亿美元）
- 研发投入占20%（250亿美元）

头部基金加大AI布局，红杉、a16z、Tiger Global等知名机构积极参与。IPO市场回暖，优质AI公司估值重塑。

## 细分赛道分析

**算力基础设施**：
- 训练芯片：英伟达H100/H200主导，单价15-40万美元
- 推理芯片：竞争激烈，AMD MI300X、谷歌TPU、英特尔Gaudi形成多元格局
- 数据中心：AI训练中心投资激增，液冷技术成标配
- 网络设备：高速互联需求爆发，光模块、交换机受益

**软件平台**：
- 基础大模型：OpenAI、Anthropic、Google领先，开源模型快速追赶
- 开发工具：MLOps平台、向量数据库、AI框架持续演进
- 应用平台：企业级AI平台需求旺盛，降低AI应用门槛

**行业应用**：
- 金融：智能投顾、风控、量化交易AI化程度提升
- 医疗：AI药物发现、医学影像、数字疗法快速发展
- 制造：工业视觉、预测维护、智能供应链应用广泛
- 教育：个性化学习、智能辅导、教育内容生成兴起`,
          type: 'paragraph',
          references: ['政府政策文件', 'Gartner技术趋势报告', '投资机构统计数据'],
          metadata: {
            source: 'Market Analysis Team',
            confidence: 0.92,
            lastUpdated: new Date()
          }
        },
        {
          id: 'investment-strategy',
          title: '投资策略与风险管理',
          content: `## 分层投资策略

**核心持仓（50%）**：
选择确定性高、护城河深的龙头企业
- **英伟达(NVDA)**：AI算力基础设施龙头，GPU生态完善
- **微软(MSFT)**：AI应用生态最完善，Copilot产品线成熟
- **台积电(TSM)**：先进制程技术领先，AI芯片制造关键环节

**成长配置（30%）**：
关注有技术突破和商业化潜力的成长股
- **AMD**：数据中心GPU挑战者，性价比优势明显
- **百度**：中文AI生态领导者，商业化进展良好
- **Palantir**：企业级AI应用标杆，政府客户粘性强

**主题配置（20%）**：
布局新兴技术和特殊机会
- **ARM**：AI边缘计算受益者，生态价值重估
- **寒武纪**：国产AI芯片代表，政策支持力度大
- **新兴AI应用**：关注垂直领域的AI原生公司

## 风险识别与应对

**技术风险**：
- AI技术迭代快速，存在技术路径选择风险
- 大模型训练成本高昂，资源密集型特征明显
- 应对策略：分散投资，关注技术发展趋势

**市场风险**：
- AI应用商业化进度可能低于预期
- 宏观经济波动影响企业IT投入
- 应对策略：设置止损线，动态调整仓位

**监管风险**：
- AI监管政策不确定性，合规成本上升
- 数据隐私保护要求提高，影响模型训练
- 应对策略：关注政策动态，选择合规性强的标的

**估值风险**：
- 部分AI概念股估值过高，存在泡沫风险
- 市场情绪波动大，短期波动性较高
- 应对策略：基于基本面分析，避免追高

## 时间配置建议

**短期（6-12个月）**：
关注财报季AI业务表现，重点配置业绩确定性高的标的

**中期（1-3年）**：
AI应用大规模落地期，关注垂直行业解决方案提供商

**长期（3-5年）**：
AGI技术突破期，关注具备技术突破潜力的前沿公司`,
          type: 'paragraph',
          references: ['投资组合理论', '风险管理框架', '历史回测数据'],
          metadata: {
            source: 'Investment Strategy Committee',
            confidence: 0.90,
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
  const handleGenerateReport = async () => {
    // 基于画布内容生成新的研究报告
    const canvasContent = research.canvasBlocks.map(block => block.title).join('、');
    
    if (canvasContent) {
      // 构建生成报告的查询
      const query = `基于画布内容生成详细研究报告：${canvasContent}`;
      
      // 切换到研究模式
      layout.switchToMode('research');
      
      // 启动深度研究生成报告
      await handleSendMessage(query, true);
    }
  };  const handleContinueResearch = async (content: string) => {
    // 构建基于画布内容的研究查询
    const query = `基于以下内容进行深度研究：${content}`;
    
    // 不切换模式，保持当前布局状态
    // 直接添加用户消息到聊天记录
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      type: 'user',
      timestamp: new Date(),
      isDeepResearch: true
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

    chat.startDeepResearch();
    
    // 模拟深度研究进度
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      chat.updateResearchProgress(i);
      chat.updateMessage(assistantMessage.id, { loadingProgress: i });
    }    // 生成新的研究报告内容
    const newReportBlocks: ReportBlock[] = [
      {
        id: 'continue-research-summary',
        title: '基于画布内容的深度分析',
        content: `基于您画布中的内容：${content}，我进行了进一步的深度分析。

## 内容关联性分析

通过对您现有研究内容的深入分析，发现了以下关键关联点和延伸机会：

**核心主题识别**：
- 主要关注领域：人工智能、投资策略、市场分析
- 重点公司：涉及的关键企业和投资标的
- 时间维度：短期机会与长期趋势的平衡

**数据完整性评估**：
- 已有信息的覆盖面分析
- 缺失数据点的识别
- 信息来源的可靠性验证

**逻辑框架梳理**：
您的分析展现了清晰的逻辑结构，从宏观趋势到微观标的，从技术分析到财务评估。基于此框架，我将在以下几个维度进行深化分析。`,
        type: 'summary',
        references: ['Deep Research Analysis', '画布内容分析', '关联性研究'],
        metadata: {
          source: 'AI Research Assistant',
          confidence: 0.92,
          lastUpdated: new Date()
        }
      },
      {
        id: 'continue-research-insights',
        title: '新发现的投资机会',
        content: `通过对现有分析的扩展研究，发现了以下新的投资机会和风险点：

## 新兴投资机会

**1. AI基础设施的细分赛道**
- **光芯片技术**：随着AI计算需求激增，传统电子互联面临带宽和功耗瓶颈，光芯片成为下一代数据中心核心技术
  - 市场规模：预计2027年达到35亿美元
  - 关键公司：Intel、Broadcom、国内的光迅科技、中际旭创
  - 投资逻辑：技术壁垒高，先发优势明显

- **AI专用存储**：大模型训练和推理对存储性能要求极高，催生专用存储解决方案
  - 高带宽内存(HBM)需求爆发，SK海力士、三星、美光受益
  - 存储级内存(SCM)技术突破，英特尔Optane、韩国SK等布局
  - 国产替代机会：长江存储、兆易创新在特定领域有突破潜力

**2. 垂直行业AI应用的隐形冠军**
- **医疗AI**：
  - 药物发现AI：递归制药、英矽智能等，AI缩短新药研发周期
  - 医学影像AI：科亚医疗、推想科技等，产品获批上市加速
  - 数字疗法：Akili Interactive、AppliedVR等，结合AI的治疗方案

- **金融AI**：
  - 量化交易平台：Two Sigma、Renaissance等，AI算法优势显著
  - 智能风控：蚂蚁集团、京东数科等，降低金融风险
  - 保险科技：Lemonade、Root等，AI驱动的保险创新

- **工业AI**：
  - 工业视觉：海康威视、大华股份等，AI赋能制造业升级
  - 预测维护：GE Predix、西门子MindSphere等，降低设备故障率
  - 智能物流：海柔创新、极智嘉等，仓储自动化龙头

## 潜在风险预警

**技术风险**：
- **模型同质化**：大模型技术趋于成熟，差异化优势缩小
- **算力军备竞赛**：训练成本持续攀升，中小企业难以跟进
- **技术路径不确定**：量子计算、神经形态芯片等新技术可能颠覆现有格局

**市场风险**：
- **监管收紧**：各国AI监管政策趋严，合规成本上升
- **地缘政治**：中美科技竞争影响供应链稳定
- **估值泡沫**：部分AI概念股估值过高，回调风险增大

**竞争风险**：
- **开源模型冲击**：Llama、Mistral等开源模型快速发展，冲击商业模型
- **科技巨头垄断**：Google、微软、亚马逊等巨头生态优势明显
- **新入局者**：苹果、特斯拉等公司AI布局，竞争格局变化`,
        type: 'paragraph',
        references: ['Market Analysis Update', '行业深度调研', '风险评估报告'],
        metadata: {
          source: 'Investment Research Team',
          confidence: 0.88,
          lastUpdated: new Date()
        }
      },
      {
        id: 'continue-research-recommendations',
        title: '基于现有分析的优化建议',
        content: `## 投资组合优化建议

基于您当前的分析框架和市场最新变化，提出以下优化建议：

### 仓位调整建议

**增持建议**：
1. **台积电(TSM)**：先进制程技术护城河深厚，AI芯片制造必经之路
   - 目标仓位：从当前建议的15%提升至20%
   - 理由：3nm、2nm制程技术领先，AI芯片需求持续爆发

2. **英伟达(NVDA)**：虽然估值较高，但技术领先优势仍将维持
   - 目标仓位：维持25%核心持仓
   - 理由：B200、H200等新品推出，生态护城河持续加深

3. **微软(MSFT)**：AI应用生态最完善，商业化进展超预期
   - 目标仓位：从18%提升至22%
   - 理由：Copilot系列产品渗透率快速提升，Azure AI服务增长强劲

**新增关注**：
1. **AMD**：数据中心GPU业务快速增长，估值相对合理
   - 建议仓位：8-10%
   - 理由：MI300X系列产品性能提升，与英伟达差距缩小

2. **Palantir**：企业级AI应用标杆，政府合同稳定
   - 建议仓位：5-8%
   - 理由：AI Platform产品化程度高，客户粘性强

**减持建议**：
1. **部分AI概念股**：估值过高、基本面支撑不足的标的
   - 理由：市场情绪修正期，基本面较弱的公司调整压力大

### 风险管理优化

**分散化策略**：
- 地域分散：美股60%、港股25%、A股15%
- 行业分散：基础设施40%、软件平台35%、应用层25%
- 市值分散：大盘股70%、中盘股20%、小盘股10%

**动态调整机制**：
- 季度重新评估投资组合，根据业绩和估值变化调整
- 设置止损线：单一标的最大亏损不超过15%
- 利润保护：涨幅超过50%的标的考虑部分获利了结

### 长期布局方向

**前沿技术投资**：
- 量子计算：IBM、IonQ、国盾量子等
- 脑机接口：Neuralink、Synchron等
- 生物计算：DNA存储、蛋白质折叠AI等

**新兴市场机会**：
- 印度AI市场：Infosys、TCS等传统IT服务商AI转型
- 东南亚数字化：Sea Limited、Grab等平台型公司
- 中东主权基金：关注沙特、阿联酋AI投资基金动向

## 执行建议

**短期操作（1-3个月）**：
- 关注Q4财报季，重点关注AI相关业务表现
- 利用市场波动，分批建仓优质标的
- 关注CES、GTC等技术大会，把握技术趋势

**中期布局（6-12个月）**：
- AI应用大规模商业化落地期，关注收入兑现
- 监管政策明朗化，估值体系重构
- 新产品周期启动，技术更新换代

**长期持有（2-5年）**：
- AGI技术突破期，关注技术领先企业
- AI基础设施成熟期，关注应用层爆发
- 产业格局稳定期，关注龙头企业集中度提升`,
        type: 'paragraph',
        references: ['投资组合优化理论', '风险管理最佳实践', '市场时机分析'],
        metadata: {
          source: 'Portfolio Optimization Team',
          confidence: 0.91,
          lastUpdated: new Date()
        }
      }
    ];

    // 更新研究报告
    research.updateReport(newReportBlocks);

    chat.endDeepResearch();
    chat.updateMessage(assistantMessage.id, {
      content: '基于您画布中的内容，我为您生成了深度研究分析。请查看右侧的研究报告获取详细信息。',
      isLoading: false,
      loadingProgress: undefined
    });
  };
  const handleExportMarkdown = () => {
    // 导出研究报告或画布内容为 Markdown
    const content = layout.layoutMode === 'research-canvas' 
      ? research.canvasBlocks 
      : research.researchReport;
    
    if (!content || content.length === 0) return;
    
    let markdown = `# 投资研究报告\n\n`;
    markdown += `*导出时间: ${new Date().toLocaleString('zh-CN')}*\n\n`;
    
    content.forEach((block, index) => {
      markdown += `## ${index + 1}. ${block.title}\n\n`;
      markdown += `${block.content}\n\n`;
      
      if (block.references && block.references.length > 0) {
        markdown += `### 参考文献\n\n`;
        block.references.forEach((ref, refIndex) => {
          markdown += `${refIndex + 1}. ${ref}\n`;
        });
        markdown += `\n`;
      }
    });
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `投资研究报告_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
