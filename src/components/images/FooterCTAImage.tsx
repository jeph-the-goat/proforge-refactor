import Image from "next/image";

export default function FooterCTAImage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2xl self-stretch">
      <div className="w-24 h-24 absolute bg-primary-500 rounded-full blur-[50px] z-0" />
      <Image src="/footer-cta-graphic.svg" alt="Footer CTA Image" width={816} height={120} className="z-10" />
    </div>
  )
}