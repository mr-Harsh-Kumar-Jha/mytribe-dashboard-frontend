import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  IconCalendarEvent,
  IconChartPie,
  IconCoin,
  IconSignature,
  IconTrendingUp,
  IconUsers,
  IconArrowUpRight,
  IconUserCheck,
} from '@tabler/icons-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { CalendarWidget } from './calendar-widget'

// ─── Mock Data ──────────────────────────────────────────────────
const kpiCards = [
  {
    title: 'Total Revenue',
    value: '₹45,231',
    change: '+20.1% from last month',
    icon: IconCoin,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Active MoUs',
    value: '8',
    change: '3 pending review',
    icon: IconSignature,
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    title: 'Total Attendees',
    value: '12,450',
    change: '+32% vs last quarter',
    icon: IconUsers,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Events Hosted',
    value: '24',
    change: '3 upcoming this month',
    icon: IconCalendarEvent,
    gradient: 'from-emerald-500 to-teal-500',
  },
]

const eventRevenueData = [
  { event: 'EUPHORIA', revenue: 600000, tickets: 350000, sponsors: 250000 },
  { event: 'DEVFEST', revenue: 400000, tickets: 150000, sponsors: 250000 },
  { event: 'HACKATHON', revenue: 300000, tickets: 80000, sponsors: 220000 },
  { event: 'TECHCON', revenue: 800000, tickets: 300000, sponsors: 500000 },
  { event: 'SUMMIT X', revenue: 1000000, tickets: 400000, sponsors: 600000 },
]

const audiencePersonaData = [
  { name: '18-22 Students', value: 4200, color: '#6366f1' },
  { name: '22-28 Professionals', value: 3800, color: '#f59e0b' },
  { name: '28-35 Executives', value: 2100, color: '#22c55e' },
  { name: '35+ Senior', value: 1350, color: '#ec4899' },
  { name: 'Others', value: 1000, color: '#64748b' },
]

const recentMouActivity = [
  {
    sponsor: 'TechCorp',
    event: 'Startup Summit 2026',
    amount: '₹15,00,000',
    status: 'pending',
    date: '2 hours ago',
  },
  {
    sponsor: 'BrandCorp',
    event: 'EUPHORIA 2026',
    amount: '₹6,00,000',
    status: 'active',
    date: '1 day ago',
  },
  {
    sponsor: 'CryptoBase',
    event: 'Hackathon 2026',
    amount: '₹10,00,000',
    status: 'completed',
    date: '3 days ago',
  },
  {
    sponsor: 'DevInc',
    event: 'DevFest 2026',
    amount: '₹4,00,000',
    status: 'negotiating',
    date: '5 days ago',
  },
]

const mouHighlights = [
  { title: 'Review TechCorp MoU Terms', type: 'mou' as const, dueIn: '4 hours', priority: 'high' as const },
  { title: 'Send updated package to BrandCorp', type: 'urgent' as const, dueIn: '12 hours', priority: 'high' as const },
  { title: 'Finalize catering vendor contract', type: 'task' as const, dueIn: '24 hours', priority: 'medium' as const },
]

// ─── Component ──────────────────────────────────────────────────
export function OrganizerOverview() {
  return (
    <div className='space-y-6'>
      {/* KPI Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card
              key={kpi.title}
              className='group relative overflow-hidden hover:shadow-lg transition-all duration-300'
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}
              />
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {kpi.title}
                </CardTitle>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${kpi.gradient} text-white shadow-sm`}
                >
                  <Icon size={16} />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{kpi.value}</div>
                <p className='mt-1 flex items-center gap-1 text-xs text-muted-foreground'>
                  <IconArrowUpRight size={12} className='text-emerald-500' />
                  <span className='text-emerald-500'>{kpi.change}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Event Revenue Chart + Audience Persona */}
      <div className='grid gap-6 lg:grid-cols-7'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconChartPie size={18} className='text-primary' />
              Event-Wise Revenue
            </CardTitle>
            <CardDescription>Revenue breakdown across your events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={eventRevenueData} barCategoryGap='20%'>
                <XAxis
                  dataKey='event'
                  stroke='#888888'
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Bar dataKey='tickets' stackId='a' fill='hsl(var(--primary))' radius={[0, 0, 0, 0]} name='Tickets' />
                <Bar dataKey='sponsors' stackId='a' fill='hsl(var(--primary) / 0.5)' radius={[6, 6, 0, 0]} name='Sponsorship' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconUserCheck size={18} className='text-primary' />
              Audience Persona
            </CardTitle>
            <CardDescription>
              Demographics across all events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center'>
              <ResponsiveContainer width='100%' height={180}>
                <PieChart>
                  <Pie
                    data={audiencePersonaData}
                    cx='50%'
                    cy='50%'
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey='value'
                  >
                    {audiencePersonaData.map((entry, index) => (
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
                    formatter={(value: number) => [value.toLocaleString(), 'Attendees']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className='mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5'>
                {audiencePersonaData.map((item) => (
                  <div key={item.name} className='flex items-center gap-1.5'>
                    <div
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: item.color }}
                    />
                    <span className='text-xs text-muted-foreground'>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Highlights + Calendar */}
      <div className='grid gap-6 lg:grid-cols-7'>
        <Card className='lg:col-span-3'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
                <IconTrendingUp size={18} className='text-pink-400' />
                Live Highlights
              </CardTitle>
              <span className='text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full'>
                {mouHighlights.length} Pending
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {mouHighlights.map((task, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        task.type === 'mou'
                          ? 'bg-purple-500/10 text-purple-500'
                          : task.type === 'urgent'
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      <IconSignature size={14} />
                    </div>
                    <div>
                      <p className='text-sm font-medium'>{task.title}</p>
                      <p className='text-xs text-muted-foreground'>
                        Due in {task.dueIn}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant='outline'
                    className={
                      task.priority === 'high'
                        ? 'border-red-500 text-red-500'
                        : 'border-amber-500 text-amber-500'
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='lg:col-span-4'>
          <CalendarWidget />
        </div>
      </div>

      {/* Recent MoU Activity */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <IconSignature size={18} className='text-primary' />
            Recent MoU Activity
          </CardTitle>
          <CardDescription>Latest MoU status changes and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b text-left text-xs text-muted-foreground'>
                  <th className='pb-3 font-medium'>Sponsor</th>
                  <th className='pb-3 font-medium'>Event</th>
                  <th className='pb-3 font-medium'>Amount</th>
                  <th className='pb-3 font-medium'>Status</th>
                  <th className='pb-3 font-medium'>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentMouActivity.map((mou) => (
                  <tr
                    key={mou.sponsor + mou.event}
                    className='border-b last:border-0 hover:bg-muted/50 transition-colors'
                  >
                    <td className='py-3 font-medium'>{mou.sponsor}</td>
                    <td className='py-3 text-muted-foreground'>{mou.event}</td>
                    <td className='py-3 font-semibold'>{mou.amount}</td>
                    <td className='py-3'>
                      <Badge
                        variant='outline'
                        className={
                          mou.status === 'active'
                            ? 'border-emerald-500 text-emerald-500'
                            : mou.status === 'pending'
                              ? 'border-amber-500 text-amber-500'
                              : mou.status === 'negotiating'
                                ? 'border-blue-500 text-blue-500'
                                : 'border-muted-foreground text-muted-foreground'
                        }
                      >
                        {mou.status}
                      </Badge>
                    </td>
                    <td className='py-3 text-xs text-muted-foreground'>{mou.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
