'use client'

import { cn } from '@/lib/utils'
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ActionTooltip } from '../ui/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'

interface ServerChannelProps {
  channel: Channel
  server: Server
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal()
  const params = useParams()
  const router = useRouter()

  const Icon = iconMap[channel.type]

  return (
    <ActionTooltip
      label={channel.name.length > 20 ? channel.name : ''}
      side="right"
    >
      <button
        onClick={() => {}}
        className={cn(
          'group h-10 px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-muted focus:bg-muted text-muted-foreground hover:text-foreground focus:text-foreground transition',
          channel.id === params?.channelId && 'bg-muted hover:text-foreground'
        )}
      >
        <Icon className="text-muted-foreground mr-2 flex-shrink-0 w-4 h-4" />
        <p
          className={cn('line-clamp-1 w-full font-semibold text-sm text-left')}
        >
          {channel.name}
        </p>

        {channel.name !== 'general' && role !== MemberRole.GUEST && (
          <span className="flex">
            <ActionTooltip label="Edit">
              <button className="p-1">
                <Edit className="text-muted-foreground hidden w-4 h-4 group-hover:block group-focus-within:block" />
              </button>
            </ActionTooltip>

            <ActionTooltip label="Delete">
              <button className="p-1">
                <Trash
                  onClick={() => onOpen('deleteChannel', { server })}
                  className="
                text-destructive hidden w-4 h-4 group-hover:block group-focus-within:block"
                />
              </button>
            </ActionTooltip>
          </span>
        )}
        {channel.name === 'general' && (
          <Lock className="text-muted-foreground w-4 h-4" />
        )}
      </button>
    </ActionTooltip>
  )
}
