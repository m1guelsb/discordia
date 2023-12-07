import { Hash, Menu } from 'lucide-react'
import React from 'react'
import { MobileToggle } from './mobile-toggle'
import { Avatar } from '../ui/avatar'
import { UserAvatar } from '../ui/user-avatar'
import { SocketIndicator } from '../ui/socket-indicator'

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
    <div className="font-semibold px-3 flex items-center gap-2 h-12 border-b-2 border-background3">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-muted-foreground mr-2" />
      )}
      {type === 'conversation' && (
        <UserAvatar className="h-6 w-6 md:h-8 md:w-8" src={imageUrl} />
      )}
      <p>{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  )
}
