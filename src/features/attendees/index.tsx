import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  IconUsers,
  IconUserCheck,
  IconCalendarEvent,
  IconChartPie,
} from '@tabler/icons-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

// ─── Mock Data ──────────────────────────────────────────────────
const pastEvents = [
  {
    name: 'EUPHORIA 2025',
    date: 'Feb 14, 2025',
    totalAttendees: 7200,
    checkedIn: 5800,
    demographics: [
      { name: '18-22', value: 3200, color: '#6366f1' },
      { name: '22-28', value: 2400, color: '#f59e0b' },
      { name: '28-35', value: 1100, color: '#22c55e' },
      { name: '35+', value: 500, color: '#ec4899' },
    ],
    interests: ['Music', 'Fashion', 'Social Media'],
    incomeLevel: 'Mid',
  },
  {
    name: 'TECHCON 2025',
    date: 'Aug 5, 2025',
    totalAttendees: 3500,
    checkedIn: 3100,
    demographics: [
      { name: '18-22', value: 800, color: '#6366f1' },
      { name: '22-28', value: 1500, color: '#f59e0b' },
      { name: '28-35', value: 900, color: '#22c55e' },
      { name: '35+', value: 300, color: '#ec4899' },
    ],
    interests: ['Technology', 'Startups', 'Networking'],
    incomeLevel: 'Upper Mid',
  },
  {
    name: 'HACKATHON 2025',
    date: 'Oct 12, 2025',
    totalAttendees: 1200,
    checkedIn: 1150,
    demographics: [
      { name: '18-22', value: 600, color: '#6366f1' },
      { name: '22-28', value: 450, color: '#f59e0b' },
      { name: '28-35', value: 120, color: '#22c55e' },
      { name: '35+', value: 30, color: '#ec4899' },
    ],
    interests: ['Coding', 'Innovation', 'Prizes'],
    incomeLevel: 'Mid',
  },
]

const upcomingEvents = [
  {
    name: 'EUPHORIA 2026',
    date: 'Feb 14, 2026',
    expectedAttendees: 7500,
    registeredSoFar: 4200,
    demographics: [
      { name: '18-22', value: 1900, color: '#6366f1' },
      { name: '22-28', value: 1400, color: '#f59e0b' },
      { name: '28-35', value: 650, color: '#22c55e' },
      { name: '35+', value: 250, color: '#ec4899' },
    ],
    interests: ['Music', 'Fashion', 'Networking'],
    incomeLevel: 'Mid',
  },
  {
    name: 'STARTUP SUMMIT 2026',
    date: 'Mar 20, 2026',
    expectedAttendees: 2800,
    registeredSoFar: 1600,
    demographics: [
      { name: '18-22', value: 300, color: '#6366f1' },
      { name: '22-28', value: 800, color: '#f59e0b' },
      { name: '28-35', value: 400, color: '#22c55e' },
      { name: '35+', value: 100, color: '#ec4899' },
    ],
    interests: ['Startups', 'Investment', 'Growth'],
    incomeLevel: 'Upper Mid',
  },
]

const aggregatePersonaData = [
  { age: '18-22', count: 6800 },
  { age: '22-28', count: 6550 },
  { age: '28-35', count: 3170 },
  { age: '35+', count: 1180 },
]

const interestBreakdown = [
  { name: 'Technology', value: 35, color: '#6366f1' },
  { name: 'Music & Arts', value: 25, color: '#ec4899' },
  { name: 'Business', value: 20, color: '#22c55e' },
  { name: 'Social/Lifestyle', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
]

// ─── Component ──────────────────────────────────────────────────
export default function Attendees() {
  const [, setActiveTab] = useState('past')

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Attendees</h2>
            <p className='text-muted-foreground'>
              Understand your audience persona across past and upcoming events.
            </p>
          </div>
        </div>

        {/* Aggregate Persona Summary */}
        <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='group relative overflow-hidden hover:shadow-lg transition-all'>
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity' />
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Total Attendees (All Time)</CardTitle>
              <IconUsers size={18} className='text-indigo-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>17,700</div>
              <p className='text-xs text-muted-foreground mt-1'>Across 6 events</p>
            </CardContent>
          </Card>

          <Card className='group relative overflow-hidden hover:shadow-lg transition-all'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity' />
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Avg. Check-in Rate</CardTitle>
              <IconUserCheck size={18} className='text-emerald-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>84.3%</div>
              <p className='text-xs text-muted-foreground mt-1'>Industry avg: 72%</p>
            </CardContent>
          </Card>

          <Card className='group relative overflow-hidden hover:shadow-lg transition-all'>
            <div className='absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity' />
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Top Demographic</CardTitle>
              <IconChartPie size={18} className='text-pink-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>18-22 yrs</div>
              <p className='text-xs text-muted-foreground mt-1'>38% of total audience</p>
            </CardContent>
          </Card>

          <Card className='group relative overflow-hidden hover:shadow-lg transition-all'>
            <div className='absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity' />
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Upcoming Registrations</CardTitle>
              <IconCalendarEvent size={18} className='text-amber-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>5,800</div>
              <p className='text-xs text-muted-foreground mt-1'>2 upcoming events</p>
            </CardContent>
          </Card>
        </div>

        {/* Aggregate Charts */}
        <div className='mb-6 grid gap-6 lg:grid-cols-7'>
          <Card className='lg:col-span-4'>
            <CardHeader>
              <CardTitle>Age Distribution (All Events)</CardTitle>
              <CardDescription>Aggregate demographics across all events</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={aggregatePersonaData} barCategoryGap='30%'>
                  <XAxis dataKey='age' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey='count' fill='hsl(var(--primary))' radius={[6, 6, 0, 0]} name='Attendees' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Interest Categories</CardTitle>
              <CardDescription>What your audience cares about</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center'>
                <ResponsiveContainer width='100%' height={180}>
                  <PieChart>
                    <Pie
                      data={interestBreakdown}
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey='value'
                    >
                      {interestBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className='mt-2 flex flex-wrap justify-center gap-3'>
                  {interestBreakdown.map((item) => (
                    <div key={item.name} className='flex items-center gap-1.5'>
                      <div className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                      <span className='text-xs text-muted-foreground'>{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Past & Upcoming Events Tabs */}
        <Tabs defaultValue='past' onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value='past'>Past Events</TabsTrigger>
            <TabsTrigger value='upcoming'>Upcoming Events</TabsTrigger>
          </TabsList>

          <TabsContent value='past' className='mt-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {pastEvents.map((event) => (
                <EventAttendeeCard
                  key={event.name}
                  name={event.name}
                  date={event.date}
                  total={event.totalAttendees}
                  secondary={`${event.checkedIn.toLocaleString()} checked in`}
                  demographics={event.demographics}
                  interests={event.interests}
                  incomeLevel={event.incomeLevel}
                  isPast
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='upcoming' className='mt-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {upcomingEvents.map((event) => (
                <EventAttendeeCard
                  key={event.name}
                  name={event.name}
                  date={event.date}
                  total={event.expectedAttendees}
                  secondary={`${event.registeredSoFar.toLocaleString()} registered`}
                  demographics={event.demographics}
                  interests={event.interests}
                  incomeLevel={event.incomeLevel}
                  isPast={false}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

// ─── Event Attendee Card ────────────────────────────────────────
function EventAttendeeCard({
  name,
  date,
  total,
  secondary,
  demographics,
  interests,
  incomeLevel,
  isPast,
}: {
  name: string
  date: string
  total: number
  secondary: string
  demographics: { name: string; value: number; color: string }[]
  interests: string[]
  incomeLevel: string
  isPast: boolean
}) {
  return (
    <Card className='hover:shadow-lg transition-all'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base'>{name}</CardTitle>
          <Badge variant={isPast ? 'secondary' : 'default'} className={!isPast ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ''}>
            {isPast ? 'Past' : 'Upcoming'}
          </Badge>
        </div>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-2xl font-bold'>{total.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{secondary}</p>
          </div>
          <div className='text-right'>
            <p className='text-xs text-muted-foreground'>Income Level</p>
            <p className='text-sm font-medium'>{incomeLevel}</p>
          </div>
        </div>

        {/* Mini demographics bar */}
        <div>
          <p className='mb-1.5 text-xs font-medium text-muted-foreground'>Age Distribution</p>
          <div className='flex h-2 w-full overflow-hidden rounded-full'>
            {demographics.map((d) => {
              const totalValue = demographics.reduce((acc, cur) => acc + cur.value, 0)
              const pct = (d.value / totalValue) * 100
              return (
                <div
                  key={d.name}
                  className='h-full'
                  style={{
                    width: `${pct}%`,
                    backgroundColor: d.color,
                  }}
                />
              )
            })}
          </div>
          <div className='mt-1.5 flex flex-wrap gap-2'>
            {demographics.map((d) => (
              <div key={d.name} className='flex items-center gap-1'>
                <div className='h-2 w-2 rounded-full' style={{ backgroundColor: d.color }} />
                <span className='text-[10px] text-muted-foreground'>{d.name}: {d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <p className='mb-1.5 text-xs font-medium text-muted-foreground'>Key Interests</p>
          <div className='flex flex-wrap gap-1.5'>
            {interests.map((interest) => (
              <Badge key={interest} variant='outline' className='text-xs'>
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
