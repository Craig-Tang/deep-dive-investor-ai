import React from 'react';
import { createRoot } from 'react-dom/client';
import IndexRefactored from '@/pages/IndexRefactored';
import '@/index.css';

// 测试新架构
const TestApp: React.FC = () => {
  return (
    <div className="app">
      <IndexRefactored />
    </div>
  );
};

// 仅用于开发测试，不会替换实际应用
if (process.env.NODE_ENV === 'development') {
  console.log('架构重构完成！新的模块化结构：');
  console.log('├── types/layout.ts - 布局配置系统');
  console.log('├── hooks/useLayoutState.ts - 布局状态管理');
  console.log('├── hooks/useNewsState.ts - 新闻状态管理');
  console.log('├── hooks/useChatState.ts - 聊天状态管理');
  console.log('├── hooks/useResearchState.ts - 研究状态管理');
  console.log('├── hooks/useAppState.ts - 应用状态组合');
  console.log('├── components/LayoutManager.tsx - 布局管理器');
  console.log('└── pages/IndexRefactored.tsx - 简化的主组件 (150行 vs 原来769行)');
}

export default TestApp;
