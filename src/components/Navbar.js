"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-700 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/vercel.svg" // Replace with your logo path
            alt="Your App Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <span className="font-bold text-xl text-white">Your App</span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 text-white"
              >
                Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative w-12 h-12 mt-1 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {session.user?.profileImage ? (
                    <Image
                      src={session.user.profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">
                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </button>
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-black">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
