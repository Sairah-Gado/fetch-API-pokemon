fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  .then((response1) => {
    return response1.json();
  })
  .then((data) => {
    const pokemons = data.results.map((poke) => poke.name)
    const listUl = document.querySelector('.pokemons')

    pokemons.forEach((pokemonNames) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNames}`)
        .then((response) => {
          return response.json()
        })
        .then((pokemonData) => {
          const listItem = document.createElement('li')
          listItem.innerHTML = `<span style="font-weight: bold;">Name:</span>${pokemonData.name}`;
          listUl.appendChild(listItem);

          // Display Pokemon images
          const image = document.createElement('img')
          image.src = pokemonData.sprites.front_default;
          listItem.appendChild(image)

          // Display Pokemon abilities
          const pokemonAbilities = document.createElement('div')
          listItem.appendChild(pokemonAbilities); // Append the abilities div to the list item

          pokemonData.abilities.forEach((pokemonAb) => {
            const abiItems = document.createElement('p')
            abiItems.innerHTML = `<span style="font-weight: bold;">Ability:</span> ${pokemonAb.ability.name}`;
            abiItems.style.fontSize = "13px"
            pokemonAbilities.appendChild(abiItems); // Append the ability item to the abilities div

            // Fetch and display ability description
            fetch(pokemonAb.ability.url)
              .then((response2) => {
                return response2.json();
              })
              .then((data) => {
                const abiPara = document.createElement('p')
                abiPara.innerHTML = `<span style="font-weight: bold;">Effect:</span> ${data.effect_entries[0].effect}`;

                abiItems.appendChild(abiPara); // Append the ability description to the ability item
              })
              .catch((err) => {
                console.error('Error fetching ability data:', err)
              })
          })
        })
        .catch((err) => {
          console.error('Error fetching Pokemon data:', err)
        })
    })
  })
  .catch((error) => {
    console.error('Error:', error);
  })

