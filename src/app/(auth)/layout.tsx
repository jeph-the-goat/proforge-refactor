
export default function AuthLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <main className="c-main-auth">
        {children}
      </main>
    </>
  );
}