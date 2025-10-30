import { FileEdit } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 text-xl font-bold">Veil.AI</div>
      <div className="mt-4 flex items-center space-x-2 p-4 text-lg font-semibold cursor-pointer">
        <FileEdit className="w-4 h-4" />
        <span>New Chat</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <h1 className="px-4 mt-4 text-muted-foreground text-sm font-semibold cursor-pointer">
          Recent History
        </h1>
        <ul className="space-y-2 p-2">
          <li className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded cursor-pointer">
            Mern Stack Roadmap
          </li>
          <li className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded cursor-pointer">
            What is Next js
          </li>
          <li className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded cursor-pointer">
            Next js vs React js
          </li>
        </ul>
      </div>
      <div className="p-4 text-sm text-muted-foreground">Settings & Help</div>
    </div>
  );
};

export default Sidebar;
