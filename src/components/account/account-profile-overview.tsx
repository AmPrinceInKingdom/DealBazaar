import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Heart,
  Home,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  UserRound,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AccountProfileOverviewData } from "@/lib/services/account-profile-overview-service";

type Props = {
  data: AccountProfileOverviewData;
};

type OptionCard = {
  label: string;
  description: string;
  href: string;
  icon: typeof ShoppingBag;
};

const optionCards: OptionCard[] = [
  {
    label: "Dashboard",
    description: "Open your account overview",
    href: "/account",
    icon: Home,
  },
  {
    label: "My Orders",
    description: "Track and manage your orders",
    href: "/account/orders",
    icon: ShoppingBag,
  },
  {
    label: "Saved Items",
    description: "View your wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Payment Methods",
    description: "Manage payment options",
    href: "/account/settings#checkout-preferences",
    icon: WalletCards,
  },
  {
    label: "Addresses",
    description: "Manage delivery locations",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Recently Viewed",
    description: "Open products you checked before",
    href: "/account/recently-viewed",
    icon: Package,
  },
  {
    label: "Reviews",
    description: "Manage your submitted reviews",
    href: "/account/reviews",
    icon: Star,
  },
  {
    label: "Notifications",
    description: "Check order and account alerts",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    label: "Account Settings",
    description: "Update profile and preferences",
    href: "/account/profile/edit",
    icon: UserRound,
  },
];

export function AccountProfileOverview({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card px-4 py-4 sm:px-5">
        <p className="text-xs text-muted-foreground">Home / Account / Profile</p>
        <h1 className="mt-2 text-2xl font-bold">Profile Overview</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Manage your personal details, orders, wishlist, and account activity from one place.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-lg font-semibold text-white">
              {data.profile.fullName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase() || "DB"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{data.profile.fullName}</h2>
              <p className="text-sm text-muted-foreground">{data.profile.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {data.profile.isVerified ? "Verified Customer" : "Customer"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Member since {data.profile.memberSince}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.canOpenSellerDashboard ? (
              <Button variant="outline" asChild>
                <Link href="/seller/dashboard">
                  <Store className="mr-2 h-4 w-4" />
                  Seller Dashboard
                </Link>
              </Button>
            ) : null}
            <Button asChild>
              <Link href="/account/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {data.profile.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {data.profile.phone ?? "Phone not added"}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {data.address ? `${data.address.city}, ${data.address.countryName}` : "Address not added"}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Account Stats</h3>
          <Link
            href="/account/orders"
            className="text-sm font-medium text-red-600 transition hover:text-red-500 dark:text-red-400"
          >
            View All Activity
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="mt-1 text-3xl font-bold">{data.stats.totalOrders}</p>
            <Link href="/account/orders" className="mt-2 inline-flex items-center text-xs text-muted-foreground">
              View your orders
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </article>

          <article className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Wishlist Items</p>
            <p className="mt-1 text-3xl font-bold">{data.stats.wishlistItems}</p>
            <Link href="/wishlist" className="mt-2 inline-flex items-center text-xs text-muted-foreground">
              View wishlist
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </article>

          <article className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Reviews</p>
            <p className="mt-1 text-3xl font-bold">{data.stats.reviews}</p>
            <Link href="/account/reviews" className="mt-2 inline-flex items-center text-xs text-muted-foreground">
              Reviews submitted
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </article>

          <article className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Active Orders</p>
            <p className="mt-1 text-3xl font-bold">{data.stats.activeOrders}</p>
            <Link href="/account/orders" className="mt-2 inline-flex items-center text-xs text-muted-foreground">
              Currently processing
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </article>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link
              href="/account/addresses"
              className="text-sm font-medium text-red-600 transition hover:text-red-500 dark:text-red-400"
            >
              Manage Addresses
            </Link>
          </div>
          <div className="space-y-2">
            {optionCards.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 transition hover:border-red-300 hover:bg-muted/50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Default Address</h3>
            <Link
              href="/account/addresses"
              className="text-sm font-medium text-red-600 transition hover:text-red-500 dark:text-red-400"
            >
              Update
            </Link>
          </div>
          {data.address ? (
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{data.address.fullName}</p>
                {data.address.isPrimary ? (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Primary
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{data.address.phone ?? "Phone not set"}</p>
              <p className="mt-1 text-sm text-muted-foreground">{data.address.line1}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {data.address.city}, {data.address.countryName}
              </p>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Account security: Your account is protected.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
              No address added yet. Add a delivery address for faster checkout.
            </div>
          )}
        </article>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">All Account Options</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {optionCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={`option-${item.href}`}
                href={item.href}
                className="rounded-xl border border-border bg-card p-4 transition hover:border-red-300 hover:bg-muted/50"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-2 text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </Link>
            );
          })}
          <Link
            href="/help-center"
            className="rounded-xl border border-border bg-card p-4 transition hover:border-red-300 hover:bg-muted/50"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
              <MessageCircleQuestion className="h-4 w-4" />
            </span>
            <p className="mt-2 text-sm font-semibold">Help & Support</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Contact support and find answers quickly.
            </p>
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-border bg-card p-4 transition hover:border-red-300 hover:bg-muted/50"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
              <Home className="h-4 w-4" />
            </span>
            <p className="mt-2 text-sm font-semibold">Back to Home</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Continue browsing featured products and deals.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
