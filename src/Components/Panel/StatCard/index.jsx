export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div
      className="relative bg-black/40 backdrop-blur-xl border border-white/10 
    rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)]
    hover:scale-[1.03] transition duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-medium mt-2">{value}</h3>
        </div>

        <div className="bg-white/10 p-3 rounded-2xl">
          <Icon size={22} className="text-white" />
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-[28px] bg-gradient-to-tr 
      from-white/5 to-transparent pointer-events-none"
      />
    </div>
  );
}
