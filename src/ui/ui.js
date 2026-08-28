const STAT_NAMES = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Atq. Esp.",
    "special-defense": "Def. Esp.",
    speed: "Velocidad"
};

export function showPokemon (pokemon) {
    if (!pokemon) return;

    const primaryType = pokemon.types[0];

    const oldClasses = Array.from(document.body.classList).filter(c => c.startsWith("type-"));
    oldClasses.forEach(c => document.body.classList.remove(c));
    document.body.classList.add("type-" + primaryType);
    //Este apartado para que cargue los fondos fue hecho con Kimi.ia

    //datos pokemom
    document.getElementById("pokemon-img").src = pokemon.sprite;
    document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
    document.getElementById("pokemon-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

    //tipos
    const typesDiv = document.querySelector(".types");
    typesDiv.innerHTML = "";
    pokemon.types.forEach(t => {
        const span = document.createElement("span");
        span.classList.add("type", t);
        span.textContent = capitalize(t);
        typesDiv.appendChild(span);
    });

    document.querySelector("#pokemon-img").onclick = () => showModal(pokemon);

    //sonido de los pokemones
    const audio = new Audio(pokemon.cry);
    audio.play();
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function showModal(pokemon){
    const modal = document.getElementById("pokemon-modal");

    //datos del modal
    document.getElementById("modal-name").textContent = capitalize(pokemon.name);
    document.getElementById("modal-img").src = pokemon.sprite;
    document.getElementById("modal-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");
    document.getElementById("modal-height").textContent = (pokemon.height / 10) + " m";
    document.getElementById("modal-weight").textContent = (pokemon.weight / 10) + " kg";
    document.getElementById("modal-abilities").textContent = pokemon.abilities.join(", ");

    //estadísticas
    const statsDiv = document.getElementById("modal-stats");
    statsDiv.innerHTML = "<h3>Estadísticas</h3>";
    pokemon.stats.forEach(s => {
        const name = s.stat;
        const value = s.base;
        const label = STAT_NAMES[name] || name;

        //crea un grid para distribuir los elementos de las estdisticas
        const row = document.createElement("div");
        row.className = "stat-row";
        row.innerHTML = `
            <span class="stat-label">${label}</span>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${Math.min(value, 100)}%"></div>
            </div>
            <span class="stat-value">${value}</span>
        `; //el div de star-bar-fill fue hecho con Kimi.ia
        statsDiv.appendChild(row);
    })

    modal.classList.remove("hidden");
}

//cierra el modal
export function setUpModal() {
    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("pokemon-modal").classList.add("hidden");
    });

}

