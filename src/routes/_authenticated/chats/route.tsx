import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chats')({
  component: ChatRoute,
})

function ChatRoute() {
  return <Outlet />
}
