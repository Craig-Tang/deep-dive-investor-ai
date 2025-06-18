# 历史记录下拉菜单实现说明

## ✅ 已完成的改进

### 1. 简化历史记录交互
- **改进前**: 独立的历史记录面板，占用大量屏幕空间
- **改进后**: 轻量级下拉菜单，悬浮在右上角，节省空间

### 2. 核心功能保持
- **时间显示**: 智能显示相对时间（今天、昨天、X天前）
- **标题缩略**: 自动截断长标题，保持界面整洁
- **类型区分**: 报告用蓝色文档图标，画布用紫色调色板图标

### 3. 组件架构

#### HistoryDropdown.tsx
```tsx
interface HistoryDropdownProps {
  type: 'report' | 'canvas';  // 区分报告和画布历史记录
  onSelect: (item: HistoryItem) => void;  // 选择历史记录的回调
}

// 特点：
// - 点击外部自动关闭
// - 最多显示5条最近记录
// - 响应式设计，支持hover效果
// - 智能时间格式化
```

#### 更新的组件接口
```tsx
// ResearchPanel.tsx
interface ResearchPanelProps {
  report: ReportBlock[] | null;
  onDragToCanvas: (block: ReportBlock) => void;
  onHistorySelect?: (item: HistoryItem) => void;  // 替代 onShowHistory
}

// CanvasPanel.tsx  
interface CanvasPanelProps {
  blocks: ReportBlock[];
  onBlocksChange: (blocks: ReportBlock[]) => void;
  onGenerateReport?: () => void;
  onContinueResearch?: (content: string) => void;
  onExportMarkdown?: () => void;
  onHistorySelect?: (item: HistoryItem) => void;  // 替代 onShowHistory
}
```

## 🎨 UI设计细节

### 下拉菜单样式
- **触发按钮**: 轮廓样式，半透明背景，毛玻璃效果
- **菜单容器**: Card组件，阴影效果，264px宽度
- **菜单项**: hover效果，图标+文字布局
- **分隔线**: 项目间使用Separator组件

### 交互体验
- **打开**: 点击历史记录按钮，chevron图标旋转180度
- **关闭**: 点击外部区域、选择项目、ESC键（可扩展）
- **选择**: 点击任意历史记录项，自动关闭并触发回调

### 数据格式
```tsx
interface HistoryItem {
  id: string;
  title: string;              // 原始标题
  date: Date;                 // 创建/更新时间
  type: 'report' | 'canvas';  // 类型标识
  data: ReportBlock[] | Record<string, unknown>;  // 实际数据
}
```

## 🔄 集成方式

### 在ResearchPanel中
```tsx
<HistoryDropdown 
  type="report"
  onSelect={onHistorySelect}
/>
```

### 在CanvasPanel中  
```tsx
<HistoryDropdown 
  type="canvas"
  onSelect={onHistorySelect}
/>
```

## 📱 响应式设计

- **桌面**: 右上角固定位置，下拉菜单向下展开
- **移动端**: 可能需要调整为模态窗口（future enhancement）
- **Z-index**: 50，确保在其他元素之上

## 🚀 优势

1. **空间效率**: 不再占用整个面板空间
2. **快速访问**: 一键打开，直接选择
3. **视觉清晰**: 图标和时间让识别更容易
4. **交互自然**: 符合用户对下拉菜单的预期
5. **代码简洁**: 移除复杂的面板状态管理

## 🎯 测试要点

- [ ] 点击历史记录按钮正确打开/关闭下拉菜单
- [ ] 点击外部区域正确关闭菜单
- [ ] 选择历史记录项正确触发回调并关闭菜单
- [ ] 不同类型（report/canvas）显示正确的历史记录
- [ ] 时间格式化正确显示（今天、昨天、X天前）
- [ ] 标题截断功能正常工作
- [ ] 图标颜色区分正确（蓝色文档 vs 紫色调色板）
