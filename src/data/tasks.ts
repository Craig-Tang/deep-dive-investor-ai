// 投研任务相关的数据结构和mock数据

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignedBy: 'boss' | 'self';
  category: 'research' | 'analysis' | 'report' | 'monitoring' | 'meeting';
  deadline?: Date;
  createdAt: Date;
  estimatedHours?: number;
  completedAt?: Date;
  relatedKeywords?: string[];
  relatedCompanies?: string[];
  progress?: number; // 0-100
}

export interface TaskGroup {
  title: string;
  tasks: Task[];
  assignedBy: 'boss' | 'self';
}

// Mock任务数据
export const mockTasks: Task[] = [
  // 老板分配的任务
  {
    id: 'boss-1',
    title: '深度研究OpenAI GPT-5发布对AI赛道的影响',
    description: '分析OpenAI最新GPT-5模型发布后，对整个AI创投市场的影响，包括竞争格局变化、投资机会识别、风险评估等',
    priority: 'high',
    status: 'in-progress',
    assignedBy: 'boss',
    category: 'research',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3天后
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前创建
    estimatedHours: 16,
    relatedKeywords: ['OpenAI', 'GPT-5', 'AI模型', '大语言模型'],
    relatedCompanies: ['OpenAI', 'Anthropic', '百度', '阿里巴巴'],
    progress: 35
  },
  {
    id: 'boss-2',
    title: '追踪Anthropic Claude 3.5融资进展',
    description: '持续监控Anthropic新一轮融资动态，分析估值变化趋势，评估对标公司影响',
    priority: 'medium',
    status: 'pending',
    assignedBy: 'boss',
    category: 'monitoring',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前创建
    estimatedHours: 8,
    relatedKeywords: ['Anthropic', 'Claude', 'AI融资', '估值'],
    relatedCompanies: ['Anthropic', 'Google', 'Amazon'],
    progress: 0
  },
  {
    id: 'boss-3',
    title: '生成式AI在教育领域应用报告',
    description: '撰写生成式AI在教育科技领域的应用现状、市场规模、主要玩家和投资机会分析报告',
    priority: 'medium',
    status: 'pending',
    assignedBy: 'boss',
    category: 'report',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10天后
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6小时前创建
    estimatedHours: 20,
    relatedKeywords: ['生成式AI', '教育科技', 'EdTech', '在线教育'],
    relatedCompanies: ['Khan Academy', 'Coursera', '好未来', '新东方'],
    progress: 0
  },
  {
    id: 'boss-4',
    title: '准备下周投委会AI项目汇报',
    description: '整理本月AI领域重点项目信息，准备投委会汇报材料，包括项目亮点、风险分析、投资建议',
    priority: 'high',
    status: 'overdue',
    assignedBy: 'boss',
    category: 'meeting',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 昨天截止
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5天前创建
    estimatedHours: 6,
    relatedKeywords: ['投委会', 'AI项目', '投资决策'],
    progress: 70
  },

  // 个人任务
  {
    id: 'self-1',
    title: '学习量子计算在AI中的应用',
    description: '研读最新量子计算与AI结合的学术论文，了解技术发展趋势和商业化潜力',
    priority: 'low',
    status: 'in-progress',
    assignedBy: 'self',
    category: 'research',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14天后
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前创建
    estimatedHours: 12,
    relatedKeywords: ['量子计算', 'QML', '量子机器学习'],
    relatedCompanies: ['IBM', 'Google', '本源量子'],
    progress: 20
  },
  {
    id: 'self-2',
    title: '整理AI芯片赛道投资笔记',
    description: '梳理近期AI芯片领域的研究资料，整理投资逻辑和机会点',
    priority: 'medium',
    status: 'pending',
    assignedBy: 'self',
    category: 'analysis',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5天后
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4小时前创建
    estimatedHours: 4,
    relatedKeywords: ['AI芯片', 'GPU', '推理芯片', '训练芯片'],
    relatedCompanies: ['英伟达', 'AMD', '寒武纪', '比特大陆'],
    progress: 0
  },
  {
    id: 'self-3',
    title: '参加斯坦福AI创业论坛',
    description: '参加线上斯坦福AI创业论坛，了解最新AI创业趋势和投资机会',
    priority: 'medium',
    status: 'completed',
    assignedBy: 'self',
    category: 'meeting',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7天前创建
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    estimatedHours: 3,
    relatedKeywords: ['AI创业', '斯坦福', '创业论坛'],
    progress: 100
  },
  {
    id: 'self-4',
    title: '跟进YC Demo Day AI项目',
    description: '关注本期YC Demo Day中的AI项目，筛选潜在投资机会',
    priority: 'high',
    status: 'in-progress',
    assignedBy: 'self',
    category: 'monitoring',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2天后
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前创建
    estimatedHours: 6,
    relatedKeywords: ['YC', 'Demo Day', 'AI创业', '早期项目'],
    progress: 60
  }
];

// 按照分配者分组任务
export const getTaskGroups = (tasks: Task[]): TaskGroup[] => {
  const bossTasks = tasks.filter(task => task.assignedBy === 'boss');
  const selfTasks = tasks.filter(task => task.assignedBy === 'self');

  return [
    {
      title: '老板分配',
      tasks: bossTasks,
      assignedBy: 'boss'
    },
    {
      title: '个人任务',
      tasks: selfTasks,
      assignedBy: 'self'
    }
  ];
};

// 获取任务统计信息
export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const overdue = tasks.filter(task => task.status === 'overdue').length;
  const pending = tasks.filter(task => task.status === 'pending').length;

  return {
    total,
    completed,
    inProgress,
    overdue,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

// 根据优先级和截止时间排序任务
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // 首先按状态排序：overdue > in-progress > pending > completed
    const statusPriority = {
      'overdue': 0,
      'in-progress': 1,
      'pending': 2,
      'completed': 3
    };
    
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    
    // 然后按优先级排序
    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // 最后按截止时间排序
    if (a.deadline && b.deadline) {
      return a.deadline.getTime() - b.deadline.getTime();
    }
    
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
};
