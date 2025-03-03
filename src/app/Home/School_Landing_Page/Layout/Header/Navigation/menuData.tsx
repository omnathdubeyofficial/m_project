import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "#home-section" },
  {
    label: "Academics",
    href: "#academics-section",
    submenu: [
      { label: "Curriculum", href: "#curriculum-section" },
      { label: "Classes", href: "#classes-section" },
      { label: "Exams & Results", href: "#exams-section" },
      { label: "Library", href: "#library-section" },
    ],
  },
  {
    label: "Admissions",
    href: "#admissions-section",
    submenu: [
      { label: "Admission Process", href: "#admission-process-section" },
      { label: "Fees Structure", href: "#fees-section" },
      { label: "Apply Now", href: "#apply-section" },
    ],
  },
  {
    label: "Staff",
    href: "#staff-section",
    submenu: [
      { label: "Teaching Staff", href: "#teaching-staff-section" },
      { label: "Non-Teaching Staff", href: "#non-teaching-staff-section" },
    ],
  },
  {
    label: "Students",
    href: "#students-section",
    submenu: [
      { label: "Attendance", href: "#attendance-section" },
      { label: "Timetable", href: "#timetable-section" },
      { label: "Assignments", href: "#assignments-section" },
    ],
  },
  {
    label: "Events",
    href: "#events-section",
    submenu: [
      { label: "Upcoming Events", href: "#upcoming-events-section" },
      { label: "Past Events", href: "#past-events-section" },
      { label: "Photo Gallery", href: "#gallery-section" },
    ],
  },
  { label: "Contact Us", href: "#contact-section" },
];
