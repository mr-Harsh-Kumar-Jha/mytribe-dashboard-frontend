import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  type: z.enum(['mou', 'internal']),
  event: z.string().optional(),
  sponsor: z.string().optional(),
  deadline: z.string().optional(),
  assignee: z.string().optional(),
  proof: z.string().optional(), // URL to uploaded proof
  amount: z.number().optional(), // Payment amount
  mouId: z.string().optional(), // Link to MoU
})

export type Task = z.infer<typeof taskSchema>


