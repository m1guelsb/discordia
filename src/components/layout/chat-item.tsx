'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { Crown, Edit, ShieldCheck, Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Member, MemberRole, Profile } from '@prisma/client'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/ui/user-avatar'
import { ActionTooltip } from '@/components/ui/action-tooltip'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '../ui/input'
import { useModal } from '@/hooks/use-modal-store'

interface ChatItemProps {
  id: string
  content: string
  member: Member & { profile: Profile }
  timestamp: string
  fileUrl: string | null
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-destructive" />
  ),
  [MemberRole.ADMIN]: <Crown className="mr-2 h-4 w-4 text-primary" />,
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatItem = ({
  content,
  currentMember,
  deleted,
  fileUrl,
  id,
  isUpdated,
  member,
  socketQuery,
  socketUrl,
  timestamp,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const { onOpen } = useModal()

  const params = useParams()
  const router = useRouter()

  const onMemberClick = () => {
    if (member.id !== currentMember.id) {
      router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  })

  const isLoading = form.formState.isSubmitting

  const editMessage = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      })

      await axios.patch(url, values)
      setIsEditing(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content])

  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isModerator = currentMember.role === MemberRole.MODERATOR
  const isOwner = currentMember.id === member.id
  const canDelete = !deleted && (isAdmin || isModerator || isOwner)
  const canEdit = !deleted && isOwner && !fileUrl
  const isImage = fileUrl

  return (
    <div className="relative group flex items-center hover:bg-background2 py-3 px-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={() => onMemberClick()}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-1">
              <p
                onClick={() => onMemberClick()}
                className={cn(
                  'font-semibold text-sm',
                  member.id !== currentMember.id
                    ? 'hover:underline cursor-pointer'
                    : ''
                )}
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-background3 h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                'text-sm',
                deleted && 'italic text-muted-foreground text-xs mt-1'
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-xs mx-2 text-muted-foreground">
                  {'[edited]'}
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(editMessage)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="p-2 bg-background3"
                            placeholder="Edited message"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
              <span className="text-xs mt-1 text-muted-foreground">
                Press escape to{' '}
                <button
                  className="text-primary hover:underline cursor-pointer"
                  disabled={isLoading}
                  onClick={() => {
                    form.reset({
                      content: content,
                    })
                    setIsEditing(false)
                  }}
                >
                  cancel
                </button>{' '}
                or enter to{' '}
                <button
                  onClick={() =>
                    editMessage({ content: form.getValues('content') })
                  }
                  disabled={isLoading}
                  className="text-primary hover:underline cursor-pointer"
                >
                  {' '}
                  save
                </button>
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDelete && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-background2 border rounded-sm">
          {canEdit && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-muted-foreground hover:text-muted-foreground/75"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen('deleteMessage', {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-muted-foreground hover:text-muted-foreground/75"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  )
}
