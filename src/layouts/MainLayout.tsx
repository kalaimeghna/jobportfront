import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Navbar for better UX on long pages */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <Navbar />
      </div>

      {/* Main Content with Suspense for smooth route transitions */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense 
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;