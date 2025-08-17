import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

//so what we did here was got data from frontend
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json(); //next mein its not like express the request might take some time to come so that's why we use await
    if (!email || !password) {
      //validating data if it is even there
      return NextResponse.json(
        {
          error: "Email and pass are required",
        },
        {
          status: 400,
        }
      );
    }
    //database connection so that  we can see if the user is created already or not and also check the database connection
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already registered",
        },
        {
          status: 400,
        }
      );
    }
    // if the user is not there then we created one
    await User.create({ email, password });

    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    //throwed error
    console.error("Registration Error", error);
    return NextResponse.json(
      {
        message: "Registration error cant create user",
      },
      {
        status: 500,
      }
    );
  }
}
