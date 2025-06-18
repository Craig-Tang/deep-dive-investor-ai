import type { ReportBlock } from '@/pages/Index';

export interface ResearchReport {
  id: string;
  title: string;
  date: Date;
  query: string;
  blocks: ReportBlock[];
}

export const mockResearchReports: ResearchReport[] = [
  {
    id: 'report-1',
    title: 'OpenAI投资分析报告',
    date: new Date(2025, 5, 17, 14, 30),
    query: 'OpenAI投资价值分析和竞争优势',
    blocks: [
      {
        id: 'block-1',
        title: '公司概况',
        content: `OpenAI成立于2015年，是全球领先的人工智能研究公司。公司致力于开发安全、有益的人工通用智能(AGI)。

**核心产品**：
- GPT系列大语言模型
- ChatGPT对话式AI助手
- DALL-E图像生成模型
- Codex代码生成模型

**商业模式**：
- API订阅服务
- ChatGPT Plus/Pro订阅
- 企业级解决方案
- 技术授权合作`,
        type: 'paragraph',
        references: ['OpenAI官网', 'TechCrunch报道'],
        metadata: {
          source: 'OpenAI Annual Report 2024',
          confidence: 0.95,
          lastUpdated: new Date(2025, 5, 17)
        }
      },
      {
        id: 'block-2',
        title: '财务表现',
        content: `**2024年财务数据**：
- 年收入：34亿美元（同比增长300%）
- 毛利率：68%
- 月活跃用户：1.8亿
- API调用量：每日100亿次

**收入构成**：
1. API服务：60%
2. ChatGPT订阅：25% 
3. 企业解决方案：15%`,
        type: 'summary',
        references: ['财务报表', 'Bloomberg分析'],
        metadata: {
          source: 'OpenAI Financial Report Q4 2024',
          confidence: 0.88,
          lastUpdated: new Date(2025, 5, 17)
        }
      },
      {
        id: 'block-3',
        title: '投资优势分析',
        content: `1. **技术领先**：在大语言模型领域保持技术优势，GPT-4性能领先竞争对手
2. **生态护城河**：拥有庞大的开发者生态和API用户基础
3. **商业化成功**：从研究转向商业化的成功案例
4. **战略合作**：与微软深度合作，获得强大的算力和渠道支持
5. **人才优势**：汇聚全球顶尖AI研究人才`,
        type: 'list',
        references: ['投资分析报告', 'AI行业研究'],
        metadata: {
          source: 'Venture Capital Analysis',
          confidence: 0.92,
          lastUpdated: new Date(2025, 5, 17)
        }
      },
      {
        id: 'block-4',
        title: '风险因素',
        content: `> "AI领域竞争激烈，技术迭代快速，需要持续巨额研发投入以保持领先地位。"

**主要风险**：
- 监管政策不确定性
- 计算成本高昂
- 竞争对手追赶
- AI安全和伦理问题
- 人才流失风险`,
        type: 'quote',
        references: ['风险评估报告'],
        metadata: {
          source: 'Risk Assessment Team',
          confidence: 0.85,
          lastUpdated: new Date(2025, 5, 17)
        }
      }
    ]
  },
  {
    id: 'report-2',
    title: 'AI算力行业研究报告',
    date: new Date(2025, 5, 16, 10, 15),
    query: 'AI算力行业发展趋势和投资机会',
    blocks: [
      {
        id: 'block-5',
        title: '行业概述',
        content: `AI算力行业是人工智能发展的基础设施，包括AI芯片、云计算、数据中心等关键环节。

**市场规模**：
- 2024年全球AI芯片市场：850亿美元
- 预计2027年达到2,400亿美元
- 年复合增长率：42%

**产业链结构**：
上游：芯片设计、制造
中游：服务器、数据中心
下游：云服务、AI应用`,
        type: 'paragraph',
        references: ['IDC报告', '半导体行业协会'],
        metadata: {
          source: 'Industry Research Report',
          confidence: 0.90,
          lastUpdated: new Date(2025, 5, 16)
        }
      },
      {
        id: 'block-6',
        title: '主要玩家',
        content: `**芯片厂商**：
- 英伟达：市场占有率80%，H100/H200系列领先
- AMD：MI300X系列，性价比优势
- 英特尔：Gaudi系列，积极追赶
- 谷歌：TPU自研芯片，垂直整合

**云服务商**：
- AWS：EC2 P5实例，自研Trainium芯片
- 微软Azure：与OpenAI深度合作
- 谷歌云：TPU优势，AI平台完善
- 阿里云：自研含光芯片，国内领先`,
        type: 'summary',
        references: ['市场调研', '公司财报'],
        metadata: {
          source: 'Market Research Team',
          confidence: 0.93,
          lastUpdated: new Date(2025, 5, 16)
        }
      },
      {
        id: 'block-7',
        title: '投资建议',
        content: `1. **关注头部厂商**：英伟达仍是首选，但估值较高需谨慎
2. **布局产业链**：数据中心、散热、电源等配套产业
3. **新兴技术**：光芯片、量子计算等前沿技术
4. **国产替代**：关注国内AI芯片厂商的技术突破
5. **应用场景**：重点关注垂直领域的AI应用需求`,
        type: 'list',
        references: ['投资策略报告'],
        metadata: {
          source: 'Investment Strategy Team',
          confidence: 0.87,
          lastUpdated: new Date(2025, 5, 16)
        }
      }    ]
  },
  {
    id: 'report-3',
    title: '2025年人工智能产业投资深度研究报告',
    date: new Date(2025, 5, 18, 9, 0),
    query: '人工智能产业链投资机会全景分析',
    blocks: [
      {
        id: 'block-8',
        title: '执行摘要',
        content: `人工智能正处于从技术突破向商业化应用转变的关键节点。本报告深入分析了AI产业链的投资机会，重点关注大模型、AI应用、算力基础设施三大核心赛道。

**关键发现**：
- 全球AI市场规模预计从2024年的1,840亿美元增长至2030年的1.8万亿美元
- 大模型训练成本持续下降，推理成本优化成为新焦点
- 垂直行业AI应用迎来爆发期，医疗、金融、制造业应用价值凸显
- 中美AI竞争格局下，国产化替代加速推进

**投资策略**：建议重点关注具备技术护城河的头部公司、有明确商业化路径的AI应用企业，以及受益于国产化替代的基础设施供应商。`,
        type: 'summary',
        references: ['麦肯锡AI报告2025', 'PwC全球AI研究', 'IDC AI市场预测'],
        metadata: {
          source: 'Deep Dive Research Team',
          confidence: 0.96,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-9',
        title: '市场环境分析',
        content: `## 宏观环境

**政策环境**：
- 美国《CHIPS法案》推动本土半导体发展
- 中国《数据二十条》释放数据要素价值
- 欧盟《AI法案》建立全球首个AI监管框架
- 各国争相发布AI国家战略，竞争白热化

**技术发展**：
- 大模型参数规模增长放缓，效率优化成新重点
- 多模态AI技术日趋成熟，应用场景大幅扩展
- 边缘AI芯片性能提升，端侧部署成为可能
- AI Agent技术突破，自主决策能力显著增强

**资本环境**：
- 2024年全球AI投资达1,250亿美元，同比增长23%
- 头部基金加大AI布局，估值分化明显
- IPO市场回暖，优质AI公司估值重塑
- 中美科技脱钩影响投资策略调整

**市场需求**：
企业数字化转型需求旺盛，AI渗透率快速提升。据调研，78%的企业计划在未来两年内增加AI投入，平均预算增幅达45%。`,
        type: 'paragraph',
        references: ['政府政策文件', '技术白皮书', '投资机构报告', '企业调研数据'],
        metadata: {
          source: 'Market Environment Analysis',
          confidence: 0.91,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-10',
        title: '产业链深度解析',
        content: `## 上游：算力基础设施

**AI芯片市场**：
- 训练芯片：英伟达H100/H200占据主导，单价15-40万美元
- 推理芯片：竞争激烈，AMD、英特尔、谷歌TPU形成多元格局
- 国产芯片：华为昇腾、燧原科技等技术突破，但生态仍需完善

**数据中心**：
- AI训练中心投资激增，单个超算中心投资超100亿元
- 液冷技术成标配，能耗优化迫在眉睫
- 边缘数据中心需求爆发，支撑实时AI应用

## 中游：模型与平台

**基础大模型**：
- OpenAI GPT系列领先，但技术优势缩小
- 开源模型Llama、Mistral快速追赶
- 中文大模型百花齐放，文心一言、通义千问、智谱ChatGLM竞争激烈

**AI平台与工具**：
- MLOps平台需求旺盛，帮助企业降低AI应用门槛
- 向量数据库成新兴赛道，支撑RAG应用
- AI开发框架持续演进，降低开发复杂度

## 下游：行业应用

**金融科技**：
- 智能投顾AUM突破5万亿美元
- AI风控系统显著降低坏账率
- 程序化交易AI化程度持续提升

**医疗健康**：
- AI药物发现周期缩短至3-5年
- 医学影像AI产品获批加速
- 数字疗法市场规模预计达320亿美元

**智能制造**：
- 工业视觉检测精度提升至99.9%
- 预测性维护降低停机时间30%
- 智能供应链优化库存成本15-25%`,
        type: 'paragraph',
        references: ['产业链调研报告', 'Gartner技术成熟度曲线', '行业案例分析'],
        metadata: {
          source: 'Industry Chain Analysis',
          confidence: 0.94,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-11',
        title: '重点公司分析',
        content: `## 国际领先企业

**NVIDIA (NVDA)**
- 市值：2.8万亿美元
- 核心优势：GPU计算生态、CUDA软件栈
- 财务表现：2024财年收入608亿美元，数据中心业务增长217%
- 投资观点：AI基础设施龙头，长期受益于算力需求增长

**Microsoft (MSFT)**
- AI战略：全线产品AI化，Copilot生态构建
- OpenAI合作：独家云服务提供商，技术深度绑定
- 商业化成果：Copilot系列产品月活超3亿
- 投资观点：AI应用层最佳标的，生态护城河深厚

**Alphabet (GOOGL)**
- 技术实力：Transformer架构原创者，Gemini模型竞争力强
- 商业化：搜索广告AI优化，云服务AI差异化
- 挑战：面临OpenAI+微软组合竞争压力
- 投资观点：技术底蕴深厚，但商业化执行需观察

## 中国优质标的

**百度 (BIDU)**
- 技术地位：中文大模型领先者，文心一言用户破亿
- 商业化：AI云服务快速增长，智能驾驶商业化落地
- 财务表现：AI云业务收入同比增长26%
- 投资观点：AI技术商业化转化效率高，估值相对合理

**商汤科技 (0020.HK)**
- 技术优势：计算机视觉领域深度积累
- 业务转型：从CV向通用AI平台转型
- 挑战：现金流压力，需要加速商业化
- 投资观点：技术实力强但需关注经营改善

**科大讯飞 (002230.SZ)**
- 核心优势：语音识别技术领先，教育场景深度渗透
- AI战略：讯飞星火大模型，垂直场景应用
- 财务表现：AI产品收入占比持续提升
- 投资观点：垂直AI应用典型代表，成长性较好`,
        type: 'paragraph',
        references: ['公司财报', '券商研究报告', '实地调研'],
        metadata: {
          source: 'Company Analysis Team',
          confidence: 0.89,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-12',
        title: '投资机会与风险',
        content: `## 核心投资机会

**1. AI基础设施持续景气**
- 算力需求呈指数级增长，供需缺口持续扩大
- 数据中心、AI芯片、网络设备等基础设施投资机会
- 建议关注：英伟达、AMD、博通、台积电

**2. 企业级AI应用爆发**
- B端付费意愿强，商业模式清晰
- 垂直行业解决方案具备高护城河
- 建议关注：Salesforce、ServiceNow、Palantir

**3. AI原生应用崛起**
- 新一代AI应用重构用户体验
- 创业公司估值重塑，并购机会增加
- 建议关注：Character.AI、Anthropic、Midjourney

**4. 国产化替代加速**
- 政策支持下国产AI产业链快速发展
- 在特定领域有望实现技术突破
- 建议关注：寒武纪、海光信息、兆易创新

## 主要投资风险

**技术风险**：
- AI技术迭代快速，投资标的面临技术路径选择风险
- 大模型训练成本居高不下，中小企业难以承受
- AI安全问题可能引发监管收紧

**市场风险**：
- AI应用商业化进度低于预期
- 宏观经济下行影响企业IT支出
- 中美科技竞争加剧影响供应链稳定

**估值风险**：
- 部分AI概念股估值过高，泡沫风险积聚
- 市场情绪波动大，短期波动性较高
- 业绩兑现压力增大，需要关注基本面

**监管风险**：
- 各国AI监管政策趋严，合规成本上升
- 数据隐私保护要求提高，影响AI训练
- 知识产权争议可能影响AI发展`,
        type: 'paragraph',
        references: ['风险评估模型', '监管政策分析', '市场情绪指标'],
        metadata: {
          source: 'Risk Management Team',
          confidence: 0.87,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-13',
        title: '投资策略建议',
        content: `## 核心投资逻辑

基于对AI产业发展阶段的判断，我们认为当前正处于AI技术从"概念验证"向"规模商业化"转变的关键节点。投资策略应聚焦于具备以下特征的标的：

1. **技术护城河深厚**：拥有核心技术专利或数据优势
2. **商业化路径清晰**：已验证的商业模式和付费客户
3. **市场空间广阔**：所处赛道具备万亿级市场潜力
4. **管理团队优秀**：具备技术背景和商业化执行能力

## 分层投资策略

**核心配置（50%仓位）**：
- 英伟达：AI算力基础设施龙头，受益确定性最高
- 微软：AI应用生态最完善，商业化程度最高
- 台积电：AI芯片制造关键环节，技术壁垒极高

**成长配置（30%仓位）**：
- AMD：GPU市场挑战者，性价比优势明显
- 百度：中文AI生态领导者，估值相对合理
- Palantir：企业级AI应用标杆，政府客户粘性强

**弹性配置（20%仓位）**：
- ARM：AI边缘计算受益者，IPO后关注度高
- C3.ai：纯AI软件公司，弹性最大
- 寒武纪：国产AI芯片代表，政策支持力度大

## 时间配置策略

**短期（6-12个月）**：
关注财报季AI业务表现，重点配置已有明确业绩支撑的标的

**中期（1-3年）**：
AI应用大规模落地期，关注垂直行业解决方案提供商

**长期（3-5年）**：
AGI技术突破期，关注具备技术突破潜力的前沿公司

## 风险管理

**仓位控制**：
- AI主题投资仓位不超过总资产的40%
- 单一标的仓位不超过10%
- 保持适度现金比例应对波动

**动态调整**：
- 季度调仓，根据基本面变化调整持仓结构
- 设置止损线，单一标的最大亏损不超过15%
- 关注技术进展和政策变化，及时调整策略`,
        type: 'paragraph',
        references: ['投资组合理论', '风险管理框架', '历史回测数据'],
        metadata: {
          source: 'Investment Strategy Committee',
          confidence: 0.92,
          lastUpdated: new Date(2025, 5, 18)
        }
      },
      {
        id: 'block-14',
        title: '结论与展望',
        content: `> "人工智能不仅是一次技术革命，更是一次产业革命。我们正站在历史的转折点上，见证着人类文明的重大跃升。"

## 核心结论

**市场机遇**：
人工智能产业正处于黄金发展期，未来5年将是AI大规模商业化的关键窗口期。基础设施建设、模型训练、应用开发等各环节都存在巨大投资机会。

**投资主线**：
1. **算力基础设施**：确定性最高，英伟达等龙头企业将持续受益
2. **AI应用平台**：商业化程度高，微软、百度等生态型企业价值凸显
3. **垂直行业AI**：差异化竞争，医疗、金融、制造等领域机会丰富
4. **国产化替代**：政策驱动，国产AI产业链迎来历史机遇

**关键变量**：
- AGI技术突破时间点
- AI监管政策演进方向
- 中美科技竞争格局变化
- 企业AI应用渗透速度

## 未来展望

**技术演进**：
- 大模型向多模态、具身智能方向发展
- 边缘AI芯片性能大幅提升，成本快速下降
- AI Agent技术成熟，自主决策能力显著增强
- 量子计算与AI结合，带来算力革命性突破

**应用拓展**：
- AI在科学研究中的作用日益重要，加速新药发现、材料设计
- 自动驾驶技术突破，L4级别自动驾驶开始商业化
- AI教育个性化程度提升，因材施教成为可能
- 创意产业AI化，内容创作效率大幅提升

**产业格局**：
- 中美AI竞争进入新阶段，技术标准之争愈发激烈
- 欧洲AI监管框架逐步完善，全球治理体系初步形成
- 新兴市场AI应用需求爆发，成为新的增长点
- AI产业生态进一步完善，开源与闭源并存发展

**投资启示**：
人工智能投资需要长期视角和专业判断。建议投资者关注技术发展趋势，选择具备核心竞争力的优质标的，同时做好风险管理，在这一历史性机遇中获得长期回报。`,
        type: 'quote',
        references: ['行业专家访谈', '未来学研究', '技术路线图', '政策趋势分析'],
        metadata: {
          source: 'Strategic Research Team',
          confidence: 0.88,
          lastUpdated: new Date(2025, 5, 18)
        }
      }
    ]
  }
];
