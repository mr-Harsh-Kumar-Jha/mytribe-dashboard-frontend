import { createFileRoute } from '@tanstack/react-router'
import { ChatView } from '@/features/chats/components/chat-view'
import { conversations } from '@/features/chats/data/data'

export const Route = createFileRoute('/_authenticated/chats/$chatId')({
  component: ChatIdRoute,
  loader: ({ params }) => {
      const conversation = conversations.find(c => c.id === params.chatId)
      if (!conversation) {
          throw new Error('Conversation not found')
      }
      return { conversation }
  }
})

function ChatIdRoute() {
  const { conversation } = Route.useLoaderData()
  return <ChatView conversation={conversation} />
}
