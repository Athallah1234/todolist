"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ListTodo 
} from "lucide-react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { tasks, loading, fetchTasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "todo" | "completed">("all");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending: tasks.filter(t => t.status === "todo").length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">My Tasks</h1>
          <p className="text-slate-500 font-medium">Hello! Here's what's happening with your tasks today.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition flex items-center justify-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard 
          icon={<ListTodo className="w-5 h-5" />} 
          label="Total Tasks" 
          value={stats.total} 
          color="bg-indigo-600" 
        />
        <StatCard 
          icon={<CheckCircle2 className="w-5 h-5" />} 
          label="Completed" 
          value={stats.completed} 
          color="bg-emerald-500" 
        />
        <StatCard 
          icon={<Clock className="w-5 h-5" />} 
          label="Pending" 
          value={stats.pending} 
          color="bg-amber-500" 
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit">
        <FilterButton 
          active={filter === "all"} 
          onClick={() => setFilter("all")} 
          label="All" 
        />
        <FilterButton 
          active={filter === "todo"} 
          onClick={() => setFilter("todo")} 
          label="Pending" 
        />
        <FilterButton 
          active={filter === "completed"} 
          onClick={() => setFilter("completed")} 
          label="Completed" 
        />
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ListTodo className="w-8 h-8 opacity-20" />
                </div>
                <p className="font-medium">No tasks found. Start by adding one!</p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        taskToEdit={taskToEdit} 
      />
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-slate-900 font-outfit">{value}</p>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-xl font-bold transition-all text-sm",
        active 
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
          : "text-slate-500 hover:text-indigo-600"
      )}
    >
      {label}
    </button>
  );
}

