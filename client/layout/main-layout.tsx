"use client";
import { Navbar } from "@/components/navbar";
import { RightSidebar } from "@/components/right-sidebar";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MainlayoutProps {
    children: React.ReactNode;
}

export function Mainlayout({ children }: MainlayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    }, [])

    const handleSlideIn = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen((state) => !state);
        }
    }
    return (
        <div className="min-h-screen bg-[#f8f9fa] text-[#3a3a3a]">
            <Navbar handleSlideIn={handleSlideIn} />
            <div className="flex max-w-full min-h-screen py-1">
                <Sidebar isOpen={sidebarOpen} onClose={handleSlideIn} />
                <main className="flex-1 min-w-0 p-4 bg-white lg:p-6">{children}</main>
                <div className="hidden border border-gray-200 lg:block">
                    <RightSidebar/>
                </div>
            </div>
            <footer className="p-4 text-center bg-gray-200">
                &copy; {new Date().getFullYear()} My Application. All rights reserved.
            </footer>
        </div>
    );
}
