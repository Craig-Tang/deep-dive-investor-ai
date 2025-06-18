import { useState, useCallback } from 'react';
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
  };  const setSuggestions = useCallback((questions: string[]) => {
    setSuggestedQuestions(questions);
  }, []);
  // 根据选中的关键词生成推荐问题
  const generateSuggestionsFromKeywords = (keywords: string[]) => {
    if (keywords.length === 0) {
      // 没有关键词时使用默认推荐问题
      setSuggestedQuestions([
        '分析OpenAI融资对AI行业的影响',
        '评估当前AI投资风险',
        '推荐AI细分领域投资机会',
        '对比主要AI公司估值'
      ]);
      return;
    }

    // 基于关键词生成动态问题
    const keywordText = keywords.join('、');
    const suggestions: string[] = [];

    // 问题模板库
    const templates = {
      investment: [
        `深入研究${keywordText}的投资前景`,
        `分析${keywordText}相关公司的估值水平`,
        `评估${keywordText}领域的投资机会与风险`
      ],
      technology: [
        `${keywordText}技术发展趋势分析`,
        `评估${keywordText}的技术壁垒与竞争优势`,
        `${keywordText}领域的技术突破对投资的影响`
      ],
      market: [
        `${keywordText}市场规模与增长预期`,
        `${keywordText}行业竞争格局深度解析`,
        `${keywordText}的市场机会与挑战分析`
      ],
      company: [
        `${keywordText}相关龙头企业投资价值分析`,
        `对比${keywordText}领域主要公司的竞争力`,
        `${keywordText}赛道的投资标的推荐`
      ],
      generic: [
        `深入研究${keywordText}的投资前景`,
        `分析${keywordText}的市场机会`,
        `评估${keywordText}相关的投资风险`
      ]
    };

    // 根据关键词类型选择合适的模板
    if (keywords.some(k => 
      k.includes('投资') || k.includes('基金') || k.includes('估值') || 
      k.includes('融资') || k.includes('IPO') || k.includes('股价')
    )) {
      suggestions.push(...templates.investment);
    } else if (keywords.some(k => 
      k.includes('AI') || k.includes('人工智能') || k.includes('机器学习') || 
      k.includes('算法') || k.includes('模型') || k.includes('技术')
    )) {
      suggestions.push(...templates.technology);
    } else if (keywords.some(k => 
      k.includes('市场') || k.includes('行业') || k.includes('趋势') || 
      k.includes('发展') || k.includes('增长') || k.includes('规模')
    )) {
      suggestions.push(...templates.market);
    } else if (keywords.some(k => 
      k.includes('公司') || k.includes('企业') || k.includes('OpenAI') || 
      k.includes('谷歌') || k.includes('微软') || k.includes('百度')
    )) {
      suggestions.push(...templates.company);
    } else {
      suggestions.push(...templates.generic);
    }

    // 如果没有生成足够的问题，补充其他类型的问题
    if (suggestions.length < 3) {
      const remainingTemplates = Object.values(templates).flat()
        .filter(template => !suggestions.includes(template))
        .map(template => template.replace(/\${keywordText}/g, keywordText));
      suggestions.push(...remainingTemplates);
    }

    // 随机化并限制为3个问题
    const shuffled = suggestions.sort(() => Math.random() - 0.5);
    setSuggestedQuestions(shuffled.slice(0, 3));
  };  return {
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
