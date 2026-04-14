"use client";

import { useEffect, useState } from "react";
import { 
  Clock, 
  ListTodo,
  AlertCircle
} from "lucide-react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { motion, AnimatePresence } from "framer-motion";

export default function PendingTasks() {
  const { tasks, loading, fetchTasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const pendingTasks = tasks.filter(task => task.status === "todo");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Pending Tasks</h1>
        <p className="text-slate-500 font-medium">Keep going! You have some exciting things to finish.</p>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
          <Clock className="w-8 h-8" />
        </div>
        <div>
          <p className="text-amber-700 font-bold text-2xl font-outfit">{pendingTasks.length}</p>
          <p className="text-amber-600/80 font-semibold text-sm">Tasks in Progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <ListTodo className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Workspace clear!</h3>
                <p className="text-sm max-w-xs text-center text-slate-500">
                  You don't have any pending tasks. Take a break or start something new!
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
