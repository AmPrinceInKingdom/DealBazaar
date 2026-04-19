import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  sideTitle: string;
  nav: ReactNode;
  headerEyebrow: string;
  headerTitle: string;
  headerAction?: ReactNode;
  sidebarClassName?: string;
  containerClassName?: string;
  hideSidebarOnMobile?: boolean;
  hideSidebar?: boolean;
  asideClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
};

export function PanelShell({
  children,
  sideTitle,
  nav,
  headerEyebrow,
  headerTitle,
  headerAction,
  sidebarClassName = "lg:grid-cols-[240px_1fr]",
  containerClassName = "container-app py-6",
  hideSidebarOnMobile = false,
  hideSidebar = false,
  asideClassName,
  contentClassName,
  headerClassName,
}: Props) {
  const sidebarVisibilityClass = hideSidebar
    ? "hidden"
    : hideSidebarOnMobile
      ? "hidden lg:block"
      : "block";
  const gridClass = hideSidebar ? "grid-cols-1" : sidebarClassName;

  return (
    <div className={containerClassName}>
      <div className={`grid gap-6 ${gridClass}`}>
        <aside
          className={cn(
            sidebarVisibilityClass,
            "rounded-2xl border border-border bg-card p-4",
            asideClassName,
          )}
        >
          <p className="mb-3 text-sm font-semibold">{sideTitle}</p>
          {nav}
        </aside>
        <section className={cn("space-y-4", contentClassName)}>
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3",
              headerClassName,
            )}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {headerEyebrow}
              </p>
              <p className="text-sm font-semibold">{headerTitle}</p>
            </div>
            {headerAction ?? null}
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
