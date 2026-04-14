import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import User from "@/models/User";
import { sendEmailNotification, sendPushNotification } from "@/lib/notifications";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const tasks = await Task.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, category, deadline } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    await connectDB();
    const userId = (session.user as any).id;
    const newTask = await Task.create({
      title,
      description,
      category,
      deadline,
      userId,
    });

    // Handle Notifications
    const user = await User.findById(userId);
    if (user) {
      // Send Email
      await sendEmailNotification(
        user.email,
        "New Task Created",
        `You have successfully created a new task: "${title}" in the ${category} category.`
      );

      // Send Push Notification if subscription exists
      if (user.pushSubscription) {
        await sendPushNotification(user.pushSubscription, {
          title: "New Task!",
          body: `Task "${title}" has been added.`,
          icon: "/icons/icon-192x192.png", // Ensure this exists or use a generic one
        });
      }
    }

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error("Task creation notification error:", error);
    // We still return the task even if notification fails
    return NextResponse.json({ message: "Task created, but notification failed." }, { status: 201 });
  }
}
