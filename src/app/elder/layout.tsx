export default function ElderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="m-auto flex w-full flex-col items-center bg-(--background-color) p-2 text-(--foreground)">{children}</div>
    </>
  )
}