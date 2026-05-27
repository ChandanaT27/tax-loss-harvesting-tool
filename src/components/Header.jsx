const Header = () => {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-azure-500 to-jade-500 flex items-center justify-center shadow-glow-azure">
              <span className="text-white font-display font-bold text-sm">H</span>
            </div>
            <div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Harvest<span className="text-azure-400">IQ</span>
              </span>
              <p className="text-xs text-slate-600 font-body leading-none mt-0.5 hidden sm:block">
                Tax Loss Harvesting
              </p>
            </div>
          </div>

          {/* Nav center - FY label */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-slate-500 font-body">FY</span>
            <span className="font-display font-semibold text-slate-300">2024–25</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 font-body">As of</p>
              <p className="text-xs font-mono text-slate-300">{today}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-600/40 flex items-center justify-center text-sm">
              👤
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
