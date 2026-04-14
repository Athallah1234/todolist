"use client";

import { useEffect, useState } from "react";
import { 
  Calendar,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { motion, AnimatePresence } from "framer-motion";

export default function DeadlinesTasks() {
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

  const deadlineTasks = tasks
    .filter(task => task.deadline)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Important Deadlines</h1>
        <p className="text-slate-500 font-medium">Keep an eye on these dates to stay ahead of your schedule.</p>
      </div>

      <div className="bg-purple-50 border border-purple-100 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <p className="text-purple-700 font-bold text-2xl font-outfit">{deadlineTasks.length}</p>
          <p className="text-purple-600/80 font-semibold text-sm">Tasks with Deadlines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {deadlineTasks.length > 0 ? (
            deadlineTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No deadlines set</h3>
                <p className="text-sm max-w-xs text-center text-slate-500">
                  Great! You don't have any pressing deadlines. Add a deadline to a task to see it here.
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
