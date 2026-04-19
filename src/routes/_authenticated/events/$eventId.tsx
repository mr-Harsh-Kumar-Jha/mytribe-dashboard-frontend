import { createFileRoute } from '@tanstack/react-router'
import { EventDetailView } from '@/features/events/components/event-detail-view'

export const Route = createFileRoute('/_authenticated/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId } = Route.useParams()
  return <EventDetailView eventId={eventId} />
}
