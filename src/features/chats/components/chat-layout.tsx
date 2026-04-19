import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
// import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ChatLayoutProps {
  defaultLayout?: number[]
  sidebar: ReactNode
  children: ReactNode
}

export function ChatLayout({
  defaultLayout = [50, 50],
  sidebar,
  children,
}: ChatLayoutProps) {
  return (
    <ResizablePanelGroup
      key="chat-layout-group"
      direction="horizontal"
      className="h-[calc(100vh-2rem)] items-stretch bg-background rounded-lg border"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={false}
        minSize={25}
        maxSize={50}
        className="transition-all duration-300 ease-in-out"
      >
        {sidebar}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {/* Main Content Area */}
        <div className="h-full w-full">{children}</div> 
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
