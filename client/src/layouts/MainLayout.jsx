import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// eslint-disable-next-line react/prop-types
export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-primary to-secondary">
      <Navbar className="flex-grow flex-shrink-0" />
      <div className="flex flex-col md:flex-row-reverse flex-grow flex-shrink overflow-hidden">
        <div className='flex-grow flex-shrink md:overflow-auto overflow-hidden'>

        <Outlet />
        </div>
        <Sidebar className="flex flex-grow-0 flex-shrink" />
      </div>
    </div>
  );
}
