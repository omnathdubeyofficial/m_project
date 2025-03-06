"use client";

import { useState } from "react";
import { CREATE_EVENT_FORM_MUTATION } from "../../../mutation/EventCreationMutation/createEventFormMutation";
import { executeMutation } from "../../../graphqlClient";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Event_Creation_Form = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        event_id: "",
        event_name: "",
        event_type: "",
        event_date: "",
        start_time: "",
        end_time: "",
        venue: "",
        organizer_name: "",
        organizer_contact_no: "",
        organizer_whatsapp_no: "",
        organizer_email_id: "",
        target_audience: "",
        max_participants: "",
        registration_deadline: "",
        event_status: "",
        resources_required: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState({ text: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            const response = await executeMutation(CREATE_EVENT_FORM_MUTATION, formData);
            console.log("Mutation Response:", response);

            if (response?.createEventForm?.success_msg) {
                setPopupMessage({ text: response.createEventForm.success_msg, type: "success" });
            } else {
                setPopupMessage({ text: "Failed to create event: " + response?.createEventForm?.error_msg, type: "error" });
            }

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error("Error executing mutation:", error);
            setPopupMessage({ text: "An unexpected error occurred.", type: "error" });
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };
    

    return (
        <div className="min-h-screen pt-36 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-8">
            <div className="w-full max-w-6xl p-10 bg-white shadow-2xl rounded-2xl border-t-4 border-blue-500 relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 bg-blue-600 text-white p-2 pl-4 pr-4 shadow-md hover:bg-blue-700 transition"
                >
                    Go Back
                </button>
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
                    Event Creation Form
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.keys(formData).filter(field => field !== "description").map((field, index) => (
                        <div key={index} className="flex flex-col">
                            <label htmlFor={field} className="mb-2 text-lg font-semibold capitalize text-gray-700">
                                {field.replace(/_/g, " ")}
                            </label>
                            {field === "event_type" ? (
                                <select
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Event Type</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Seminar">Seminar</option>
                                </select>
                            ) : field === "event_status" ? (
                                <select
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Event Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            ) : ["event_date", "registration_deadline"].includes(field) ? (
                                <input
                                    id={field}
                                    name={field}
                                    type="date"
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : ["start_time", "end_time"].includes(field) ? (
                                <input
                                    id={field}
                                    name={field}
                                    type="time"
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <input
                                    id={field}
                                    name={field}
                                    type="text"
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </div>
                    ))}
                    <div className="col-span-1 md:col-span-3">
                        <label htmlFor="description" className="mb-2 text-lg font-semibold capitalize text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
            {showPopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg text-lg 
            ${popupMessage.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {popupMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
            {popupMessage.text}
          </div>
        )}
        </div>
    );
};

export default Event_Creation_Form;
