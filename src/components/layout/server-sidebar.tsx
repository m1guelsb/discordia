import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ChannelType } from '@prisma/client'
import { ServerHeader } from './server-header'

interface ServerSidebarProps {
  serverId: string
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
    </div>
  )
}
