import Image from 'next/image'

export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/LOGO.svg"
      alt="Logo"
      width={160}
      height={50}
      priority
      className={className}
    />
  )
}