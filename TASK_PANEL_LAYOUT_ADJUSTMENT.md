# 任务面板布局调整总结

## 调整内容

根据用户需求，将任务面板的显示位置调整为**仅在首页显示**，移除在智研报告和智选模式下的任务栏。

## 修改文件

### 1. `src/pages/Index.tsx`
**主要变更**：
- 重构首页布局为左右两栏（主内容 + 任务栏）
- 调整悬浮输入框右边距，避免与任务栏重叠
- 移除智研报告/智选模式下的任务数据传递
- 新增任务详情弹窗状态管理

**关键代码**：
```tsx
// 首页布局：左右两栏
<div className="flex h-full">
  {/* 主内容区域：新闻卡片 */}
  <div className="flex-1 overflow-hidden">
    {/* 新闻内容 */}
    {/* 悬浮输入框：right-80 避免与任务栏重叠 */}
  </div>
  {/* 右侧任务面板：固定320px宽度 */}
  <div className="w-80 border-l bg-muted/20 overflow-hidden">
    <TaskPanel />
  </div>
</div>
```

### 2. `src/components/NewsChatLayout.tsx`
**主要变更**：
- 恢复到原来的两栏布局（新闻 + AI摘要）
- 移除任务栏渲染逻辑
- 保留任务相关Props以维持向后兼容
- 默认设置 `showTasks={false}`

**布局恢复**：
- 新闻区域：从33%恢复到40%（2/5）
- AI摘要区域：占据剩余60%空间
- 移除三栏布局中的任务栏部分

## 用户体验改进

### ✅ 优势
1. **首页任务管理**: 用户进入系统即可查看任务状态，提升任务管理效率
2. **工作模式专注**: 智研报告和智选模式专注于内容分析，界面更简洁
3. **空间优化**: AI摘要区域获得更多空间，提升分析体验
4. **交互清晰**: 任务管理与内容分析功能明确分离

### 📊 布局对比

| 模式 | 之前布局 | 现在布局 |
|------|----------|----------|
| 首页 | 单栏（新闻 + 悬浮输入框） | 两栏（新闻 + 任务栏） |
| 智研报告 | 三栏（新闻33% + AI摘要42% + 任务25%） | 两栏（新闻40% + AI摘要60%） |
| 智选 | 三栏（新闻33% + AI摘要42% + 任务25%） | 两栏（新闻40% + AI摘要60%） |

## 技术实现

### 条件渲染逻辑
- **首页**: 直接渲染任务面板在右侧
- **其他模式**: 传递 `showTasks={false}` 隐藏任务功能

### 兼容性维护
- 保留 `NewsChatLayout` 中的任务相关Props
- 使用类型导入避免运行时依赖
- 默认参数确保向后兼容

### 样式调整
- 任务面板：`w-80`（320px固定宽度）
- 输入框边距：`right-80` 避免重叠
- 边框分割：`border-l` 视觉分离

## 后续优化建议

1. **响应式适配**: 考虑小屏幕下任务栏的展示方式
2. **状态同步**: 任务状态变更的实时同步机制
3. **快捷操作**: 在其他模式下提供快速访问任务的方式
4. **数据持久化**: 集成后端API实现任务的CRUD操作

## 文件清单

| 文件 | 状态 | 说明 |
|------|------|------|
| `src/pages/Index.tsx` | ✅ 已修改 | 首页布局重构，任务面板集成 |
| `src/components/NewsChatLayout.tsx` | ✅ 已修改 | 恢复两栏布局，移除任务栏 |
| `src/components/TaskPanel.tsx` | ✅ 保持 | 任务面板组件无需修改 |
| `src/components/TaskDetailModal.tsx` | ✅ 保持 | 任务详情弹窗无需修改 |
| `src/data/tasks.ts` | ✅ 保持 | 任务数据结构无需修改 |

调整完成后，任务管理功能更加聚焦于首页，工作模式下的界面更加简洁专注。
