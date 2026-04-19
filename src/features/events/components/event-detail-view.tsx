import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Handshake } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { EventMindmap } from './event-mindmap';
import { SponsorProposalDialog } from './sponsor-proposal-dialog';
import { dummyEventsData } from '../data/dummy-data';

export function EventDetailView({ eventId }: { eventId: string }) {
  const index = parseInt(eventId) - 1;
  const event = dummyEventsData[index] || dummyEventsData[0];
  const eventName = event['Event Name'] as string;

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button asChild variant='outline' size='icon' className='h-9 w-9'>
              <Link to='/events'>
                <ArrowLeft className='h-4 w-4' />
              </Link>
            </Button>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>Event Insights Mindmap</h1>
              <p className='text-muted-foreground'>
                Comprehensive overview of {eventName}.
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline'>
              <Share2 className='mr-2 h-4 w-4' /> Share
            </Button>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' /> Export
            </Button>
            <SponsorProposalDialog eventName={eventName}>
              <Button className="gap-2 bg-primary">
                <Handshake className="w-4 h-4" /> Sponsor this Event
              </Button>
            </SponsorProposalDialog>
          </div>
        </div>
        
        <div className='w-full'>
          <EventMindmap eventId={eventId} />
        </div>
      </Main>
    </>
  );
}
