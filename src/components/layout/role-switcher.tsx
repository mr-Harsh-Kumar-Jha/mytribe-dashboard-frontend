import { useRoleStore, type UserRole } from '@/stores/roleStore'
import { cn } from '@/lib/utils'
import { IconBuildingSkyscraper, IconCalendarEvent } from '@tabler/icons-react'

const roles: { value: UserRole; label: string; icon: React.ElementType; color: string }[] = [
  {
    value: 'sponsor',
    label: 'Sponsor',
    icon: IconBuildingSkyscraper,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    value: 'organizer',
    label: 'Organizer',
    icon: IconCalendarEvent,
    color: 'from-pink-500 to-purple-500',
  },
]

export function RoleSwitcher() {
  const { role, setRole } = useRoleStore()

  return (
    <div className='px-2 py-3'>
      <p className='mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
        Switch Role
      </p>
      <div className='flex gap-1 rounded-lg bg-muted/50 p-1'>
        {roles.map((r) => {
          const Icon = r.icon
          const isActive = role === r.value
          return (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200',
                isActive
                  ? `bg-gradient-to-r ${r.color} text-white shadow-sm`
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon size={14} />
              <span className='group-data-[collapsible=icon]:hidden'>
                {r.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
