
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import type { Message } from '@/pages/Index';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string, isDeepResearch?: boolean) => void;
  isDeepResearching: boolean;
  researchProgress: number;
  mode: 'overlay' | 'full' | 'compact';
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isDeepResearching,
  researchProgress,
  mode
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDeepResearchMode, setIsDeepResearchMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <Card className={`${
          message.type === 'user' 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white border-gray-200'
        } shadow-sm`}>
          <CardContent className="p-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
            {message.isDeepResearch && (
              <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                <Sparkles className="w-3 h-3" />
                <span>Deep Research</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const inputSection = (
    <div className="border-t bg-white/95 backdrop-blur-sm p-4">
      {isDeepResearching && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-800">Deep Research 进行中...</span>
          </div>
          <Progress value={researchProgress} className="h-2" />
          <p className="text-xs text-blue-600 mt-1">正在分析市场数据和新闻资讯</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的投资问题..."
            className="pr-24 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            disabled={isDeepResearching}
          />
          <Button
            type="button"
            variant={isDeepResearchMode ? "default" : "ghost"}
            size="sm"
            className={`absolute right-1 top-1 h-8 px-2 text-xs ${
              isDeepResearchMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => setIsDeepResearchMode(!isDeepResearchMode)}
            disabled={isDeepResearching}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Deep
          </Button>
        </div>
        <Button 
          type="submit" 
          disabled={!inputValue.trim() || isDeepResearching}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );

  if (mode === 'overlay') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {messages.length > 0 && (
          <div className="max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border-t">
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
    <div className="h-full flex flex-col bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
      <div className={`border-b bg-white/80 backdrop-blur-sm ${mode === 'compact' ? 'p-3' : 'p-4'}`}>
        <h2 className={`font-bold text-gray-800 ${mode === 'compact' ? 'text-lg' : 'text-xl'}`}>
          AI 投研助手
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          智能分析 · 深度研究 · 投资洞察
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
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
