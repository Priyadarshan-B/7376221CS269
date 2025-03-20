import { useTheme } from "../theme/themeProvider";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { darkMode } = useTheme();
  
    return (
        <div>
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={toggleSidebar}
          ></div>
    
          <aside
            className={`fixed left-0 top-0 w-56 h-full p-5 transform transition-transform md:relative md:translate-x-0 ${
              darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button className="absolute top-4 right-4 md:hidden" onClick={toggleSidebar}>
              <CloseIcon className="text-3xl" />
            </button>
    
            <h2 className="text-xl font-bold mb-6">Social Media</h2>
            <ul className="space-y-4">
             
             
              <li>
                <Link to="/" className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded">
                  <SettingsIcon /> User and Posts
                </Link>
              </li>
              
              <li>
                <Link to="/topuser" className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded">
                  <SettingsIcon />Top User
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      );
    };
    
    export default Sidebar;