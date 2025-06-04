import Image from 'next/image'

export default function HeroImage() {
  return (
    <div className="h-[500px]">
      <Image src="/hero-image.svg" alt="hero" className="w-full h-full" width={1160} height={500} />
    </div>
  )
}
