"use client";

import { useEffect, useState } from "react";
import { 
  Layers, 
  Tag, 
  ChevronRight,
  Plus,
  FolderOpen
} from "lucide-react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  const { tasks, loading, fetchTasks } = useTaskStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);

  // Group tasks by category
  const categories = tasks.reduce((acc: {[key: string]: Task[]}, task) => {
    const cat = task.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(task);
    return acc;
  }, {});

  const categoryList = Object.keys(categories).sort();

  useEffect(() => {
    // Select first category by default if none selected
    if (!selectedCategory && categoryList.length > 0) {
      setSelectedCategory(categoryList[0]);
    }
  }, [categoryList, selectedCategory]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Task Categories</h1>
        <p className="text-slate-500 font-medium">Browse and manage your tasks organized by their specific areas.</p>
      </div>

      {/* Category Grid/Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "p-5 rounded-3xl border text-left transition-all duration-300 group",
              selectedCategory === cat
                ? "bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50"
                : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors",
              selectedCategory === cat ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"
            )}>
              <Tag className="w-5 h-5" />
            </div>
            <p className={cn(
              "font-bold text-sm truncate mb-1",
              selectedCategory === cat ? "text-white" : "text-slate-900"
            )}>
              {cat}
            </p>
            <p className={cn(
              "text-xs font-semibold",
              selectedCategory === cat ? "text-indigo-100" : "text-slate-400"
            )}>
              {categories[cat].length} {categories[cat].length === 1 ? 'Task' : 'Tasks'}
            </p>
          </button>
        ))}

        {/* Placeholder for adding new (via task modal currently) */}
        {!loading && categoryList.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <FolderOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No categories found yet.</p>
          </div>
        )}
      </div>

      {/* Tasks in Selected Category */}
      <div className="space-y-6">
        {selectedCategory && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full" />
              <h2 className="text-2xl font-bold font-outfit text-slate-900">
                {selectedCategory} <span className="text-slate-400 ml-2 font-normal">({categories[selectedCategory]?.length || 0})</span>
              </h2>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {selectedCategory && categories[selectedCategory]?.map((task: Task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </AnimatePresence>
        </div>
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
