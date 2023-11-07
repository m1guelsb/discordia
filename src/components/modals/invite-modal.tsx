'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'
import { cn } from '@/lib/utils'

export const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal()
  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'
  const { server } = data

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleGenerateInvite = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )

      onOpen('invite', { server: response.data })
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsLoading(false)
    }
  }

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Invite member</DialogTitle>
        </DialogHeader>

        <div className="p-2">
          <Label className="uppercase text-sm font-bold">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size={'icon'} disabled={isLoading} onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant={'link'}
            size={'sm'}
            onClick={handleGenerateInvite}
            disabled={isLoading}
            className="text-xs mt-4"
          >
            <RefreshCw
              className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
            />
            Generate new link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
