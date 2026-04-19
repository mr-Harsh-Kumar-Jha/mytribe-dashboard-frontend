import { Button } from '@/components/ui/button'
import { IconLayoutKanban, IconList } from '@tabler/icons-react'

interface TasksViewSwitcherProps {
  currentView: 'list' | 'board'
  onViewChange: (view: 'list' | 'board') => void
}

export function TasksViewSwitcher({
  currentView,
  onViewChange,
}: TasksViewSwitcherProps) {
  return (
    <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-lg border border-border">
      <Button
        variant={currentView === 'list' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-8"
      >
        <IconList size={16} className="mr-2" />
        List
      </Button>
      <Button
        variant={currentView === 'board' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('board')}
        className="h-8"
      >
        <IconLayoutKanban size={16} className="mr-2" />
        Board
      </Button>
    </div>
  )
}
