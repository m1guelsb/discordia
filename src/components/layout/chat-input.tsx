'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EmojiPicker } from '@/components/ui/emoji-picker'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'channel'
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatInput = ({ apiUrl, name, query, type }: ChatInputProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(formSchema),
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, values)
      form.reset()
      router.refresh()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pt-0 pb-4">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className="absolute top-3 left-7 bg-background3 hover:bg-background transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="h-12 px-12 py6 bg-background2"
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                  />
                  <div className="absolute top-3 right-8">
                    <EmojiPicker
                      onChange={(emoji) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
