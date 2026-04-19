import { redirect } from "next/navigation";
import { AccountProfileOverview } from "@/components/account/account-profile-overview";
import { getCurrentSession } from "@/lib/auth/session";
import { getAccountProfileOverview } from "@/lib/services/account-profile-overview-service";

export default async function AccountProfilePage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?next=/account/profile");
  }

  const overviewData = await getAccountProfileOverview(session.sub, session.role);
  return <AccountProfileOverview data={overviewData} />;
}
