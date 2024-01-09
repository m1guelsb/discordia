import { Hash } from 'lucide-react'
import React from 'react'

interface ChatWelcomeProps {
  name: string
  type: 'channel' | 'conversation'
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === 'channel' && (
        <div className="h-20 w-20 rounded-full flex items-center justify-center bg-background2">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === 'channel' ? `Welcome to #` : ''}
        {name}
      </p>
      <p className="text-sm text-muted-foreground">
        {type === 'channel'
          ? `This is the beginning of the #${name} channel.`
          : `This is the beginning of #${name} conversation.`}
      </p>
    </div>
  )
}
