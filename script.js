document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const characterContainer = document.getElementById('character-container');

    async function fetchCharacterByName(name) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
            const data = await response.json();
            return data.results[0];
        } catch (error) {
            console.error('Error fetching character:', error);
        }
    }

    function createCharacterCard(character) {
        if (!character) {
            return '<p>Character not found</p>';
        }

        const card = document.createElement('div');
        card.className = 'character-card';

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.species}</p>
            <p>Status: ${character.status}</p>
            <p>Gender: ${character.gender}</p>
        `;

        return card;
    }

    async function handleSearch() {
        const name = searchInput.value.trim();
        if (name) {
            const character = await fetchCharacterByName(name);
            characterContainer.innerHTML = '';
            const card = createCharacterCard(character);
            characterContainer.appendChild(card);
        } else {
            characterContainer.innerHTML = '<p>Digite o nome de um personagem.</p>';
        }
    }

    searchButton.addEventListener('click', handleSearch);
});