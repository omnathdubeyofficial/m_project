"use client";
import { useState } from 'react';
import Details from '../Admin_Profile/page';

const tabs = [
    { name: "Details", component: <Details /> },
    { name: "Personal", component: <Details /> },
    { name: "Account", component: <Details /> },
    { name: "Profile", component: <Details /> },
    { name: "Security", component: <Details /> },
    { name: "Appearance", component: <Details /> },
    { name: "API", component: <Details /> },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Details");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const activeComponent = tabs.find((tab) => tab.name === activeTab)?.component;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-36 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">Settings</h2>

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto border-b pb-2 mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => handleTabClick(tab.name)}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                            activeTab === tab.name
                                ? 'border-b-2 border-indigo-500 text-indigo-500'
                                : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-5 bg-gray-50 rounded-lg shadow-sm">
                {activeComponent}
            </div>
        </div>
    );
}
