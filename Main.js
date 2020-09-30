const API_URL = 'https://pokeapi.co/api/v2/'
const POKEMON_URL = 'pokemon/:id'

const pokedex = document.getElementById('poke-list')
const moreBtn = document.getElementById('more-btn')

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14]
let ids_len = ids.length

moreBtn.onclick = function(){
    const array = []
    for(let i=1;i<=7;i++){
        array.push(ids_len+i) 
    }
    
    ids_len += 7

    console.log(array)
    fillPokedex(array)
}

// Renders the pokemon card info to pokedex list (<ul>)
function render_html(pokemon_card) {
    const node = document.createElement('LI')
    node.classList.add('poke-card')
    node.innerHTML = pokemon_card
    pokedex.appendChild(node)
}

// Verify if a pokemon has more than one type or element
function checkTypes(params) {
    return params[1] ? `<li>${params[1].type.name}</li>` : ''
}

// Estructure the pokemon info to html tags 
function to_html(pokemon) {

    const pokemon_card = 
    `
    <div class="card">
        <img src="${pokemon.sprites.back_default}" alt="" styles="" class="poke-img card-img-top">
        <div class="card-body">
            <h5 class="card-title text-center">${pokemon.name}</h5>
            <div class="types">
            <ul class="card-text">
            <li>${pokemon.types[0].type.name}</li>
            ${ checkTypes(pokemon.types) }
        </ul>
            </div>
            <div class="more">
                <div class="col-md-8"></div>
                <div class="col-md-4">
                    <button class="btn btn-secondary">+</button>
                </div>
            </div>

        </div>
    </div>
    `
    render_html(pokemon_card)
}

// fetch pokemon object from API
async function fetchPokemon(id) {
    const poke_promise = await fetch(`${API_URL}${POKEMON_URL.replace(':id', id)}`)
    return poke_promise.json()
}

async function fillPokedex(array) {
    const pokemon_promises = array.map(id => fetchPokemon(id)) // request each pokemon by ID
    const pokemon_list = await Promise.all(pokemon_promises) 
    return pokemon_list
}


// Once the operation has been completed 
fillPokedex(ids)
    .then(data => {
        data.forEach(item => {
            // console.log(item.name)
            to_html(item)
        })
    })
    .catch(error => {
        console.log(error)
    })