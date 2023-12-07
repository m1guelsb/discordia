import { ChatHeader } from '@/components/layout/chat-header'
import { getOrCreateConversation } from '@/lib/conversation'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface MemberIdPageProps {
  params: {
    memberId: string
    serverId: string
  }
}
export default async function MemberIdPage({ params }: MemberIdPageProps) {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })

  if (!currentMember) return redirect('/')

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  )

  if (!conversation) return redirect(`/servers/${params.serverId}`)

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  )
}
