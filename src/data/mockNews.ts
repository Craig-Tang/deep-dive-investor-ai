import type { NewsItem } from '@/pages/Index';

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI发布GPT-5，推动AGI研究重大突破',
    summary: 'OpenAI正式发布GPT-5模型，在推理能力、多模态理解和代码生成方面实现显著提升。新模型在复杂推理任务上的表现接近人类专家水平，标志着通用人工智能研究的重要里程碑。',
    keywords: ['OpenAI', 'GPT-5', 'AGI', '人工智能', '深度学习'],
    content: `OpenAI今日正式发布了备受期待的GPT-5模型，这是该公司在大语言模型领域的又一重大突破。GPT-5在多个关键指标上都实现了显著提升：

## 核心技术突破

**推理能力增强**：GPT-5在复杂逻辑推理、数学问题解决和科学分析方面的表现大幅提升，在多项基准测试中接近或超越人类专家水平。

**多模态理解**：新模型能够同时处理文本、图像、音频和视频输入，实现真正的多模态理解和生成。

**代码生成优化**：在软件开发任务中，GPT-5能够生成更高质量、更安全的代码，并能理解复杂的系统架构。

## 投资影响分析

此次发布对AI投资领域产生重大影响：

1. **技术领导地位**：OpenAI进一步巩固了在AI领域的技术领导地位
2. **商业化前景**：GPT-5的商业化应用将带来新的收入增长点
3. **竞争格局**：其他AI公司面临更大的技术追赶压力

## 市场反应

发布消息公布后，AI相关股票普遍上涨，投资者对人工智能行业的长期前景更加乐观。`,
    source: 'AI科技日报',
    publishedAt: new Date(2025, 5, 18, 10, 30),
    category: 'AI技术',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 5,
    trending: true
  },
  {
    id: '2',
    title: 'Anthropic获得40亿美元C轮融资，估值突破200亿',
    summary: 'AI安全公司Anthropic完成40亿美元C轮融资，由Google领投，亚马逊和软银跟投。本轮融资后公司估值达到200亿美元，将用于扩大Claude模型的研发和商业化部署。',
    keywords: ['Anthropic', 'Claude', '融资', 'AI安全', 'Google'],
    content: `Anthropic宣布完成40亿美元C轮融资，这是今年AI领域最大规模的融资之一。

## 融资详情

**领投方**：Google Ventures领投15亿美元
**跟投方**：亚马逊投资12亿美元，软银愿景基金投资8亿美元
**其他投资者**：包括Spark Capital、General Catalyst等知名VC
**估值**：本轮融资后估值达到200亿美元

## 资金用途

1. **技术研发**：继续投资Claude系列模型的研发
2. **安全研究**：加强AI安全和对齐研究
3. **商业化**：扩大企业客户服务和API业务
4. **人才招聘**：吸引顶尖AI研究人才

## 投资亮点

Anthropic在AI安全领域的技术积累和Claude模型的商业化前景获得投资者高度认可。公司专注于构建有用、无害、诚实的AI系统，这一理念与当前监管趋势高度契合。`,
    source: '投资界',
    publishedAt: new Date(2025, 5, 18, 9, 15),
    category: 'AI投资',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 4,
    trending: true
  },
  {
    id: '3',
    title: 'NVIDIA发布新一代H200 GPU，AI算力性能提升40%',
    summary: 'NVIDIA正式发布H200 Tensor Core GPU，相比H100在AI训练和推理性能上提升40%。新芯片采用先进的HBM3e内存技术，内存带宽达到4.8TB/s，将进一步推动大模型训练效率。',
    keywords: ['NVIDIA', 'H200', 'GPU', 'AI算力', 'HBM3e'],
    content: `NVIDIA发布了新一代数据中心GPU H200，专为AI工作负载优化设计。

## 技术规格

**架构**：基于Hopper架构的增强版本
**内存**：141GB HBM3e高带宽内存
**内存带宽**：4.8TB/s，比H100提升70%
**性能提升**：AI训练性能提升40%，推理性能提升60%

## 市场意义

1. **算力竞争**：在AI算力军备竞赛中保持领先
2. **成本效益**：更高的性能密度降低训练成本
3. **生态系统**：与CUDA生态系统完美集成

## 投资机会

H200的发布将带动整个AI基础设施产业链的升级，包括服务器制造商、云服务提供商和AI应用开发商。`,
    source: '半导体观察',
    publishedAt: new Date(2025, 5, 18, 8, 45),
    category: 'AI硬件',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 3,
    trending: false
  },
  {
    id: '4',
    title: '红杉资本设立50亿美元AI专项基金，专注早期投资',
    summary: '红杉资本宣布设立50亿美元的AI专项投资基金，重点关注AI基础设施、应用层创新和垂直行业解决方案。这是迄今为止专注AI领域的最大规模VC基金。',
    keywords: ['红杉资本', 'AI基金', 'VC投资', '早期投资', '50亿美元'],
    content: `红杉资本正式宣布设立50亿美元AI专项基金，这一举措彰显了顶级VC对AI赛道的长期看好。

## 投资策略

**基础设施层**：AI芯片、云计算、开发工具
**模型层**：大语言模型、多模态AI、专用模型
**应用层**：垂直行业AI解决方案、消费级AI产品
**数据层**：数据处理、标注、隐私计算

## 投资阶段

主要关注种子轮到B轮的早期投资，单笔投资金额从100万到5000万美元不等。

## 市场影响

红杉的大手笔投资将进一步推高AI领域的估值水平，同时也表明机构投资者对AI长期价值的坚定信心。`,
    source: '创投时报',
    publishedAt: new Date(2025, 5, 18, 7, 20),
    category: 'AI投资',
    impact: 'medium',
    imageUrl: '/api/placeholder/400/240',
    readTime: 4,
    trending: false
  },
  {
    id: '5',
    title: 'Meta推出Llama 3模型，开源AI生态持续扩张',
    summary: 'Meta发布开源大语言模型Llama 3，提供7B、13B和70B三个版本。新模型在代码生成、数学推理和多语言理解方面表现优异，进一步推动开源AI生态发展。',
    keywords: ['Meta', 'Llama 3', '开源AI', '大语言模型', '多语言'],
    content: `Meta继续其开源AI战略，发布了Llama 3大语言模型系列。

## 模型规格

**Llama 3-7B**：70亿参数，适合边缘设备部署
**Llama 3-13B**：130亿参数，平衡性能与效率
**Llama 3-70B**：700亿参数，接近GPT-3.5性能

## 技术特点

1. **多语言支持**：支持100+种语言，包括中文优化
2. **代码能力**：在编程任务上表现出色
3. **安全性**：内置安全检测和内容过滤
4. **开放许可**：允许商业使用

## 开源生态影响

Llama 3的发布将进一步促进开源AI生态的繁荣，为中小企业和开发者提供强大的AI能力，同时降低AI应用的门槛。`,
    source: 'AI开源社区',
    publishedAt: new Date(2025, 5, 17, 16, 30),
    category: 'AI技术',
    impact: 'medium',
    imageUrl: '/api/placeholder/400/240',
    readTime: 3,
    trending: false
  },
  {
    id: '6',
    title: '算力短缺推动云服务价格上涨，AI训练成本飙升',
    summary: '全球AI算力需求激增导致GPU资源严重短缺，主要云服务提供商纷纷上调AI训练服务价格。业界预计算力瓶颈将持续到2025年底，推动AI基础设施投资热潮。',
    keywords: ['算力短缺', 'GPU', '云服务', 'AI训练', '价格上涨'],
    content: `全球AI算力市场面临前所未有的供需矛盾，推动整个产业链价格上涨。

## 供需现状

**需求激增**：大模型训练需求同比增长300%
**供给不足**：高端GPU产能受限，交付周期延长至6-12个月
**价格上涨**：云服务AI训练价格普遍上涨30-50%

## 影响分析

1. **成本压力**：AI创业公司面临更高的训练成本
2. **竞争格局**：资金充足的大厂优势进一步扩大
3. **技术创新**：推动模型压缩和效率优化技术发展

## 投资机会

算力短缺催生了新的投资机会：
- 专用AI芯片公司
- 算力云服务平台
- 模型优化工具
- 边缘计算解决方案`,
    source: '云计算周刊',
    publishedAt: new Date(2025, 5, 17, 14, 15),
    category: 'AI基础设施',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 4,
    trending: true
  },
  {
    id: '7',
    title: '欧盟AI法案正式生效，全球AI监管趋严',
    summary: '欧盟人工智能法案正式生效，对高风险AI应用实施严格监管。法案要求AI系统进行风险评估和透明度报告，将对全球AI产业产生深远影响。',
    keywords: ['欧盟', 'AI法案', '监管', '合规', '风险评估'],
    content: `欧盟AI法案的正式生效标志着全球AI监管进入新阶段。

## 法案要点

**风险分级**：将AI系统分为最小、有限、高风险和禁止四个等级
**合规要求**：高风险AI系统需要进行严格的风险评估
**透明度**：要求AI系统提供清晰的用户说明
**数据治理**：对训练数据质量和偏见检测提出要求

## 全球影响

1. **合规成本**：AI公司需要投入更多资源进行合规
2. **技术标准**：推动全球AI技术标准的统一
3. **竞争格局**：合规能力成为新的竞争优势

## 投资视角

监管趋严将催生AI合规、安全和可解释性相关的投资机会，同时推动行业向更加负责任的方向发展。`,
    source: '法规观察',
    publishedAt: new Date(2025, 5, 17, 11, 45),
    category: '政策法规',
    impact: 'medium',
    imageUrl: '/api/placeholder/400/240',
    readTime: 5,
    trending: false
  },
  {
    id: '8',
    title: 'Microsoft Azure AI服务营收突破100亿美元',
    summary: 'Microsoft公布最新财报，Azure AI服务年化营收首次突破100亿美元大关，同比增长85%。云端AI服务的强劲增长推动Microsoft股价创新高。',
    keywords: ['Microsoft', 'Azure', 'AI服务', '营收', '云计算'],
    content: `Microsoft在AI商业化方面取得重大突破，Azure AI服务营收表现亮眼。

## 财务亮点

**营收规模**：Azure AI服务年化营收突破100亿美元
**增长率**：同比增长85%，环比增长23%
**客户数量**：企业客户数量增长120%，达到15万家
**使用率**：API调用量同比增长400%

## 服务构成

1. **OpenAI服务**：基于GPT模型的API服务
2. **认知服务**：语音、视觉、语言理解API
3. **机器学习平台**：Azure ML和AutoML服务
4. **垂直解决方案**：行业定制AI解决方案

## 市场前景

Microsoft在云端AI服务领域的领先地位进一步巩固，预计将继续受益于企业AI转型的长期趋势。`,
    source: '财报分析',
    publishedAt: new Date(2025, 5, 17, 9, 30),
    category: 'AI商业',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 3,
    trending: true
  }
];
