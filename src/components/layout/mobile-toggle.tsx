import React from 'react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { NavigationSidebar } from './navigation-sidebar'
import { ServerSidebar } from './server-sidebar'

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="md:hidden">
          <Menu className="w-5 h-5 text-muted-foreground mr-2" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0 flex gap-0">
        <div className="w-20">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
