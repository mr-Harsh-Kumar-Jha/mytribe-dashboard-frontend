import { useNavigate } from '@tanstack/react-router'
import { IconArrowLeft, IconBuilding } from '@tabler/icons-react'
import { columns } from '@/features/tasks/components/columns'
import { DataTable } from '@/features/tasks/components/data-table'
import { tasks } from '@/features/tasks/data/tasks'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { mous } from '@/features/mou/data/mous'
import { Badge } from '@/components/ui/badge'
import TasksProvider from '@/features/tasks/context/tasks-context'
import { TasksDialogs } from '@/features/tasks/components/tasks-dialogs'

interface MoUDetailViewProps {
  mouId: string
}

export function MoUDetailView({ mouId }: MoUDetailViewProps) {
  const navigate = useNavigate()
  const mou = mous.find((m) => m.id === mouId)
  const mouTasks = tasks.filter((task) => task.mouId === mouId)

  if (!mou) {
    return <div>MoU not found</div>
  }

  return (
    <TasksProvider>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate({ to: '/mous' })}
          >
            <IconArrowLeft className='mr-2 h-4 w-4' />
            Back to MoUs
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <IconBuilding className='h-6 w-6' />
                </div>
                <div>
                  <CardTitle className='text-xl'>{mou.title}</CardTitle>
                  <CardDescription className='mt-1'>
                    Sponsor: <span className='font-medium text-foreground'>{mou.sponsorName}</span>
                  </CardDescription>
                </div>
              </div>
              <div className='text-right'>
                  <div className='text-3xl font-bold'>${mou.totalAmount.toLocaleString()}</div>
                   <Badge variant={mou.status === 'pending' ? 'outline' : 'secondary'} className={`mt-2 ${mou.status === 'pending' ? 'border-yellow-500 text-yellow-500' : ''}`}>
                      {mou.status.toUpperCase()}
                  </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                       <h4 className="text-sm font-medium mb-1 text-muted-foreground">Description</h4>
                       <p>{mou.description}</p>
                  </div>
                  <div>
                       <h4 className="text-sm font-medium mb-1 text-muted-foreground">Deadline</h4>
                       <p>{mou.deadline}</p>
                  </div>
              </div>

            <div className='mt-8'>
              <h3 className='mb-4 text-lg font-semibold'>Associated Tasks</h3>
              <DataTable data={mouTasks} columns={columns} />
            </div>
          </CardContent>
        </Card>
      </div>
      <TasksDialogs />
    </TasksProvider>
  )
}
