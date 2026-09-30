function Topbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <p className="text-sm text-slate-500">
          North Eastern Region
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-xl text-slate-600">
          🔔
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">
              Administrator
            </p>
            <p className="text-xs text-slate-500">
              Government Dashboard
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;