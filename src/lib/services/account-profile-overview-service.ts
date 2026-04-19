import { AccountStatus, OrderStatus, UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { NotFoundError } from "@/lib/errors";

const activeOrderStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
];

export type AccountProfileOverviewData = {
  profile: {
    fullName: string;
    email: string;
    phone: string | null;
    memberSince: string;
    createdAt: string;
    isVerified: boolean;
  };
  stats: {
    totalOrders: number;
    activeOrders: number;
    wishlistItems: number;
    reviews: number;
  };
  address: {
    fullName: string;
    phone: string | null;
    line1: string;
    city: string;
    countryCode: string;
    countryName: string;
    isPrimary: boolean;
  } | null;
  canOpenSellerDashboard: boolean;
};

function toCountryName(countryCode: string) {
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(countryCode.toUpperCase()) ?? countryCode.toUpperCase();
  } catch {
    return countryCode.toUpperCase();
  }
}

function buildFullName(firstName?: string | null, lastName?: string | null, fallbackEmail?: string) {
  const fullName = [firstName ?? "", lastName ?? ""].join(" ").trim();
  if (fullName.length > 0) return fullName;
  if (!fallbackEmail) return "Deal Bazaar Customer";
  return fallbackEmail.split("@")[0] ?? "Deal Bazaar Customer";
}

export async function getAccountProfileOverview(
  userId: string,
  sessionRole: UserRole,
): Promise<AccountProfileOverviewData> {
  const [user, totalOrders, activeOrders, wishlistItems, reviews, primaryAddress, seller] =
    await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          phone: true,
          emailVerifiedAt: true,
          createdAt: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      db.order.count({
        where: { userId },
      }),
      db.order.count({
        where: {
          userId,
          status: {
            in: activeOrderStatuses,
          },
        },
      }),
      db.wishlistItem.count({
        where: {
          wishlist: {
            userId,
          },
        },
      }),
      db.review.count({
        where: {
          userId,
        },
      }),
      db.address.findFirst({
        where: { userId },
        orderBy: [{ isDefaultShipping: "desc" }, { updatedAt: "desc" }],
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          line1: true,
          city: true,
          countryCode: true,
          isDefaultShipping: true,
          isDefaultBilling: true,
        },
      }),
      db.seller.findUnique({
        where: {
          userId,
        },
        select: {
          status: true,
        },
      }),
    ]);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const fullName = buildFullName(user.profile?.firstName, user.profile?.lastName, user.email);

  return {
    profile: {
      fullName,
      email: user.email,
      phone: user.phone,
      memberSince: user.createdAt.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      createdAt: user.createdAt.toISOString(),
      isVerified: Boolean(user.emailVerifiedAt),
    },
    stats: {
      totalOrders,
      activeOrders,
      wishlistItems,
      reviews,
    },
    address: primaryAddress
      ? {
          fullName: buildFullName(primaryAddress.firstName, primaryAddress.lastName),
          phone: primaryAddress.phone,
          line1: primaryAddress.line1,
          city: primaryAddress.city,
          countryCode: primaryAddress.countryCode,
          countryName: toCountryName(primaryAddress.countryCode),
          isPrimary: primaryAddress.isDefaultShipping || primaryAddress.isDefaultBilling,
        }
      : null,
    canOpenSellerDashboard:
      sessionRole === UserRole.SELLER ||
      sessionRole === UserRole.ADMIN ||
      sessionRole === UserRole.SUPER_ADMIN ||
      seller?.status === AccountStatus.ACTIVE,
  };
}
