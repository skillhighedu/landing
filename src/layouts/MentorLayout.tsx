import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MentorLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_45%),linear-gradient(to_bottom,_rgba(248,250,252,1),_rgba(248,250,252,0.94))] font-mono text-foreground dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_35%),linear-gradient(to_bottom,_rgba(10,10,10,1),_rgba(23,23,23,1))]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
