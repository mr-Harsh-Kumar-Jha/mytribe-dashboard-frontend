import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { mous } from '@/features/mou/data/mous'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconBuilding, IconCheck, IconX } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export default function MoUs() {
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
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Sponsor MoUs</h2>
            <p className='text-muted-foreground'>
              Manage Memorandums of Understanding assigned by Sponsors.
            </p>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {mous.map((mou) => (
            <Link
              key={mou.id}
              to='/mous/$mouId'
              params={{ mouId: mou.id }}
              className='block'
            >
              <Card className='flex flex-col h-full hover:shadow-md transition-shadow'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {mou.title}
                  </CardTitle>
                  <div className='h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary'>
                    <IconBuilding className='h-full w-full' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${mou.totalAmount.toLocaleString()}</div>
                  <p className='text-xs text-muted-foreground'>
                    Sponsor: {mou.sponsorName}
                  </p>
                  <div className='mt-4 flex items-center justify-between'>
                    <Badge variant={mou.status === 'pending' ? 'outline' : 'secondary'} className={mou.status === 'pending' ? 'border-yellow-500 text-yellow-500' : ''}>
                      {mou.status.toUpperCase()}
                    </Badge>
                    <span className='text-xs text-muted-foreground'>Deadline: {mou.deadline}</span>
                  </div>
                  {mou.status === 'pending' && (
                    <div className='mt-4 flex gap-2'>
                      <Button
                        size='sm'
                        className='w-full bg-green-600 hover:bg-green-700'
                        onClick={(e) => {
                          e.preventDefault() // Prevent navigation
                          // Handle Accept
                          console.log('Accepted MoU', mou.id)
                        }}
                      >
                        <IconCheck className='mr-2 h-4 w-4' /> Accept
                      </Button>
                      <Button
                        size='sm'
                        variant='destructive'
                        className='w-full'
                        onClick={(e) => {
                          e.preventDefault() // Prevent navigation
                          // Handle Reject
                          console.log('Rejected MoU', mou.id)
                        }}
                      >
                        <IconX className='mr-2 h-4 w-4' /> Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Main>
    </>
  )
}
