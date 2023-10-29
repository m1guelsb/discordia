'use client'
import Image from 'next/image'
import React from 'react'
import { ActionTooltip } from '@/components/ui/action-tootip'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
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
      <button
        onClick={() => {}}
        className={cn(
          'relative mx-auto h-12 w-12 flex items-center justify-center rounded-full hover:rounded-2xl transition-all',
          params?.serverId !== id && 'rounded-2xl'
        )}
      >
        <Image
          src={imageUrl}
          className={cn(
            'rounded-full hover:rounded-2xl transition-all',
            params?.serverId !== id && 'rounded-2xl'
          )}
          alt="Discordia"
          fill
        />
      </button>
    </ActionTooltip>
  )
}
