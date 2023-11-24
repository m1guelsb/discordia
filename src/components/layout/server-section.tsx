'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import { ChannelType, MemberRole } from '@prisma/client'
import { ActionTooltip } from '../ui/action-tooltip'
import { Plus, Settings } from 'lucide-react'
import { useModal } from '@/hooks/use-modal-store'

interface ServerSectionProps {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

export const ServerSection = ({
  label,
  sectionType,
  channelType,
  role,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal()

  return (
    <div className="h-8 flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-muted-foreground">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() =>
              onOpen('createChannel', { channelType: channelType })
            }
            className="p-2 rounded-full flex items-center justify-center hover:bg-muted focus:bg-muted transition"
          >
            <Plus className="text-muted-foreground w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Manage members" side="top">
          <button
            onClick={() => onOpen('members', { server })}
            className="p-2 rounded-full flex items-center justify-center hover:bg-muted focus:bg-muted transition"
          >
            <Settings className="text-muted-foreground w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
