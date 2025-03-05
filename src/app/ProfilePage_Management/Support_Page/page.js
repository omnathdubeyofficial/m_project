import React from 'react';

const SupportPage = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              📧 <span>support@vaekoninfotech.com</span>
            </div>
            <div className="flex items-center gap-2">
              📞 <span>+91 12345 67890</span>
            </div>
            <div className="flex items-center gap-2">
              📍 <span>1234 Street, City, State, ZIP</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Submit a Request</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="p-2 border rounded-md" />
            <input type="email" placeholder="Your Email" className="p-2 border rounded-md" />
            <textarea placeholder="Your Message" className="p-2 h-24 border rounded-md"></textarea>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
