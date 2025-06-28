import { CalendarToolbar } from "@/components/Calendar/CalendarToolbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <CalendarToolbar />
      {children}
    </main>
  );
}
