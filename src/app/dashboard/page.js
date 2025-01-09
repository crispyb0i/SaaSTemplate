// components/Navbar.js\
"use client";
import Navbar from "@/components/Navbar";

export default function DasboardPage() {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>Total Users: 123</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>Active Users (Today): 57</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>New Users (Today): 18</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>Total Revenue (Today): $1,234.56</p>
        </div>
        {/* ... more components for other metrics and charts */}
      </div>

      {/* To-Do List (example) */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">To-Do List</h2>
        <ul>
          <li>Complete marketing campaign analysis</li>
          <li>Fix bug in user profile settings</li>
          <li>Schedule product demo</li>
        </ul>
      </div>
    </div>
  );
}
