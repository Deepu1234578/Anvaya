const menuItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Route Planning", icon: "⇄" },
  { name: "Accessibility", icon: "◎" },
  { name: "Disruptions", icon: "⚠" },
  { name: "Logistics Hubs", icon: "▣" },
  { name: "Analytics", icon: "▥" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          ANVAYA
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Logistics Intelligence
        </p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="mb-2 flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
        <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;