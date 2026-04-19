import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconSearch, IconDotsVertical, IconPaperclip, IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { ProposalCard } from './proposal-card';

export function DealRoomChatArea({ activeChat }: { activeChat: any }) {
  const [inputText, setInputText] = useState('');

  return (
    <div className='flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] relative overflow-hidden'>
      
      {/* Chat Header */}
      <div className='h-16 px-4 md:px-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 shadow-sm z-10'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={activeChat.avatar} />
            <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className='text-sm font-bold truncate'>{activeChat.name}</h2>
            <p className='text-xs text-rose-500 font-medium truncate'>{activeChat.role}</p>
          </div>
        </div>
        <div className='flex items-center gap-1 md:gap-2'>
          <Button variant='ghost' size='icon' className='text-slate-400 hover:text-slate-600'><IconSearch size={20} /></Button>
          <Button variant='ghost' size='icon' className='text-slate-400 hover:text-slate-600'><IconDotsVertical size={20} /></Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className='flex-1 p-4 md:p-6'>
        <div className='max-w-3xl mx-auto space-y-6'>
          
          {/* Date Divider */}
          <div className='flex justify-center'>
            <span className='px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-[10px] font-medium text-slate-500 uppercase tracking-wider'>
              Today
            </span>
          </div>

          {activeChat.id === 'org-1' ? (
            <>
              {/* Organizer Message */}
              <div className='flex gap-3'>
                <Avatar className='h-8 w-8 shrink-0 mt-1'>
                  <AvatarImage src={activeChat.avatar} />
                </Avatar>
                <div className='flex flex-col gap-1 max-w-[80%]'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-sm font-semibold'>{activeChat.name}</span>
                    <span className='text-[10px] text-muted-foreground'>10:24 AM</span>
                  </div>
                  <div className='bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300'>
                    Hi there! Thanks for your interest in sponsoring Tech Summit 2026. Have you had a chance to review our sponsorship packages?
                  </div>
                </div>
              </div>

              {/* Sponsor (You) Text Message */}
              <div className='flex gap-3 flex-row-reverse'>
                <Avatar className='h-8 w-8 shrink-0 mt-1 bg-rose-100'>
                  <AvatarFallback className="text-rose-600">ME</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1 max-w-[80%] items-end'>
                  <div className='flex items-baseline gap-2 flex-row-reverse'>
                    <span className='text-sm font-semibold'>You</span>
                    <span className='text-[10px] text-muted-foreground'>10:45 AM</span>
                  </div>
                  <div className='bg-rose-500 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm'>
                    Hi {activeChat.name.split(' ')[0]}! Yes, I'm very interested in the Gold package, but I've made a few custom requests regarding the booth location and extra event passes. I've attached my counter-proposal below.
                  </div>
                </div>
              </div>

              {/* Sponsor (You) PROPOSAL CARD */}
              <div className='flex gap-3 flex-row-reverse'>
                <Avatar className='h-8 w-8 shrink-0 mt-1 bg-rose-100 opacity-0'>
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1 w-full max-w-md items-end'>
                  <ProposalCard />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center p-8">
              <p className="text-sm text-muted-foreground">Start of your conversation with {activeChat.name}.</p>
            </div>
          )}

        </div>
      </ScrollArea>

      {/* Chat Input Area */}
      <div className='p-4 bg-white dark:bg-slate-900 border-t shrink-0'>
        <div className='max-w-4xl mx-auto relative flex items-center'>
          <Button variant='ghost' size='icon' className='absolute left-2 text-slate-400 hover:text-slate-600 rounded-full'>
            <IconPaperclip size={20} />
          </Button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to negotiate..." 
            className='w-full bg-slate-100 dark:bg-slate-800 rounded-full pl-12 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all border border-transparent focus:border-rose-300'
          />
          <Button size='icon' className='absolute right-2 h-8 w-8 rounded-full bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105'>
            <IconSend size={16} />
          </Button>
        </div>
        <p className='text-center text-[10px] text-muted-foreground mt-2'>
          Both parties must agree on the final deliverables before the Digital MoU can be signed.
        </p>
      </div>

    </div>
  );
}
