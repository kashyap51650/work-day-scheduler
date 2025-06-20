import Image from "next/image";
import AddTask from "../components/AddTask";
import CalendarPage from "../components/CalenderPage";

export default function Home() {
  return (
    <>
      <AddTask />
      <CalendarPage />
    </>
  );
}
