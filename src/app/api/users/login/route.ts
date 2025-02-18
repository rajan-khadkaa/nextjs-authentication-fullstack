import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Not registered. Register first." },
        { status: 404 }
      );
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const tokenData = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        return NextResponse.json(
          { message: "Successful login", success: true, tokenData },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Incorrect Password" },
          { status: 400 }
        );
      }
    }
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
