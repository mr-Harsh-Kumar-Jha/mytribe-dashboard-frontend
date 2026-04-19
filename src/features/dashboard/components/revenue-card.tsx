import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconChartPie, IconTrendingUp } from '@tabler/icons-react'

export function RevenueCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card
        className="cursor-pointer hover:border-pink-500/50 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IconChartPie size={16} className="text-pink-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            $45,231.89
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <IconTrendingUp size={12} className="text-green-400" />
            <span className="text-green-400 font-medium">+20.1%</span> from last
            month
          </p>
        </CardContent>
      </Card>

      <RevenueDetailsModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

function RevenueDetailsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Revenue Breakdown
          </DialogTitle>
          <DialogDescription>
            Detailed split of revenue sources for the current period.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <RevenueSourceCard
              title="Sponsorships"
              amount="$25,000.00"
              percentage="55%"
              color="bg-pink-500"
            />
            <RevenueSourceCard
              title="Ticket Sales"
              amount="$15,231.89"
              percentage="34%"
              color="bg-purple-500"
            />
            <RevenueSourceCard
              title="Merchandise"
              amount="$5,000.00"
              percentage="11%"
              color="bg-blue-500"
            />
          </div>

          <div className="h-64 w-full bg-white/5 rounded-lg flex items-center justify-center text-gray-400 border border-white/10">
            {/* Placeholder for a detailed chart */}
            Chart Visualization Component Here
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Download Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RevenueSourceCard({
  title,
  amount,
  percentage,
  color,
}: {
  title: string
  amount: string
  percentage: string
  color: string
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-sm text-gray-400">{title}</span>
      </div>
      <div className="text-lg font-bold text-white">{amount}</div>
      <div className="text-xs text-gray-500">{percentage} of total</div>
    </div>
  )
}
