import { Truck, Package, CheckCircle2, Clock, Globe, MapPin } from "lucide-react";
import AppShell from "@/components/site/AppShell";

const orders = [
  { id: "AGP-1042", buyer: "Anika Sharma", city: "Mumbai", item: "Indigo dupatta ×2", value: 2900, status: "shipped", channel: "Etsy", days: 1 },
  { id: "AGP-1041", buyer: "Karuna Crafts Studio", city: "Bengaluru", item: "Khurja bowl ×6", value: 4080, status: "packed", channel: "WhatsApp", days: 0 },
  { id: "AGP-1040", buyer: "Maison Lila", city: "Paris, FR", item: "Banarasi stole ×1", value: 3200, status: "new", channel: "Etsy", days: 0 },
  { id: "AGP-1039", buyer: "Surya Devi", city: "Jaipur", item: "Brass diya set ×4", value: 3680, status: "delivered", channel: "Amazon", days: 4 },
  { id: "AGP-1038", buyer: "Hema Patel", city: "Ahmedabad", item: "Terracotta planter ×3", value: 960, status: "shipped", channel: "Instagram", days: 2 },
  { id: "AGP-1037", buyer: "Roopa Atelier", city: "Delhi", item: "Pochampally scarf ×1", value: 1120, status: "delivered", channel: "Etsy", days: 6 },
];

const tone: Record<string, string> = {
  new: "bg-primary/15 text-primary",
  packed: "bg-secondary/15 text-secondary",
  shipped: "bg-accent/15 text-accent",
  delivered: "bg-forest/15 text-forest",
};

const Orders = () => {
  return (
    <AppShell title="Orders · ऑर्डर" hindi="आर्डर बही" subtitle="Every order across Etsy, Amazon, Instagram and WhatsApp — one ledger, one truth.">
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { i: Clock, l: "New today", v: 3, hindi: "आज नए" },
          { i: Package, l: "To pack", v: 5, hindi: "पैक करना" },
          { i: Truck, l: "In transit", v: 8, hindi: "रास्ते में" },
          { i: CheckCircle2, l: "Delivered (mo)", v: 47, hindi: "पहुँचे" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] uppercase tracking-[0.2em] font-data">{k.l}</span>
              <k.i size={14} />
            </div>
            <div className="font-display text-3xl mt-3">{k.v}</div>
            <div className="text-xs font-hindi text-muted-foreground mt-1">{k.hindi}</div>
          </div>
        ))}
      </div>

      {/* Channel split */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <div className="font-display text-xl">Channel split · this month</div>
            <div className="text-xs text-muted-foreground font-hindi">किस मंच से कितने आर्डर</div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-data">May 2026</div>
        </div>
        <div className="space-y-3">
          {[
            { name: "Etsy", pct: 42, color: "bg-primary" },
            { name: "Amazon Karigar", pct: 26, color: "bg-secondary" },
            { name: "Instagram DM", pct: 19, color: "bg-accent" },
            { name: "WhatsApp", pct: 13, color: "bg-forest" },
          ].map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs font-data mb-1">
                <span>{c.name}</span><span className="text-muted-foreground">{c.pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${c.color}`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order ledger */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-baseline justify-between">
          <div className="font-display text-xl">Recent orders</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-data">last 7 days</div>
        </div>
        <div className="divide-y divide-border">
          {orders.map((o) => (
            <div key={o.id} className="px-5 py-4 grid grid-cols-12 gap-4 items-center hover:bg-background-deep/40 transition-colors">
              <div className="col-span-12 sm:col-span-2">
                <div className="font-data text-sm">{o.id}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-data flex items-center gap-1 mt-0.5">
                  <Globe size={10} /> {o.channel}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <div className="text-sm">{o.buyer}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={10} /> {o.city}</div>
              </div>
              <div className="col-span-6 sm:col-span-3 text-sm text-foreground/85">{o.item}</div>
              <div className="col-span-3 sm:col-span-2 text-right font-data">₹{o.value.toLocaleString("en-IN")}</div>
              <div className="col-span-3 sm:col-span-1 text-right">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-data ${tone[o.status]}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default Orders;
