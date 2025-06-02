'use client'
import { useState } from "react";
import Logo from "@/components/ui/Logo";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-neutral-0">
      <Logo type="icon" />
      <Logo type="icon-text" />
    </div>
  );
}
