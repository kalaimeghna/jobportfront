import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to close sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Global Navbar */}
      <div className="z-50 sticky top-0 bg-white border-b border-slate-200">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden absolute top-4 right-4 z-50 p-2 text-slate-600 bg-white shadow-md rounded-xl border border-slate-200"
          aria-label="Toggle Menu"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`${
            isSidebarOpen 
              ? "fixed inset-y-0 left-0 w-64 z-40 bg-white shadow-xl" 
              : "hidden"
          } md:block md:w-64 border-r border-slate-200 bg-white shrink-0 overflow-y-auto transition-all duration-300`}
        >
          <div className="h-full">
            {/* Pass the close handler down to your sidebar links */}
            <Sidebar onClose={closeSidebar} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
            <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
              {/* The Outlet renders the child routes */}
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;