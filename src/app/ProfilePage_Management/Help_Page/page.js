"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, XCircle } from 'lucide-react';

const helpVideos = [
    { title: 'How to Add a New Student', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'Generating Reports', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'Managing Attendance', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'Setting Up Fees and Payments', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'User Permissions and Roles', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'Customizing Dashboard', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
    { title: 'Handling Notifications', url: 'https://www.youtube.com/embed/8RAd-_Qj_ac?si=xA60QWlr0adonLf0' },
];

const itemsPerPage = 6;

export default function HelpPage() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredVideos = helpVideos.filter(video =>
        video.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

    const paginatedVideos = filteredVideos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto p-2 sm:p-10 mt-28 bg-white ">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Help & Tutorials</h2>

            <div className="mb-6 flex items-center gap-4 relative">
                <Search className="absolute left-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={search}
                    onChange={handleSearchChange}
                    className="flex-1 p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {search && (
                    <XCircle 
                        className="cursor-pointer text-gray-400" 
                        onClick={() => setSearch('')} 
                    />
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {paginatedVideos.map((video) => (
                    <div key={video.title} className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {video.title}
                        </h3>
                        <div className="w-full h-52">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={video.url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.title}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-5 mt-8">
    <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-blue-900 text-white rounded-full disabled:opacity-50 hover:bg-blue-600  transition">
        <ChevronLeft className="w-6 h-6" />
    </button>
    <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
    </span>
    <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-blue-900 text-white rounded-full disabled:opacity-50 hover:bg-blue-600  transition">
        <ChevronRight className="w-6 h-6" />
    </button>
</div>


        </div>
    );
}
