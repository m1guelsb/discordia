'use client'

import { cn } from '@/lib/utils'
import { Member, MemberRole, Profile, Server } from '@prisma/client'
import { Crown, ShieldCheck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { UserAvatar } from '../ui/user-avatar'

interface ServerMemberProps {
  member: Member & { profile: Profile }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-destructive" />
  ),
  [MemberRole.ADMIN]: <Crown className="mr-2 h-4 w-4 text-primary" />,
}

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams()
  const router = useRouter()

  const goToMember = () =>
    router.push(`/servers/${params?.serverId}/conversations/${member?.id}`)

  return (
    <button
      onClick={() => goToMember()}
      title={member.role.toLocaleLowerCase()}
      className={cn(
        'h-10 px-2 rounded-md flex items-center gap-x-2 w-full transition  hover:bg-muted focus:bg-muted text-muted-foreground hover:text-foreground focus:text-foreground',
        member.id === params?.memberId && 'bg-muted hover:text-foreground'
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-6 w-6 md:h-6 md:w-6"
      />
      <p className="line-clamp-1 w-full font-semibold text-sm text-left">
        {member.profile.name}
      </p>
      <span className="h-4 w-4">{roleIconMap[member.role]}</span>
    </button>
  )
}
