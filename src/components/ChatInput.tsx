import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, X } from 'lucide-react';

interface ChatInputProps {
  selectedKeywords: string[];
  suggestedQuestions: string[];
  onSendMessage: (content: string, isDeepResearch?: boolean) => void;
  onClearKeywords: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  selectedKeywords,
  suggestedQuestions,
  onSendMessage,
  onClearKeywords,
  placeholder = "输入您的AI投资问题，获得专业分析..."
}) => {
  const [input, setInput] = useState('');

  const handleSend = (isDeepResearch: boolean = false) => {
    if (input.trim()) {
      onSendMessage(input.trim(), isDeepResearch);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-3">
      {/* 选中的关键词显示 */}
      {selectedKeywords.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50">
          <span className="text-xs text-muted-foreground font-medium">已选关键词:</span>
          {selectedKeywords.map((keyword) => (
            <Badge 
              key={keyword} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              {keyword}
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearKeywords}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* 问题推荐 */}
      {suggestedQuestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">推荐问题</span>
          </div>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="w-full text-left p-3 text-sm bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 输入框 */}
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pr-24 min-h-[50px] resize-none bg-background"
        />
        <div className="absolute right-2 bottom-2 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSend(true)}
            disabled={!input.trim()}
            className="h-8 px-3"
          >
            深度研究
          </Button>
          <Button
            size="sm"
            onClick={() => handleSend(false)}
            disabled={!input.trim()}
            className="h-8 w-8 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
