import { CalendarToolbar } from "@/components/Calendar/CalendarToolbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <CalendarToolbar />
      {children}
    </main>
  );
}
