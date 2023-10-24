import Image from 'next/image'
import { InitialModal } from '@/components/modals/initial-modal'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

export default async function SetupPage() {
  const profile = await initialProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <Image src={'/logo.svg'} alt="discordia logo" width={64} height={64} />
        <h1> Welcome to Discordia</h1>
        <InitialModal>
          <Button>Create a server</Button>
        </InitialModal>
      </div>
    </>
  )
}
