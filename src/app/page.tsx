import Hero from '@/components/hero/hero'
import SocialProof from '@/components/SocialProof'

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-neutral-950">
      <Hero />
      <SocialProof />
    </div>
  );
}
