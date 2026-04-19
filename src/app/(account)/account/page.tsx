import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { AccountProfileOverview } from "@/components/account/account-profile-overview";
import { getAccountProfileOverview } from "@/lib/services/account-profile-overview-service";

export default async function AccountDashboardPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?next=/account");
  }

  const overviewData = await getAccountProfileOverview(session.sub, session.role);
  return <AccountProfileOverview data={overviewData} />;
}
