import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //peek at received user info
    console.log("User info received is: ", reqBody);

    //if email already exists
    const findEmail = await User.findOne({ email });
    if (findEmail)
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );

    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const addUser = User.create({ username, email, password: hashedPassword });
    if (!addUser) {
      return NextResponse.json(
        { message: "Failed to add user." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User added successfully.", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
