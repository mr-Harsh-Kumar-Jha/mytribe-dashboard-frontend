import { MoU } from './schema'

export const mous: MoU[] = [
  {
    id: 'MOU-001',
    title: 'Startup Summit 2024 Sponsorship',
    sponsorName: 'TechCorp',
    totalAmount: 15000,
    status: 'pending',
    description: 'Gold level sponsorship including main stage branding and 3 speaking slots.',
    deadline: '2024-12-01',
  },
  {
    id: 'MOU-002',
    title: 'Summer Coding Bootcamp',
    sponsorName: 'DevInc',
    totalAmount: 5000,
    status: 'active',
    description: 'Sponsoring 50 student licenses and lunch for 3 days.',
    deadline: '2024-08-15',
  },
  {
    id: 'MOU-003',
    title: 'Hackathon 2024 Prize Pool',
    sponsorName: 'CryptoBase',
    totalAmount: 10000,
    status: 'completed',
    description: 'Prize pool contribution for the DeFi track.',
    deadline: '2024-10-10',
  },
]
