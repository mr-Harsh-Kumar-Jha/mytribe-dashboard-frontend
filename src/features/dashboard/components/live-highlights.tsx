import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconSignature,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  type: 'urgent' | 'mou' | 'task'
  dueIn: string
  priority: 'high' | 'medium'
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Tech Sponsor MoU',
    type: 'mou',
    dueIn: '4 hours',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Finalize Catering Menu',
    type: 'urgent',
    dueIn: '12 hours',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Send Speaker Briefs',
    type: 'task',
    dueIn: '24 hours',
    priority: 'medium',
  },
]

export function LiveHighlights() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Live Highlights
        </CardTitle>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
          3 Pending Actions
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    task.type === 'mou'
                      ? 'bg-purple-500/20 text-purple-400'
                      : task.type === 'urgent'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                  )}
                >
                  {task.type === 'mou' && <IconSignature size={16} />}
                  {task.type === 'urgent' && <IconAlertTriangle size={16} />}
                  {task.type === 'task' && <IconClock size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-pink-300 transition-colors">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500">Due in {task.dueIn}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <IconCheck size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
