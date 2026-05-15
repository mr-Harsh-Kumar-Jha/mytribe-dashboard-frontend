import { createLazyFileRoute } from '@tanstack/react-router'
import Attendees from '@/features/attendees'

export const Route = createLazyFileRoute('/_authenticated/attendees/')({
  component: Attendees,
})
