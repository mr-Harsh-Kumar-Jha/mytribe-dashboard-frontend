import {
  // IconBarrierBlock,
  IconBrowserCheck,
  // IconBug,
  IconCalendar,
  IconChartPie3,
  IconChecklist,
  // IconCoin,
  IconCoinRupee,
  // IconError404,
  IconSignature,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  // IconLockAccess,
  IconMessages,
  IconNotification,
  // IconPackages,
  IconPalette,
  IconReportMoney,
  // IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  // IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'MyTribe Organiser',
    email: 'eventorganiser@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'My Event',
      logo: Command,
      plan: 'Organisation Name',
    },
    {
      name: 'My Event 2',
      logo: GalleryVerticalEnd,
      plan: 'Organisation',
    },
    {
      name: 'My Event 3',
      logo: AudioWaveform,
      plan: 'Organisation',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Overview',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'MoUs',
          url: '/mous',
          icon: IconSignature,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Events',
          url: '/events',
          icon: IconCalendar,
        },
        {
          title: 'Attendees',
          url: '/500',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Analytics',
          icon: IconChartPie3,
          items: [
            {
              title: 'Organisation Analytics',
              url: '/sign-in-2',
            },
            {
              title: 'Team Analytics',
              url: '/sign-in',
            },
            {
              title: 'Social Reach',
              url: '/sign-up',
            },
            {
              title: 'Paid Advertisements',
              url: '/forgot-password',
            },
            // {
            //   title: 'OTP',
            //   url: '/otp',
            // },
          ],
        },
        {
          title: 'Finance',
          icon: IconCoinRupee,
          items: [
            {
              title: 'Team Finance',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Sales',
              url: '/403',
              icon: IconReportMoney,
            },
            // {
            //   title: 'Not Found',
            //   url: '/404',
            //   icon: IconError404,
            // },
            // {
            //   title: 'Internal Server Error',
            //   url: '/500',
            //   icon: IconServerOff,
            // },
            // {
            //   title: 'Maintenance Error',
            //   url: '/503',
            //   icon: IconBarrierBlock,
            // },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
