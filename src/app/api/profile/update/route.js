// app/api/profile/update/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/db/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const data = await req.json();
    console.log("Received update data:", data); // Debug log

    const client = await clientPromise;
    const db = client.db();

    // Update the user document
    const result = await db
      .collection("users")
      .updateOne(
        { email: session.user.email },
        { $set: { profileImage: data.profileImage } }
      );

    console.log("Database update result:", result); // Debug log

    return new Response(
      JSON.stringify({ success: true, profileImage: data.profileImage }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
