export interface PokemonAbilities  {
  name: string;
  effect_entries :{
    effect: string,
    language: {
      name: string,
    }
  }[]
}