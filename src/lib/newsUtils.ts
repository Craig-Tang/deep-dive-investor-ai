import type { NewsItem } from '@/types/common';

/**
 * 格式化时间为"X分钟前"、"X小时前"、"X天前"
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}小时前`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}天前`;
  }
};

/**
 * 根据影响力等级返回对应的样式类名
 */
export const getImpactColor = (impact: NewsItem['impact']): string => {
  switch (impact) {
    case 'high':
      return 'text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
    case 'medium':
      return 'text-orange-500 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800';
    case 'low':
      return 'text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

/**
 * 根据新闻分类返回对应的样式类名
 */
export const getCategoryColor = (category: string): string => {
  const categoryColors: { [key: string]: string } = {
    'AI融资': 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    'AI技术': 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    '风险投资': 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    'AI基础设施': 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
    'IPO上市': 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800',
  };
  return categoryColors[category] || 'text-muted-foreground bg-muted border-border';
};

/**
 * 根据影响力等级返回中文显示文本
 */
export const getImpactText = (impact: NewsItem['impact']): string => {
  switch (impact) {
    case 'high':
      return '高';
    case 'medium':
      return '中';
    case 'low':
      return '低';
    default:
      return '未知';
  }
};

/**
 * 对新闻进行智能分类
 */
export const categorizeNews = (news: NewsItem[]) => {  // AI公司投创：包括融资、IPO、投资基金等
  const investmentNews = news.filter(item => 
    ['AI融资', '风险投资', 'IPO上市', 'AI投资', '机器人投资', 'VC投资'].includes(item.category) ||
    item.keywords.some(keyword => 
      ['融资', '投资', 'IPO', '上市', '基金', '估值', '红杉', 'VC', 'Coco Robotics', '软通智算', '库萨科技', 'Meta', 'OpenAI'].includes(keyword)
    )
  );
  // AI技术突破：包括新模型、技术创新、算法突破等
  const technologyNews = news.filter(item => 
    ['AI技术', 'AI基础设施', 'AI硬件'].includes(item.category) ||
    item.keywords.some(keyword => 
      ['Claude', 'GPT', '大模型', 'AGI', 'H200', '算力', '英伟达', 'AI芯片', 'Google', 'Meta', 'Prada', 'Amazon', '音频概览', 'AI眼镜'].includes(keyword)
    )
  );
  // AI应用论文：包括行业应用、监管政策、市场分析、学术论文等
  const applicationNews = news.filter(item => 
    ['AI监管', 'AI应用', '行业分析', 'AI论文', 'AI市场'].includes(item.category) ||
    item.keywords.some(keyword => 
      ['监管', '合规', '法案', '政策', '应用', '行业', '市场', '论文', 'arXiv', '推理优化', '智能体蒸馏', '移动性预测', 'GUI智能体'].includes(keyword)
    ) ||
    // 如果不属于前两类，则归入应用类
    (!investmentNews.includes(item) && !technologyNews.includes(item))
  );

  return {
    investment: investmentNews,
    technology: technologyNews,
    application: applicationNews
  };
};
