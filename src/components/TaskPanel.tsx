import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  TrendingUp,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task, TaskGroup } from '@/data/tasks';

interface TaskPanelProps {
  taskGroups: TaskGroup[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: () => void;
  className?: string;
}

interface TaskItemProps {
  task: Task;
  onClick?: () => void;
}

// 任务状态图标映射
const getStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'in-progress':
      return <PlayCircle className="w-4 h-4 text-blue-500" />;
    case 'overdue':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'pending':
      return <Circle className="w-4 h-4 text-gray-400" />;
    default:
      return <Circle className="w-4 h-4 text-gray-400" />;
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

// 单个任务项组件
const TaskItem: React.FC<TaskItemProps> = ({ task, onClick }) => {
  const deadlineInfo = getDeadlineInfo(task.deadline);
  
  return (
    <div 
      className={cn(
        "p-2.5 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer",
        task.status === 'overdue' && "border-red-200 bg-red-50/50",
        task.status === 'completed' && "opacity-75"
      )}
      onClick={onClick}
    >
      {/* 任务标题行 */}
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {getStatusIcon(task.status)}
          <h4 className={cn(
            "text-xs font-medium truncate",
            task.status === 'completed' && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h4>
        </div>
        <Badge 
          variant="outline" 
          className={cn("text-xs ml-1.5 flex-shrink-0 px-1 py-0", getPriorityColor(task.priority))}
        >
          {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
        </Badge>
      </div>
      
      {/* 任务描述 */}
      <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">
        {task.description}
      </p>
      
      {/* 进度条（仅对进行中的任务显示） */}
      {task.status === 'in-progress' && typeof task.progress === 'number' && (
        <div className="mb-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">进度</span>
            <span className="text-xs font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-1" />
        </div>
      )}
      
      {/* 底部信息行 */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          {task.category && (
            <Badge variant="secondary" className="text-xs px-1 py-0">
              {task.category === 'research' ? '研究' : 
               task.category === 'analysis' ? '分析' : 
               task.category === 'report' ? '报告' : 
               task.category === 'monitoring' ? '监控' : 
               task.category === 'meeting' ? '会议' : task.category}
            </Badge>
          )}
          {task.estimatedHours && (
            <span className="flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              {task.estimatedHours}h
            </span>
          )}
        </div>
        
        {deadlineInfo && (
          <span className={cn("flex items-center gap-0.5", deadlineInfo.color)}>
            <Calendar className="w-2.5 h-2.5" />
            {deadlineInfo.text}
          </span>
        )}
      </div>
      
      {/* 相关关键词 */}
      {task.relatedKeywords && task.relatedKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {task.relatedKeywords.slice(0, 2).map((keyword, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs px-1 py-0 bg-blue-50 text-blue-700 border-blue-200"
            >
              {keyword}
            </Badge>
          ))}
          {task.relatedKeywords.length > 2 && (
            <Badge variant="outline" className="text-xs px-1 py-0 text-muted-foreground">
              +{task.relatedKeywords.length - 2}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

// 任务组标题组件
const TaskGroupHeader: React.FC<{ group: TaskGroup }> = ({ group }) => {
  const stats = {
    total: group.tasks.length,
    completed: group.tasks.filter(t => t.status === 'completed').length,
    overdue: group.tasks.filter(t => t.status === 'overdue').length
  };
  
  return (
    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg mb-2">
      <div className="flex items-center gap-2">
        {group.assignedBy === 'boss' ? (
          <Crown className="w-3 h-3 text-yellow-600" />
        ) : (
          <User className="w-3 h-3 text-blue-600" />
        )}
        <h3 className="font-medium text-xs">{group.title}</h3>
        <Badge variant="outline" className="text-xs px-1 py-0">
          {stats.total}
        </Badge>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {stats.completed > 0 && (
          <span className="flex items-center gap-0.5 text-green-600">
            <CheckCircle className="w-2.5 h-2.5" />
            {stats.completed}
          </span>
        )}
        {stats.overdue > 0 && (
          <span className="flex items-center gap-0.5 text-red-600">
            <AlertTriangle className="w-2.5 h-2.5" />
            {stats.overdue}
          </span>
        )}
      </div>
    </div>
  );
};

// 主任务面板组件
export const TaskPanel: React.FC<TaskPanelProps> = ({ 
  taskGroups, 
  onTaskClick, 
  onAddTask,
  className 
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['老板分配', '个人任务']));
  
  const toggleGroup = (groupTitle: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupTitle)) {
      newExpanded.delete(groupTitle);
    } else {
      newExpanded.add(groupTitle);
    }
    setExpandedGroups(newExpanded);
  };
  
  // 计算总体统计
  const allTasks = taskGroups.flatMap(group => group.tasks);
  const totalStats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    inProgress: allTasks.filter(t => t.status === 'in-progress').length,
    overdue: allTasks.filter(t => t.status === 'overdue').length
  };
  
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            投研任务
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onAddTask}
            className="h-7 w-7 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        {/* 总体统计 */}
        <div className="grid grid-cols-4 gap-1 text-center text-xs mt-2">
          <div className="p-1.5 bg-muted/50 rounded">
            <div className="font-medium text-xs">{totalStats.total}</div>
            <div className="text-muted-foreground text-xs">总数</div>
          </div>
          <div className="p-1.5 bg-blue-50 rounded">
            <div className="font-medium text-xs text-blue-600">{totalStats.inProgress}</div>
            <div className="text-blue-600 text-xs">进行中</div>
          </div>
          <div className="p-1.5 bg-green-50 rounded">
            <div className="font-medium text-xs text-green-600">{totalStats.completed}</div>
            <div className="text-green-600 text-xs">已完成</div>
          </div>
          <div className="p-1.5 bg-red-50 rounded">
            <div className="font-medium text-xs text-red-600">{totalStats.overdue}</div>
            <div className="text-red-600 text-xs">逾期</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-3 pt-0">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {taskGroups.map((group) => (
              <div key={group.title}>
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full"
                >
                  <TaskGroupHeader group={group} />
                </button>
                
                {expandedGroups.has(group.title) && (
                  <div className="space-y-2 mb-3">
                    {group.tasks.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-xs">
                        暂无任务
                      </div>
                    ) : (
                      group.tasks.map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onClick={() => onTaskClick?.(task)}
                        />
                      ))
                    )}
                  </div>
                )}
                
                {group !== taskGroups[taskGroups.length - 1] && (
                  <Separator className="my-3" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
