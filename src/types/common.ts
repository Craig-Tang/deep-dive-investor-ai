// 通用类型定义

export type LayoutMode = 'home' | 'chat' | 'research' | 'research-canvas';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  isDeepResearch?: boolean;
  timestamp: Date;
  isLoading?: boolean;
  loadingProgress?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  content: string;
  source: string;
  publishedAt: Date;
  category: string;
  impact: 'high' | 'medium' | 'low';
  imageUrl?: string;
  readTime: number;
  trending?: boolean;
}

export interface ReportBlock {
  id: string;
  title: string;
  content: string;
  type: 'paragraph' | 'chart' | 'summary' | 'quote' | 'list' | 'heading';
  references?: string[];
  metadata?: {
    source?: string;
    confidence?: number;
    lastUpdated?: Date;
  };
}

// 状态接口
export interface NewsState {
  items: NewsItem[];
  selectedNews: NewsItem | null;
  isDetailModalOpen: boolean;
  searchQuery: string;
  selectedCategories: string[];
  sortBy: 'date' | 'impact' | 'trending';
}

export interface ChatState {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  loadingProgress: number;
  researchHistory: Array<{
    id: string;
    topic: string;
    summary: string;
    timestamp: Date;
  }>;
}

export interface ResearchState {
  blocks: ReportBlock[];
  isGenerating: boolean;
  generatingProgress: number;
  currentTopic: string;
  editingBlockId: string | null;
}

export interface LayoutState {
  layoutMode: LayoutMode;
  isHistoryDropdownOpen: boolean;
}
