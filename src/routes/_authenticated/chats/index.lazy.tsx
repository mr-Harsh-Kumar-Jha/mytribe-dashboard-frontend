import { createLazyFileRoute } from '@tanstack/react-router'
import { DealRoomLayout } from '@/features/chats/components/deal-room-layout'

export const Route = createLazyFileRoute('/_authenticated/chats/')({
  component: DealRoomLayout,
})
