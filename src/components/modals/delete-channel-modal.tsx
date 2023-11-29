'use client'

import axios from 'axios'
import qs from 'query-string'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { server, channel } = data
  const isModalOpen = isOpen && type === 'deleteChannel'

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Delete channel?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-bold text-primary">#{channel?.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant={'outline'} onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => onDelete()}
              variant={'destructive'}
            >
              Delete server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
