import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SidebarContentLayout } from "@/components/SidebarContentLayout/SidebarContentLayout";

export default function Home() {
  return (
    <SidebarContentLayout sidebar={<Sidebar />}>
      <></>
    </SidebarContentLayout>
  );
}
