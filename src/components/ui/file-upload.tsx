'use client'
import '@uploadthing/react/styles.css'
import { UploadButton } from '@/lib/uploadthing'
import Image from 'next/image'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
      </div>
    )
  }

  return (
    <UploadButton
      appearance={{
        button:
          'ut-ready:bg-green-300 text-foreground ut-uploading:cursor-not-allowed bg-secondary hover:bg-secondary/90 after:bg-orange-500',
        container: 'h-20 flex flex-col',
        allowedContent: 'text-slate-700',
      }}
      content={{
        button: ({ ready }) => (ready ? <div>Pick image</div> : 'Loading...'),
        allowedContent({ ready, isUploading }) {
          if (!ready) return 'Checking...'
          if (isUploading) return 'Uploading...'
        },
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error) => window.alert('Invalid file format')}
    />
  )
}
