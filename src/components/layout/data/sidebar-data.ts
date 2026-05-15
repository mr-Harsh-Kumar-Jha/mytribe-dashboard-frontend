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
import { type UserRole } from '@/stores/roleStore'

// ─── Sponsor Sidebar ───────────────────────────────────────────
const sponsorSidebarData: SidebarData = {
  user: {
    name: 'MyTribe Sponsor',
    email: 'sponsor@brandcorp.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'BrandCorp',
      logo: Command,
      plan: 'Sponsor Account',
    },
    {
      name: 'TechCorp',
      logo: GalleryVerticalEnd,
      plan: 'Sponsor Account',
    },
    {
      name: 'StartupHub',
      logo: AudioWaveform,
      plan: 'Sponsor Account',
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
          title: 'Events',
          url: '/events',
          icon: IconCalendar,
        },
        {
          title: 'MOU Creation',
          url: '/events',
          icon: IconSignature,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
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
              title: 'Sponsorship ROI',
              url: '/sign-in-2',
            },
            {
              title: 'Brand Visibility',
              url: '/sign-in',
            },
            {
              title: 'Event Reach',
              url: '/sign-up',
            },
          ],
        },
        {
          title: 'Finance',
          icon: IconCoinRupee,
          items: [
            {
              title: 'Sponsorship Spend',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Invoices',
              url: '/403',
              icon: IconReportMoney,
            },
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

// ─── Organizer Sidebar ──────────────────────────────────────────
const organizerSidebarData: SidebarData = {
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
          title: 'Tasks of MOU',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'MOU Listing',
          url: '/mous',
          icon: IconSignature,
        },
        {
          title: 'Attendees',
          url: '/attendees',
          icon: IconUsers,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
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

// ─── Getter ─────────────────────────────────────────────────────
export function getSidebarData(role: UserRole): SidebarData {
  return role === 'sponsor' ? sponsorSidebarData : organizerSidebarData
}

// Keep default export for backward compatibility during migration
export const sidebarData = organizerSidebarData
