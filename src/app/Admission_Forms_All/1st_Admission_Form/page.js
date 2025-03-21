'use client';

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultChecker() {
  const [rollNumber, setRollNumber] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (rollNumber === '123456' && dob === '2025-03-10') {
      setResult({
        name: 'Rahul Sharma',
        rollNumber: '123456',
        fatherName: 'Amit Sharma',
        motherName: 'Sunita Sharma',
        dob: '10-03-2025',
        class: '12th',
        section: 'A',
        schoolName: 'XYZ Senior Secondary School',
        schoolAddress: 'New Delhi, India',
        marks: {
          Mathematics: { term1: 95, term2: 90, practical: 10 },
          Science: { term1: 92, term2: 88, practical: 9 },
          English: { term1: 88, term2: 85, practical: 10 },
          History: { term1: 85, term2: 80, practical: 8 },
          Computer: { term1: 97, term2: 95, practical: 10 },
        },
        totalMarks: 600,
        percentage: 91.4,
        grade: 'A+',
        status: 'Pass',
      });
    } else {
      setError('Invalid Roll Number or Date of Birth. Please try again.');
    }
  };

  const downloadPDF = () => {
    const input = resultRef.current;
    html2canvas(input, { scale: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Marksheet.pdf');
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-36 p-8 bg-white shadow-xl rounded-lg border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 uppercase">12th Class Result Checker</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Check Result
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-medium text-center">{error}</p>}

      {result && (
        <div ref={resultRef} className="mt-8 p-6 border rounded-lg bg-white shadow-lg">
          <div className="border p-6 bg-white rounded-lg shadow-md relative">
            <h3 className="text-center text-3xl font-bold text-gray-800 uppercase mb-2">{result.schoolName}</h3>
            <p className="text-center text-sm text-gray-600 mb-2">{result.schoolAddress}</p>
            <p className="text-center text-sm text-gray-600">Academic Year: 2024</p>
            <hr className="my-4 border-gray-400" />
            <div className="grid grid-cols-2 gap-4 text-lg">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Roll Number:</strong> {result.rollNumber}</p>
            <p><strong>Father's Name:</strong> {result.fatherName}</p>
            <p><strong>Mother's Name:</strong> {result.motherName}</p>
            <p><strong>Date of Birth:</strong> {result.dob}</p>
            <p><strong>Class & Section:</strong> {result.class} - {result.section}</p>
            <p><strong>Total Marks:</strong> {result.totalMarks}</p>
            <p><strong>Percentage:</strong> {result.percentage}%</p>
            <p><strong>Grade:</strong> {result.grade}</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
            <h4 className="font-semibold mt-4 text-center text-lg uppercase text-gray-700">Academic Performance</h4>
            <table className="w-full border-collapse border border-gray-300 mt-4 text-center">
              <thead>
                <tr className="bg-gray-300 text-gray-800 font-semibold">
                  <th className="border border-gray-400 p-3">Subject</th>
                  <th className="border border-gray-400 p-3">Term 1</th>
                  <th className="border border-gray-400 p-3">Term 2</th>
                  <th className="border border-gray-400 p-3">Practical</th>
                  <th className="border border-gray-400 p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.marks).map(([subject, { term1, term2, practical }]) => (
                  <tr key={subject} className="bg-gray-100 hover:bg-gray-200">
                    <td className="border border-gray-400 p-3 font-medium text-gray-700">{subject}</td>
                    <td className="border border-gray-400 p-3 font-semibold text-gray-900">{term1}</td>
                    <td className="border border-gray-400 p-3 font-semibold text-gray-900">{term2}</td>
                    <td className="border border-gray-400 p-3 font-semibold text-gray-900">{practical}</td>
                    <td className="border border-gray-400 p-3 font-semibold text-gray-900">{term1 + term2 + practical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
     onClick={downloadPDF}
     className="mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition w-full"
   >
     Download Marksheet
   </button>
        </div>
      )}
 
    </div>

  );
}
