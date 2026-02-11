import { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState({ status: 'offline', uptime: '0s', version: '1.0.0' });
  const [isOnline, setIsOnline] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const checkSystem = async () => {
      try {
        const response = await fetch('http://localhost:8000/health');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setHealth(data);
        setIsOnline(true);
        addLog("API_POLL: 200 OK - Health Verified");
      } catch (err) {
        setHealth({ status: 'offline', uptime: 'N/A' });
        setIsOnline(false);
        addLog("API_POLL: 503 ERROR - Backend Unreachable", "error");
      }
    };

    checkSystem();
    const interval = setInterval(checkSystem, 5000); // Check every 5s
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg, type = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, msg, type }, ...prev].slice(0, 8));
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-400 font-mono">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-[#0B0F1A] p-6 hidden lg:flex flex-col">
        <div className="mb-10 text-white font-black text-xl italic tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-sm" /> 
          TASK_ARC_OS
        </div>
        <nav className="space-y-4 flex-1">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Services</p>
          <div className="text-indigo-400 bg-indigo-500/5 border border-indigo-500/20 px-3 py-2 rounded">Active_Monitor</div>
          <div className="px-3 py-2 opacity-30 cursor-not-allowed text-xs">Worker_Nodes</div>
          <div className="px-3 py-2 opacity-30 cursor-not-allowed text-xs">Secrets_Manager</div>
        </nav>
        <div className="text-[10px] text-slate-700 border-t border-slate-800 pt-4 uppercase">
          ENV: LOCAL_HOST_WSL
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Control Center</h2>
            <p className="text-xs text-slate-500 mt-1">Real-time ASGI server metrics</p>
          </div>
          <div className={`px-4 py-1.5 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-all ${isOnline ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5' : 'border-rose-500/50 text-rose-400 bg-rose-500/5'}`}>
            {isOnline ? '● SYSTEM_ONLINE' : '○ SYSTEM_FAULT'}
          </div>
        </header>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricBox label="Instance Uptime" value={health.uptime} color="indigo" />
          <MetricBox label="Build Version" value={`v${health.version}`} color="slate" />
          <MetricBox label="Network Latency" value={isOnline ? "12ms" : "---"} color="emerald" />
        </div>

        {/* LOG TERMINAL */}
        <div className="bg-[#0D111C] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-slate-800/30 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-500">Live_Console_Buffer</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
          </div>
          <div className="p-6 space-y-2 h-64 overflow-y-auto scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-4 text-xs ${i === 0 ? 'opacity-100' : 'opacity-60'}`}>
                <span className="text-slate-600">[{log.time}]</span>
                <span className={log.type === 'error' ? 'text-rose-500 font-bold' : 'text-emerald-500'}>
                  {log.msg}
                </span>
              </div>
            ))}
            {logs.length === 0 && <p className="text-slate-800 text-xs italic">Awaiting handshake...</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricBox({ label, value, color }) {
  return (
    <div className="bg-[#0B1221] border border-slate-800/60 p-6 rounded-md hover:border-indigo-500/40 transition-all group">
      <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600 mb-3 group-hover:text-indigo-400">{label}</p>
      <div className="text-2xl font-black text-slate-100 tracking-tighter">{value}</div>
    </div>
  );
}

export default App;