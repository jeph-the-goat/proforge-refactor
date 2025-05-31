import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-neutral-0">
      <div className="flex flex-col gap-4">
        <Button 
          color="secondary"
          size="large"
        >
          Click me
        </Button>
      </div>
    </div>
  );
}
