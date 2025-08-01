import {Footer, Header} from "@/components";

export default function MainLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
