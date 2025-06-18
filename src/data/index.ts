import type { NewsItem } from '@/pages/Index';
import { aiTechnologyNews } from './news/aiTechnology';
import { investmentNews } from './news/investment';
import { applicationNews } from './news/application';
import { papersNews } from './news/papers';

// 导入研究报告和画布数据
import { mockResearchReports } from './researchReports';
import { mockCanvasProjects } from './canvasProjects';

// 导入任务数据
import { mockTasks, getTaskGroups, getTaskStats, sortTasks } from './tasks';

// 合并所有新闻数据
export const mockNews: NewsItem[] = [
  ...aiTechnologyNews,
  ...investmentNews,
  ...applicationNews,
  ...papersNews
];

// 按类别导出
export { 
  aiTechnologyNews, 
  investmentNews, 
  applicationNews,
  papersNews
};

// 导出研究报告和画布数据
export { mockResearchReports, mockCanvasProjects };

// 导出任务相关数据和工具函数
export { mockTasks, getTaskGroups, getTaskStats, sortTasks };

// 工具函数：按类别获取新闻
export const getNewsByCategory = (category: string): NewsItem[] => {
  return mockNews.filter(news => news.category.includes(category));
};

// 工具函数：获取热门新闻
export const getTrendingNews = (): NewsItem[] => {
  return mockNews.filter(news => news.trending);
};

// 工具函数：按影响级别获取新闻
export const getNewsByImpact = (impact: 'low' | 'medium' | 'high'): NewsItem[] => {
  return mockNews.filter(news => news.impact === impact);
};

// 工具函数：获取最新新闻
export const getLatestNews = (count: number = 5): NewsItem[] => {
  return mockNews
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, count);
};
