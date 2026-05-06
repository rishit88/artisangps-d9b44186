import { useState } from "react";
import { Plus, Search, Filter, AlertTriangle, Package, CheckCircle2 } from "lucide-react";
import AppShell from "@/components/site/AppShell";
import textileImg from "@/assets/craft-textile.jpg";
import potteryImg from "@/assets/craft-pottery.jpg";
import metalImg from "@/assets/craft-metal.jpg";

const items = [
  { sku: "DUP-IND-018", name: "Indigo dupatta", hindi: "नील दुपट्टा", img: textileImg, qty: 12, low: 8, price: 1450, sold: 34, status: "Listed" },
  { sku: "POT-KHU-042", name: "Khurja serving bowl", hindi: "खुरजा कटोरा", img: potteryImg, qty: 4, low: 6, price: 680, sold: 22, status: "Low" },
  { sku: "BRS-DIY-011", name: "Brass diya set of 4", hindi: "पीतल दीया", img: metalImg, qty: 28, low: 10, price: 920, sold: 41, status: "Listed" },
  { sku: "TEX-BAN-007", name: "Banarasi silk stole", hindi: "बनारसी स्टोल", img: textileImg, qty: 0, low: 5, price: 3200, sold: 18, status: "Out" },
  { sku: "POT-TER-019", name: "Terracotta planter (m)", hindi: "मिट्टी गमला", img: potteryImg, qty: 17, low: 8, price: 320, sold: 56, status: "Listed" },
  { sku: "BRS-URL-003", name: "Brass urli bowl", hindi: "पीतल उरली", img: metalImg, qty: 6, low: 4, price: 1850, sold: 12, status: "Listed" },
  { sku: "TEX-IKT-022", name: "Pochampally ikat scarf", hindi: "इकत स्कार्फ़", img: textileImg, qty: 2, low: 5, price: 1120, sold: 28, status: "Low" },
];

const Stock = () => {
  const [q, setQ] = useState("");
  const filtered = items.filter((i) => (i.name + i.sku + i.hindi).toLowerCase().includes(q.toLowerCase()));
  const total = items.reduce((s, i) => s + i.qty, 0);
  const lowCount = items.filter((i) => i.status === "Low" || i.status === "Out").length;

  return (
    <AppShell title="Stock Ledger · बहीखाता" hindi="माल भण्डार" subtitle="Every SKU, every thread, every clay pot — counted in plain Hindi and English.">
      {/* KPI strip */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { i: Package, l: "Total units", v: total, sub: "across 7 SKUs" },
          { i: CheckCircle2, l: "Listed online", v: 5, sub: "Etsy · Amazon · Insta" },
          { i: AlertTriangle, l: "Low / out", v: lowCount, sub: "needs reorder" },
          { i: Package, l: "Tied capital", v: "₹54,820", sub: "at cost" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] uppercase tracking-[0.2em] font-data">{k.l}</span>
              <k.i size={14} />
            </div>
            <div className="font-display text-3xl mt-3">{k.v}</div>
            <div className="text-xs text-muted-foreground font-data mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-card flex-1 min-w-[240px] max-w-md">
          <Search size={14} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search SKU, name, hindi…" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-full border border-border hover:bg-card"><Filter size={12} /> All crafts</button>
        <button className="ml-auto flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"><Plus size={14} /> Add SKU</button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((it) => {
          const pct = Math.min(100, (it.qty / Math.max(it.low * 2, 1)) * 100);
          return (
            <div key={it.sku} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-paper transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <img src={it.img} alt={it.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-data backdrop-blur ${
                    it.status === "Listed" ? "bg-forest/85 text-forest-foreground" :
                    it.status === "Low" ? "bg-accent/85 text-accent-foreground" :
                    "bg-destructive/85 text-destructive-foreground"
                  }`}>{it.status}</span>
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-data text-white/90 bg-black/30 backdrop-blur px-2 py-0.5 rounded">{it.sku}</div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="font-display text-lg leading-tight">{it.name}</div>
                    <div className="text-xs font-hindi text-muted-foreground mt-0.5">{it.hindi}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-data text-lg">₹{it.price.toLocaleString("en-IN")}</div>
                    <div className="text-[10px] text-muted-foreground font-data">unit</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-data text-muted-foreground mb-1.5">
                    <span>Stock · {it.qty} units</span>
                    <span>min {it.low}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 50 ? "bg-forest" : pct > 25 ? "bg-primary" : "bg-destructive"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-data">
                  <span>Sold this month · {it.sold}</span>
                  <button className="text-foreground hover:text-primary">Edit →</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
};

export default Stock;
