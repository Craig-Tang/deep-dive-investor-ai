# 画布卡片编辑模式优化

## 修改内容

根据用户需求，优化了画布卡片编辑模式的界面布局，提升编辑体验。

## 主要改进

### 1. 编辑框变大
- **文本域高度**: 从 `min-h-[120px]` 增加到 `min-h-[200px]`
- **字体大小**: 从 `text-xs` 增加到 `text-sm`，提升可读性
- **间距优化**: 调整 `space-y-3` 增加元素间距

### 2. 参考文献区域优化
- **移除分隔栏**: 用简单的 `border-t` 替代 `<Separator />`
- **样式简化**: 使用 `border-t border-muted-foreground/20` 创建细横线
- **布局改进**: 添加序号显示 `[1]`, `[2]` 等，提升可读性
- **空间压缩**: 减少不必要的间距和视觉重量

### 3. 显示效果一致性
- **编辑模式**: 参考文献使用横线分隔，带序号标识
- **查看模式**: 同样使用横线分隔，保持视觉一致性
- **文字大小**: 统一使用合适的字体大小层次

## 修改文件

### `src/components/CanvasPanel.tsx`

**编辑模式改进**:
```tsx
// 内容编辑区域
<Textarea
  className="min-h-[200px] text-sm bg-background"  // 更大的编辑框
  // ...existing props
/>

// 参考文献区域
<div className="border-t pt-3">  // 使用横线替代分隔栏
  <Label className="text-xs font-medium text-muted-foreground">参考文献</Label>
  <div className="mt-2 space-y-2">
    {/* 带序号的参考文献输入 */}
    <span className="text-xs text-muted-foreground w-6">[{index + 1}]</span>
    // ...
  </div>
</div>
```

**查看模式改进**:
```tsx
// 参考文献显示
<div className="pt-3 border-t border-muted-foreground/20">
  <p className="text-xs font-medium text-muted-foreground mb-2">参考文献：</p>
  <div className="space-y-1">
    {block.references.map((ref, index) => (
      <p className="text-xs text-muted-foreground leading-relaxed">
        [{index + 1}] {ref}
      </p>
    ))}
  </div>
</div>
```

## 用户体验改进

### ✅ 编辑体验提升
1. **更大编辑空间**: 200px高度提供更舒适的编辑体验
2. **更清晰文字**: 更大的字体提升可读性
3. **直观序号**: 参考文献自动编号，便于管理

### ✅ 界面简化
1. **减少视觉噪音**: 移除厚重的分隔栏
2. **保持一致性**: 编辑和查看模式使用相同的分隔样式
3. **布局紧凑**: 优化间距，提升信息密度

### ✅ 响应式设计
- 保持原有的响应式特性
- 横线分隔适配各种屏幕尺寸
- 序号布局在小屏幕下依然清晰

这次优化让画布卡片的编辑体验更加流畅，界面更加简洁，符合现代UI设计规范。
