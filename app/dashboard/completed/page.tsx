"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  ListTodo,
  Calendar,
  AlertCircle
} from "lucide-react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CompletedTasks() {
  const { tasks, loading, fetchTasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    // Only fetch if tasks are empty to avoid redundant calls, 
    // but usually dashboard already fetched them.
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const completedTasks = tasks.filter(task => task.status === "completed");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Completed Tasks</h1>
        <p className="text-slate-500 font-medium">Great job! Here are all the tasks you've successfully completed.</p>
      </div>

      {/* Stats Summary for Completed */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <p className="text-emerald-700 font-bold text-2xl font-outfit">{completedTasks.length}</p>
          <p className="text-emerald-600/80 font-semibold text-sm">Tasks Finished</p>
        </div>
        <div className="ml-auto hidden md:block">
          <div className="px-4 py-2 bg-white/50 rounded-xl border border-emerald-100 text-xs font-bold text-emerald-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Consistency is key to success!
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No completed tasks yet</h3>
                <p className="text-sm max-w-xs text-center text-slate-500">
                  Finish your pending tasks to see them appear here and celebrate your progress!
                </p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }} 
        taskToEdit={taskToEdit} 
      />
    </div>
  );
}
