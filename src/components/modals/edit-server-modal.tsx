'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { useEffect } from 'react'
import { X } from 'lucide-react'

const editServerSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export const EditServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'editServer'
  const { server } = data

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(editServerSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [form, server])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof editServerSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, data)
      form.reset()
      router.refresh()
      onClose()
    } catch (err) {
      console.log('error :>> ', err)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Edit server</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <>
                          <FileUpload
                            endpoint={'serverImage'}
                            value={field.value}
                            onChange={field.onChange}
                          />
                          {form.getValues('imageUrl') && (
                            <button
                              onClick={() => form.resetField('imageUrl')}
                              className="h-5 w-5 absolute bg-destructive rounded-full top-[-0.5rem] right-0 cursor-pointer"
                              title="Delete image"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter server name"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button disabled={isLoading}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
