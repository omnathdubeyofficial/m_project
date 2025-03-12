"use client";

import { useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { Search, ChevronDown, CheckSquare, Square, FileDown, FileArchive } from "lucide-react"
import jsPDF from "jspdf";

const students = [
  {
    profileImage: "/img/om.webp",
    schoolLogo: "/img/image.png",
    // backgroundImage: "/img/card_bg.png",
    admissionNo: "5678",
    rollNo: "9876",
    name: "Omnath Dubey",
    classSec: "SS 1 BLUE",
    dob: "10/05/2007",
    mobile: "08123456789",
    address: "11 Park Street, Pune",
  },
  {
    profileImage: "/img/om.webp",
    schoolLogo: "/img/image.png",
    // backgroundImage: "/img/card_bg.png",
    admissionNo: "5679",
    rollNo: "9877",
    name: "John Doe",
    classSec: "SS 2 GREEN",
    dob: "15/07/2008",
    mobile: "08123456788",
    address: "22 King Street, Mumbai",
  },
  {
    profileImage: "/img/om.webp",
    schoolLogo: "/img/image.png",
    // backgroundImage: "/img/card_bg.png",
    admissionNo: "5680",
    rollNo: "9878",
    name: "Jane Smith",
    classSec: "SS 3 RED",
    dob: "22/11/2009",
    mobile: "08123456787",
    address: "33 Queen Street, Delhi",
  },
  {
    profileImage: "/img/om.webp",
    schoolLogo: "/img/image.png",
    // backgroundImage: "/img/card_bg.png",
    admissionNo: "5680",
    rollNo: "9878",
    name: "Jane Smith",
    classSec: "SS 3 RED",
    dob: "22/11/2009",
    mobile: "08123456787",
    address: "33 Queen Street, Delhi",
  },
];

const IDCard = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectCard = (index) => {
    setSelectedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDownloadOnaPDF = async () => {
    if (selectedCards.length === 0) return alert("Please select at least one card!");
  
    const pdf = new jsPDF("landscape", "mm", "a4"); 
    const pageWidth = pdf.internal.pageSize.getWidth(); 
    const pageHeight = pdf.internal.pageSize.getHeight(); 
  
    const imgWidth = (pageWidth - 50) / 2; 
    const imgHeight = pageHeight - 40; 
  
    const marginX = 20; 
    const marginY = 20; 
  
    for (let i = 0; i < selectedCards.length; i++) {
      const cardIndex = selectedCards[i];
      const frontCard = document.getElementById(`card-${cardIndex}`);
      const backCard = document.getElementById(`card-back-${cardIndex}`);
      if (!frontCard || !backCard) continue;
  
      const frontCanvas = await html2canvas(frontCard, { scale: 3, useCORS: true, backgroundColor: null });
      const frontImgData = frontCanvas.toDataURL("image/png");
  
      const backCanvas = await html2canvas(backCard, { scale: 3, useCORS: true, backgroundColor: null });
      const backImgData = backCanvas.toDataURL("image/png");
  
      pdf.addImage(frontImgData, "PNG", marginX, marginY, imgWidth, imgHeight); 
      pdf.addImage(backImgData, "PNG", marginX + imgWidth + 10, marginY, imgWidth, imgHeight); 
  
      if (i < selectedCards.length - 1) {
        pdf.addPage();
      }
    }
  
    pdf.save("ID_Cards.pdf");
  };
  
  
  const handleDownloadPDF = async () => {
    if (selectedCards.length === 0) return alert("Please select at least one card!");
  
    for (let i = 0; i < selectedCards.length; i++) {
      const cardIndex = selectedCards[i];
      const frontCard = document.getElementById(`card-${cardIndex}`);
      const backCard = document.getElementById(`card-back-${cardIndex}`);
      if (!frontCard || !backCard) continue;
  
      // Create a new PDF for each card
      const pdf = new jsPDF("landscape", "mm", "a4"); // A4 size in landscape mode
  
      const pageWidth = pdf.internal.pageSize.getWidth(); // Get page width
      const pageHeight = pdf.internal.pageSize.getHeight(); // Get page height
  
      const imgWidth = (pageWidth - 40) / 2; // Maximize width utilization
      const imgHeight = pageHeight - 30; // Maximize height utilization
  
      const marginX = 15; // Left margin
      const marginY = 15; // Top margin
  
      // Capture front side with high resolution
      const frontCanvas = await html2canvas(frontCard, {
        scale: 5, // Higher scale for better quality
        useCORS: true,
        backgroundColor: "#FFFFFF", // Ensure white background for better contrast
      });
      const frontImgData = frontCanvas.toDataURL("image/png");
  
      // Capture back side with high resolution
      const backCanvas = await html2canvas(backCard, {
        scale: 5, // Higher scale for better quality
        useCORS: true,
        backgroundColor: "#FFFFFF",
      });
      const backImgData = backCanvas.toDataURL("image/png");
  
      // Place both images on a single page (left and right)
      pdf.addImage(frontImgData, "PNG", marginX, marginY, imgWidth, imgHeight); // Left side
      pdf.addImage(backImgData, "PNG", marginX + imgWidth + 10, marginY, imgWidth, imgHeight); // Right side
  
      // Save each card as a separate PDF
      pdf.save(`ID_Card_${students[cardIndex].name.replace(/\s+/g, "_")}.pdf`);
    }
  };
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCards([]);
    } else {
      setSelectedCards(filteredStudents.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.includes(searchTerm)) &&
      (selectedClass === "" || student.classSec === selectedClass)
  );
  

  return (
    <div className="flex flex-col items-center mt-32 p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-900 text-white p-4  shadow-md mb-6">
  {/* Search Bar */}
  <div className="flex items-center bg-white text-gray-800 p-2   shadow-md">
    <Search className="w-5 h-5 mr-2 text-gray-500" />
    <input
      type="text"
      placeholder="Search by Name or Roll No"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="outline-none bg-transparent w-48"
    />
  </div>

  {/* Class Filter */}
  <div className="relative">
    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="appearance-none bg-white text-gray-800 p-2 pl-4 pr-10  shadow-md cursor-pointer"
    >
      <option value="">All Classes</option>
      {[...new Set(students.map((s) => s.classSec))].map((cls) => (
        <option key={cls} value={cls}>
          {cls}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
  </div>

  {/* Select All Button */}
  <button
    onClick={handleSelectAll}
    className="flex items-center bg-green-600 hover:bg-green-700 transition px-4 py-2  shadow-md"
  >
    {selectAll ? <CheckSquare className="w-5 h-5 mr-2" /> : <Square className="w-5 h-5 mr-2" />}
    {selectAll ? "Deselect All" : "Select All"}
  </button>

  <button
    onClick={handleDownloadPDF}
    className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white py-2 px-6  shadow-lg transition"
  >
    <FileDown className="w-5 h-5" />
    Download Selected Cards
  </button>

  {/* Download Selected Cards One PDF */}
  <button
    onClick={handleDownloadOnaPDF}
    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-6  shadow-lg transition"
  >
    <FileArchive className="w-5 h-5" />
    Download Selected Cards One PDF
  </button>
</div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     {filteredStudents.map((student, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => handleSelectCard(index)}>
            <div className="absolute top-2 left-2 w-6 h-6 bg-white flex items-center justify-center rounded shadow">
              {selectedCards.includes(index) && <span className="text-blue-600 font-bold">✔</span>}
            </div>

      {/* Front Side */}
      <div
        id={`card-${index}`}
        className={`w-80 text-white  shadow-lg relative overflow-hidden border-2 ${
          selectedCards.includes(index) ? "border-blue-900" : "border-blue-900"
        }`}
        style={{
          // backgroundImage: `url(${student.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      >
        <div className="text-center bg-blue-900 bg-opacity-75 p-2 rounded-t-lg">
          <img src={student.schoolLogo} width={80} height={80} className="mx-auto" alt="School Logo" />
          <h2 className="text-lg font-bold">AIR FORCE INTERNATIONAL</h2>
          <h3 className="text-sm font-semibold">NURSERY AND PRIMARY SCHOOL</h3>
          <p className="text-xs">
            234 Ahmadu Bello Crescent, Lafia, Nasarawa <br /> <span className="text-xs">Ph: 234567</span>
          </p>
        </div>
        <div className="bg-gray-100 text-gray-800 p-4">
          <h3 className="text-sm font-semibold text-center text-blue-900">IDENTITY CARD</h3>
          <div className="flex justify-center mt-3">
            <img
              src={student.profileImage}
              width={85}
              height={85}
              className="rounded-lg object-cover border border-gray-300 shadow-md"
              alt="Student Image"
            />
          </div>
          <div className="text-sm">
            <span className="font-bold text-blue-900">Admission No:</span> {student.admissionNo} <br />
            <span className="font-bold text-blue-900">Roll No:</span> {student.rollNo}
            <br />
            <span className="font-bold text-blue-900">Name:</span> {student.name}
            <br />
            <span className="font-bold text-blue-900">Class & Sec:</span> {student.classSec}
            <br />
            <span className="font-bold text-blue-900">Date of Birth:</span> {student.dob}
            <br />
            <span className="font-bold text-blue-900">Mobile:</span> {student.mobile}
            <br />
            <span className="font-bold text-blue-900">Address:</span> {student.address}
            <br />
          </div>
        </div>
        <div className="flex justify-between items-center text-xs bg-blue-900 bg-opacity-75 p-2 rounded-b-lg">
          <div className="text-center">
            <p>2025-2026</p>
          </div>
          <div className="text-center">
            <p>PRINCIPAL</p>
          </div>
        </div>
      </div>

      {/* Back Side */}
   {/* Back Side */}
<div
  id={`card-back-${index}`}
  className="w-80 text-black p-6 shadow-lg relative overflow-hidden border-2 border-blue-900 bg-blue-50 rounded-lg mt-2"
  style={{
    // backgroundImage: `url('/img/card_back_pattern.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* School Logo and Title */}
  <div className="text-center mb-4">
    <img src={student.schoolLogo} width={60} height={60} className="mx-auto" alt="School Logo" />
    <h2 className="text-lg font-bold text-blue-900 mt-2">SCHOOL IDENTITY CARD</h2>
  </div>

  {/* Instructions */}
  <h3 className="text-center text-md font-bold text-red-600 underline mb-2">IMPORTANT INSTRUCTIONS</h3>
  <ul className="text-sm text-gray-800 list-disc pl-5 leading-relaxed">
    <li>This ID card is only valid for the student mentioned.</li>
    <li>Always carry this card while entering the school premises.</li>
    <li>Report immediately if lost or stolen.</li>
    <li>Misuse of this card may result in strict disciplinary action.</li>
    <li>Do not hand over this card to any unauthorized person.</li>
    <li>Follow all school rules and regulations.</li>
  </ul>

  {/* Signature Section */}
  <div className="border-t border-gray-400 mt-5 pt-3 text-center">
    <h3 className="text-sm font-bold text-blue-900">Class Teacher:</h3>
    <p className="italic">Mr. Johnson</p>

    <h3 className="text-sm font-bold text-blue-900 mt-3">Signature:</h3>
    <div className="h-12 border-b-2 border-gray-500 w-2/3 mx-auto mt-1"></div>

    <p className="text-xs text-gray-600 mt-2">Authorized School Signature</p>
  </div>
</div>

    </div>
  ))}
</div>

    
    </div>
  );
};

export default IDCard;
