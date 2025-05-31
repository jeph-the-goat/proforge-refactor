import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-neutral-950">
      <Button 
        color="primary" 
        size="large"
      >
        Click me
      </Button>
    </div>
  );
}
