# Mock数据结构说明

## 📁 数据组织

```
src/data/
├── index.ts                 # 主导出文件
└── news/                    # 新闻数据分类
    ├── aiTechnology.ts      # AI技术类新闻
    ├── investment.ts        # 投资融资类新闻
    ├── application.ts       # AI应用类新闻
    ├── policy.ts           # AI政策类新闻
    └── market.ts           # AI市场类新闻
```

## 🚀 使用方式

### 1. 导入所有数据
```typescript
import { mockNews } from '@/data';
```

### 2. 按类别导入
```typescript
import { 
  aiTechnologyNews, 
  investmentNews, 
  applicationNews,
  policyNews,
  marketNews 
} from '@/data';
```

### 3. 使用工具函数
```typescript
import { 
  getNewsByCategory,
  getTrendingNews,
  getNewsByImpact,
  getLatestNews 
} from '@/data';

// 获取AI技术类新闻
const techNews = getNewsByCategory('AI技术');

// 获取热门新闻
const trending = getTrendingNews();

// 获取高影响力新闻
const highImpact = getNewsByImpact('high');

// 获取最新5条新闻
const latest = getLatestNews(5);
```

## 📝 数据结构

每条新闻包含以下字段：

```typescript
interface NewsItem {
  id: string;                    // 唯一标识
  title: string;                 // 标题
  summary: string;               // 摘要
  keywords: string[];            // 关键词
  content: string;               // 详细内容（Markdown格式）
  source: string;                // 来源
  publishedAt: Date;             // 发布时间
  category: string;              // 分类
  impact: 'low' | 'medium' | 'high';  // 影响级别
  imageUrl: string;              // 图片URL
  readTime: number;              // 阅读时间（分钟）
  trending: boolean;             // 是否热门
}
```

## 📊 当前数据统计

- **AI技术类**: 3条新闻
- **投资融资类**: 3条新闻  
- **AI应用类**: 3条新闻
- **AI政策类**: 2条新闻
- **AI市场类**: 2条新闻
- **总计**: 13条新闻

## ➕ 添加新数据

### 1. 添加到现有类别
在对应的 `news/*.ts` 文件中添加新的新闻条目。

### 2. 创建新类别
1. 在 `src/data/news/` 下创建新的 `.ts` 文件
2. 在 `src/data/index.ts` 中导入并添加到 `mockNews` 数组
3. 更新导出列表

### 3. 示例：添加新的"AI安全"类别
```typescript
// src/data/news/security.ts
import type { NewsItem } from '@/pages/Index';

export const securityNews: NewsItem[] = [
  {
    id: 'security-1',
    title: '新的AI安全漏洞被发现',
    // ... 其他字段
  }
];

// src/data/index.ts 中添加
import { securityNews } from './news/security';

export const mockNews: NewsItem[] = [
  // ...现有数据
  ...securityNews
];

export { securityNews };
```

## 🛠️ 工具函数

提供了多个实用工具函数来筛选和获取数据，便于在不同场景下使用。所有工具函数都在 `src/data/index.ts` 中定义。

## 📈 扩展性

这种模块化的数据结构具有以下优势：

1. **易于维护**: 每个类别独立管理
2. **便于扩展**: 轻松添加新类别和新数据
3. **灵活使用**: 可按需导入特定类别
4. **工具丰富**: 提供多种数据筛选工具
5. **类型安全**: 完整的TypeScript类型支持
