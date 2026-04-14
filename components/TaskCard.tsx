"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Tag, 
  MoreVertical, 
  Trash2, 
  Edit2 
} from "lucide-react";
import { Task, useTaskStore } from "@/store/useTaskStore";
import { cn, formatDate } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskStore();

  const handleToggle = async () => {
    const newStatus = task.status === "todo" ? "completed" : "todo";
    await updateTask(task._id, { status: newStatus });
    toast.success(`Task marked as ${newStatus === "completed" ? "done" : "undone"}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task._id);
      toast.success("Task deleted");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "bg-white p-6 rounded-2xl border transition-all hover:shadow-md",
        task.status === "completed" ? "bg-slate-50 border-slate-100" : "border-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <button 
          onClick={handleToggle}
          className="mt-1 flex-shrink-0"
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="w-6 h-6 text-indigo-600 fill-indigo-50" />
          ) : (
            <Circle className="w-6 h-6 text-slate-300 hover:text-indigo-600 transition" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-bold font-outfit mb-1 transition-all",
            task.status === "completed" ? "text-slate-400 line-through" : "text-slate-900"
          )}>
            {task.title}
          </h3>
          <p className={cn(
            "text-sm mb-4 line-clamp-2",
            task.status === "completed" ? "text-slate-400" : "text-slate-500"
          )}>
            {task.description || "No description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
              <Tag className="w-3 h-3" />
              {task.category}
            </span>
            {task.deadline && (
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-600 rounded-full">
                <Clock className="w-3 h-3" />
                {formatDate(task.deadline)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
