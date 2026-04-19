import { Conversation, User, Message } from './schema'

export const users: User[] = [
  {
    id: 'ADMIN-001',
    name: 'You',
    email: 'admin@mytribe.com',
    avatar: 'https://ui.shadcn.com/avatars/01.png',
    status: 'online',
  },
  {
    id: 'USER-001',
    name: 'Alice Smith',
    email: 'alice@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
    status: 'online',
  },
  {
    id: 'USER-002',
    name: 'Bob Jones',
    email: 'bob@example.com',
    avatar: 'https://ui.shadcn.com/avatars/03.png',
    status: 'offline',
  },
  {
    id: 'SPONSOR-001',
    name: 'TechCorp Rep',
    email: 'contact@techcorp.com',
    avatar: 'https://ui.shadcn.com/avatars/04.png',
    status: 'away',
  },
]

const messages1: Message[] = [
  {
    id: 'MSG-001',
    senderId: 'USER-001',
    content: 'Hi, I have a question about the event schedule.',
    timestamp: '2024-02-10T09:00:00Z',
    read: true,
  },
  {
    id: 'MSG-002',
    senderId: 'ADMIN-001',
    content: 'Hello Alice! Sure, what would you like to know?',
    timestamp: '2024-02-10T09:05:00Z',
    read: true,
  },
  {
    id: 'MSG-003',
    senderId: 'USER-001',
    content: 'Is the keynote speech at 10 AM or 11 AM?',
    timestamp: '2024-02-10T09:06:00Z',
    read: false,
  },
]

const messages2: Message[] = [
  {
    id: 'MSG-101',
    senderId: 'ADMIN-001',
    content: 'Checking in on the sponsorship payment.',
    timestamp: '2024-02-09T14:00:00Z',
    read: true,
  },
  {
    id: 'MSG-102',
    senderId: 'SPONSOR-001',
    content: 'We processed it yesterday. Should be in your account soon.',
    timestamp: '2024-02-09T15:30:00Z',
    read: false,
  },
]

export const conversations: Conversation[] = [
  {
    id: 'CONV-001',
    participants: [users[0], users[1]],
    messages: messages1,
    lastMessage: messages1[messages1.length - 1],
    unreadCount: 1,
  },
  {
    id: 'CONV-002',
    participants: [users[0], users[3]],
    messages: messages2,
    lastMessage: messages2[messages2.length - 1],
    unreadCount: 0,
  },
]
