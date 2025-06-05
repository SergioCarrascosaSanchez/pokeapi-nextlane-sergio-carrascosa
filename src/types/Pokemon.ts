export interface Pokemon {
  sprites: {
    front_default: string;
  };
  moves: {
    move: {
      name: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
