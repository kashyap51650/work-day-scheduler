import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const holidays = [
  { name: "New Year's Day", date: "2025-01-01" },
  { name: "Makar Sankranti", date: "2025-01-14" },
  { name: "Republic Day", date: "2025-01-26" },
  { name: "Vasant Panchami", date: "2025-02-02" },
  { name: "Maha Shivaratri/Shivaratri", date: "2025-02-26" },
  { name: "Holi", date: "2025-03-14" },
  { name: "Dolyatra", date: "2025-03-14" },
  { name: "Gudi Padwa", date: "2025-03-30" },
  { name: "Rama Navami", date: "2025-04-06" },
  { name: "Mahavir Jayanti", date: "2025-04-10" },
  { name: "Good Friday", date: "2025-04-18" },
  { name: "Rath Yatra", date: "2025-06-27" },
  { name: "Raksha Bandhan (Rakhi)", date: "2025-08-09" },
  { name: "Independence Day", date: "2025-08-15" },
  { name: "Janmashtami", date: "2025-08-16" },
  { name: "Ganesh Chaturthi/Vinayaka Chaturthi", date: "2025-08-27" },
  { name: "Dussehra", date: "2025-10-02" },
  { name: "Diwali", date: "2025-10-20" },
  { name: "Hindu New Year", date: "2025-10-21" },
  { name: "Govardhan Puja", date: "2025-10-22" },
  { name: "Guru Nanak Jayanti", date: "2025-11-05" },
  { name: "Christmas", date: "2025-12-25" },
  { name: "New Year's Eve", date: "2025-12-31" },
];

async function main() {
  // Example: Add 10 fake tasks
  for (const holiday of holidays) {
    await prisma.holiday.create({
      data: {
        date: holiday.date,
        title: holiday.name,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Fake data seeded!");
  })
  .catch((e) => {
    console.error(e);
  });
