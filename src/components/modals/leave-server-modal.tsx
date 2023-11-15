'use client'

import axios from 'axios'
import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useOrigin } from '@/hooks/use-origin'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export const LeaveServeModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'leaveServer'
  const { server } = data
  const [isLoading, setIsLoading] = useState(false)

  const onLeave = async () => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/servers/${server?.id}/leave`)
      onClose()
      router.refresh()
      router.push('/')
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
          <DialogTitle className="text-2xl">Leave server?</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave{' '}
            <span className="font-bold text-primary">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant={'outline'} onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => onLeave()}
              variant={'destructive'}
            >
              Leave server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
