import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SponsorOverview } from './components/sponsor-overview'
import { OrganizerOverview } from './components/organizer-overview'
import { useRoleStore } from '@/stores/roleStore'

export default function Dashboard() {
  const role = useRoleStore((s) => s.role)

  const isSponsor = role === 'sponsor'

  const topNav = isSponsor ? sponsorTopNav : organizerTopNav

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              {isSponsor ? 'Sponsor Dashboard' : 'Organizer Dashboard'}
            </h1>
            <p className='text-sm text-muted-foreground mt-1'>
              {isSponsor
                ? 'Track your sponsorship portfolio, ROI, and brand visibility.'
                : 'Manage your events, MoUs, attendees, and team performance.'}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none">
              Download Report
            </Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-6'>
            {isSponsor ? <SponsorOverview /> : <OrganizerOverview />}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const sponsorTopNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Investments',
    href: 'dashboard/investments',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Events',
    href: 'dashboard/events',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

const organizerTopNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
