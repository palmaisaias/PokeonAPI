console.log('Poke Project');

document.addEventListener('DOMContentLoaded', () => {
    const pokemonForm = document.getElementById('pokemon-form');
    const pokemonContainer = document.getElementById('pokemon-container');

    pokemonForm.addEventListener('submit', (e) => getFormData(e, 'pokemon-container'));

    async function getFormData(e, containerClass) {
        e.preventDefault();
        const pokemon = e.target.pokemon.value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Pokemon not found');

            const data = await res.json();

            const name = data.name;
            const id = data.id;
            const imgUrl = data.sprites.other['official-artwork'].front_default;
            const height = data.height;
            const move = data.moves[0].move.name;
            // this checks if the pokemon has a held item to begin with because not all of them do. Without this
            // portion the program kept putting out an error message if the pokemon did not have an inherent held item
            const item = data.held_items.length > 0 ? data.held_items[0].item.name : 'No item'; 

            const myData =  {
                name: name,
                id: id,
                imgUrl: imgUrl,
                height: height,
                move: move,
                item: item
            };

            addToPage(myData, containerClass);
        } catch (error) {
            console.error(error);
            alert('Pokemon not found');
        }
    }

    function addToPage(data, containerClass) {
        const container = document.getElementById(containerClass);
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card', 'col-md-3');

        pokemonCard.innerHTML = `
            <h5>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5>
            <img src="${data.imgUrl}" alt="${data.name}">
            <p>ID: ${data.id}</p>
            <p>Height: ${data.height}</p>
            <p>Move: ${data.move}</p>
            <p>Held Item: ${data.item}</p>
        `;

        container.appendChild(pokemonCard);
    }
});


const addToPage = (p, containerClass) => {
    console.log(p, 'print p');
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card" style="width: 18rem; height: 18rem; border-radius: 50%; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); position: relative; margin-top: 20px;">
      <img src="${p.imgUrl}" class="card-img-top" alt="${p.name}" style="width: 80%; height: 80%; object-fit: cover; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    </div>
    `;
};



