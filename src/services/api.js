import Pokemon from "../models/Pokemon.js";
 
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {
    try {
        const res = await fetch(API_URL + id);
        if (!res.ok) throw new Error("No se encontro el Pokemon");
        const data = await res.json();

        //extrae los tipos y las abilidades
        const types = data.types.map(t => t.type.name);
        const abilities = data.abilities.map(a => a.ability.name);

        //extrae las actividades
        const stats = data.stats.map(s => ({
            stat: s.stat.name,
            base: s.base_stat
        })); 

        //extrae los sonidos
        const cry = data.cries.latest;

        return new Pokemon(
            data.id,
            data.name,
            types,
            data.sprites.other["official-artwork"].front_default,
            data.height,
            data.weight,
            abilities,
            stats,
            cry
        );
    }catch (error) {
        console.error(error);
        return null;
    }
    
}