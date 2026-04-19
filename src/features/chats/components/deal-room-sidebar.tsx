import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconSearch } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Connection = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
};

interface DealRoomSidebarProps {
  connections: Connection[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export function DealRoomSidebar({ connections, activeChatId, onSelectChat }: DealRoomSidebarProps) {
  const [search, setSearch] = useState('');

  return (
    <div className='flex w-64 md:w-72 lg:w-80 flex-shrink-0 border-r bg-white dark:bg-slate-900 flex-col'>
      <div className='p-4 border-b'>
        <h1 className='text-2xl font-bold mb-4'>Deal Room</h1>
        <div className='relative'>
          <IconSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
          <input 
            type="text" 
            placeholder="Search negotiations..." 
            className='w-full bg-slate-100 dark:bg-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className='flex-1'>
        {connections.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(conn => {
          const isActive = conn.id === activeChatId;
          return (
            <div 
              key={conn.id} 
              onClick={() => onSelectChat(conn.id)}
              className={cn(
                'p-4 border-b cursor-pointer transition-colors flex items-start gap-3',
                isActive ? 'bg-rose-50 dark:bg-rose-950/20 border-l-4 border-l-rose-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-l-transparent'
              )}
            >
              <Avatar className='h-10 w-10 shrink-0 border border-slate-200'>
                <AvatarImage src={conn.avatar} />
                <AvatarFallback>{conn.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-baseline mb-0.5'>
                  <h3 className={cn('text-sm font-semibold truncate', isActive && 'text-rose-700 dark:text-rose-400')}>{conn.name}</h3>
                  <span className='text-[10px] text-muted-foreground whitespace-nowrap'>{conn.time}</span>
                </div>
                <p className='text-[11px] text-muted-foreground truncate mb-1'>{conn.role}</p>
                <div className='flex justify-between items-center'>
                  <p className='text-xs text-slate-600 dark:text-slate-400 truncate'>{conn.lastMessage}</p>
                  {conn.unread > 0 && (
                    <div className='w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0'>
                      {conn.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
