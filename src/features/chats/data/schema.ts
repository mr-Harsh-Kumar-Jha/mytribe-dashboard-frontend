import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional(),
  status: z.enum(['online', 'offline', 'away', 'busy']).default('offline'),
})

export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  content: z.string(),
  timestamp: z.string(), // ISO string
  read: z.boolean().default(false),
})

export const conversationSchema = z.object({
  id: z.string(),
  participants: z.array(userSchema),
  messages: z.array(messageSchema),
  lastMessage: messageSchema.optional(),
  unreadCount: z.number().default(0),
})

export type User = z.infer<typeof userSchema>
export type Message = z.infer<typeof messageSchema>
export type Conversation = z.infer<typeof conversationSchema>
