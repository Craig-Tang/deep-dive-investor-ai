# 被动事件监听器警告修复

## 问题描述
`StackedNewsCards.tsx:62  Unable to preventDefault inside passive event listener invocation.`

这个错误是因为在滚轮事件处理函数中调用了 `event.preventDefault()`，但现代浏览器将滚轮事件默认设置为被动监听器以提升性能。

## 问题原因
在 `handleWheel` 函数中：
```tsx
const handleWheel = (event: React.WheelEvent) => {
  event.preventDefault(); // ❌ 这里导致了警告
  // ... 其他逻辑
};
```

被动事件监听器不允许调用 `preventDefault()`，因为浏览器需要确保滚动性能不被阻塞。

## 解决方案

### 1. 移除 preventDefault()
移除了 `event.preventDefault()` 调用，允许正常的页面滚动行为。

### 2. 添加滚动阈值
添加 `Math.abs(event.deltaY) > 10` 检查，避免微小滚动触发卡片切换。

### 3. 添加防抖机制
- 新增 `wheelDebounce` 状态
- 在处理滚轮事件时设置200ms的防抖延迟
- 避免过于频繁的卡片切换

## 修复后的代码
```tsx
const [wheelDebounce, setWheelDebounce] = useState(false);

const handleWheel = (event: React.WheelEvent) => {
  // 防抖处理，避免过于频繁的切换
  if (wheelDebounce) return;
  
  // 移除 preventDefault() 以避免被动事件监听器警告
  if (Math.abs(event.deltaY) > 10) { // 添加阈值避免过于敏感
    setWheelDebounce(true);
    setTimeout(() => setWheelDebounce(false), 200); // 200ms防抖
    
    if (event.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    }
  }
};
```

## 改进效果
1. **消除控制台警告**：不再有被动事件监听器错误
2. **保持功能**：滚轮切换卡片功能依然正常工作
3. **改善体验**：防抖机制使切换更加平滑
4. **兼容性好**：不会阻止用户的正常页面滚动

## 技术说明
- **被动监听器**：浏览器为了性能优化默认将某些事件（如wheel、touchstart等）设为被动
- **防抖时间**：200ms是经过测试的合理值，既能防止过快切换又保持响应性
- **滚动阈值**：10px的阈值避免了轻微滚动触发意外切换

这个修复确保了应用在所有现代浏览器中都能正常运行，没有控制台警告。
