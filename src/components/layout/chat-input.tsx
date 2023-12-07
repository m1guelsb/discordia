'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { Plus, Smile } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '../ui/input'

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
                <div className="relative p-4 pb-4">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-6 left-7 bg-background3 hover:bg-background transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="px-12 py6 bg-background2"
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                  />
                  <div className="absolute top-6 right-8">
                    <Smile />
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
