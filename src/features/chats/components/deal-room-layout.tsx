import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import { DealRoomSidebar } from './deal-room-sidebar';
import { DealRoomChatArea } from './deal-room-chat-area';

// Hardcoded Demo Data
const CONNECTIONS = [
  {
    id: 'org-1',
    name: 'Sarah Jenkins',
    role: 'Event Organizer - Tech Summit 2026',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    lastMessage: 'Custom proposal received.',
    time: 'Just now',
    unread: 1,
    isActive: true
  },
  {
    id: 'user-2',
    name: 'Michael Chen',
    role: 'Marketing Director',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    lastMessage: 'Can we schedule a quick call tomorrow?',
    time: '2h ago',
    unread: 0,
    isActive: false
  }
];

export function DealRoomLayout() {
  const [activeChatId, setActiveChatId] = useState('org-1');
  const activeChat = CONNECTIONS.find(c => c.id === activeChatId) || CONNECTIONS[0];

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='flex h-full w-full bg-slate-50 dark:bg-slate-950 rounded-xl border shadow-sm overflow-hidden'>
          <DealRoomSidebar 
            connections={CONNECTIONS} 
            activeChatId={activeChatId} 
            onSelectChat={setActiveChatId} 
          />
          <DealRoomChatArea activeChat={activeChat} />
        </div>
      </Main>
    </>
  );
}
