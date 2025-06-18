import { useState } from 'react';
import type { Message } from '@/pages/Index';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDeepResearching, setIsDeepResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    '分析OpenAI融资对AI行业的影响',
    '评估当前AI投资风险',
    '推荐AI细分领域投资机会',
    '对比主要AI公司估值'
  ]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const startDeepResearch = () => {
    setIsDeepResearching(true);
    setResearchProgress(0);
  };

  const updateResearchProgress = (progress: number) => {
    setResearchProgress(progress);
  };

  const endDeepResearch = () => {
    setIsDeepResearching(false);
    setResearchProgress(0);
  };

  const setSuggestions = (questions: string[]) => {
    setSuggestedQuestions(questions);
  };

  return {
    // State
    messages,
    isDeepResearching,
    researchProgress,
    suggestedQuestions,
    
    // Actions
    addMessage,
    updateMessage,
    clearMessages,
    startDeepResearch,
    updateResearchProgress,
    endDeepResearch,
    setSuggestions,
    setMessages
  };
};
