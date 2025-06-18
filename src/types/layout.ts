export type LayoutMode = 'home' | 'chat' | 'research' | 'research-canvas';

export type PanelType = 'news' | 'chat' | 'research' | 'canvas' | 'news-chat';

export interface PanelConfig {
  type: PanelType;
  key: string;
  width?: number; // 百分比宽度
  minWidth?: number; // 最小宽度百分比
}

export interface LayoutConfig {
  mode: LayoutMode;
  type: 'single' | 'horizontal' | 'overlay';
  panels: PanelConfig[];
  resizable?: boolean;
  hasToolbar?: boolean;
}

// 布局配置常量
export const LAYOUT_CONFIGS: Record<LayoutMode, LayoutConfig> = {
  home: {
    mode: 'home',
    type: 'overlay',
    panels: [
      { type: 'news', key: 'news-home', width: 100 }
    ],
    resizable: false,
    hasToolbar: false
  },
  chat: {
    mode: 'chat',
    type: 'horizontal',
    panels: [
      { type: 'news-chat', key: 'news-chat', width: 100 }
    ],
    resizable: false,
    hasToolbar: true
  },
  research: {
    mode: 'research',
    type: 'horizontal',
    panels: [
      { type: 'news-chat', key: 'news-chat', width: 60, minWidth: 40 },
      { type: 'research', key: 'research', width: 40, minWidth: 30 }
    ],
    resizable: true,
    hasToolbar: true
  },
  'research-canvas': {
    mode: 'research-canvas',
    type: 'horizontal',
    panels: [
      { type: 'news-chat', key: 'news-chat', width: 50, minWidth: 30 },
      { type: 'research', key: 'research', width: 25, minWidth: 20 },
      { type: 'canvas', key: 'canvas', width: 25, minWidth: 20 }
    ],
    resizable: true,
    hasToolbar: true
  }
};
