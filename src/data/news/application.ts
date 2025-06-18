import type { NewsItem } from '@/pages/Index';

export const applicationNews: NewsItem[] = [
  {
    id: 'app-1',
    title: 'AI驱动的药物发现：AlphaFold 3重新定义生物制药',
    summary: 'DeepMind发布AlphaFold 3，能够预测蛋白质与DNA、RNA、配体的复杂相互作用。这一突破将大大加速新药研发进程，预计可将药物发现时间缩短50%。',
    keywords: ['AlphaFold', 'DeepMind', '药物发现', '蛋白质', '生物制药'],
    content: `DeepMind最新发布的AlphaFold 3标志着AI在生物制药领域的重大突破。

## 技术突破

**结构预测**：可预测蛋白质、DNA、RNA、小分子等生物分子的3D结构
**相互作用**：首次实现多种生物分子间复杂相互作用的准确预测
**精度提升**：相比AlphaFold 2，预测精度提升50%以上

## 应用价值

1. **新药发现**：加速靶点识别和药物设计
2. **个性化医疗**：为精准医疗提供结构基础
3. **疾病机理**：帮助理解复杂疾病的分子机制

## 商业影响

多家制药巨头已与DeepMind建立合作：
- 诺华：用于肿瘤药物研发
- 辉瑞：应用于神经退行性疾病
- 罗氏：专注免疫治疗领域

## 投资机会

AI制药赛道预计迎来新一轮投资热潮，相关上市公司股价普遍上涨，风投资金快速涌入AI+生物医药领域。`,
    source: '医药科技',
    publishedAt: new Date(2025, 5, 18, 7, 30),
    category: 'AI应用',
    impact: 'high',
    imageUrl: '/api/placeholder/400/240',
    readTime: 5,
    trending: true
  },
  {
    id: 'app-2',
    title: 'ChatGPT Code Interpreter重塑数据分析师工作流程',
    summary: 'OpenAI推出的Code Interpreter功能让ChatGPT具备了强大的数据分析和可视化能力。用户可以通过自然语言描述需求，AI自动生成Python代码并执行分析任务。',
    keywords: ['ChatGPT', 'Code Interpreter', '数据分析', 'Python', '自动化'],
    content: `ChatGPT的Code Interpreter功能正在重新定义数据分析工作。

## 功能特性

**代码生成**：根据自然语言描述自动生成Python代码
**数据处理**：支持CSV、Excel、JSON等多种数据格式
**可视化**：自动创建图表和数据可视化
**交互式分析**：支持多轮对话式数据探索

## 应用场景

1. **商业分析**：快速生成业务报告和洞察
2. **学术研究**：辅助科研人员进行数据分析
3. **教育培训**：帮助学生理解数据分析概念
4. **个人项目**：降低数据分析门槛

## 市场反响

推出一个月来，Code Interpreter的使用量增长300%，用户覆盖金融、医疗、教育等多个行业。

## 行业影响

传统数据分析工具厂商面临挑战，而专注于AI辅助分析的创业公司获得更多关注。这一趋势正在重塑整个数据分析行业的格局。`,
    source: '数据科学',
    publishedAt: new Date(2025, 5, 17, 13, 20),
    category: 'AI应用',
    impact: 'medium',
    imageUrl: '/api/placeholder/400/240',
    readTime: 4,
    trending: false  }
];
