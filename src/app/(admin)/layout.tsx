import type { ReactNode } from "react";
import { adminNavItems } from "@/lib/constants/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/auth/logout-button";
import { MainHeader } from "@/components/layout/main-header";
import { PanelShell } from "@/components/layout/panel-shell";
import { NotificationBell } from "@/components/layout/notification-bell";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(220,38,38,0.2),transparent_28%),radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.18),transparent_36%),#05070e]">
      <MainHeader />
      <PanelShell
        sideTitle="Admin Panel"
        nav={<AdminNav items={adminNavItems} />}
        headerEyebrow="Control Center"
        headerTitle="Admin workspace quick access"
        asideClassName="border-red-500/20 bg-slate-950/80 text-slate-100 shadow-[0_20px_60px_-35px_rgba(220,38,38,0.6)]"
        headerClassName="border-red-500/20 bg-slate-950/70 text-slate-100"
        contentClassName="text-slate-100"
        containerClassName="container-app py-6"
        headerAction={
          <div className="flex items-center gap-2">
            <NotificationBell
              title="Admin Notifications"
              notificationsEndpoint="/api/admin/notifications"
              realtimeStreamEndpoint="/api/admin/notifications/stream"
              notificationUpdateBasePath="/api/admin/notifications"
              markAllEndpoint="/api/admin/notifications/read-all"
              viewAllHref="/admin/notifications"
              emptyMessage="No admin alerts right now."
            />
            <LogoutButton variant="danger" />
          </div>
        }
        sidebarClassName="lg:grid-cols-[250px_1fr]"
      >
        {children}
      </PanelShell>
    </div>
  );
}
