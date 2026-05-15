import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  IconBuildingSkyscraper,
  IconChartBar,
  IconCoin,
  IconEye,
  IconSignature,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCalendarEvent,
} from '@tabler/icons-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts'

// ─── Mock Data ──────────────────────────────────────────────────
const kpiCards = [
  {
    title: 'Active Sponsorships',
    value: '12',
    change: '+3 this quarter',
    trend: 'up' as const,
    icon: IconSignature,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Total Spend',
    value: '₹24.5L',
    change: '+18% vs last quarter',
    trend: 'up' as const,
    icon: IconCoin,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Avg. ROI',
    value: '3.2x',
    change: '+0.4x improvement',
    trend: 'up' as const,
    icon: IconTrendingUp,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Brand Visibility',
    value: '2.8M',
    change: 'Impressions this month',
    trend: 'up' as const,
    icon: IconEye,
    gradient: 'from-amber-500 to-orange-500',
  },
]

const roiData = [
  { event: 'EUPHORIA', roi: 4.2, spend: 600000 },
  { event: 'STARTUP X', roi: 3.8, spend: 1000000 },
  { event: 'NIGHTWAVE', roi: 2.1, spend: 500000 },
  { event: 'TECHCON', roi: 3.5, spend: 800000 },
  { event: 'DEVFEST', roi: 4.8, spend: 400000 },
  { event: 'HACKATHON', roi: 2.9, spend: 300000 },
]

const pipelineData = [
  { name: 'Proposed', value: 8, color: '#6366f1' },
  { name: 'Negotiating', value: 5, color: '#f59e0b' },
  { name: 'Active', value: 12, color: '#22c55e' },
  { name: 'Completed', value: 23, color: '#64748b' },
]

const upcomingEvents = [
  {
    name: 'EUPHORIA 2026',
    organizer: 'DY Patil Cultural Council',
    date: '14 Feb 2026',
    status: 'confirmed',
    amount: '₹6,00,000',
  },
  {
    name: 'STARTUP SUMMIT X',
    organizer: 'Innovators Network India',
    date: '20 Mar 2026',
    status: 'negotiating',
    amount: '₹10,00,000',
  },
  {
    name: 'DEVFEST PUNE',
    organizer: 'GDG Pune',
    date: '5 Apr 2026',
    status: 'confirmed',
    amount: '₹4,00,000',
  },
]

const topPerformingEvents = [
  { event: 'TechConnect 2025', leads: 2100, reach: '1.2M', roi: '4.8x', satisfaction: 9.2 },
  { event: 'Startup Week 2025', leads: 1800, reach: '980K', roi: '3.9x', satisfaction: 8.7 },
  { event: 'DevFest 2025', leads: 1500, reach: '750K', roi: '3.5x', satisfaction: 9.0 },
  { event: 'EUPHORIA 2025', leads: 3400, reach: '2.1M', roi: '4.2x', satisfaction: 8.9 },
]

// ─── Component ──────────────────────────────────────────────────
export function SponsorOverview() {
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
                  {kpi.trend === 'up' ? (
                    <IconArrowUpRight size={12} className='text-emerald-500' />
                  ) : (
                    <IconArrowDownRight size={12} className='text-red-500' />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                    {kpi.change}
                  </span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ROI Chart + MoU Pipeline */}
      <div className='grid gap-6 lg:grid-cols-7'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconChartBar size={18} className='text-primary' />
              ROI by Event
            </CardTitle>
            <CardDescription>
              Return on investment across your sponsored events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={roiData} barCategoryGap='20%'>
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
                  tickFormatter={(v) => `${v}x`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value}x`, 'ROI']}
                />
                <Bar dataKey='roi' radius={[6, 6, 0, 0]}>
                  {roiData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconBuildingSkyscraper size={18} className='text-primary' />
              MoU Pipeline
            </CardTitle>
            <CardDescription>
              Current status of all your MoUs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center'>
              <ResponsiveContainer width='100%' height={180}>
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx='50%'
                    cy='50%'
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey='value'
                  >
                    {pipelineData.map((entry, index) => (
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
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className='mt-2 flex flex-wrap justify-center gap-3'>
                {pipelineData.map((item) => (
                  <div key={item.name} className='flex items-center gap-1.5'>
                    <div
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: item.color }}
                    />
                    <span className='text-xs text-muted-foreground'>
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events + Top Performing */}
      <div className='grid gap-6 lg:grid-cols-7'>
        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconCalendarEvent size={18} className='text-primary' />
              Upcoming Sponsored Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {upcomingEvents.map((event) => (
                <div
                  key={event.name}
                  className='flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50'
                >
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>{event.name}</p>
                    <p className='text-xs text-muted-foreground'>{event.organizer}</p>
                    <p className='text-xs text-muted-foreground'>{event.date}</p>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <span className='text-sm font-semibold'>{event.amount}</span>
                    <Badge
                      variant={event.status === 'confirmed' ? 'default' : 'outline'}
                      className={
                        event.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'border-amber-500 text-amber-500'
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconTrendingUp size={18} className='text-primary' />
              Top Performing Events
            </CardTitle>
            <CardDescription>Past events ranked by ROI and reach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b text-left text-xs text-muted-foreground'>
                    <th className='pb-3 font-medium'>Event</th>
                    <th className='pb-3 font-medium'>Leads</th>
                    <th className='pb-3 font-medium'>Reach</th>
                    <th className='pb-3 font-medium'>ROI</th>
                    <th className='pb-3 font-medium'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformingEvents.map((event) => (
                    <tr
                      key={event.event}
                      className='border-b last:border-0 hover:bg-muted/50 transition-colors'
                    >
                      <td className='py-3 font-medium'>{event.event}</td>
                      <td className='py-3 text-muted-foreground'>
                        {event.leads.toLocaleString()}
                      </td>
                      <td className='py-3 text-muted-foreground'>{event.reach}</td>
                      <td className='py-3'>
                        <span className='rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500'>
                          {event.roi}
                        </span>
                      </td>
                      <td className='py-3'>
                        <div className='flex items-center gap-2'>
                          <div className='h-1.5 w-16 overflow-hidden rounded-full bg-muted'>
                            <div
                              className='h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500'
                              style={{ width: `${(event.satisfaction / 10) * 100}%` }}
                            />
                          </div>
                          <span className='text-xs text-muted-foreground'>
                            {event.satisfaction}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
