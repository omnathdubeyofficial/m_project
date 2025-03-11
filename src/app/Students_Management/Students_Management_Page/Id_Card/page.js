"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const students = [
  {
    profileImage: "/img/om.webp",
    schoolLogo: "/img/image.png",
    backgroundImage: "/img/card_bg.png",
    admissionNo: "5678",
    rollNo: "9876",
    name: "John Doe",
    classSec: "SS 1 BLUE",
    dob: "10/05/2007",
    mobile: "08123456789",
    address: "12 King Street, Abuja, Nigeria",
  },
];

const IDCard = () => {
  const cardRef = useRef(null);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    // Ensure background image is preloaded
    const imageUrl = `${window.location.origin}/img/card_bg.png`;
    setBgImage(imageUrl);
  }, []);

  const handleDownloadPDF = async (studentName) => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 10, 
      useCORS: true, 
      backgroundColor: null, 
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width / 10;
    const imgHeight = canvas.height / 10;

    const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${studentName}_ID_Card.pdf`);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-44">
      {students.map((student, index) => (
        <div
          key={index}
          ref={cardRef}
          className="w-80 text-white p-4 shadow-lg relative overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}
        >
          <div className="text-center bg-blue-900 bg-opacity-75 p-2 rounded-t-lg">
            <img src={student.schoolLogo} width={80} height={80} className="mx-auto" alt="School Logo" />
            <h2 className="text-lg font-bold">AIR FORCE INTERNATIONAL</h2>
            <h3 className="text-sm font-semibold">NURSERY AND PRIMARY SCHOOL</h3>
            <p className="text-xs">234 Ahmadu Bello Crescent, Lafia, Nasarawa <br /> <span className="text-xs">Ph: 234567</span></p>
          </div>

          <div className="bg-white text-gray-800 p-4 relative  ">
            <h3 className="text-sm font-semibold text-center text-blue-900">IDENTITY CARD</h3>
            <div className="flex justify-center mt-3">
              <img src={student.profileImage} width={85} height={85} className="rounded-lg object-cover border border-gray-300 shadow-md" alt="Student Image" />
            </div>
            <div className=" text-sm">
              <span className="font-bold text-blue-900">Admission No:</span> {student.admissionNo} <br />
              <span className="font-bold text-blue-900">Roll No:</span> {student.rollNo}<br />
              <span className="font-bold text-blue-900">Name:</span> {student.name}<br />
              <span className="font-bold text-blue-900">Class & Sec:</span> {student.classSec}<br />
              <span className="font-bold text-blue-900">Date of Birth:</span> {student.dob}<br />
              <span className="font-bold text-blue-900">Mobile:</span> {student.mobile}<br />
              <span className="font-bold text-blue-900">Address:</span> {student.address}<br />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs  bg-blue-900 bg-opacity-75 p-2 rounded-b-lg">
          <div className="text-center">
              <p>2025-2026</p>
            </div>
            <div className="text-center">
              <p>PRINCIPAL</p>
            </div>
          </div>

          <div className="mt-2 text-center">
            <button
              onClick={() => handleDownloadPDF(student.name)}
              className="bg-blue-600 text-white py-2 px-4 rounded shadow-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IDCard;
