import { Outlet } from "react-router-dom";
import Sidebar from "../../../App/PanelLayout/Sidebar";
import HeaderPanel from "../HeaderPanel";
export default function PanelLayout() {
  return (
    <div dir="rtl" className="min-h-screen  bg-[#0b1120] flex ">
      <Sidebar />
      <main className="flex-1 p-10">
        <HeaderPanel />
        <Outlet />
      </main>
    </div>
  );
}
