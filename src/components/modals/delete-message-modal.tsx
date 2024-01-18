'use client'

import axios from 'axios'
import qs from 'query-string'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { apiUrl, query } = data
  const isModalOpen = isOpen && type === 'deleteMessage'

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      })
      await axios.delete(url)
      onClose()
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
          <DialogTitle className="text-2xl">Delete message?</DialogTitle>
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
