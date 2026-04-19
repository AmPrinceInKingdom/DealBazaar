import { redirect } from "next/navigation";
import { ProfileManager } from "@/components/account/profile-manager";
import { getCurrentSession } from "@/lib/auth/session";

export default async function AccountProfileEditPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?next=/account/profile/edit");
  }

  return <ProfileManager />;
}
