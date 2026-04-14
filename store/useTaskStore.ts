import { create } from 'zustand';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'completed';
  category: string;
  deadline?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      set({ tasks: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      set({ tasks: [newTask, ...get().tasks] });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateTask: async (id, updates) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      set({
        tasks: get().tasks.map((t) => (t._id === id ? updatedTask : t)),
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteTask: async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      set({
        tasks: get().tasks.filter((t) => t._id !== id),
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
