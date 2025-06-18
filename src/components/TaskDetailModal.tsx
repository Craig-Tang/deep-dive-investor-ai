import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Circle, 
  PlayCircle,
  User,
  Crown,
  Calendar,
  Building2,
  Tag,
  Edit3,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from '@/data/tasks';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onToggleStatus?: (task: Task) => void;
}

// 任务状态图标映射
const getStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <PlayCircle className="w-5 h-5 text-blue-500" />;
    case 'overdue':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case 'pending':
      return <Circle className="w-5 h-5 text-gray-400" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

// 优先级颜色映射
const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// 状态颜色映射
const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'pending':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// 获取截止时间显示文本和颜色
const getDeadlineInfo = (deadline?: Date) => {
  if (!deadline) return null;
  
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return {
      text: `逾期${Math.abs(diffDays)}天`,
      color: 'text-red-500'
    };
  } else if (diffDays === 0) {
    return {
      text: '今天截止',
      color: 'text-orange-500'
    };
  } else if (diffDays === 1) {
    return {
      text: '明天截止',
      color: 'text-orange-500'
    };
  } else if (diffDays <= 3) {
    return {
      text: `${diffDays}天后截止`,
      color: 'text-yellow-600'
    };
  } else {
    return {
      text: `${diffDays}天后截止`,
      color: 'text-gray-500'
    };
  }
};

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  if (!task) return null;

  const deadlineInfo = getDeadlineInfo(task.deadline);
  
  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-lg font-semibold mb-2 leading-tight">
                {task.title}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  {task.assignedBy === 'boss' ? (
                    <Crown className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <User className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {task.assignedBy === 'boss' ? '老板分配' : '个人任务'}
                  </span>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn("text-sm", getPriorityColor(task.priority))}
                >
                  {task.priority === 'high' ? '高优先级' : 
                   task.priority === 'medium' ? '中优先级' : '低优先级'}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-sm", getStatusColor(task.status))}
                >
                  {getStatusIcon(task.status)}
                  <span className="ml-1">
                    {task.status === 'completed' ? '已完成' :
                     task.status === 'in-progress' ? '进行中' :
                     task.status === 'overdue' ? '已逾期' : '待开始'}
                  </span>
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(task)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(task)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 任务描述 */}
          <div>
            <h4 className="font-medium mb-2">任务描述</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          </div>
          
          {/* 进度信息 */}
          {task.status === 'in-progress' && typeof task.progress === 'number' && (
            <div>
              <h4 className="font-medium mb-2">完成进度</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">进度</span>
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            </div>
          )}
          
          <Separator />
          
          {/* 任务信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">基本信息</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">类别：</span>
                  <Badge variant="secondary" className="text-sm">
                    {task.category === 'research' ? '研究' : 
                     task.category === 'analysis' ? '分析' : 
                     task.category === 'report' ? '报告' : 
                     task.category === 'monitoring' ? '监控' : 
                     task.category === 'meeting' ? '会议' : task.category}
                  </Badge>
                </div>
                
                {task.estimatedHours && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">预估时间：</span>
                    <span className="text-sm">{task.estimatedHours} 小时</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">创建时间：</span>
                  <span className="text-sm">{formatDate(task.createdAt)}</span>
                </div>
                
                {task.completedAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">完成时间：</span>
                    <span className="text-sm">{formatDate(task.completedAt)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">时间安排</h4>
              <div className="space-y-3">
                {task.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">截止时间：</span>
                    <span className={cn("text-sm", deadlineInfo?.color)}>
                      {formatDate(task.deadline)}
                    </span>
                  </div>
                )}
                
                {deadlineInfo && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={cn("w-4 h-4", deadlineInfo.color)} />
                    <span className={cn("text-sm font-medium", deadlineInfo.color)}>
                      {deadlineInfo.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 相关信息 */}
          {(task.relatedKeywords?.length > 0 || task.relatedCompanies?.length > 0) && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3">相关信息</h4>
                <div className="space-y-3">
                  {task.relatedKeywords && task.relatedKeywords.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground mb-2 block">关键词：</span>
                      <div className="flex flex-wrap gap-1">
                        {task.relatedKeywords.map((keyword, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-sm bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {task.relatedCompanies && task.relatedCompanies.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground mb-2 block">相关公司：</span>
                      <div className="flex flex-wrap gap-1">
                        {task.relatedCompanies.map((company, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-sm bg-orange-50 text-orange-700 border-orange-200"
                          >
                            <Building2 className="w-3 h-3 mr-1" />
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {/* 操作按钮 */}
          {onToggleStatus && (
            <>
              <Separator />
              <div className="flex gap-2">
                {task.status === 'pending' && (
                  <Button onClick={() => onToggleStatus(task)} className="flex-1">
                    开始任务
                  </Button>
                )}
                {task.status === 'in-progress' && (
                  <Button onClick={() => onToggleStatus(task)} className="flex-1">
                    标记完成
                  </Button>
                )}
                {task.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    onClick={() => onToggleStatus(task)} 
                    className="flex-1"
                  >
                    重新开始
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
