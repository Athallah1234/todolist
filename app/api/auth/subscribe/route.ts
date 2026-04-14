import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { subscription } = await req.json();

    if (!subscription) {
      return NextResponse.json({ message: "Subscription is required" }, { status: 400 });
    }

    await connectDB();
    await User.findByIdAndUpdate((session.user as any).id, {
      pushSubscription: subscription,
    });

    return NextResponse.json({ message: "Subscribed to push notifications" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
