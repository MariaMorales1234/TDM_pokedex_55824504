import { fetchPokemon } from "./services/api.js";
import { setUpModal, showPokemon } from "./ui/ui.js";

let current = 677; //empieza en Espurr

async function loadPokemon(id) {
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
}

//inicial
loadPokemon(current);

//cierra el modal
setUpModal();

//navegacion
document.querySelector(".next").addEventListener("click", () => {
    current ++;
    loadPokemon(current);
})

document.querySelector(".prev").addEventListener("click", () => {
    if (current > 1) current--;
    loadPokemon(current);
})