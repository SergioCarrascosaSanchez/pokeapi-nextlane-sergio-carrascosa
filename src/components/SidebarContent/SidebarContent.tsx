import { usePokemonSummaryList } from "@/hooks/usePokemonSummaryList/usePokemonSummaryList";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { Loader } from "../Loader/Loader";
import "./SidebarContent.css";

export function SidebarContent() {
  const { pokemons, loading, error, incrementOffset } = usePokemonSummaryList();

  if (error) {
    return (
      <div className="sidebar-centered">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {pokemons.map((pokemon, index) => (
        <SidebarItem key={pokemon.name} pokemon={pokemon} id={index + 1} />
      ))}

      {loading ? (
        <div className="sidebar-centered">
          <Loader />
        </div>
      ) : (
        <div className="load-more-button-container">
          <button
            className="button-primary"
            onClick={incrementOffset}
            disabled={loading}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
