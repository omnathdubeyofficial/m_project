"use client";

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InvoiceGenerator = () => {
    const [formData, setFormData] = useState({
        company: {
            name: 'Greenwood High School',
            address: '123 School Road, Education City, India',
            gstNumber: 'GSTIN123456789',
            phone: '+91 9876543210',
            email: 'info@greenwoodhigh.com'
        },
        student: {
            name: '',
            class: '',
            rollNumber: ''
        },
        invoiceNumber: '',
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [{ description: '', quantity: 1, price: 0, cgst: 0, sgst: 0 }],
    });
    const [showPopup, setShowPopup] = useState(false);

    // Generate a unique invoice number
    useEffect(() => {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        setFormData(prev => ({ ...prev, invoiceNumber: `HHD${randomNumber}` }));
    }, []);

    const handleChange = (e, section = null, index = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [name]: value
                }
            });
        } else if (index !== null) {
            const updatedItems = [...formData.items];
            updatedItems[index][name] = name === 'quantity' || name === 'price' || name === 'cgst' || name === 'sgst'
                ? parseFloat(value) : value;
            setFormData({ ...formData, items: updatedItems });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', quantity: 1, price: 0, cgst: 0, sgst: 0 }],
        });
    };

    const removeItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    const totalAmount = formData.items.reduce((total, item) => {
        const itemTotal = item.quantity * item.price;
        const totalWithTaxes = itemTotal + (itemTotal * item.cgst / 100) + (itemTotal * item.sgst / 100);
        return total + totalWithTaxes;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const downloadPDF = () => {
        const invoice = document.getElementById('invoicePreview');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // Margin in mm
        let position = margin;

        html2canvas(invoice, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add first page
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            position += imgHeight;

            // Add additional pages if content overflows
            while (position > pageHeight - margin) {
                pdf.addPage();
                position = margin;
                pdf.addImage(imgData, 'PNG', margin, - (pageHeight - position), imgWidth, imgHeight);
                position += imgHeight;
            }

            pdf.save(`Invoice-${formData.invoiceNumber}.pdf`);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br mt-32 from-blue-50 to-blue-200 p-8">
           <div className="max-w-5xl mx-auto bg-white shadow-xl p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">School Invoice Generator</h2>
            <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Company Details</h3>
                    {['name', 'address', 'gstNumber', 'phone', 'email'].map((field) => (
                        <div key={field} className="mb-2">
                            <label className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type="text" name={field} placeholder={field} value={formData.company[field]} onChange={(e) => handleChange(e, 'company')} required className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Student Details</h3>
                    {['name', 'class', 'rollNumber'].map((field) => (
                        <div key={field} className="mb-2">
                            <label className="block mb-1">Student {field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type="text" name={field} placeholder={`Student ${field}`} value={formData.student[field]} onChange={(e) => handleChange(e, 'student')} required className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                    ))}
                </div>

                <div className="col-span-2">
                    <h3 className="text-xl font-semibold mb-2">Items</h3>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 items-end">
                            {['description', 'quantity', 'price', 'cgst', 'sgst'].map((field) => (
                                <div key={field}>
                                    <label className="block mb-1">{field.toUpperCase()}</label>
                                    <input type="text" name={field} value={item[field]} onChange={(e) => handleChange(e, null, index)} placeholder={field} className="w-full p-2 border rounded-md" />
                                </div>
                            ))}
                            <button type="button" onClick={() => removeItem(index)} className="p-2 bg-red-500 text-white rounded-md">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="p-2 bg-green-500 text-white rounded-md mt-2">Add Item</button>
                </div>

                <div>
                    <label className="block mb-1">Invoice Date</label>
                    <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })} required className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block mb-1">Due Date</label>
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required className="w-full p-2 border rounded-md" />
                </div>

                <button type="submit" className="p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition col-span-2">Generate Invoice</button>
            </form>
        </div>

            {showPopup && (
                <div className="min-h-screen bg-gradient-to-br mt-32 from-blue-50 to-blue-200 p-8">
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto" id="invoicePreview">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <img src="/images/logo/image.png" alt="School Logo" className="h-24 mr-4" />
                                    <div>
                                        <h1 className="text-4xl font-bold text-blue-800">Greenwood High School</h1>
                                        <p className="text-gray-600">123 School Road, Education City, India</p>
                                        <p className="text-gray-600">Phone: +91 9876543210 | Email: info@greenwoodhigh.com</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-800">INVOICE #</h2>
                                    <p><strong>Invoice Number:</strong> {formData.invoiceNumber}</p>
                                    <p><strong>Invoice Date:</strong> {formData.invoiceDate}</p>
                                    <p><strong>Due Date:</strong> {formData.dueDate}</p>
                                </div>
                            </div>

                            {/* Student Details */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Student Details:</h3>
                                <p><strong>Name:</strong> {formData.student.name}</p>
                                <p><strong>Class:</strong> {formData.student.class}</p>
                                <p><strong>Roll Number:</strong> {formData.student.rollNumber}</p>
                            </div>

                            {/* Items Table */}
                            <table className="w-full mb-6 border-collapse border">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th className="p-2 border">Description</th>
                                        <th className="p-2 border">Quantity</th>
                                        <th className="p-2 border">Price (₹)</th>
                                        <th className="p-2 border">CGST (%)</th>
                                        <th className="p-2 border">SGST (%)</th>
                                        <th className="p-2 border">Total (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.map((item, index) => {
                                        const itemTotal = item.quantity * item.price;
                                        const totalWithTaxes = itemTotal + (itemTotal * item.cgst / 100) + (itemTotal * item.sgst / 100);
                                        return (
                                            <tr key={index} className="border-b">
                                                <td className="p-2 border">{item.description}</td>
                                                <td className="p-2 border text-center">{item.quantity}</td>
                                                <td className="p-2 border text-right">₹{item.price.toFixed(2)}</td>
                                                <td className="p-2 border text-center">{item.cgst}%</td>
                                                <td className="p-2 border text-center">{item.sgst}%</td>
                                                <td className="p-2 border text-right">₹{totalWithTaxes.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Total Amount */}
                            <div className="text-right mb-6">
                                <h3 className="text-xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
                            </div>

                            {/* Footer Section */}
                            <div className="mt-6 border-t pt-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <img src="/images/logo/image.png" alt="School Stamp" className="h-24" />
                                        <p className="mt-2 text-gray-600">Authorized Signature</p>
                                    </div>
                                    <p className="text-gray-600">Thank you for your payment!</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6">
                                <button onClick={downloadPDF} className="p-3 bg-green-500 text-white rounded-md">Download PDF</button>
                                <button onClick={() => setShowPopup(false)} className="p-3 bg-red-500 text-white rounded-md ml-4">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceGenerator;