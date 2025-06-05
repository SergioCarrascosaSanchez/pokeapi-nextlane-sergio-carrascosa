import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SidebarContentLayout } from "@/components/SidebarContentLayout/SidebarContentLayout";
import { SelectedPokemonProvider } from "@/context/SelectedPokemonContext";

export default function Home() {
  return (
    <SelectedPokemonProvider>
      <SidebarContentLayout sidebar={<Sidebar />}>
        <></>
      </SidebarContentLayout>
    </SelectedPokemonProvider>
  );
}
