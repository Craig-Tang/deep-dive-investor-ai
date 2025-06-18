# 历史记录按钮常驻显示优化

## 问题分析
用户反馈历史记录按钮看不到，分析原因：
1. 历史按钮被条件渲染包裹，只有在特定条件下才显示
2. 用户期望的使用逻辑：进入研究报告或画布面板后，应该能随时查看历史版本，即使当前没有生成新内容

## 解决方案
将历史记录按钮改为常驻显示，不依赖条件判断。

### 修改内容

#### 1. ResearchPanel.tsx
**修改前**：
```tsx
{onHistorySelect && (
  <div className="...">
    <HistoryDropdown 
      type="report"
      onSelect={onHistorySelect}
    />
  </div>
)}
```

**修改后**：
```tsx
{/* 历史记录下拉菜单 - 常驻显示 */}
<div className="...">
  <HistoryDropdown 
    type="report"
    onSelect={onHistorySelect}
  />
</div>
```

#### 2. CanvasPanel.tsx
**修改前**：
```tsx
{onHistorySelect && (
  <HistoryDropdown 
    type="canvas"
    onSelect={onHistorySelect}
  />
)}
```

**修改后**：
```tsx
{/* 历史记录按钮 - 常驻显示 */}
<HistoryDropdown 
  type="canvas"
  onSelect={onHistorySelect}
/>
```

#### 3. HistoryDropdown.tsx
- 将 `onSelect` 属性改为可选：`onSelect?: (item: HistoryItem) => void`
- 使用可选链调用：`onSelect?.(item)`

## 用户体验改进

### 历史按钮位置
1. **研究报告面板**：右上角绝对定位
   - 有工具栏时：`top-20` (80px，避开64px的工具栏)
   - 无工具栏时：`top-4` (16px)

2. **画布面板**：头部工具栏区域
   - 与其他操作按钮并列显示
   - 位置醒目，易于发现

### 使用场景
1. **进入研究报告**：立即可见历史按钮，可切换查看之前的报告
2. **进入画布**：立即可见历史按钮，可切换查看之前的画布配置
3. **空状态友好**：即使当前没有内容，也能查看历史版本

### 视觉设计
- 按钮样式：`outline` 变体，带有毛玻璃效果
- 图标：历史记录图标 + "历史记录" 文字 + 下拉箭头
- 状态反馈：下拉箭头旋转动画表示展开/收起状态

## 技术实现要点
1. **常驻显示**：移除条件渲染，确保按钮始终可见
2. **可选回调**：支持可选的 `onSelect` 回调，增强组件灵活性
3. **层级管理**：z-30 确保按钮不被其他元素遮挡
4. **响应式适配**：根据 `hasToolbar` 属性调整位置

这个优化让用户可以在任何时候查看历史版本，符合用户的直觉使用习惯。
