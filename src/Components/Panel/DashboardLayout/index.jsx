export default function DashboardLayout({ children }) {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] p-6 md:p-10 text-white font-light">
    //   <div className="max-w-[1600px] mx-auto space-y-10">
    //     {children}
    //   </div>
    // </div>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] p-6 md:p-10 text-white font-light ">
  <div className="flex-1 max-w-[1600px] mx-auto w-full">
    {children}
  </div>
</div>
  );
}

