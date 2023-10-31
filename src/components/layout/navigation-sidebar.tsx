import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { NavigationAction } from '@/components/layout/navigation-action'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NavigationItem } from '@/components/layout/navigation-item'
import { UserButton } from '@clerk/nextjs'

export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) return redirect('/')

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full bg-background2 py-3">
      <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-primary">
        <Image src={'/icon.svg'} alt="Discordia" height={32} width={32} />
      </button>

      <NavigationAction />
      <Separator className="w-11" />

      <ScrollArea className="flex-1 w-full">
        <div className="w-full flex flex-col gap-4">
          {servers.map(({ imageUrl, id, name }) => (
            <NavigationItem key={id} id={id} imageUrl={imageUrl} name={name} />
          ))}
        </div>
      </ScrollArea>

      <Separator className="w-11" />

      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: 'h-10 w-10',
          },
        }}
      />
      <ThemeToggle />
    </div>
  )
}
