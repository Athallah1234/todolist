import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getStatusColor(status: string) {
  switch (status) {
    case "todo": return "bg-amber-100 text-amber-700";
    case "completed": return "bg-emerald-100 text-emerald-700";
    default: return "bg-slate-100 text-slate-700";
  }
}
