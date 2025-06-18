import type { ReportBlock } from '@/pages/Index';

export interface CanvasProject {
  id: string;
  title: string;
  date: Date;
  description: string;
  blocks: ReportBlock[];
}

export const mockCanvasProjects: CanvasProject[] = [
  {
    id: 'canvas-1',
    title: '投资组合分析画布',
    date: new Date(2025, 5, 15, 16, 45),
    description: 'AI投资组合风险评估和收益分析',
    blocks: [
      {
        id: 'canvas-block-1',
        title: '投资组合概览',
        content: `**总投资额**：5,000万美元
**项目数量**：12个
**平均投资期**：3.5年
**预期年化收益率**：25-35%

**投资分布**：
- AI基础设施：40%
- AI应用软件：35% 
- AI芯片硬件：25%`,
        type: 'summary',
        references: ['投资组合报表'],
        metadata: {
          source: 'Portfolio Management',
          confidence: 0.98,
          lastUpdated: new Date(2025, 5, 15)
        }
      },
      {
        id: 'canvas-block-2',
        title: '重点投资项目',
        content: `1. **OpenAI** - 1,200万美元
   - 投资阶段：C轮
   - 持股比例：0.8%
   - 估值增长：+280%

2. **Anthropic** - 800万美元
   - 投资阶段：B轮
   - 持股比例：1.2%
   - 估值增长：+150%

3. **Character.AI** - 600万美元
   - 投资阶段：A轮
   - 持股比例：2.5%
   - 估值增长：+90%`,
        type: 'list',
        references: ['投资记录', '估值报告'],
        metadata: {
          source: 'Investment Records',
          confidence: 0.95,
          lastUpdated: new Date(2025, 5, 15)
        }
      },
      {
        id: 'canvas-block-3',
        title: '风险评估',
        content: `> "AI行业虽然增长迅速，但技术不确定性和监管风险需要密切关注。"

**风险等级**：中高风险

**主要风险点**：
- 技术迭代风险：AI技术发展快，可能出现颠覆性技术
- 监管政策风险：各国AI监管政策尚不明确
- 市场竞争风险：巨头公司资源优势明显
- 估值泡沫风险：部分项目估值可能过高`,
        type: 'quote',
        references: ['风险评估模型'],
        metadata: {
          source: 'Risk Management Team',
          confidence: 0.88,
          lastUpdated: new Date(2025, 5, 15)
        }
      },
      {
        id: 'canvas-block-4',
        title: '收益预测',
        content: `基于当前投资组合和市场趋势分析：

**短期预测（1年内）**：
- 预期收益率：15-20%
- 主要驱动：AI应用商业化加速

**中期预测（2-3年）**：
- 预期收益率：30-40%
- 主要驱动：AGI技术突破，市场规模扩大

**长期预测（5年以上）**：
- 预期收益率：50-100%
- 主要驱动：AI全面渗透各行业`,
        type: 'chart',
        references: ['收益模型', '市场预测'],
        metadata: {
          source: 'Financial Analysis Team',
          confidence: 0.82,
          lastUpdated: new Date(2025, 5, 15)
        }
      }
    ]
  },
  {
    id: 'canvas-2',
    title: '风险评估模型',
    date: new Date(2025, 5, 14, 11, 20),
    description: 'AI投资项目风险评估框架和指标体系',
    blocks: [
      {
        id: 'canvas-block-5',
        title: '风险评估框架',
        content: `# AI投资风险评估体系

我们建立了多维度的风险评估框架，涵盖技术、市场、团队、财务四个核心维度。

**评估权重**：
- 技术风险：35%
- 市场风险：30%
- 团队风险：20%
- 财务风险：15%`,
        type: 'heading',
        references: ['风险管理手册'],
        metadata: {
          source: 'Risk Management Framework',
          confidence: 0.95,
          lastUpdated: new Date(2025, 5, 14)
        }
      },
      {
        id: 'canvas-block-6',
        title: '技术风险指标',
        content: `**技术成熟度评分**：
- 前沿研究阶段：高风险 (8-10分)
- 原型验证阶段：中高风险 (6-8分)
- 产品化阶段：中等风险 (4-6分)
- 规模化应用：低风险 (1-4分)

**技术壁垒评估**：
1. 算法创新性
2. 数据资源优势
3. 工程实现难度
4. 专利保护程度`,
        type: 'paragraph',
        references: ['技术评估标准'],
        metadata: {
          source: 'Technology Assessment',
          confidence: 0.91,
          lastUpdated: new Date(2025, 5, 14)
        }
      },
      {
        id: 'canvas-block-7',
        title: '市场风险矩阵',
        content: `| 市场因素 | 权重 | 评分标准 | 风险等级 |
|---------|------|----------|----------|
| 市场规模 | 25% | >100亿：低风险<br>10-100亿：中风险<br><10亿：高风险 | 中等 |
| 竞争格局 | 30% | 蓝海市场：低风险<br>有序竞争：中风险<br>激烈竞争：高风险 | 高 |
| 政策环境 | 20% | 政策支持：低风险<br>政策中性：中风险<br>政策限制：高风险 | 中等 |
| 客户接受度 | 25% | 已验证：低风险<br>待验证：中风险<br>未知：高风险 | 中高 |`,
        type: 'chart',
        references: ['市场分析报告'],
        metadata: {
          source: 'Market Research Team',
          confidence: 0.87,
          lastUpdated: new Date(2025, 5, 14)
        }
      },
      {
        id: 'canvas-block-8',
        title: '风险评级结果',
        content: `> "基于综合评估，当前AI投资组合整体风险等级为'中高风险'，符合我们的风险偏好。"

**评级分布**：
- 低风险项目：2个 (17%)
- 中风险项目：5个 (42%)
- 中高风险项目：4个 (33%)
- 高风险项目：1个 (8%)

**建议措施**：
1. 适当降低高风险项目配置
2. 加强中风险项目的跟踪监控
3. 寻找更多低风险稳健项目`,
        type: 'quote',
        references: ['风险评级报告'],
        metadata: {
          source: 'Risk Rating Committee',
          confidence: 0.93,
          lastUpdated: new Date(2025, 5, 14)
        }
      }
    ]
  }
];
