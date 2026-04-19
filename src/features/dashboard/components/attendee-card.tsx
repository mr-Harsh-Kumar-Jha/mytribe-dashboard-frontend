import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconUsers, IconUserCheck, IconUserX } from '@tabler/icons-react'

export function AttendeeMetricsCard() {
  return (
    <Card className="hover:border-purple-500/50 transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Attendee Metrics</CardTitle>
        <IconUsers size={16} className="text-purple-400" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Registered */}
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm text-gray-400">Total Registered</span>
            <span className="text-2xl font-bold text-white">2,350</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Checked In */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <IconUserCheck size={14} className="text-green-400" />
              <span className="text-xs text-gray-400">Checked In</span>
            </div>
            <div className="text-lg font-bold text-white">1,820</div>
            <div className="text-[10px] text-gray-500">77% turnout</div>
          </div>

          {/* Drop-off */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <IconUserX size={14} className="text-red-400" />
              <span className="text-xs text-gray-400">Drop-off</span>
            </div>
            <div className="text-lg font-bold text-white">530</div>
            <div className="text-[10px] text-gray-500">23% absent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
