import { Hash, Menu } from 'lucide-react'
import React from 'react'
import { MobileToggle } from './mobile-toggle'

interface ChatHeaderProps {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

export const ChatHeader = ({
  name,
  serverId,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="font-semibold px-3 flex items-center h-12 border-b-2 border-background3">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-muted-foreground mr-2" />
      )}
      <p>{name}</p>
    </div>
  )
}
