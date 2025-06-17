import React from 'react';

interface GeminiLoaderProps {
  progress?: number;
}

export const GeminiLoader: React.FC<GeminiLoaderProps> = ({ progress = 0 }) => {
  return (
    <div className="space-y-3">
      {/* 模拟文本加载的闪烁效果 */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* 模拟逐行生成文本的效果 */}
        <div className="space-y-1.5">
          <div className="h-2 bg-gray-200 rounded-sm animate-pulse" style={{ width: '85%' }}></div>
          <div className="h-2 bg-gray-200 rounded-sm animate-pulse" style={{ width: '92%', animationDelay: '200ms' }}></div>
          <div className="h-2 bg-gray-200 rounded-sm animate-pulse" style={{ width: '78%', animationDelay: '400ms' }}></div>
          <div className="h-2 bg-gray-300 rounded-sm animate-pulse" style={{ width: '45%', animationDelay: '600ms' }}></div>
        </div>
      </div>
      
      {/* 进度指示器 */}
      {progress > 0 && (
        <div className="pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{progress}%</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            正在深度分析市场数据...
          </div>
        </div>
      )}
    </div>
  );
};
