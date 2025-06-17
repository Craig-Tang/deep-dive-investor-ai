import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, TrendingUp } from 'lucide-react';

interface AISummaryProps {
  className?: string;
}

export const AISummary: React.FC<AISummaryProps> = ({ className = "" }) => {
  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const summary = `今天是${currentDate}，AI投研市场继续保持高度活跃。OpenAI完成65亿美元融资刷新行业记录，估值达1570亿美元，彰显了投资者对生成式AI长期前景的坚定信心。技术层面，Anthropic发布的Claude 4.0在AGI能力上取得重大突破，多项基准测试创下新高，标志着AI向通用智能又迈进了关键一步。

资本市场方面，红杉资本宣布设立20亿美元AI专项基金，成为迄今规模最大的AI投资基金，重点布局基础设施、应用创新和垂直行业解决方案。同时，算力供需矛盾依然突出，英伟达H200芯片供不应求，交付周期延长至8-12个月，推动AI训练成本大幅上涨150%。

政策环境上，欧盟AI法案正式生效，对高风险AI系统实施严格监管，合规成本成为投资决策的重要考量因素。整体而言，AI行业正处于技术突破与商业化加速的关键节点，投资机会与挑战并存。`;

  return (
    <Card className={`mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-blue-500/5 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI投研日报摘要</h2>
          </div>
          <Badge variant="secondary" className="ml-auto flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            今日
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>市场热度: 高</span>
          </div>
          <div>6条重要动态</div>
          <div>3个投资机会</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
          {summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="text-xs">OpenAI融资</Badge>
          <Badge variant="outline" className="text-xs">Claude 4.0</Badge>
          <Badge variant="outline" className="text-xs">红杉AI基金</Badge>
          <Badge variant="outline" className="text-xs">算力短缺</Badge>
          <Badge variant="outline" className="text-xs">欧盟AI法案</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
