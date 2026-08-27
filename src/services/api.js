import Pokemon from "../models/Pokemon.js";
 
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {
    try {
        const res = await fetch(API_URL + id);
        if (!res.ok) throw new Error("No se encontro el Pokemon");
        const data = await res.json();

        const types = data.types.map(t => t.type.name);

        return new Pokemon(
            data.id,
            data.name,
            types,
            data.sprites.other["official-artwork"].front_default
        );
    }catch (error) {
        console.error(error);
        return null;
    }
    
}