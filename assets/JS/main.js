const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 5;
let offset = 0;



function convertPokemonToList(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
       
    <div class="detail">
        <ol class="types">
           ${pokemon.types.map((type) => ` <li class="type ${type}">${type}</li>`).join('')}
        </ol>
            <img src="${pokemon.photo}"  alt="${pokemon.name}">
    </div>
    
</li>`
}

    function loadPokemonItens(offset, limit){ 
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToList).join('')
            pokemonList.innerHTML += newHtml
      })
    }


loadMoreButton.addEventListener('click', () => {
        offset += limit

        const qtdRecordNextPage = offset + limit;

        if(qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords - offset;
            loadPokemonItens(offset, newLimit)

           loadMoreButton.parentElement.removeChild(loadMoreButton)
        }else{
            loadPokemonItens(offset, limit)
        }
        
    })
    