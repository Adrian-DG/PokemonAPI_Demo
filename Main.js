const API_URL = 'https://pokeapi.co/api/v2/'
const POKEMON_URL = 'pokemon/:id'

const pokedex = document.getElementById('poke-list')
const moreBtn = document.getElementById('more-btn')

const ids = [1, 2, 3, 4, 5, 6, 7]
let ids_len = ids.length

moreBtn.addEventListener('click', async () => {
    let array = []
    for(let i=1; i<7; i++){
        array.push(i+ids_len)
        ids_len += i
    }
   
    fillPokedex(array)
   
})

// Renders the pokemon card info to pokedex list (<ul>)
function render_html(pokemon_card) {
    const node = document.createElement('LI')
    node.classList.add('poke-card')
    node.innerHTML = pokemon_card
    pokedex.appendChild(node)
}

// Verify if a pokemon has more than one type or element
function checkTypes(params) {
    return params[1] ? `<li>${params[1].type.name}</li>` : '' // if/else ternary operator 
}

// Change pokemon name to first letter uppercase
function changeName(pokemon_name){
    let name = Array.from(pokemon_name) // creates an array from (pokemon_name) letters
    name[0] = name[0].toUpperCase() // set name array first letter to UpperCase()
    return name.join('',).toString()
}

// Estructure the pokemon info to html tags 
function to_html(pokemon) {
    console.log(pokemon.name)
    const pokemon_card = 
    `
    <div class="card">
        <img src="${pokemon.sprites.front_default}" alt="" styles="" class="poke-img card-img-top">
        <div class="card-body">
            <h5 class="card-title text-center">${changeName(pokemon.name)}</h5>
            <ul class="card-text">
                <li>${pokemon.types[0].type.name}</li>
                ${ checkTypes(pokemon.types) /* check if pokemon has more than one type */ } 
            </ul>
        </div>
    </div>
    `
    render_html(pokemon_card)
}

// fetch pokemon object from API
async function fetchPokemon(id) {
    const poke_promise = await fetch(`${API_URL}${POKEMON_URL.replace(':id', id)}`)
    // console.log(poke_promise)
    return poke_promise.json()
}

async function fillPokedex(array) {
    const pokemon_promises = array.map(id => fetchPokemon(id)) // request each pokemon by ID
    const pokemon_list = await Promise.all(pokemon_promises) 
    console.log(pokemon_list)
    return pokemon_list
}

// Once the operation has been completed 
fillPokedex(ids)
    .then(data => data.forEach(item => to_html(item)))
    .catch(error => console.log(error))