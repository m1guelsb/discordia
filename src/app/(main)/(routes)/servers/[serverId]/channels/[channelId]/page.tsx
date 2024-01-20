import { ChatHeader } from '@/components/layout/chat-header'
import { ChatInput } from '@/components/layout/chat-input'
import { ChatMessages } from '@/components/layout/chat-messages'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) return redirect('/')

  return (
    <div className="bg-background1 flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={channel.id} type="channel" />
      <ChatMessages
        member={member}
        chatId={channel.id}
        name={channel.name}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        apiUrl="/api/socket/messages"
        name={channel.name}
        type="channel"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  )
}
