'use client'

import { useSocket } from '../providers/socket-provider'
import { Badge } from './badge'

interface SocketIndicatorProps {}

export const SocketIndicator = ({}: SocketIndicatorProps) => {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <Badge
        variant={'outline'}
        className="bg-yellow-600 border-none h-4 w-4 p-0"
      />
    )
  }
  return (
    <Badge
      variant={'outline'}
      className="bg-emerald-600 border-none h-4 w-4 p-0"
    />
  )
}
