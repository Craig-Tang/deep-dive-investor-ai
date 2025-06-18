# 前端开发规范概要

## 📋 规范概述

**目标：** 为React Demo项目建立清晰、一致的前端开发规范  
**原则：** 简洁实用、团队协作、质量保证、效率优先  
**适用范围：** 所有前端开发人员、UI/UX设计师参考  
**维护周期：** 每季度review和更新  

## 🎯 核心开发理念

### 设计哲学
1. **组件化优先**: 万物皆组件，职责单一，高度复用
2. **配置驱动**: 通过配置而非硬编码实现灵活性
3. **类型安全**: TypeScript全覆盖，编译时发现问题
4. **用户体验**: 优先保证界面一致性和交互流畅度
5. **开发体验**: 工具链完善，开发效率最大化

### 质量标准
- **代码可读性**: 命名清晰，结构简洁，逻辑易懂
- **性能要求**: 首屏<2s，交互<100ms，bundle<1MB
- **兼容性**: 支持现代浏览器，移动端适配
- **可维护性**: 模块化设计，便于扩展和修改

## 📁 项目结构规范

### 目录组织标准
```
src/
├── 📁 types/                    # 类型定义 - 全局类型管理
│   ├── common.ts               # 核心业务类型
│   ├── layout.ts               # 布局相关类型
│   └── api.ts                  # API接口类型
│
├── 📁 hooks/                    # 状态逻辑 - 业务逻辑层
│   ├── state/                  # 状态管理hooks
│   ├── ui/                     # UI交互hooks
│   └── api/                    # 数据获取hooks
│
├── 📁 components/               # UI组件 - 表现层
│   ├── ui/                     # 基础组件 (Atomic)
│   ├── shared/                 # 共享组件 (Molecular)
│   ├── features/               # 功能组件 (Organism)
│   └── layout/                 # 布局组件 (Template)
│
├── 📁 data/                     # 数据层
│   ├── mock/                   # 模拟数据
│   └── api/                    # API配置
│
└── 📁 pages/                    # 页面层
    └── Index.tsx               # 页面入口
```

### 文件命名规范

#### 组件文件命名
```typescript
// ✅ 正确命名 - PascalCase
NewsCard.tsx
ChatPanel.tsx
LayoutManager.tsx
AISummary.tsx

// ❌ 错误命名
newsCard.tsx        // 应该用PascalCase
news-card.tsx       // 应该用PascalCase
NEWS_CARD.tsx       // 全大写不合适
```

#### Hook文件命名
```typescript
// ✅ 正确命名 - camelCase + use前缀
useAppState.ts
useNewsState.ts
useChatState.ts
useResizable.ts

// ❌ 错误命名
AppState.ts         // 缺少use前缀
use-app-state.ts    // 应该用camelCase
UseAppState.ts      // use不应该大写
```

#### 类型文件命名
```typescript
// ✅ 正确命名 - camelCase
common.ts
layout.ts
api.ts

// ❌ 错误命名
Common.ts           // 类型文件用camelCase
COMMON.ts          // 全大写不合适
```

## 🧩 组件开发规范

### 组件分类标准

#### 1. 基础组件 (ui/)
**定义**: 原子级UI组件，无业务逻辑
**特点**: 高复用、纯展示、props驱动

```typescript
// ✅ 基础组件示例
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  disabled = false, 
  children, 
  onClick 
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ✅ 导出方式
export { Button };
export type { ButtonProps };
```

#### 2. 共享组件 (shared/)
**定义**: 分子级组件，多个原子组合
**特点**: 特定功能、可配置、跨模块复用

```typescript
// ✅ 共享组件示例
interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'compact' | 'detailed';
  showCategory?: boolean;
  onSelect: (news: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = React.memo(({ 
  news, 
  variant = 'default',
  showCategory = true,
  onSelect 
}) => {
  const handleClick = useCallback(() => {
    onSelect(news);
  }, [news, onSelect]);

  return (
    <Card 
      className={cn('news-card', variantClasses[variant])}
      onClick={handleClick}
    >
      {showCategory && (
        <Badge variant="secondary">{news.category}</Badge>
      )}
      <h3 className="news-title">{news.title}</h3>
      <p className="news-summary">{news.summary}</p>
      <div className="news-meta">
        <span>{news.source}</span>
        <span>{formatDate(news.publishedAt)}</span>
      </div>
    </Card>
  );
});

NewsCard.displayName = 'NewsCard';
```

#### 3. 功能组件 (features/)
**定义**: 有机体级组件，完整业务功能
**特点**: 业务相关、状态管理、模块边界

```typescript
// ✅ 功能组件示例
interface NewsPanelProps {
  news: NewsItem[];
  selectedNews: NewsItem | null;
  onNewsSelect: (news: NewsItem) => void;
  onFilterChange: (filter: NewsFilter) => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({
  news,
  selectedNews,
  onNewsSelect,
  onFilterChange
}) => {
  const [localFilter, setLocalFilter] = useState<NewsFilter>({});
  
  const filteredNews = useMemo(() => {
    return filterNews(news, localFilter);
  }, [news, localFilter]);

  const handleFilterChange = useCallback((filter: NewsFilter) => {
    setLocalFilter(filter);
    onFilterChange(filter);
  }, [onFilterChange]);

  return (
    <div className="news-panel">
      <NewsFilter onFilterChange={handleFilterChange} />
      <NewsGrid>
        {filteredNews.map(item => (
          <NewsCard
            key={item.id}
            news={item}
            onSelect={onNewsSelect}
            variant={selectedNews?.id === item.id ? 'selected' : 'default'}
          />
        ))}
      </NewsGrid>
    </div>
  );
};
```

### 组件props设计规范

#### Props接口设计
```typescript
// ✅ 良好的Props设计
interface ComponentProps {
  // 1. 必需props在前
  data: DataType;
  onAction: (item: DataType) => void;
  
  // 2. 可选props在后，提供默认值
  variant?: 'default' | 'compact';
  showMetadata?: boolean;
  className?: string;
  
  // 3. 子组件和特殊props最后
  children?: React.ReactNode;
  'data-testid'?: string;
}

// ✅ 默认props处理
const Component: React.FC<ComponentProps> = ({
  data,
  onAction,
  variant = 'default',
  showMetadata = true,
  className,
  children,
  ...rest
}) => {
  // 组件实现
};
```

#### Props验证和文档
```typescript
// ✅ 使用TypeScript进行类型验证
interface ButtonProps {
  /** 按钮样式变体 */
  variant: 'primary' | 'secondary' | 'outline';
  
  /** 按钮大小 */
  size: 'sm' | 'md' | 'lg';
  
  /** 是否禁用按钮 */
  disabled?: boolean;
  
  /** 按钮内容 */
  children: React.ReactNode;
  
  /** 点击事件处理器 */
  onClick?: () => void;
}
```

## 🔄 状态管理规范

### Hook设计原则

#### 1. 单一职责原则
```typescript
// ✅ 职责单一的Hook
const useNewsState = () => {
  // 只管理新闻相关状态
  const [state, setState] = useState<NewsState>(initialState);
  
  const selectNews = useCallback((news: NewsItem) => {
    setState(prev => ({ ...prev, selectedNews: news }));
  }, []);
  
  return { ...state, selectNews };
};

// ❌ 职责混乱的Hook
const useAppState = () => {
  // 管理所有状态，职责不清晰
  const [news, setNews] = useState([]);
  const [chat, setChat] = useState([]);
  const [layout, setLayout] = useState('home');
  // ... 更多状态
};
```

#### 2. 状态组合原则
```typescript
// ✅ 状态组合
const useAppState = () => {
  const layout = useLayoutState();
  const news = useNewsState();
  const chat = useChatState();
  const research = useResearchState();
  
  // 只处理跨域业务逻辑
  const handleComplexAction = useCallback(() => {
    // 协调多个状态
  }, [layout, news, chat, research]);
  
  return {
    layout,
    news, 
    chat,
    research,
    handleComplexAction
  };
};
```

#### 3. 状态更新规范
```typescript
// ✅ 不可变更新
const updateNewsItem = useCallback((id: string, updates: Partial<NewsItem>) => {
  setState(prev => ({
    ...prev,
    items: prev.items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
  }));
}, []);

// ❌ 可变更新
const updateNewsItem = (id: string, updates: Partial<NewsItem>) => {
  const item = state.items.find(item => item.id === id);
  Object.assign(item, updates); // 直接修改原对象
  setState({ ...state }); // 可能导致状态不同步
};
```

### 数据流设计

#### 1. 数据流向规范
```
用户交互 → 事件处理 → Hook Action → 状态更新 → UI重渲染
    ↓         ↓         ↓         ↓         ↓
Button.click → handleClick → updateState → state++ → Component.render
```

#### 2. 跨组件通信
```typescript
// ✅ 通过props传递
<ChildComponent data={data} onAction={handleAction} />

// ✅ 通过Hook共享状态  
const SharedState = () => {
  const { data, actions } = useSharedState();
  return { data, actions };
};

// ❌ 直接访问DOM或全局变量
document.getElementById('target').value = 'new value';
window.globalData = newData;
```

## 🎨 样式开发规范

### CSS类命名规范

#### 1. BEM命名法 + Tailwind
```typescript
// ✅ 结合BEM和Tailwind
const NewsCard = () => (
  <div className="news-card bg-white shadow-md rounded-lg p-4">
    <h3 className="news-card__title text-lg font-semibold mb-2">
      {title}
    </h3>
    <p className="news-card__summary text-gray-600 text-sm">
      {summary}
    </p>
    <div className="news-card__meta flex justify-between text-xs text-gray-500">
      <span className="news-card__source">{source}</span>
      <span className="news-card__date">{date}</span>
    </div>
  </div>
);

// ❌ 混乱的类名
const NewsCard = () => (
  <div className="card-container style1 big">
    <h3 className="title-text">{title}</h3>
  </div>
);
```

#### 2. 条件样式处理
```typescript
// ✅ 使用cn函数处理条件样式
import { cn } from '@/lib/utils';

const Button = ({ variant, size, disabled, className }) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2',
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
        'h-10 px-4 py-2': size === 'default',
        'h-9 px-3': size === 'sm',
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    )}
  />
);

// ❌ 字符串拼接
const buttonClass = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${disabled ? 'disabled' : ''}`;
```

### 响应式设计规范

#### 1. 断点使用
```typescript
// ✅ 使用Tailwind断点
const ResponsiveComponent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="p-4 sm:p-6 lg:p-8">
      {/* 内容 */}
    </div>
  </div>
);

// ✅ 自定义断点Hook
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('md');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else setBreakpoint('lg');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};
```

## 🔧 TypeScript使用规范

### 类型定义规范

#### 1. 接口vs类型别名
```typescript
// ✅ 使用interface定义对象结构
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 使用type定义联合类型、函数类型
type Status = 'loading' | 'success' | 'error';
type EventHandler = (event: Event) => void;
type UserWithoutId = Omit<User, 'id'>;

// ✅ interface可以扩展
interface AdminUser extends User {
  permissions: string[];
}
```

#### 2. 泛型使用
```typescript
// ✅ 合理使用泛型
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    total: number;
    hasMore: boolean;
  };
}

// ✅ Hook泛型
const useAsyncData = <T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // 实现...
  
  return { data, loading, error };
};
```

#### 3. 严格类型检查
```typescript
// ✅ 避免any，使用具体类型
interface EventData {
  type: 'click' | 'hover' | 'focus';
  target: HTMLElement;
  timestamp: number;
}

const handleEvent = (data: EventData) => {
  // 类型安全的处理
};

// ❌ 使用any
const handleEvent = (data: any) => {
  // 失去类型保护
};

// ✅ 使用unknown替代any
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    // 类型收窄后使用
    return data.toUpperCase();
  }
};
```

## ⚡ 性能优化规范

### 渲染优化

#### 1. React.memo使用
```typescript
// ✅ 合理使用memo
const ExpensiveComponent = React.memo<ComponentProps>(({ data, onAction }) => {
  // 复杂的渲染逻辑
  return <div>{/* 渲染内容 */}</div>;
}, (prevProps, nextProps) => {
  // 自定义比较逻辑
  return prevProps.data.id === nextProps.data.id;
});

// ✅ 避免不必要的memo
const SimpleComponent = ({ text }: { text: string }) => {
  return <span>{text}</span>; // 简单组件不需要memo
};
```

#### 2. useCallback和useMemo
```typescript
// ✅ 合理使用useCallback
const ParentComponent = ({ items }: { items: Item[] }) => {
  const handleItemClick = useCallback((item: Item) => {
    // 处理点击，依赖稳定
  }, []);
  
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  
  return (
    <div>
      <div>Total: {expensiveValue}</div>
      {items.map(item => (
        <ItemComponent 
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};

// ❌ 过度使用
const SimpleComponent = ({ text }: { text: string }) => {
  const memoizedText = useMemo(() => text, [text]); // 不必要
  return <span>{memoizedText}</span>;
};
```

### 异步操作规范

#### 1. 异步状态管理
```typescript
// ✅ 标准异步状态管理
const useAsyncOperation = <T>(operation: () => Promise<T>) => {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await operation();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Unknown error')
      }));
    }
  }, [operation]);

  return { ...state, execute };
};
```

#### 2. 请求取消
```typescript
// ✅ 请求取消处理
const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('请求失败:', error);
        }
      }
    };
    
    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, [url]);
  
  return data;
};
```

## 🧪 测试规范

### 单元测试规范

#### 1. Hook测试
```typescript
// ✅ Hook测试示例
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

#### 2. 组件测试
```typescript
// ✅ 组件测试示例
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📝 代码审查规范

### 审查清单

#### 功能性检查
- [ ] 功能是否按预期工作
- [ ] 边界情况是否处理
- [ ] 错误处理是否完善
- [ ] 性能是否符合要求

#### 代码质量检查
- [ ] 命名是否清晰语义化
- [ ] 组件职责是否单一
- [ ] 类型定义是否完整
- [ ] 代码是否易于理解

#### 最佳实践检查
- [ ] 是否遵循项目约定
- [ ] 是否有不必要的复杂度
- [ ] 是否有代码重复
- [ ] 是否需要添加注释

## 📋 总结

### 规范要点
1. **结构清晰**: 目录组织合理，文件命名规范
2. **组件设计**: 职责单一，高度复用，类型安全
3. **状态管理**: 分域管理，数据流清晰
4. **性能优化**: 合理使用优化API，避免过度优化
5. **代码质量**: TypeScript全覆盖，测试完善

### 持续改进
- 每季度review规范内容
- 根据项目发展调整标准
- 团队培训和知识共享
- 工具链持续优化

这个开发规范为团队提供了清晰的指导原则，确保代码质量和开发效率的持续提升。所有规范都基于项目实际情况制定，既保证了代码质量，又不会过度约束开发者的创造力。

---

**规范版本**: v1.0  
**适用项目**: React Demo - 深度投资AI  
**更新周期**: 每季度review  
**责任人**: 前端技术负责人