import { combineReducers } from 'redux';

const pokemonReducer = (state = [], action) => { 
    switch (action.type) {
        case 'FETCH_ALL_POKEMON':
            return action.payload;
        default:
            return state;
    }
}

const pokemonDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POKEMON_DETAILS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default combineReducers({
    pokemons: pokemonReducer,
    pokemonDetails: pokemonDetailsReducer
});