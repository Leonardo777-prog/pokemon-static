import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {

    const { data: { id, name, sprites } } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return { id, name, sprites }

}