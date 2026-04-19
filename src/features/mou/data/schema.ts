import { z } from 'zod'

export const mouSchema = z.object({
  id: z.string(),
  title: z.string(),
  sponsorName: z.string(),
  totalAmount: z.number(),
  status: z.enum(['pending', 'active', 'completed', 'rejected']),
  description: z.string().optional(),
  deadline: z.string(),
})

export type MoU = z.infer<typeof mouSchema>
