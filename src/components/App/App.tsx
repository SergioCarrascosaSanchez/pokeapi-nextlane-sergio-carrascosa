import { PokemonDetail } from "@/components/PokemonDetail/PokemonDetail";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SidebarContentLayout } from "@/components/SidebarContentLayout/SidebarContentLayout";
import { SelectedPokemonProvider } from "@/context/SelectedPokemonContext";

export default function App() {
  return (
    <SelectedPokemonProvider>
      <SidebarContentLayout sidebar={<Sidebar />}>
        <PokemonDetail />
      </SidebarContentLayout>
    </SelectedPokemonProvider>
  );
}
