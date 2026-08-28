import { fetchPokemon } from "./services/api.js";
import { showModal, setUpModal, showPokemon } from "./ui/ui.js";

let current = 677;

async function loadPokemon(id) {
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
}

loadPokemon(current);
setUpModal();

document.querySelector(".next").addEventListener("click", () => {
    current ++;
    loadPokemon(current);
})

document.querySelector(".prev").addEventListener("click", () => {
    if (current > 1) current--;
    loadPokemon(current);
})