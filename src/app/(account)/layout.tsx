import type { ReactNode } from "react";
import { MainFooter } from "@/components/layout/main-footer";
import { MainHeader } from "@/components/layout/main-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PanelShell } from "@/components/layout/panel-shell";
import { NotificationBell } from "@/components/layout/notification-bell";

type Props = {
  children: ReactNode;
};

export default function AccountLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <MainHeader />
      <div className="pb-24 lg:pb-0">
        <PanelShell
          sideTitle="My Account"
          nav={null}
          headerEyebrow="My Account"
          headerTitle="Profile, orders, wishlist, and account activity"
          hideSidebar
          headerAction={
            <NotificationBell
              title="My Notifications"
              notificationsEndpoint="/api/account/notifications"
              realtimeStreamEndpoint="/api/account/notifications/stream"
              notificationUpdateBasePath="/api/account/notifications"
              markAllEndpoint="/api/account/notifications/read-all"
              viewAllHref="/account/notifications"
              emptyMessage="No personal notifications right now."
              quickPushToggleEndpoint="/api/account/settings/notifications"
              settingsHref="/account/settings"
            />
          }
        >
          {children}
        </PanelShell>
      </div>
      <MainFooter />
      <MobileBottomNav />
    </div>
  );
}
