import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, status, category, deadline } = await req.json();

    await connectDB();
    const task = await Task.findOne({ _id: params.id, userId: (session.user as any).id });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      { title, description, status, category, deadline },
      { new: true }
    );

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const result = await Task.deleteOne({ _id: params.id, userId: (session.user as any).id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
