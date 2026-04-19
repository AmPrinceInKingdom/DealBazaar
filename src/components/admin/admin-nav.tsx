"use client";

import { type ComponentType, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgePercent,
  Bell,
  Boxes,
  Database,
  FileStack,
  Grid3X3,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessageSquareText,
  Package,
  Receipt,
  Settings,
  ShieldCheck,
  Star,
  Store,
  Tags,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { subscribeAdminNotificationsUpdated } from "@/lib/events/admin-notification-events";
import type { NavItem } from "@/lib/constants/navigation";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type NotificationsSummaryResponse = {
  summary: {
    unreadCount: number;
  };
};

type Props = {
  items: NavItem[];
};

type SidebarLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const spotlightLinks: SidebarLink[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: Receipt },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: LineChart },
  { label: "Messages", href: "/admin/notifications", icon: MessageSquareText },
  { label: "Marketing", href: "/admin/banners", icon: Megaphone },
  { label: "Discounts", href: "/admin/coupons", icon: BadgePercent },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const moduleIconMap: Record<string, SidebarLink["icon"]> = {
  Dashboard: LayoutDashboard,
  Banners: Megaphone,
  Products: Package,
  Categories: Grid3X3,
  Brands: Tags,
  Orders: Receipt,
  Payments: WalletCards,
  "Payment Gateway": ShieldCheck,
  "Auth Diagnostics": ShieldCheck,
  "DB Export": Database,
  Payouts: WalletCards,
  Users: Users,
  Sellers: Store,
  Coupons: BadgePercent,
  Reviews: Star,
  Inventory: Boxes,
  Notifications: Bell,
  Analytics: LineChart,
  Settings: Settings,
};

function formatUnreadCount(value: number) {
  if (value > 99) return "99+";
  return String(value);
}

export function AdminNav({ items }: Props) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationHref = useMemo(() => "/admin/notifications", []);
  const spotlightHrefSet = useMemo(
    () => new Set(spotlightLinks.map((item) => `${item.label}::${item.href}`)),
    [],
  );

  const moduleItems = useMemo(
    () => items.filter((item) => !spotlightHrefSet.has(`${item.label}::${item.href}`)),
    [items, spotlightHrefSet],
  );

  useEffect(() => {
    let isActive = true;

    const loadUnreadCount = async () => {
      try {
        const response = await fetch("/api/admin/notifications?read=unread", {
          cache: "no-store",
        });
        const payload = (await response.json()) as ApiEnvelope<NotificationsSummaryResponse>;
        if (!isActive || !response.ok || !payload.success || !payload.data) return;
        setUnreadCount(payload.data.summary.unreadCount);
      } catch {
        // Keep silent here to avoid disrupting nav experience on transient failures.
      }
    };

    void loadUnreadCount();
    const interval = window.setInterval(() => {
      void loadUnreadCount();
    }, 30000);

    const unsubscribe = subscribeAdminNotificationsUpdated((detail) => {
      if (typeof detail.unreadCount === "number") {
        setUnreadCount(detail.unreadCount);
        return;
      }
      void loadUnreadCount();
    });

    return () => {
      isActive = false;
      unsubscribe();
      window.clearInterval(interval);
    };
  }, []);

  const isActivePath = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));

  const renderUnreadBadge = (href: string) => {
    if (href !== notificationHref || unreadCount <= 0) return null;
    return (
      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
        {formatUnreadCount(unreadCount)}
      </span>
    );
  };

  return (
    <nav className="space-y-4">
      <section className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/15 via-transparent to-transparent p-3">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Admin Control</p>
        <p className="mt-1 text-sm font-semibold">DealBazaar Workspace</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Orders, marketing, customers, and operations in one panel.
        </p>
        <Link
          href="/admin/products"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          + Create Product
        </Link>
      </section>

      <section className="space-y-1">
        {spotlightLinks.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.href);
          return (
            <Link
              key={`spotlight-${item.label}`}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-white/5 bg-slate-900/60 text-slate-200 hover:border-red-400/30 hover:bg-slate-900",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {item.label === "Messages" ? renderUnreadBadge(item.href) : null}
            </Link>
          );
        })}
      </section>

      <section className="space-y-1 rounded-2xl border border-white/10 bg-black/20 p-2">
        <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          All Modules
        </p>
        {moduleItems.map((item) => {
          const Icon = moduleIconMap[item.label] ?? FileStack;
          const isActive = isActivePath(item.href);
          return (
            <Link
              key={`module-${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition",
                isActive
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {renderUnreadBadge(item.href)}
            </Link>
          );
        })}
      </section>

      <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Operations Snapshot</p>
        <p className="mt-1">
          Keep track of orders, payment verifications, and inventory updates in real time.
        </p>
        <div className="mt-2 flex items-center gap-1 text-red-400">
          <Truck className="h-3.5 w-3.5" />
          Live logistics + support queue
        </div>
      </section>
    </nav>
  );
}
