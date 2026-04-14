"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  Settings, 
  LogOut, 
  Layers,
  Calendar
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "All Tasks", href: "/dashboard" },
  { icon: CheckCircle2, label: "Completed", href: "/dashboard/completed" },
  { icon: Clock, label: "Pending", href: "/dashboard/pending" },
  { icon: Calendar, label: "With Deadline", href: "/dashboard/deadlines" },
  { icon: Layers, label: "Categories", href: "/dashboard/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-outfit text-slate-900">Check-It</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-600 hover:bg-red-50 hover:text-red-600 transition font-medium"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
