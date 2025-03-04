import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Academics",
    href: "#academics-section",
    submenu: [
      { label: "Curriculum", href: "#curriculum-section" },
      { label: "Classes", href: "#classes-section" },
      { label: "Exams & Results", href: "#exams-section", submenu: [
          { label: "Term 1", href: "#term1-section" },
          { label: "Term 2", href: "#term2-section" },
          { label: "Final Exams", href: "#final-exams-section" },
        ] },
      { label: "Library", href: "#library-section" },
    ],
  },
  {
    label: "Admissions",
    href: "#admissions-section",
    submenu: [
      { label: "Admission Process", href: "#admission-process-section" },
      { label: "Fees Structure", href: "#fees-section" },
      { label: "Apply Now", href: "#apply-section", submenu: [
          { label: "Online Application", href: "#online-application-section" },
          { label: "Offline Application", href: "#offline-application-section" },
        ] },
    ],
  },
  {
    label: "Staff",
    href: "#staff-section",
    submenu: [
      { label: "Teaching Staff", href: "#teaching-staff-section", submenu: [
          { label: "Primary Teachers", href: "#primary-teachers-section" },
          { label: "Secondary Teachers", href: "#secondary-teachers-section" },
        ] },
      { label: "Non-Teaching Staff", href: "#non-teaching-staff-section" },
    ],
  },
  {
    label: "Students",
    href: "#students-section",
    submenu: [
      { label: "Attendance", href: "#attendance-section" },
      { label: "Timetable", href: "#timetable-section" },
      { label: "Assignments", href: "#assignments-section", submenu: [
          { label: "Pending Assignments", href: "#pending-assignments-section" },
          { label: "Completed Assignments", href: "#completed-assignments-section" },
        ] },
    ],
  },
  {
    label: "Events",
    href: "#events-section",
    submenu: [
      { label: "Upcoming Events", href: "#upcoming-events-section" },
      { label: "Past Events", href: "#past-events-section", submenu: [
          { label: "2024 Events", href: "#2024-events-section" },
          { label: "2023 Events", href: "#2023-events-section" },
        ] },
      { label: "Photo Gallery", href: "#gallery-section" },
    ],
  },
];
