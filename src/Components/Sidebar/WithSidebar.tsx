import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function WithSidebar() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
