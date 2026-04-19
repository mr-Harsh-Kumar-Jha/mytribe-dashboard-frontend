import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Instagram, 
  Linkedin, 
  Facebook, 
  History, 
  Users, 
  PieChart, 
  Star, 
  TrendingUp,
  Info,
  CalendarDays,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const icons: Record<string, any> = {
  root: Building2,
  location: MapPin,
  duration: Clock,
  details: Info,
  history: History,
  insta: Instagram,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  events: CalendarDays,
  persona: Users,
  demographic: PieChart,
  'last spon': Star,
  satisfaction: Star,
  rating: Star,
  roi: TrendingUp,
  star: Star,
  trendingup: TrendingUp
};

const gradients: Record<string, string> = {
  root: 'from-blue-600 to-indigo-600 text-white border-blue-500 shadow-blue-500/30',
  category: 'from-slate-800 to-slate-900 text-white border-slate-700',
  leaf: 'from-white to-slate-50 text-slate-800 border-slate-200 dark:from-slate-950 dark:to-slate-900 dark:text-slate-200 dark:border-slate-800',
};

export function MindmapNode({ data }: any) {
  const { label, type = 'leaf', icon, value, hasChildren, isExpanded } = data;
  
  const Icon = icons[icon?.toLowerCase()] || icons[type] || Info;
  const gradientClass = gradients[type] || gradients.leaf;

  return (
    <div className={cn("relative group", hasChildren ? "cursor-pointer" : "")}>
      {/* Target handle for incoming connections */}
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left-target"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        id="right-target"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top-target"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />

      <div className={cn(
        "rounded-xl border shadow-sm transition-all duration-300 ease-in-out px-4 py-3 min-w-[180px] max-w-[250px] bg-gradient-to-br flex items-center gap-3",
        "group-hover:shadow-md group-hover:scale-[1.02]",
        hasChildren && !isExpanded ? "ring-2 ring-primary/50" : "",
        gradientClass
      )}>
        <div className={cn(
          "p-2 rounded-lg flex items-center justify-center shrink-0 relative",
          type === 'root' ? 'bg-white/20' : 
          type === 'category' ? 'bg-white/10' : 
          'bg-primary/10 text-primary dark:bg-primary/20'
        )}>
          <Icon className="w-5 h-5" />
          {hasChildren && type !== 'root' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              {isExpanded ? <ChevronDown className="w-2 h-2" /> : <ChevronRight className="w-2 h-2" />}
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className={cn(
            "text-xs font-semibold tracking-tight text-muted-foreground uppercase",
            type === 'root' ? 'text-sm text-blue-100' : '',
            type === 'category' ? 'text-slate-300' : ''
          )}>
            {label}
          </span>
          {value !== undefined && (
            <span className={cn(
              "font-bold truncate",
              type === 'root' ? 'text-xl whitespace-pre-line' : 'text-base'
            )}>
              {value}
            </span>
          )}
        </div>
      </div>

      {/* Source handles for outgoing connections */}
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right-source"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        id="left-source"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom-source"
        className="w-2 h-2 !bg-primary border-2 !border-background shadow-sm opacity-0" 
      />
    </div>
  );
}
