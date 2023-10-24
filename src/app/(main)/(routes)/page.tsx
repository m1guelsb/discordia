import { ModeToggle } from '@/components/ui/mode-toggle'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Relou World</h1>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </main>
  )
}
