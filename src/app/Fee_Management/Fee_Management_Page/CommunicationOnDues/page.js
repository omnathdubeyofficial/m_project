"use client";

import { useState, useEffect } from 'react';

export default function CommunicationOnDues() {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const sampleData = [
            { id: 1, name: 'Aman Sharma', class: '5th', month: 'January', pendingAmount: 500, mobileNumber: '9838381169', status: 'Pending', email: 'aman@example.com' },
            { id: 2, name: 'Riya Gupta', class: '6th', month: 'February', pendingAmount: 800, mobileNumber: '7057670085', status: 'Pending', email: 'riya@example.com' },
        ];
        setStudentsData(sampleData);
    }, []);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(studentsData.map((student) => student.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const sendWhatsAppMessage = () => {
        selectedStudents.forEach((id) => {
            const student = studentsData.find((s) => s.id === id);
            if (student) {
                const message = `Dear ${student.name}, your pending amount for ${student.month} is ${student.pendingAmount}. Please make the payment.`;
                window.open(`https://wa.me/${student.mobileNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }
        });
    };

    const sendEmail = () => {
        selectedStudents.forEach((id) => {
            const student = studentsData.find((s) => s.id === id);
            if (student) {
                const subject = 'Pending Payment Notification';
                const body = `Dear ${student.name}, your pending amount for ${student.month} is ${student.pendingAmount}. Please make the payment.`;
                window.open(`mailto:${student.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
            }
        });
    };

    return (
        <div className="p-6 bg-white shadow-lg w-full max-w-6xl mx-auto max-h-[80vh] overflow-y-auto mt-32">
            <h2 className="text-2xl mb-4">Communication on Dues</h2>
            <div className="flex flex-wrap gap-4 mb-4">
                <select className="border p-2">
                    <option value="">Select Class</option>
                </select>
                <select className="border p-2">
                    <option value="">Select Month</option>
                </select>
                <input type="text" placeholder="Search..." className="border p-2 flex-grow" />
            </div>

            <table className="w-full border-collapse bg-white whitespace-nowrap">
                <thead className='text-left'>
                    <tr>
                        <th className="p-2 border">
                            <input type="checkbox" onChange={handleSelectAll} />
                        </th>
                        <th className="p-2 border">Student Name</th>
                        <th className="p-2 border">Class</th>
                        <th className="p-2 border">Month</th>
                        <th className="p-2 border">Pending Amount</th>
                        <th className="p-2 border">Mobile Number</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsData.map((student, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 transition">
                            <td className="p-2 border">
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.includes(student.id)}
                                    onChange={() => handleSelectStudent(student.id)}
                                />
                            </td>
                            <td className="p-2 border">{student.name}</td>
                            <td className="p-2 border">{student.class}</td>
                            <td className="p-2 border">{student.month}</td>
                            <td className="p-2 border">{student.pendingAmount}</td>
                            <td className="p-2 border">{student.mobileNumber}</td>
                            <td className="p-2 border">{student.email}</td>
                            <td className="p-2 border font-bold">{student.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-wrap gap-4">
                <button className="bg-green-500 text-white px-4 py-2 whitespace-nowrap" onClick={sendWhatsAppMessage}>
                    Send WhatsApp Message
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 whitespace-nowrap" onClick={sendEmail}>
                    Send Email
                </button>
            </div>
        </div>
    );
}
