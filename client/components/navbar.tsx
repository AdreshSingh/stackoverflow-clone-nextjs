'use client'
import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { navBarItems } from "@/constants/navbar";
import { useAuth } from "@/lib/auth-context";

export function Navbar(
    // { handleSlideIn }: { handleSlideIn: () => void }
    { handleSlideIn }: any
) {

    // const USER = { _id: 1, name: "Jhon Doe" }
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }


    return (
      <header className="top-0 z-50 w-full min-h-13.25 bg-white border-t-[3px] border-[#ef8236] shadow-[0_1px_5px_#00000033] flex items-center justify-center">
        <div className="w-[90%] max-w-360 flex items-center justify-center mx-auto py-1">
          {/* Hamburger Menu */}
          <button
            aria-label="Toggle Sidebar"
            className="sm:block md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu className="size-5 text-gray-800" />
          </button>
          {/* Left Section: Logo + Nav */}
          <div className="flex items-center gap-2 grow">
            <Link href={"/"}>
              <img
                src={"/logo.png"}
                alt="stackoverflow-clone"
                className="h-6 w-auto"
              />
            </Link>
          </div>

          <div className="hidden sm:flex gap-1">
            {navBarItems.map((item: string, index: number) => (
              <Link
                key={index}
                href={`/`}
                className="text-sm text-[#454545] font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Search Input */}
          <form className="hidden lg:block grow relative px-3">
            <input
              type="text"
              placeholder="Search.."
              className="w-full max-w-150 pl-9 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 py-2"
            />
            <Search className="absolute left-4 top-2.5 size-4 text-gray-600" />
          </form>
          <div className="flex items-center gap-2">
            {!user ? (
              <Link
                href={"/auth"}
                className="text-sm font-medium text-[#454545] bg-[#e7f8fe] hover:bg-[#d3e4eb] border border-blue-500 px-4 py-1.5 rounded transition"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href={`/users/${user?._id}`}
                  className="flex items-center justify-center bg-orange-600 text-white text-sm font-semibold w-9 h-9 rounded-full"
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Link>
                <Button
                  onClick={handleLogout}
                  className="text-sm font-medium text-[#454545] bg-[#e7f8fe] hover:bg-[#d3e4eb] border border-blue-500 px-4 py-1.5 rounded transition"
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    );
}