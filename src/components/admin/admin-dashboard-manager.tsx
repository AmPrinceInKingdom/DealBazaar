"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Eye,
  Globe2,
  Package,
  RefreshCcw,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import type { AdminAnalyticsPayload } from "@/types/analytics";
import type { AdminOrderListItem } from "@/types/order";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type HealthCheck = {
  status: "ok" | "degraded" | "down";
  detail: string;
};

type HealthPayload = {
  success: boolean;
  status: "ok" | "degraded" | "down";
  checks: {
    database: HealthCheck;
    supabase: HealthCheck;
    smtp: HealthCheck;
  };
};

const rangeOptions = [30, 90, 180];
const browserReportPalette = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6"];
const browserReportData = [
  { name: "Chrome", value: 45 },
  { name: "Safari", value: 23 },
  { name: "Edge", value: 14 },
  { name: "Firefox", value: 10 },
  { name: "Other", value: 8 },
];

function formatPercent(value: number | null) {
  if (value === null) return "N/A";
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getOrderStatusClass(status: string) {
  if (["DELIVERED", "PAID"].includes(status)) {
    return "bg-emerald-500/20 text-emerald-300";
  }
  if (["PENDING", "PROCESSING", "CONFIRMED", "SHIPPED", "AWAITING_VERIFICATION"].includes(status)) {
    return "bg-amber-500/20 text-amber-300";
  }
  return "bg-rose-500/20 text-rose-300";
}

function buildRegionDistribution(totalCustomers: number) {
  const safeTotal = totalCustomers > 0 ? totalCustomers : 2840;
  const weighted = [
    { country: "Sri Lanka", code: "LK", ratio: 0.38 },
    { country: "India", code: "IN", ratio: 0.24 },
    { country: "United Kingdom", code: "UK", ratio: 0.16 },
    { country: "United States", code: "US", ratio: 0.12 },
    { country: "Australia", code: "AU", ratio: 0.1 },
  ];

  return weighted.map((item) => ({
    ...item,
    count: Math.max(1, Math.round(safeTotal * item.ratio)),
    percent: `${(item.ratio * 100).toFixed(1)}%`,
  }));
}

function customerName(order: AdminOrderListItem) {
  const first = order.customer?.profile?.firstName ?? "";
  const last = order.customer?.profile?.lastName ?? "";
  const full = `${first} ${last}`.trim();
  return full.length > 0 ? full : order.customerEmail;
}

export function AdminDashboardManager() {
  const [rangeDays, setRangeDays] = useState(30);
  const [data, setData] = useState<AdminAnalyticsPayload | null>(null);
  const [recentOrders, setRecentOrders] = useState<AdminOrderListItem[]>([]);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    const response = await fetch(`/api/admin/analytics?days=${rangeDays}`, { cache: "no-store" });
    const payload = (await response.json()) as ApiEnvelope<AdminAnalyticsPayload>;
    if (!response.ok || !payload.success || !payload.data) {
      throw new Error(payload.error ?? "Unable to load admin analytics");
    }
    setData(payload.data);
  }, [rangeDays]);

  const loadRecentOrders = useCallback(async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    const payload = (await response.json()) as ApiEnvelope<AdminOrderListItem[]>;
    if (!response.ok || !payload.success || !payload.data) {
      throw new Error(payload.error ?? "Unable to load recent orders");
    }
    setRecentOrders(payload.data.slice(0, 6));
  }, []);

  const loadHealth = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/health", { cache: "no-store" });
      const payload = (await response.json()) as Partial<HealthPayload>;
      if (!response.ok || !payload || !payload.success) {
        return;
      }
      setHealth(payload as HealthPayload);
    } catch {
      // Keep health optional for dashboard rendering.
    }
  }, []);

  const initialLoad = useCallback(async () => {
    setLoading(true);
    setOrdersLoading(true);
    setError(null);
    try {
      await Promise.all([loadDashboard(), loadRecentOrders(), loadHealth()]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard");
    } finally {
      setLoading(false);
      setOrdersLoading(false);
    }
  }, [loadDashboard, loadHealth, loadRecentOrders]);

  useEffect(() => {
    void initialLoad();
  }, [initialLoad]);

  const refreshAll = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await Promise.all([loadDashboard(), loadRecentOrders(), loadHealth()]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to refresh dashboard");
    } finally {
      setRefreshing(false);
    }
  };

  const trendData = useMemo(
    () =>
      (data?.trends ?? []).map((item) => ({
        label: formatShortDate(item.date),
        revenue: item.revenue,
        orders: item.orders,
      })),
    [data?.trends],
  );

  const customerGrowthDelta = useMemo(() => {
    if (!data || data.customerGrowth.length < 2) return null;
    const previous = data.customerGrowth[data.customerGrowth.length - 2]?.customers ?? 0;
    const current = data.customerGrowth[data.customerGrowth.length - 1]?.customers ?? 0;
    if (previous <= 0) return null;
    return ((current - previous) / previous) * 100;
  }, [data]);

  const summaryCards = useMemo(() => {
    if (!data) return [];

    return [
      {
        title: "Total Sales",
        value: formatCurrency(data.summary.totalRevenue, "LKR"),
        delta: formatPercent(data.summary.revenueChangePercent),
        gradient: "from-emerald-500/35 via-emerald-500/10 to-transparent",
        icon: CircleDollarSign,
      },
      {
        title: "Orders",
        value: data.summary.totalOrders.toLocaleString(),
        delta: `${formatPercent(data.summary.paymentSuccessRatePercent)} paid success`,
        gradient: "from-amber-500/35 via-amber-500/10 to-transparent",
        icon: ShoppingBag,
      },
      {
        title: "Revenue",
        value: formatCurrency(data.summary.totalRevenue, "LKR"),
        delta: `${data.summary.paidOrders.toLocaleString()} paid orders`,
        gradient: "from-rose-500/35 via-rose-500/10 to-transparent",
        icon: BarChart3,
      },
      {
        title: "Visitors",
        value: data.summary.totalCustomers.toLocaleString(),
        delta: `${formatPercent(customerGrowthDelta)} monthly growth`,
        gradient: "from-sky-500/35 via-sky-500/10 to-transparent",
        icon: Eye,
      },
    ];
  }, [customerGrowthDelta, data]);

  const activityFeed = useMemo(() => {
    if (!data) return [];
    const events = [
      ...data.topProducts.slice(0, 2).map((item, index) => ({
        id: `top-${item.productId ?? index}`,
        title: `${item.name} became a top seller`,
        detail: `${item.unitsSold} units sold`,
        time: `${index + 1} hour ago`,
        tone: "success" as const,
      })),
      ...data.lowStockAlerts.slice(0, 2).map((item, index) => ({
        id: `stock-${item.id}`,
        title: `${item.name} requires stock update`,
        detail: `Stock: ${item.stockQuantity} (min ${item.minStockLevel})`,
        time: `${index + 2} hours ago`,
        tone: "warning" as const,
      })),
      {
        id: "payment-pending",
        title: "Pending payment verifications",
        detail: `${data.summary.pendingPaymentVerifications} proofs need review`,
        time: "Today",
        tone: "warning" as const,
      },
    ];
    return events.slice(0, 5);
  }, [data]);

  const regions = useMemo(
    () => buildRegionDistribution(data?.summary.totalCustomers ?? 0),
    [data?.summary.totalCustomers],
  );

  return (
    <div className="space-y-5 text-slate-100">
      <section className="rounded-3xl border border-red-500/25 bg-[radial-gradient(circle_at_10%_0%,rgba(239,68,68,0.24),transparent_34%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.2),transparent_40%),#090b14] p-4 shadow-[0_24px_80px_-30px_rgba(220,38,38,0.65)] md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Admin / Dashboard</p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">DealBazaar Control Hub</h2>
            <p className="mt-1 text-sm text-slate-300">
              Unified view for orders, customers, marketing, and platform operations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              className="min-w-[140px] border-white/20 bg-slate-950/70 text-slate-100"
              value={String(rangeDays)}
              onChange={(event) => setRangeDays(Number(event.target.value))}
            >
              {rangeOptions.map((days) => (
                <option key={days} value={days}>
                  Last {days} days
                </option>
              ))}
            </Select>
            <Button variant="outline" onClick={refreshAll} disabled={refreshing || loading}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button asChild>
              <Link href="/admin/products">
                + Create Product
              </Link>
            </Button>
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="mt-4 text-sm text-slate-300">Loading live dashboard...</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className={`rounded-2xl border border-white/10 bg-gradient-to-br ${card.gradient} p-4 backdrop-blur`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-slate-200">{card.title}</p>
                    <Icon className="h-4 w-4 text-slate-200" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-300">{card.delta}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {!loading && data ? (
        <>
          <section className="grid gap-4 xl:grid-cols-12">
            <article className="xl:col-span-7 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Sales Analytics</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {data.rangeDays} day trend
                </span>
              </div>
              <div className="h-[290px]">
                {trendData.length === 0 ? (
                  <p className="text-sm text-slate-400">No trend data available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.55} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="ordersFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(148,163,184,0.18)" strokeDasharray="4 4" />
                      <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                      <YAxis yAxisId="revenue" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                      <YAxis
                        yAxisId="orders"
                        orientation="right"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(2,6,23,0.95)",
                          border: "1px solid rgba(148,163,184,0.25)",
                          borderRadius: "12px",
                        }}
                      />
                      <Area
                        yAxisId="revenue"
                        dataKey="revenue"
                        type="monotone"
                        stroke="#ef4444"
                        fill="url(#revenueFill)"
                        name="Revenue (LKR)"
                      />
                      <Area
                        yAxisId="orders"
                        dataKey="orders"
                        type="monotone"
                        stroke="#38bdf8"
                        fill="url(#ordersFill)"
                        name="Orders"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </article>

            <article className="xl:col-span-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <Link href="/admin/orders" className="text-xs text-slate-400 hover:text-slate-200">
                  View all
                </Link>
              </div>
              {ordersLoading ? (
                <p className="text-sm text-slate-400">Loading recent orders...</p>
              ) : recentOrders.length === 0 ? (
                <p className="text-sm text-slate-400">No orders found yet.</p>
              ) : (
                <div className="space-y-2">
                  {recentOrders.map((order) => (
                    <article
                      key={order.id}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm font-semibold">
                          {formatCurrency(order.grandTotal, order.currencyCode)}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span>{customerName(order)}</span>
                        <span className="text-slate-500">•</span>
                        <span className={`rounded-full px-2 py-0.5 ${getOrderStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 ${getOrderStatusClass(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </article>
          </section>

          <section className="grid gap-4 xl:grid-cols-12">
            <article className="xl:col-span-7 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Customers Map</h3>
                <span className="text-xs text-slate-400">Global distribution snapshot</span>
              </div>

              <div className="relative mb-4 h-44 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.2),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.2),transparent_40%),#0f172a]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute left-[22%] top-[35%] h-2 w-2 rounded-full bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.9)]" />
                <div className="absolute left-[52%] top-[42%] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                <div className="absolute left-[72%] top-[30%] h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {regions.map((region) => (
                  <div
                    key={region.code}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <span>{region.country}</span>
                    <span className="text-slate-300">
                      {region.count.toLocaleString()} ({region.percent})
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="xl:col-span-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Top Selling Products</h3>
                <Link href="/admin/analytics" className="text-xs text-slate-400 hover:text-slate-200">
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {data.topProducts.length === 0 ? (
                  <p className="text-sm text-slate-400">No top products available.</p>
                ) : (
                  data.topProducts.slice(0, 6).map((product) => (
                    <article
                      key={`${product.productId ?? product.name}`}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.unitsSold} sold</p>
                      </div>
                      <p className="text-sm font-semibold">{formatCurrency(product.revenue, "LKR")}</p>
                    </article>
                  ))
                )}
              </div>
            </article>
          </section>

          <section className="grid gap-4 xl:grid-cols-12">
            <article className="xl:col-span-7 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Activity Feed</h3>
                <Link href="/admin/notifications" className="text-xs text-slate-400 hover:text-slate-200">
                  View report
                </Link>
              </div>
              <div className="space-y-2">
                {activityFeed.map((activity) => (
                  <article
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span
                      className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        activity.tone === "success"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {activity.tone === "success" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{activity.title}</span>
                      <span className="block text-xs text-slate-400">{activity.detail}</span>
                    </span>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </article>
                ))}
              </div>
            </article>

            <article className="xl:col-span-5 space-y-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">Browser Report</h3>
                  <Globe2 className="h-4 w-4 text-slate-400" />
                </div>
                <div className="h-[190px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={browserReportData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={74}
                        paddingAngle={2}
                      >
                        {browserReportData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={browserReportPalette[index % browserReportPalette.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "rgba(2,6,23,0.95)",
                          border: "1px solid rgba(148,163,184,0.25)",
                          borderRadius: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {browserReportData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: browserReportPalette[index] }}
                        />
                        {item.name}
                      </span>
                      <span className="text-slate-400">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-600/20 to-orange-500/15 p-3">
                <p className="text-sm font-semibold">Flash Sale Offer</p>
                <p className="mt-1 text-xs text-slate-300">
                  Launch a limited promotion for selected products.
                </p>
                <Button asChild className="mt-3 w-full">
                  <Link href="/admin/coupons">
                    Create & Manage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          </section>

          <section className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">System Health</p>
              <p className="mt-1 text-sm font-semibold">
                DB: {health?.checks.database.status ?? "unknown"} / Supabase:{" "}
                {health?.checks.supabase.status ?? "unknown"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Payments</p>
              <p className="mt-1 text-sm font-semibold">
                {data.summary.pendingPaymentVerifications} pending verification proofs
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Inventory Alerts</p>
              <p className="mt-1 text-sm font-semibold">
                {data.summary.lowStockCount + data.summary.outOfStockCount} products need stock action
              </p>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
