import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { IconCalendarEvent } from '@tabler/icons-react'

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Event Calendar</CardTitle>
        <IconCalendarEvent size={16} className="text-gray-400" />
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-white/10 bg-white/5"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h4 className="text-sm font-medium text-gray-400">
            {date?.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h4>
          <div className="space-y-2">
            {/* Mocked Events for the day */}
            <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
              <div className="text-sm font-bold text-pink-400">10:00 AM</div>
              <div className="text-sm text-white">Vendor Meeting</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="text-sm font-bold text-purple-400">2:00 PM</div>
              <div className="text-sm text-white">Sponsor Walkthrough</div>
            </div>
            <div className="py-8 text-center text-xs text-gray-500">
              No more events for today
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
