import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, User, Bot, X } from 'lucide-react';
import type { Message } from '@/pages/Index';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string, isDeepResearch?: boolean) => void;
  isDeepResearching: boolean;
  researchProgress: number;
  mode: 'overlay' | 'full' | 'compact' | 'input-only' | 'chat';
  selectedKeywords?: string[];
  suggestedQuestions?: string[];
  onClearKeywords?: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isDeepResearching,
  researchProgress,
  mode,
  selectedKeywords = [],
  suggestedQuestions = [],
  onClearKeywords
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDeepResearchMode, setIsDeepResearchMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue, isDeepResearchMode);
      setInputValue('');
      setIsDeepResearchMode(false);
    }
  };
  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex gap-3 mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.type === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <Card className={`${
          message.type === 'user' 
            ? 'bg-primary text-primary-foreground border-primary' 
            : 'bg-card border-border'
        } shadow-sm`}>
          <CardContent className="p-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
            {message.isDeepResearch && (
              <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                <Sparkles className="w-3 h-3" />
                <span>智研</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );  const inputSection = (
    <div className={`${
      mode === 'input-only' ? 'floating-input' : 
      'border-t bg-card/95 backdrop-blur-sm'
    } p-4 space-y-3`}>      {/* 选中的关键词显示 */}
      {selectedKeywords.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <span className="text-muted-foreground">关键词:</span>
          {selectedKeywords.map((keyword, index) => (
            <span 
              key={keyword} 
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium animate-in fade-in-0 zoom-in-95 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {keyword}
            </span>
          ))}
          {onClearKeywords && (
            <button 
              onClick={onClearKeywords}
              className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors ml-1 hover:scale-110 duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}{/* 问题推荐 */}
      {suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              className="inline-flex items-center px-3 py-1.5 text-xs bg-muted/50 hover:bg-muted/70 text-muted-foreground hover:text-foreground rounded-full border border-border/50 hover:border-border transition-all duration-200 hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {isDeepResearching && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span className="text-sm font-medium text-foreground">智研 进行中...</span>
          </div>
          <Progress value={researchProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">正在分析市场数据和新闻资讯</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">          <div className={`flex items-center gap-3 min-h-[56px] ${
            mode === 'input-only' 
              ? 'chat-input-modern px-4' 
              : 'bg-background border border-input rounded-lg px-3 py-2'
          }`}>            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入问题"
              className={`border-0 bg-transparent focus:ring-0 focus:outline-none flex-1 ${
                mode === 'input-only' ? 'text-lg placeholder:text-muted-foreground/70 h-auto' : 'text-base'
              }`}
              disabled={isDeepResearching}
            />
            
            {mode === 'input-only' && (              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={isDeepResearchMode ? "default" : "ghost"}
                  size="sm"                  className={`h-9 px-3 text-sm rounded-full transition-all ${
                    isDeepResearchMode 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm' 
                      : 'text-primary hover:bg-primary/10 hover:text-primary'
                  }`}
                  onClick={() => setIsDeepResearchMode(!isDeepResearchMode)}
                  disabled={isDeepResearching}
                >
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  智研
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isDeepResearching}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 p-0 shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
            {mode !== 'input-only' && (
            <Button
              type="button"
              variant={isDeepResearchMode ? "default" : "ghost"}
              size="sm"              className={`absolute right-12 top-1 h-8 px-2 text-sm ${
                isDeepResearchMode 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-primary hover:bg-muted'
              }`}
              onClick={() => setIsDeepResearchMode(!isDeepResearchMode)}
              disabled={isDeepResearching}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              智研
            </Button>
          )}
        </div>
        
        {mode !== 'input-only' && (
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isDeepResearching}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        )}
      </form>
    </div>
  );  if (mode === 'input-only') {
    return (
      <div className="floating-input-container">
        {inputSection}
      </div>
    );
  }
  if (mode === 'overlay') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {messages.length > 0 && (
          <div className="max-h-96 overflow-y-auto bg-card/95 backdrop-blur-sm border-t">
            <div className="p-4">
              {messages.slice(-3).map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
        {inputSection}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">      {(mode === 'full' || mode === 'compact' || mode === 'chat') && (
        <div className={`border-b bg-card/80 backdrop-blur-sm ${mode === 'compact' ? 'p-3' : 'p-4'}`}>
          <h2 className={`font-bold text-foreground text-xl`}>
            AI 投研助手
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            智能分析 · 深度研究 · 投资洞察
          </p>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg font-medium mb-2">欢迎使用 AI 投研助手</p>
              <p className="text-sm">输入您的问题开始智能投资分析</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {inputSection}
    </div>
  );
};
