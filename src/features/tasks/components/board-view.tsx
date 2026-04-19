import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Task } from '../data/schema'
import { statuses, labels, priorities } from '../data/data'
import {
  IconCalendar,
  IconUser,
  IconBuilding,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

interface BoardViewProps {
  tasks: Task[]
}

export function BoardView({ tasks }: BoardViewProps) {
  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4">
      {statuses.map((status) => {
        const statusTasks = tasks.filter((task) => task.status === status.value)

        return (
          <div key={status.value} className="flex h-full min-w-[300px] flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-semibold flex items-center">
                {status.icon && <status.icon className="mr-2 h-4 w-4" />}
                {status.label}
              </h3>
              <Badge variant="secondary">{statusTasks.length}</Badge>
            </div>

            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-3 p-1">
                {statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )
      })}
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const label = labels.find((l) => l.value === task.label)
  const priority = priorities.find((p) => p.value === task.priority)

  return (
    <Card className="cursor-pointer hover:border-pink-500/50 transition-all bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
            {task.id}
          </Badge>
          {priority && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-5">
              {priority.label}
            </Badge>
          )}
        </div>
        <CardTitle className="text-sm font-medium leading-snug">
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {task.deadline && (
            <div className="flex items-center gap-1">
              <IconCalendar size={12} />
              <span>{task.deadline}</span>
            </div>
          )}
          {task.assignee && (
            <div className="flex items-center gap-1">
              <IconUser size={12} />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>

        {/* MoU / Internal specifics */}
        {(task.type === 'mou' || task.sponsor) && (
          <div className="text-xs bg-purple-500/10 text-purple-400 p-2 rounded-md flex items-center gap-2 border border-purple-500/20">
            <IconBuilding size={12} />
            <span className="font-medium">{task.sponsor || 'Sponsor Task'}</span>
          </div>
        )}

        {/* Amount */}
        {task.amount && (
           <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Amount</span>
              <span className="text-sm font-bold text-green-500">${task.amount.toLocaleString()}</span>
           </div>
        )}

        {/* Labels */}
        <div className="flex flex-wrap gap-1 mt-2">
          {label && (
            <Badge variant="secondary" className="text-[10px]">
              {label.label}
            </Badge>
          )}
          {task.type === 'mou' && (
            <Badge
              variant="outline"
              className="text-[10px] border-pink-500/50 text-pink-400"
            >
              MoU
            </Badge>
          )}
        </div>

        {/* Accept/Reject Actions for Pending Tasks */}
        {task.status === 'pending' && (
            <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full h-7 text-xs bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle Accept
                        console.log('Accepted task', task.id);
                    }}
                >
                    Accept
                </Button>
                <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full h-7 text-xs"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle Reject
                        console.log('Rejected task', task.id);
                    }}
                >
                    Reject
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
