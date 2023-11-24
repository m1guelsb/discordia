import { redirect } from 'next/navigation'
import { ChannelType, MemberRole } from '@prisma/client'
import { Crown, Hash, Mic, ShieldCheck, Video } from 'lucide-react'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ServerHeader } from './server-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ServerSearch } from './server-search'

interface ServerSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-destructive" />
  ),
  [MemberRole.ADMIN]: <Crown className="mr-2 h-4 w-4 text-primary" />,
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()
  if (!profile) return redirect('')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) return redirect('/')

  const textChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.TEXT
  )

  const audioChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.AUDIO
  )

  const videoChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.VIDEO
  )

  const members = server?.members.filter(
    ({ profileId }) => profileId !== profile.id
  )

  const role = server.members.find(
    ({ profileId }) => profileId === profile.id
  )?.role

  return (
    <div className="flex flex-col h-full w-full bg-background2">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                  id: member.profile.id,
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
