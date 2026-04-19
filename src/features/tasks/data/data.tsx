import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconBriefcase,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconSignature,
  IconStopwatch,
} from '@tabler/icons-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const types = [
  {
    value: 'mou',
    label: 'MoU Logic',
    icon: IconSignature,
  },
  {
    value: 'internal',
    label: 'Internal Task',
    icon: IconBriefcase,
  },
]

export const statuses = [
  {
    value: 'pending',
    label: 'Pending Acceptance',
    icon: IconExclamationCircle,
  },
  {
    value: 'pending',
    label: 'Pending Acceptance',
    icon: IconExclamationCircle,
  },
  {
    value: 'backlog',
    label: 'Backlog',
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: IconCircle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: 'Done',
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: IconArrowUp,
  },
]
