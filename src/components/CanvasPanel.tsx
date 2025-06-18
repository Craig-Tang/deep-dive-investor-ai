
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { HistoryDropdown } from './HistoryDropdown';
import { Palette, Trash2, FileText, BarChart3, TrendingUp, Edit3, Save, X, Plus, Download, FileDown, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ReportBlock } from '@/pages/Index';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  type: 'report' | 'canvas';
  data: ReportBlock[] | Record<string, unknown>;
}

interface CanvasPanelProps {
  blocks: ReportBlock[];
  onBlocksChange: (blocks: ReportBlock[]) => void;
  onGenerateReport?: () => void;
  onContinueResearch?: (content: string) => void;
  onExportMarkdown?: () => void;
  onHistorySelect?: (item: HistoryItem) => void;
  hasToolbar?: boolean;
}

interface EditableBlockProps {
  block: ReportBlock;
  onUpdate: (updatedBlock: ReportBlock) => void;
  onRemove: () => void;
}

const EditableBlock: React.FC<EditableBlockProps> = ({ block, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(block.title);
  const [editedContent, setEditedContent] = useState(block.content);
  const [editedReferences, setEditedReferences] = useState<string[]>(block.references || []);
  const [newReference, setNewReference] = useState('');

  const handleSave = () => {
    onUpdate({
      ...block,
      title: editedTitle,
      content: editedContent,
      references: editedReferences.filter(ref => ref.trim() !== '')
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(block.title);
    setEditedContent(block.content);
    setEditedReferences(block.references || []);
    setNewReference('');
    setIsEditing(false);
  };

  const addReference = () => {
    if (newReference.trim()) {
      setEditedReferences([...editedReferences, newReference.trim()]);
      setNewReference('');
    }
  };

  const removeReference = (index: number) => {
    setEditedReferences(editedReferences.filter((_, i) => i !== index));
  };

  const getBlockIcon = (type: ReportBlock['type']) => {
    switch (type) {
      case 'summary':
        return <TrendingUp className="w-4 h-4" />;
      case 'chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'paragraph':
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getBlockColor = (type: ReportBlock['type']) => {
    switch (type) {
      case 'summary':
        return 'border-muted-foreground/30 bg-muted/40';
      case 'chart':
        return 'border-accent-foreground/30 bg-accent/40';
      case 'paragraph':
      default:
        return 'border-secondary-foreground/30 bg-secondary/40';
    }
  };

  return (
    <Card className={`w-full ${getBlockColor(block.type)} border`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {getBlockIcon(block.type)}
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="font-medium text-sm bg-background"
                placeholder="标题"
              />
            ) : (
              <h3 className="font-medium text-sm text-foreground">{block.title}</h3>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {block.type === 'summary' ? '摘要' : 
               block.type === 'chart' ? '图表' : '段落'}
            </Badge>
            {!isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={onRemove}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleSave}
                >
                  <Save className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleCancel}
                >
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-xs font-medium">内容 (支持Markdown)</Label>
              <Textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[120px] text-xs bg-background"
                placeholder="输入内容，支持Markdown格式..."
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label className="text-xs font-medium">参考文献</Label>
              {editedReferences.map((ref, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={ref}
                    onChange={(e) => {
                      const newRefs = [...editedReferences];
                      newRefs[index] = e.target.value;
                      setEditedReferences(newRefs);
                    }}
                    className="text-xs bg-background"
                    placeholder="参考文献"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => removeReference(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newReference}
                  onChange={(e) => setNewReference(e.target.value)}
                  className="text-xs bg-background"
                  placeholder="添加新的参考文献"
                  onKeyPress={(e) => e.key === 'Enter' && addReference()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={addReference}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>            <div className="prose prose-sm max-w-none text-xs text-foreground leading-relaxed">
              <ReactMarkdown>
                {block.content}
              </ReactMarkdown>
            </div>
            
            {block.references && block.references.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">参考文献：</p>
                  {block.references.map((ref, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      [{index + 1}] {ref}
                    </p>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const CanvasPanel: React.FC<CanvasPanelProps> = ({ 
  blocks,
  onBlocksChange,
  onGenerateReport,
  onContinueResearch,
  onExportMarkdown,
  onHistorySelect,
  hasToolbar = false
}) => {const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Drop event triggered');
    try {
      const blockData = JSON.parse(e.dataTransfer.getData('application/json'));
      console.log('Parsed block data:', blockData);
      const newBlock: ReportBlock = {
        ...blockData,
        id: Date.now().toString()
      };
      onBlocksChange([...blocks, newBlock]);
      console.log('Block added to canvas');
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  const removeBlock = (blockId: string) => {
    onBlocksChange(blocks.filter(block => block.id !== blockId));
  };  const updateBlock = (blockId: string, updatedBlock: ReportBlock) => {
    onBlocksChange(blocks.map(block => 
      block.id === blockId ? updatedBlock : block
    ));
  };

  const handleExportMarkdown = () => {
    if (blocks.length === 0) return;
    
    let markdown = `# 投资研究报告\n\n`;
    markdown += `*生成时间: ${new Date().toLocaleString('zh-CN')}*\n\n`;
    
    blocks.forEach((block, index) => {
      markdown += `## ${index + 1}. ${block.title}\n\n`;
      markdown += `${block.content}\n\n`;
      
      if (block.references && block.references.length > 0) {
        markdown += `### 参考文献\n\n`;
        block.references.forEach((ref, refIndex) => {
          markdown += `${refIndex + 1}. ${ref}\n`;
        });
        markdown += `\n`;
      }
    });
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `投资研究报告_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContinueResearch = () => {
    const content = blocks.map(block => block.title).join('、');
    onContinueResearch?.(content);
  };    return (
    <div className="h-full w-full flex flex-col bg-background border-l animate-in slide-in-from-right-5 duration-300">      <div className="border-b p-4 bg-muted/30 flex-shrink-0 animate-in fade-in-0 slide-in-from-top-2 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-2 duration-700 delay-200">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">我的画布</h2>
            <Badge variant="outline" className="text-xs animate-in fade-in-0 zoom-in-95 duration-500 delay-300">
              {blocks.length} 个内容块
            </Badge>
          </div>            <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-right-2 duration-700 delay-200">
            {/* 历史记录按钮 - 常驻显示 */}
            <HistoryDropdown 
              type="canvas"
              onSelect={onHistorySelect}
            />
            {blocks.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleContinueResearch}
                  className="h-8 px-3 flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  继续研究
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerateReport}
                  className="h-8 px-3 flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  生成报告
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportMarkdown || handleExportMarkdown}
                  className="h-8 px-3 flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  导出MD
                </Button>
              </>
            )}
          </div>
        </div>        <p className="text-sm text-muted-foreground mt-1 animate-in fade-in-0 slide-in-from-bottom-1 duration-500 delay-300">
          {blocks.length === 0 ? '拖拽内容到这里整理' : '编辑内容，管理您的投资研究'}
        </p>
      </div>
        <div 
        className="flex-1 w-full p-4 overflow-y-auto"
        onDrop={handleDrop}
        onDragOver={handleDragOver}        >{blocks.length === 0 ? (
          <div className="min-h-full w-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg animate-in fade-in-0 zoom-in-95 duration-500 delay-200">
            <div className="text-center text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
              <Palette className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50 animate-pulse" />
              <p className="font-medium">拖拽内容到画布</p>
              <p className="text-sm mt-1">从研究报告拖拽感兴趣的内容</p>
            </div>
          </div>) : (
          <div className="w-full space-y-4">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="animate-in fade-in-0 slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EditableBlock
                  block={block}
                  onUpdate={(updatedBlock) => updateBlock(block.id, updatedBlock)}
                  onRemove={() => removeBlock(block.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
