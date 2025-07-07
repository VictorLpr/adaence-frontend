import VolunteerNavbar from './components/volunteer_navbar'

export default function Volunteer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <VolunteerNavbar></VolunteerNavbar>
      <div className="m-auto flex w-full flex-col items-center bg-(--background-color) p-2 text-(--foreground)">{children}</div>
    </>
  )
}
