import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardSidebar from "@/layout/DashboardSidebar";
import { authOption } from "../api/auth/[...nextauth]/route";
type DashboardLayoutProps = {
  children: React.ReactNode;
};
async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOption);
  if (!session) redirect("/signin");
  return <DashboardSidebar>{children}</DashboardSidebar>;
}

export default DashboardLayout;
