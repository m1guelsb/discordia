import { ChatHeader } from '@/components/layout/chat-header'
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
    </div>
  )
}
