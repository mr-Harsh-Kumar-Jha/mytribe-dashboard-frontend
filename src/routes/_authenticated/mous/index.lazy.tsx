import { createLazyFileRoute } from '@tanstack/react-router'
import MoUs from '@/features/mou'

export const Route = createLazyFileRoute('/_authenticated/mous/')({
  component: MoUs,
})
