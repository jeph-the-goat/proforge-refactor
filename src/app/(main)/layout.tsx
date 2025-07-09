import {Footer, Header, SectionFooterBanner} from "@/components";

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
        <SectionFooterBanner/>
      </main>
      <Footer />
    </>
  );
}
