import { createFileRoute } from '@tanstack/react-router'
import { MoUDetailView } from '@/features/mou/components/mou-detail-view'

export const Route = createFileRoute('/_authenticated/mous/$mouId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mouId } = Route.useParams()
  return <MoUDetailView mouId={mouId} />
}
