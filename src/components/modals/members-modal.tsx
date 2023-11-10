'use client'

import { useState } from 'react'
import qs from 'query-string'
import { MemberRole } from '@prisma/client'
import {
  Check,
  Crown,
  Gavel,
  Loader,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/ui/user-avatar'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const roleIconMap = {
  GUEST: null,
  MODERATOR: (
    <span title="Moderator">
      <ShieldCheck className="h-4 w-4 ml-2 text-destructive" />
    </span>
  ),
  ADMIN: (
    <span title="Admin">
      <Crown className="h-4 w-4 ml-2 text-primary" />
    </span>
  ),
}

export const MembersModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type, data, onOpen } = useModal()
  const [loadingId, setLoadingId] = useState('')

  const isModalOpen = isOpen && type === 'members'
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      const response = await axios.delete(url)
      router.refresh()
      onOpen('members', { server: response.data })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })
      const response = await axios.patch(url, { role })
      router.refresh()
      onOpen('members', { server: response.data })
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Manage members</DialogTitle>
          <DialogDescription>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-muted-foreground">
                  {member.profile.email}
                </p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-40">
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, 'GUEST')}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === 'GUEST' && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, 'MODERATOR')
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === 'MODERATOR' && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="h-4 w-4 mr-2" /> Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
