import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, User, Bot, Sparkles } from 'lucide-react';
import { GeminiLoader } from './GeminiLoader';
import type { Message } from '@/pages/Index';

interface ChatMessagesProps {
  messages: Message[];
  isDeepResearching: boolean;
  researchProgress: number;
  placeholder?: {
    title: string;
    subtitle: string;
  };
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isDeepResearching,
  researchProgress,
  placeholder = {
    title: "AI风投研究助手",
    subtitle: "开始AI投资研究分析"
  }
}) => {
  return (
    <div className="h-[calc(100%-9rem)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <p className="text-base font-medium mb-1">{placeholder.title}</p>
            <p className="text-xs">{placeholder.subtitle}</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.type === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                
                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-card border-border'
                } shadow-sm`}>
                  <CardContent className="p-3">
                    {message.isLoading ? (
                      <GeminiLoader progress={message.loadingProgress} />
                    ) : (
                      <>
                        <p className="text-base leading-relaxed">{message.content}</p>
                        {message.isDeepResearch && (
                          <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                            <Sparkles className="w-3 h-3" />
                            <span>智研</span>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>            </div>          ))}
        </>
      )}
    </div>
  );
};
