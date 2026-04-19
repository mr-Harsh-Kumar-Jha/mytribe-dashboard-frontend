import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, ArrowRight, Handshake } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { dummyEventsData } from './data/dummy-data';
import { SponsorProposalDialog } from './components/sponsor-proposal-dialog';

export function Events() {
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
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Sponsor Dashboard</h1>
            <p className='text-muted-foreground'>
              Analyze events and evaluate sponsorship opportunities.
            </p>
          </div>
          <Button>Explore New Events</Button>
        </div>
        
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {dummyEventsData.map((event, index) => (
            <Card key={index} className='group overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5 flex flex-col'>
              <div className='h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shrink-0' />
              <CardHeader className='-mt-10 pb-4'>
                <div className='mb-2 rounded-lg bg-background p-3 shadow-sm inline-block w-fit'>
                  <CalendarDays className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='text-xl'>{event['Event Name']}</CardTitle>
                <CardDescription className='font-medium text-primary'>
                  {event['Organizer']}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className='flex flex-col gap-3 text-sm text-muted-foreground mb-6'>
                  <div className='flex items-center gap-2'>
                    <CalendarDays className='h-4 w-4' />
                    <span>{event['Date']} ({event['Duration']})</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    <span>{event['Location']}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>{event['Expected Footfall']} Expected Footfall</span>
                  </div>
                  <div className='mt-2 flex items-center gap-2'>
                    <span className='px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-semibold'>
                      {event['Recommendation']}
                    </span>
                    <span className='px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-semibold'>
                      {event['Category']}
                    </span>
                  </div>
                </div>
                
                <div className='mt-auto flex flex-col gap-3'>
                  <SponsorProposalDialog eventName={event['Event Name'] as string}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <Handshake className="w-4 h-4" /> Sponsor this Event
                    </Button>
                  </SponsorProposalDialog>
                  
                  <div className='flex items-center justify-between'>
                    <div className='flex -space-x-2'>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className='h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium'>
                          U{i}
                        </div>
                      ))}
                    </div>
                    <Button asChild variant='secondary' size="sm" className='group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                      <Link to='/events/$eventId' params={{ eventId: (index + 1).toString() }}>
                        View Insights <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  );
}
