import { useState } from "react";
import Topbar from "./topBar";
import Sidebar from "./sideBar";

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 bg-gray-200 dark:bg-gray-800 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
