const pokemonListContainer = document.getElementById('pokemon-list');
const searchBar = document.getElementById('search-bar');
const shinyFilter = document.getElementById('shiny-filter');

let allPokemon = [];

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1010');
    const data = await response.json();
    return data.results;
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    const nameInFrench = data.names.find((name) => name.language.name === 'fr')?.name || data.name;

    let evolutionInfo = '';
    if (data.evolution_chain) {
        const evolutionResponse = await fetch(data.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        evolutionInfo = getPreviousEvolution(evolutionData.chain, data.name);
    }

    return {
        id: data.id,
        name: nameInFrench,
        evolution: evolutionInfo,
    };
}

function getPreviousEvolution(chain, name) {
    let previous = null;
    let condition = '';
    let currentChain = chain;

    while (currentChain) {
        if (currentChain.species.name === name.toLowerCase()) {
            return previous ? `Évolution de ${getFrenchName(previous)} ${condition}` : "Aucune évolution antérieure";
        }
        condition = currentChain.evolves_to[0]?.evolution_details[0]?.trigger?.name || '';
        previous = currentChain.species.name;
        currentChain = currentChain.evolves_to[0] || null;
    }

    return "Aucune évolution antérieure";
}

function getFrenchName(englishName) {
    // This function should map English names to French names if needed.
    // For now, it assumes the name is already in English.
    return englishName;
}

function renderPokemon(pokemonList, shiny = false) {
    pokemonListContainer.innerHTML = '';
    pokemonList.forEach((pokemon) => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${shiny ? '/shiny' : ''}/${pokemon.id}.png" alt="${pokemon.name}">
            <p>#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}</p>
            <p class="pokemon-evolution">${pokemon.evolution}</p>
        `;
        pokemonListContainer.appendChild(card);
    });
}

async function initialize() {
    const pokemonSpecies = await fetchPokemon();

    allPokemon = await Promise.all(
        pokemonSpecies.map(async (species) => {
            const details = await fetchPokemonDetails(species.url);
            return details;
        })
    );

    renderPokemon(allPokemon);

    searchBar.addEventListener('input', applyFilters);
}

function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();
    const showShiny = shinyFilter.checked;

    const filteredPokemon = allPokemon.filter((pokemon) => {
        return (
            pokemon.name.toLowerCase().includes(searchValue) ||
            pokemon.id.toString().includes(searchValue)
        );
    });

    renderPokemon(filteredPokemon, showShiny);
}

initialize();
