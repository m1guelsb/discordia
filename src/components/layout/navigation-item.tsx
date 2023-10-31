'use client'
import Image from 'next/image'
import React from 'react'
import { ActionTooltip } from '@/components/ui/action-tooltip'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavigationItemProps {
  id: string
  imageUrl: string
  name: string
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()

  return (
    <ActionTooltip label={name} align="center" side="right">
      <div className="w-full relative group">
        <button
          onClick={() => router.push(`/servers/${id}`)}
          className={cn(
            'relative mx-auto h-12 w-12 flex items-center justify-center rounded-full hover:rounded-2xl transition-all',
            params?.serverId === id && 'rounded-2xl'
          )}
        >
          <Image
            src={imageUrl}
            className={cn(
              'rounded-full hover:rounded-2xl transition-all',
              params?.serverId === id && 'rounded-2xl'
            )}
            alt="Discordia"
            fill
          />
        </button>
        <span
          className={cn(
            'absolute bg-slate-700 dark:bg-slate-100 w-1 h-0 rounded-r-md rounded-l-0 left-0 top-2/4 translate-y-[-50%] group-hover:h-5 transition-all',
            params?.serverId === id && 'h-9',
            params?.serverId === id && 'group-hover:h-9'
          )}
        />
      </div>
    </ActionTooltip>
  )
}
