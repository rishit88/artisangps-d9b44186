import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Flame,
  Home,
  LineChart as LineIcon,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  User,
  Filter,
  Download,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import textileImg from "@/assets/craft-textile.jpg";
import potteryImg from "@/assets/craft-pottery.jpg";
import metalImg from "@/assets/craft-metal.jpg";

/* ---------------- data ---------------- */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const demandSeries = months.map((m, i) => ({
  m,
  textile: [42, 48, 55, 61, 58, 52, 49, 64, 78, 96, 88, 71][i],
  pottery: [30, 34, 41, 49, 44, 38, 36, 47, 58, 72, 65, 54][i],
  metal: [22, 25, 31, 38, 35, 30, 28, 36, 49, 68, 61, 44][i],
}));

const priceSeries = [
  { w: "W-12", cotton: 246, indigo: 1780, brass: 588 },
  { w: "W-13", cotton: 251, indigo: 1810, brass: 595 },
  { w: "W-14", cotton: 258, indigo: 1830, brass: 601 },
  { w: "W-15", cotton: 262, indigo: 1815, brass: 608 },
  { w: "W-16", cotton: 270, indigo: 1850, brass: 612 },
  { w: "W-17", cotton: 264, indigo: 1840, brass: 605 },
  { w: "W-18", cotton: 254, indigo: 1820, brass: 598 },
];

const clusterShare = [
  { cluster: "Khurja", share: 28, color: "hsl(var(--primary))" },
  { cluster: "Banaras", share: 22, color: "hsl(var(--secondary))" },
  { cluster: "Moradabad", share: 18, color: "hsl(var(--forest))" },
  { cluster: "Jaipur", share: 16, color: "hsl(var(--primary)/.6)" },
  { cluster: "Bagru", share: 9, color: "hsl(var(--secondary)/.6)" },
  { cluster: "Other", share: 7, color: "hsl(var(--muted-foreground))" },
];

const radarData = [
  { axis: "Demand", textile: 92, pottery: 70, metal: 64 },
  { axis: "Margin", textile: 64, pottery: 78, metal: 71 },
  { axis: "Restock", textile: 80, pottery: 55, metal: 60 },
  { axis: "Festival lift", textile: 95, pottery: 82, metal: 74 },
  { axis: "Export pull", textile: 70, pottery: 58, metal: 88 },
  { axis: "Price stability", textile: 60, pottery: 72, metal: 66 },
];

const movers = [
  { name: "Indigo dupatta", hindi: "नील दुपट्टा", img: textileImg, delta: 38, why: "Diwali pre-orders + Surat cotton ↓", price: "₹1,450" },
  { name: "Khurja serving bowl", hindi: "खुरजा कटोरा", img: potteryImg, delta: 24, why: "Karwa Chauth gifting cluster", price: "₹680" },
  { name: "Brass diya set", hindi: "पीतल दीया", img: metalImg, delta: 61, why: "Diwali — 3-week lead window", price: "₹920" },
  { name: "Banarasi stole", hindi: "बनारसी स्टोल", img: textileImg, delta: -8, why: "Monsoon dip, recovers in Aug", price: "₹3,200" },
  { name: "Terracotta planter", hindi: "मिट्टी गमला", img: potteryImg, delta: 14, why: "Urban balcony gardening trend", price: "₹320" },
];

const signals = [
  { tag: "Diwali · दिवाली", body: "Brass diya demand will lift +61% in 19 days. Start 40 units this week.", tone: "primary" },
  { tag: "Mandi · मंडी", body: "Cotton dropped 4.2% in Surat — best buy window for next 9 days.", tone: "forest" },
  { tag: "Export · निर्यात", body: "Moradabad metalware queries from EU buyers up 22% MoM on IndiaMart.", tone: "secondary" },
  { tag: "Risk · जोखिम", body: "Indigo dye supply tightening — Bagru reports 6-day delays. Lock 4-week stock.", tone: "destructive" },
];

const ranges = ["7D", "30D", "90D", "1Y"] as const;

/* ---------------- page ---------------- */

const Trends = () => {
  const [range, setRange] = useState<(typeof ranges)[number]>("90D");
  const [craft, setCraft] = useState<"all" | "textile" | "pottery" | "metal">("all");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid lg:grid-cols-[240px_1fr] min-h-screen">
        <Sidebar />
        <div className="flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-5 lg:p-8 space-y-8">
            <Header range={range} setRange={setRange} craft={craft} setCraft={setCraft} />
            <PulseStrip />
            <div className="grid xl:grid-cols-3 gap-6">
              <DemandChart className="xl:col-span-2" />
              <SignalsCard />
            </div>
            <div className="grid xl:grid-cols-3 gap-6">
              <PriceChart className="xl:col-span-2" />
              <ClusterShare />
            </div>
            <div className="grid xl:grid-cols-3 gap-6">
              <MoversTable className="xl:col-span-2" />
              <CraftRadar />
            </div>
            <FestivalLane />
            <footer className="pt-6 pb-4 text-xs text-muted-foreground font-data flex items-center justify-between border-t border-border">
              <span>ArtisanGPS · रुझान v0.4 · sample data · refreshed 4 min ago</span>
              <Link to="/dashboard" className="hover:text-foreground">← back to dashboard</Link>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Trends;

/* ---------------- chrome ---------------- */

const Sidebar = () => {
  const items = [
    { icon: Home, label: "Home", hindi: "घर", to: "/dashboard", active: false },
    { icon: TrendingUp, label: "Trends", hindi: "रुझान", to: "/trends", active: true },
    { icon: Store, label: "Mandi", hindi: "मंडी", to: "/dashboard", active: false },
    { icon: Package, label: "Stock", hindi: "स्टॉक", to: "/dashboard", active: false },
    { icon: ShoppingBag, label: "Orders", hindi: "ऑर्डर", to: "/dashboard", active: false },
    { icon: LineIcon, label: "Reports", hindi: "रिपोर्ट", to: "/dashboard", active: false },
    { icon: User, label: "Profile", hindi: "प्रोफ़ाइल", to: "/dashboard", active: false },
  ];
  return (
    <aside className="hidden lg:flex flex-col bg-background border-r border-border p-5 sticky top-0 h-screen">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center font-display text-lg">अ</div>
        <div>
          <div className="font-display text-lg leading-none">ArtisanGPS</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-data">बहीखाता</div>
        </div>
      </Link>
      <nav className="flex-1 space-y-1">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              it.active
                ? "bg-primary/15 text-foreground font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <it.icon size={16} />
            <span>{it.label}</span>
            <span className="font-hindi text-xs ml-auto opacity-60">{it.hindi}</span>
          </Link>
        ))}
      </nav>
      <div className="rounded-xl border border-border bg-card p-3 text-xs">
        <div className="font-display text-sm">All clusters</div>
        <div className="text-muted-foreground font-data mt-0.5">6 regions · 1,284 artisans</div>
        <button className="mt-3 text-primary font-data text-xs hover:underline">filter clusters →</button>
      </div>
    </aside>
  );
};

const Topbar = () => (
  <div className="sticky top-0 z-20 backdrop-blur bg-background/85 border-b border-border px-5 lg:px-8 py-3.5 flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 flex-1 max-w-md">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="search trends, materials, festivals…"
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary/60 placeholder:text-muted-foreground"
        />
      </div>
    </div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground font-data">
      <span className="hidden md:inline">Jaipur · 31°C</span>
      <span className="hidden md:inline w-1 h-1 rounded-full bg-border" />
      <span className="text-forest hidden md:inline">mandi open</span>
      <button className="relative w-9 h-9 rounded-lg border border-border bg-card grid place-items-center hover:border-primary/60">
        <Bell size={14} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
      </button>
      <button className="w-9 h-9 rounded-lg border border-border bg-card grid place-items-center hover:border-primary/60">
        <Settings size={14} />
      </button>
      <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground grid place-items-center font-display">र</div>
    </div>
  </div>
);

/* ---------------- header ---------------- */

const Header = ({
  range,
  setRange,
  craft,
  setCraft,
}: {
  range: (typeof ranges)[number];
  setRange: (r: (typeof ranges)[number]) => void;
  craft: "all" | "textile" | "pottery" | "metal";
  setCraft: (c: "all" | "textile" | "pottery" | "metal") => void;
}) => {
  const crafts = [
    { id: "all", label: "All crafts", hindi: "सब" },
    { id: "textile", label: "Textile", hindi: "कपड़ा" },
    { id: "pottery", label: "Pottery", hindi: "मिट्टी" },
    { id: "metal", label: "Metal", hindi: "धातु" },
  ] as const;
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-data mb-2">
            रुझान · trends ledger
          </div>
          <h1 className="font-display text-3xl lg:text-5xl leading-[1.05] tracking-tight">
            What India is buying<br />
            <span className="italic text-muted-foreground">— this week, this season.</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl">
            A read of demand, mandi prices and festival pull across 6 craft clusters.
            Updated every 30 minutes from IndiaMart, Meesho, mandi feeds & Google Trends.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-lg border border-border bg-card text-xs font-data flex items-center gap-2 hover:border-primary/60">
            <Filter size={13} /> Cluster: All
          </button>
          <button className="h-9 px-3 rounded-lg border border-border bg-card text-xs font-data flex items-center gap-2 hover:border-primary/60">
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {crafts.map((c) => (
            <button
              key={c.id}
              onClick={() => setCraft(c.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-data transition-colors ${
                craft === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label} <span className="font-hindi opacity-60">· {c.hindi}</span>
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-data transition-colors ${
                range === r ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- pulse strip ---------------- */

const PulseStrip = () => {
  const stats = [
    { label: "Demand index", hindi: "मांग सूचकांक", value: "138.4", delta: 12.6, sub: "vs last 30D" },
    { label: "Avg margin", hindi: "औसत मार्जिन", value: "34.2%", delta: 2.1, sub: "across crafts" },
    { label: "Festival lift", hindi: "त्यौहार उछाल", value: "+38%", delta: 8.0, sub: "Diwali · 19 days" },
    { label: "Mandi volatility", hindi: "मंडी अस्थिरता", value: "Low", delta: -1.4, sub: "7D σ" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const up = s.delta >= 0;
        return (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 relative overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-data flex items-center justify-between">
              <span>{s.label}</span>
              <span className="font-hindi opacity-70">{s.hindi}</span>
            </div>
            <div className="mt-2 font-display text-3xl">{s.value}</div>
            <div className={`mt-1 inline-flex items-center gap-1 text-xs font-data ${up ? "text-forest" : "text-destructive"}`}>
              {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {Math.abs(s.delta)}%
              <span className="text-muted-foreground ml-1">· {s.sub}</span>
            </div>
            <div className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full bg-primary/5 blur-2xl" />
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- demand chart ---------------- */

const DemandChart = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary font-data">Demand · मांग</div>
        <div className="font-display text-xl mt-0.5">12-month demand index by craft</div>
        <div className="text-xs text-muted-foreground mt-1">Indexed to Jan 2025 · weighted by cluster volume</div>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-data">
        <Legend2 color="hsl(var(--primary))" label="Textile" />
        <Legend2 color="hsl(var(--secondary))" label="Pottery" />
        <Legend2 color="hsl(var(--forest))" label="Metal" />
      </div>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={demandSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--forest))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(var(--forest))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="m" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="textile" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gT)" />
          <Area type="monotone" dataKey="pottery" stroke="hsl(var(--secondary))" strokeWidth={2} fill="url(#gP)" />
          <Area type="monotone" dataKey="metal" stroke="hsl(var(--forest))" strokeWidth={2} fill="url(#gM)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Legend2 = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
    {label}
  </span>
);

/* ---------------- signals ---------------- */

const SignalsCard = () => (
  <div className="rounded-2xl border border-border bg-card p-5 flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary font-data">Signals · संकेत</div>
        <div className="font-display text-xl mt-0.5">What to act on</div>
      </div>
      <Sparkles size={16} className="text-primary" />
    </div>
    <div className="space-y-3 flex-1">
      {signals.map((s) => (
        <div key={s.tag} className="rounded-xl border border-border bg-background p-3.5 hover:border-primary/40 transition-colors">
          <div className={`text-[10px] uppercase tracking-wider font-data mb-1.5 ${
            s.tone === "primary" ? "text-primary" :
            s.tone === "forest" ? "text-forest" :
            s.tone === "secondary" ? "text-secondary" : "text-destructive"
          }`}>{s.tag}</div>
          <div className="text-sm leading-relaxed">{s.body}</div>
        </div>
      ))}
    </div>
    <button className="mt-4 text-xs font-data text-primary hover:underline self-start">view all 14 signals →</button>
  </div>
);

/* ---------------- price chart ---------------- */

const PriceChart = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary font-data">Mandi · मंडी</div>
        <div className="font-display text-xl mt-0.5">Raw material prices · 7 weeks</div>
        <div className="text-xs text-muted-foreground mt-1">Median across Surat · Delhi · local mandi</div>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-data">
        <Legend2 color="hsl(var(--primary))" label="Cotton ₹/kg" />
        <Legend2 color="hsl(var(--secondary))" label="Indigo ₹/kg" />
        <Legend2 color="hsl(var(--forest))" label="Brass ₹/kg" />
      </div>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="w" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="L" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="R" orientation="right" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line yAxisId="L" type="monotone" dataKey="cotton" stroke="hsl(var(--primary))" strokeWidth={2.2} dot={{ r: 3 }} />
          <Line yAxisId="R" type="monotone" dataKey="indigo" stroke="hsl(var(--secondary))" strokeWidth={2.2} dot={{ r: 3 }} />
          <Line yAxisId="L" type="monotone" dataKey="brass" stroke="hsl(var(--forest))" strokeWidth={2.2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ---------------- cluster share ---------------- */

const ClusterShare = () => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <div className="text-[10px] uppercase tracking-wider text-primary font-data">Clusters · समूह</div>
    <div className="font-display text-xl mt-0.5 mb-4">Share of demand</div>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={clusterShare} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="cluster" type="category" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted))" }}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="share" radius={[0, 6, 6, 0]} label={{ position: "right", fill: "hsl(var(--muted-foreground))", fontSize: 11, formatter: (v: number) => `${v}%` }}>
            {clusterShare.map((c, i) => (
              <Cell key={i} fill={c.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ---------------- movers table ---------------- */

const MoversTable = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card overflow-hidden ${className}`}>
    <div className="p-5 border-b border-border flex items-center justify-between">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary font-data">Movers · चलने वाले</div>
        <div className="font-display text-xl mt-0.5">Top movers this week</div>
      </div>
      <button className="text-xs font-data text-muted-foreground hover:text-foreground">all SKUs →</button>
    </div>
    <div className="divide-y divide-border">
      {movers.map((m) => {
        const up = m.delta >= 0;
        return (
          <div key={m.name} className="p-4 flex items-center gap-4 hover:bg-background/40 transition-colors">
            <img src={m.img} alt={m.name} className="w-12 h-12 rounded-lg object-cover border border-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-medium text-sm truncate">{m.name}</div>
                <div className="font-hindi text-xs text-muted-foreground truncate">· {m.hindi}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">{m.why}</div>
            </div>
            <div className="text-right">
              <div className="font-data text-sm">{m.price}</div>
              <div className={`inline-flex items-center gap-1 text-xs font-data ${up ? "text-forest" : "text-destructive"}`}>
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {Math.abs(m.delta)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/* ---------------- radar ---------------- */

const CraftRadar = () => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <div className="text-[10px] uppercase tracking-wider text-primary font-data">Craft fit · तुलना</div>
    <div className="font-display text-xl mt-0.5 mb-2">Craft scorecard</div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} outerRadius="75%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Radar name="Textile" dataKey="textile" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
          <Radar name="Pottery" dataKey="pottery" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.25} />
          <Radar name="Metal" dataKey="metal" stroke="hsl(var(--forest))" fill="hsl(var(--forest))" fillOpacity={0.25} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ---------------- festival lane ---------------- */

const festivals = [
  { name: "Raksha Bandhan", hindi: "रक्षा बंधन", date: "Aug 9", lift: 22, crafts: ["Textile", "Metal"], days: 4 },
  { name: "Onam", hindi: "ओणम", date: "Sep 5", lift: 18, crafts: ["Textile"], days: 31 },
  { name: "Karwa Chauth", hindi: "करवा चौथ", date: "Oct 10", lift: 27, crafts: ["Pottery", "Metal"], days: 66 },
  { name: "Diwali", hindi: "दीपावली", date: "Oct 29", lift: 61, crafts: ["Pottery", "Metal", "Textile"], days: 85 },
  { name: "Christmas", hindi: "क्रिसमस", date: "Dec 25", lift: 14, crafts: ["Metal"], days: 142 },
];

const FestivalLane = () => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary font-data flex items-center gap-1.5">
          <Flame size={12} /> Festival lane · त्यौहार
        </div>
        <div className="font-display text-xl mt-0.5">Demand lift forecast · next 6 months</div>
      </div>
      <button className="text-xs font-data text-muted-foreground hover:text-foreground">full calendar →</button>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {festivals.map((f) => (
        <div key={f.name} className="rounded-xl border border-border bg-background p-4 relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-data">{f.date}</div>
          <div className="font-display text-lg mt-1 leading-tight">{f.name}</div>
          <div className="font-hindi text-xs text-muted-foreground">{f.hindi}</div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-2xl text-primary">+{f.lift}%</span>
            <span className="text-[10px] text-muted-foreground font-data">lift</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {f.crafts.map((c) => (
              <span key={c} className="text-[10px] font-data px-1.5 py-0.5 rounded border border-border text-muted-foreground">{c}</span>
            ))}
          </div>
          <div className="text-[10px] text-muted-foreground font-data mt-3">{f.days} days away</div>
          <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
        </div>
      ))}
    </div>
  </div>
);
