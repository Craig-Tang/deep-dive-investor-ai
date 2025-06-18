# 首页标题栏添加功能

## 功能需求
为首页添加一个常驻的标题栏，类似于两三栏模式的工具栏，实现：
- 左侧显示"Cybernaut"标题，点击回到首页
- 右侧显示"研究报告"和"画布"按钮
- 其他页面内容相应下移，适应标题栏高度

## 实现方案

### 1. 布局配置修改
**文件**: `src/types/layout.ts`
```typescript
home: {
  mode: 'home',
  type: 'overlay',
  panels: [
    { type: 'news', key: 'news-home', width: 100 }
  ],
  resizable: false,
  hasToolbar: true  // 从 false 改为 true
},
```

### 2. LayoutManager 工具栏修改
**文件**: `src/components/LayoutManager.tsx`

**修改前**：首页使用悬浮按钮
```tsx
if (config.mode === 'home') {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {/* 悬浮按钮 */}
    </div>
  );
}
```

**修改后**：首页使用完整标题栏
```tsx
if (config.mode === 'home') {
  return (
    <div className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20">
      <Button 
        variant="ghost" 
        onClick={onBackToHome}
        className="text-lg font-semibold"
      >
        Cybernaut
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onModeSwitch('research')}>
          <MessageSquare className="w-4 h-4" />
          研究报告
        </Button>
        <Button variant="outline" onClick={() => onModeSwitch('research-canvas')}>
          <Palette className="w-4 h-4" />
          画布
        </Button>
      </div>
    </div>
  );
}
```

## 设计特点

### 视觉设计
- **高度统一**: 64px (`h-16`) 与其他模式工具栏保持一致
- **毛玻璃效果**: `bg-card/80 backdrop-blur-sm` 现代化视觉
- **动画效果**: 渐入动画和hover反馈
- **边框分割**: `border-b` 清晰分隔标题栏和内容区

### 交互设计
- **品牌标识**: 左侧"Cybernaut"作为可点击的品牌标题
- **功能入口**: 右侧按钮提供快速访问研究和画布功能
- **一致性**: 与其他模式的工具栏保持相同的交互模式

### 响应式适配
- **内容下移**: 内容区域自动适应标题栏高度 (`h-[calc(100vh-4rem)]`)
- **z-index层级**: `z-20` 确保标题栏在合适的层级
- **动画延迟**: 分层次的动画效果提升用户体验

## 用户体验改进

1. **导航一致性**: 所有页面都有统一的顶部导航区域
2. **品牌识别**: 清晰的"Cybernaut"品牌标识
3. **功能可达性**: 在首页就能快速访问核心功能
4. **视觉层次**: 明确的页面结构和内容层次

## 技术实现要点

- **配置驱动**: 通过 `hasToolbar: true` 启用标题栏
- **条件渲染**: 根据 `config.mode` 渲染不同的工具栏样式
- **状态管理**: 使用现有的 `onBackToHome` 和 `onModeSwitch` 回调
- **样式继承**: 复用现有的工具栏样式和动画

这个改进让首页拥有了更完整的导航体验，同时保持了与其他页面的设计一致性。
