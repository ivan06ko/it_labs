const pokemonListElement = document.getElementById('pokemon-list');
const typeFilter = document.getElementById('typeFilter');
const searchInput = document.getElementById('searchInput');
const pageNumberElement = document.getElementById('pageNumber');
const pokemonModal = document.getElementById('pokemonModal');
const pokemonInfoElement = document.getElementById('pokemonInfo');
let allPokemon = [];
let currentType = "";
let currentPage = 1;
const itemsPerPage = 21;

// Завантаження типів
async function loadTypes() {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    data.results.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        typeFilter.appendChild(option);
    });
}

// Завантаження покемонів
async function loadPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    allPokemon = data.results;
    displayPokemon();
}

// Фільтрація по типу
async function filterByType() {
    currentType = typeFilter.value;
    currentPage = 1;
    displayPokemon();
}

// Пошук покемона
function searchPokemon() {
    displayPokemon();
}

// Відображення покемонів
async function displayPokemon() {
    pokemonListElement.innerHTML = '';
    let filteredPokemon = allPokemon;

    if (currentType) {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${currentType}`);
        const typeData = await typeResponse.json();
        filteredPokemon = typeData.pokemon.map(p => p.pokemon);
    }

    const searchQuery = searchInput.value.toLowerCase();
    filteredPokemon = filteredPokemon.filter(pokemon => pokemon.name.includes(searchQuery));

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedPokemon = filteredPokemon.slice(start, start + itemsPerPage);

    for (let pokemon of paginatedPokemon) {
        const pokemonData = await fetchPokemonData(pokemon.url);
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p>${pokemonData.id}. ${pokemonData.name}</p>
            ${pokemonData.types.map(t => `<span class="pokemon-type" style="background-color:${getTypeColor(t.type.name)}">${t.type.name}</span>`).join('')}
        `;
        pokemonCard.onclick = () => showPokemonInfo(pokemonData);
        pokemonListElement.appendChild(pokemonCard);
    }

    pageNumberElement.textContent = currentPage;
}

// Отримання даних покемона
async function fetchPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

// Показ інформації про покемона
async function showPokemonInfo(pokemon) {
    const evolutionChain = await getEvolutionChain(pokemon.species.url);
    pokemonInfoElement.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Типи:</strong> ${pokemon.types.map(t => `<span class="pokemon-type" style="background-color:${getTypeColor(t.type.name)}">${t.type.name}</span>`).join(', ')}</p>
        <p><strong>Здоров'я (HP):</strong> ${pokemon.stats[0].base_stat}</p>
        <p><strong>Сила атаки:</strong> ${pokemon.stats[1].base_stat}</p>
        <p><strong>Захист:</strong> ${pokemon.stats[2].base_stat}</p>
        <p><strong>Швидкість:</strong> ${pokemon.stats[5].base_stat}</p>
        <p><strong>Еволюція:</strong> ${evolutionChain}</p>
    `;
    pokemonModal.style.display = 'block';
}

// Отримання ланцюга еволюції
async function getEvolutionChain(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
    const chain = [];
    let evoData = evolutionData.chain;

    do {
        chain.push(evoData.species.name);
        evoData = evoData.evolves_to[0];
    } while (evoData && evoData.evolves_to);

    return chain.join(" ➔ ");
}

// Закриття модального вікна
function closeModal() {
    pokemonModal.style.display = 'none';
}

// Попередня сторінка
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPokemon();
    }
}

function nextPage() {
    currentPage++;
    displayPokemon();
}

// Оновлення відображення покемона з додатковою інформацією
async function showPokemonInfo(pokemon) {
    const evolutionChain = await getEvolutionChain(pokemon.species.url);
    const description = await getPokemonDescription(pokemon.species.url);
    pokemonInfoElement.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 200px; height: 200px;">
        <p><strong>Типи:</strong> ${pokemon.types.map(t => `<span class="pokemon-type" style="background-color:${getTypeColor(t.type.name)}">${t.type.name}</span>`).join(', ')}</p>
        <p><strong>Здоров'я (HP):</strong> ${pokemon.stats[0].base_stat}</p>
        <p><strong>Сила атаки:</strong> ${pokemon.stats[1].base_stat}</p>
        <p><strong>Захист:</strong> ${pokemon.stats[2].base_stat}</p>
        <p><strong>Швидкість:</strong> ${pokemon.stats[5].base_stat}</p>
        <p><strong>Опис:</strong> ${description}</p>
        <p><strong>Еволюція:</strong> ${evolutionChain}</p>
    `;
    pokemonModal.style.display = 'block';
}

// Отримання опису покемона
async function getPokemonDescription(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
    return flavorText ? flavorText.flavor_text : 'No description available';
}

// Отримання ланцюга еволюції
async function getEvolutionChain(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
    const chain = [];
    let evoData = evolutionData.chain;

    do {
        chain.push(evoData.species.name);
        evoData = evoData.evolves_to[0];
    } while (evoData && evoData.evolves_to);

    return chain.join(" ➔ ");
}

// Кольори типів
function getTypeColor(type) {
    const colors = {
        grass: "#78C850",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        bug: "#A8B820",
        normal: "#A8A878",
        poison: "#A040A0",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0"
    };
    return colors[type] || "#A8A878";
}

// Ініціалізація
loadTypes();
loadPokemon();
