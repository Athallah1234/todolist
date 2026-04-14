"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, User as UserIcon, Menu } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const { toggleSidebar } = useUIStore();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">{session?.user?.name}</p>
            <p className="text-xs text-slate-500">{session?.user?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {session?.user?.name?.[0].toUpperCase() || <UserIcon className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </header>
  );
}
