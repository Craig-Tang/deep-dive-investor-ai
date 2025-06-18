import { useState } from 'react';
import type { NewsItem } from '@/types/common';

export const useNewsState = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearKeywords = () => {
    setSelectedKeywords([]);
  };

  const openNewsDetail = (news: NewsItem) => {
    setSelectedNewsDetail(news);
    setIsDetailModalOpen(true);
  };

  const closeNewsDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedNewsDetail(null);
  };

  return {
    // State
    selectedNews,
    selectedKeywords,
    selectedNewsDetail,
    isDetailModalOpen,
    
    // Actions
    setSelectedNews,
    handleKeywordToggle,
    clearKeywords,
    openNewsDetail,
    closeNewsDetail
  };
};
