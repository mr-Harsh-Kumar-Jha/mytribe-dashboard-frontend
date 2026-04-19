import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { Conversation } from '../data/schema'
import { conversations as mockConversations, users } from '../data/data'
import { IconSearch, IconMessagePlus, IconDotsVertical, IconCircleDashed } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ChatListProps {
  conversations?: Conversation[]
  collapsed?: boolean
}

export function ChatList({ conversations = mockConversations, collapsed: _collapsed }: ChatListProps) {
  const navigate = useNavigate()
  const { chatId } = useParams({ strict: false }) as { chatId?: string }
  const currentUser = users.find(u => u.id === 'ADMIN-001')

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/30 px-4 py-3 border-b">
        <Avatar className='cursor-pointer hover:opacity-80 transition-opacity'>
          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
          <AvatarFallback>{currentUser?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <IconCircleDashed size={22} stroke={1.5} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <IconMessagePlus size={22} stroke={1.5} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <IconDotsVertical size={22} stroke={1.5} />
            </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search or start new chat" 
            className="pl-9 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/20" 
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {conversations.map((conversation) => {
            const participant = conversation.participants.find(
              (p) => p.id !== 'ADMIN-001'
            )
            
            if (!participant) return null
            
            const isActive = chatId === conversation.id
            const lastMessage = conversation.lastMessage
            
            return (
              <button
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50 border-b border-border/40 last:border-0",
                  isActive && "bg-muted"
                )}
                onClick={() =>
                  navigate({
                    to: '/chats/$chatId',
                    params: { chatId: conversation.id },
                  })
                }
              >
                <Avatar className="h-12 w-12 border border-border/10">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 grid gap-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-sm text-foreground truncate">{participant.name}</span>
                    <span 
                        className={cn(
                            "text-[10px] whitespace-nowrap",
                            conversation.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"
                        )}
                    >
                      {lastMessage && formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground truncate pr-2 w-[85%]">
                        {lastMessage?.content}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge className="h-5 min-w-5 rounded-full px-1.5 flex items-center justify-center bg-primary hover:bg-primary text-[10px]">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
