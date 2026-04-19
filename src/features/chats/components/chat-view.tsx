import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  IconSend,
  IconPaperclip,
  IconDotsVertical,
  IconPhone,
  IconVideo,
} from '@tabler/icons-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useState } from 'react'
import { Conversation, Message } from '../data/schema'

interface ChatViewProps {
  conversation: Conversation
}

export function ChatView({ conversation }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages)
  const [input, setInput] = useState('')
  const participant = conversation.participants.find((p) => p.id !== 'ADMIN-001')

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      senderId: 'ADMIN-001',
      content: input,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages([...messages, newMessage])
    setInput('')
  }

  if (!participant) return <div className='p-4'>Select a conversation</div>

  return (
    <div className='flex h-full flex-col'>
      {/* Top Bar */}
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='h-10 w-10 border'>
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className='font-semibold leading-none'>{participant.name}</div>
            <div className='mt-1 text-xs text-muted-foreground'>
              {participant.status}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost'>
            <IconPhone size={20} className='text-muted-foreground' />
          </Button>
          <Button size='icon' variant='ghost'>
            <IconVideo size={20} className='text-muted-foreground' />
          </Button>
          <Button size='icon' variant='ghost'>
             <IconDotsVertical size={20} className='text-muted-foreground' />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className='flex-1 p-4'>
        <div className='flex flex-col gap-4'>
          {messages.map((message) => {
            const isMe = message.senderId === 'ADMIN-001'
            return (
              <div
                key={message.id}
                className={cn(
                  'flex max-w-[75%] flex-col gap-1 text-sm',
                  isMe ? 'ml-auto items-end' : 'items-start'
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2 shadow-sm',
                    isMe
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  )}
                >
                  {message.content}
                </div>
                <span className='text-[10px] text-muted-foreground'>
                  {format(new Date(message.timestamp), 'h:mm a')}
                </span>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className='border-t p-4'>
        <form
          className='flex items-center gap-2'
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Button size='icon' variant='ghost' type='button' className='shrink-0'>
            <IconPaperclip className='h-5 w-5 text-muted-foreground' />
          </Button>
           <Input
            placeholder='Type a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1'
          />
          <Button type='submit' size='icon' disabled={!input.trim()}>
            <IconSend className='h-5 w-5' />
          </Button>
        </form>
      </div>
    </div>
  )
}
