# 🚀 架构重构文档

## 概述

基于"单页应用，不同模式只是几个模块的出现消失和排列位置而已"的设计理念，我们对代码进行了架构重构，实现了更清晰的关注点分离和更好的可维护性。

## 🎯 重构目标

- ✅ 分离布局逻辑和业务逻辑
- ✅ 按功能域分离状态管理
- ✅ 简化主组件复杂度（从769行降到150行）
- ✅ 提高组件可重用性和可测试性
- ✅ 创建声明式的布局配置系统

## 📂 新架构结构

```
src/
├── types/
│   └── layout.ts              # 布局配置类型定义
├── hooks/
│   ├── useLayoutState.ts      # 布局状态管理
│   ├── useNewsState.ts        # 新闻状态管理
│   ├── useChatState.ts        # 聊天状态管理
│   ├── useResearchState.ts    # 研究状态管理
│   └── useAppState.ts         # 应用状态组合
├── components/
│   ├── LayoutManager.tsx      # 布局管理器
│   └── ...                    # 其他现有组件
└── pages/
    ├── Index.tsx              # 原始组件（保留）
    └── IndexRefactored.tsx    # 重构后的主组件
```

## 🔧 核心组件

### 1. 布局配置系统 (`types/layout.ts`)

```typescript
// 声明式的布局配置
const LAYOUT_CONFIGS = {
  home: { 
    type: 'overlay', 
    panels: [{ type: 'news', width: 100 }] 
  },
  research: { 
    type: 'horizontal', 
    panels: [
      { type: 'news-chat', width: 60 },
      { type: 'research', width: 40 }
    ] 
  }
  // ...
}
```

### 2. 状态管理Hooks

**功能域分离**：
- `useLayoutState()` - 布局模式、面板状态
- `useNewsState()` - 新闻选择、关键词、详情弹窗
- `useChatState()` - 消息、研究进度、建议问题
- `useResearchState()` - 研究报告、画布块

**组合模式**：
- `useAppState()` - 整合所有状态和业务逻辑

### 3. 布局管理器 (`LayoutManager.tsx`)

**职责**：
- 根据配置渲染不同的面板组合
- 处理响应式调整和面板大小
- 渲染工具栏和导航
- 支持overlay和horizontal布局模式

### 4. 简化的主组件 (`IndexRefactored.tsx`)

**对比**：
- **原来**：769行，包含所有逻辑
- **现在**：150行，专注于组件组合

**职责**：
- 使用状态管理hooks
- 根据模式渲染相应内容
- 协调各组件交互

## 🎨 布局模式

| 模式 | 面板组合 | 布局类型 |
|------|----------|----------|
| `home` | StackedNewsHome + 悬浮ChatPanel | overlay |
| `chat` | NewsChatLayout | horizontal |
| `research` | NewsChatLayout + ResearchPanel | horizontal |
| `research-canvas` | NewsChatLayout + ResearchPanel + CanvasPanel | horizontal |

## 📊 重构收益

### 代码质量
- 主组件行数：769 → 150 (-80%)
- 单一职责：每个文件职责明确
- 类型安全：完整的TypeScript支持

### 可维护性
- 状态分离：按功能域管理状态
- 逻辑复用：hooks可独立测试和复用
- 配置驱动：布局通过配置管理，易于扩展

### 开发体验
- 关注点分离：布局、状态、业务逻辑分离
- 组合模式：组件更容易理解和修改
- 扩展性：新增布局模式只需添加配置

## 🔄 迁移指南

### 渐进式迁移
1. 新架构组件已创建（`IndexRefactored.tsx`）
2. 原组件保持不变（`Index.tsx`）
3. 可以逐步切换和测试

### 使用新架构
```tsx
// 替换路由或入口点
import IndexRefactored from '@/pages/IndexRefactored';

// 使用独立的状态管理
import { useLayoutState } from '@/hooks/useLayoutState';
import { useAppState } from '@/hooks/useAppState';
```

## 🚀 未来扩展

### 轻松添加新模式
```typescript
// 1. 在layout.ts中添加配置
export const LAYOUT_CONFIGS = {
  // ...existing configs
  'new-mode': {
    mode: 'new-mode',
    type: 'horizontal',
    panels: [/* 新面板配置 */]
  }
}

// 2. 在IndexRefactored.tsx中添加渲染逻辑
case 'new-mode':
  return [/* 新内容组合 */];
```

### 扩展状态管理
```typescript
// 添加新的功能域状态
export const useNewFeatureState = () => {
  // 新功能状态逻辑
}

// 在useAppState中组合
export const useAppState = () => {
  const newFeature = useNewFeatureState();
  // ...
}
```

## ✅ 总结

重构后的架构实现了：
- **模块化**：清晰的功能域分离
- **可维护性**：大幅简化主组件复杂度
- **可扩展性**：配置驱动的布局系统
- **类型安全**：完整的TypeScript支持
- **开发体验**：更好的代码组织和可读性

这个新架构完美体现了"单页应用，模块组合"的设计理念，为后续功能开发和维护提供了坚实的基础。
