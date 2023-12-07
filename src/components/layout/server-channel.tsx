'use client'

import { cn } from '@/lib/utils'
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ActionTooltip } from '../ui/action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'

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

  const goToChannel = () =>
    router.push(`/servers/${params.serverId}/channels/${channel.id}`)

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation()
    onOpen(action, { channel, server })
  }

  return (
    <ActionTooltip
      label={channel.name.length > 20 ? channel.name : ''}
      side="right"
    >
      <button
        onClick={() => goToChannel()}
        className={cn(
          'group h-10 px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-muted focus:bg-muted text-muted-foreground hover:text-foreground focus:text-foreground transition',
          channel.id === params?.channelId && 'bg-muted text-foreground'
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
              <span className="p-1">
                <Edit
                  onClick={(e) => onAction(e, 'editChannel')}
                  className="text-muted-foreground hidden w-4 h-4 group-hover:block group-focus-within:block"
                />
              </span>
            </ActionTooltip>

            <ActionTooltip label="Delete">
              <span className="p-1">
                <Trash
                  onClick={(e) => onAction(e, 'deleteChannel')}
                  className="
                text-destructive hidden w-4 h-4 group-hover:block group-focus-within:block"
                />
              </span>
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
