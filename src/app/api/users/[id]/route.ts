// app/api/users/[id]/route.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Extract the ID from the URL parameters
    const userId = params.id;

    // Validate the ID exists
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the user by ID and exclude sensitive fields
    const user = await User.findById(userId).select("-password -isAdmin");

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
