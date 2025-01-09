"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  console.log("!!! session", session);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      // 1. Upload image
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");
      const data = await uploadResponse.json();
      console.log("Upload response data:", data); // Debug log

      // 2. Update profile in database
      const updateResponse = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileImage: data.url }),
      });

      if (!updateResponse.ok) throw new Error("Profile update failed");
      console.log("Profile update successful"); // Debug log

      // 3. Update session with the new image URL
      const result = await update({
        ...session,
        user: {
          ...session?.user,
          profileImage: data.url,
        },
      });

      console.log("Session update result:", result); // Debug log
    } catch (error) {
      console.error("Error in image upload process:", error);
      alert("Failed to update profile image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("%%% session", session);
    e.preventDefault();
    await update({
      user: {
        ...session.user,
        profileImage:
          "http://getwallpapers.com/wallpaper/full/0/b/5/175341.jpg",
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-blue-600" />

        {/* Profile Info Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-24">
            <div className="bg-white rounded-lg shadow px-6 py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Avatar with Upload */}
                <div className="relative group">
                  <div className="relative h-32 w-32">
                    {!session?.user?.profileImage ? (
                      <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                          className="h-16 w-16 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z" />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={session.user.profileImage}
                        alt="Profile"
                        fill
                        className="rounded-full border-4 border-white object-cover"
                        key={session.user.profileImage}
                      />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      {uploading ? (
                        <span className="text-white text-sm">Uploading...</span>
                      ) : (
                        <span className="text-white text-sm">Change Photo</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Name and Email */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {session?.user?.name}
                  </h1>
                  <p className="text-gray-600">{session?.user?.email}</p>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors self-start sm:self-center"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
