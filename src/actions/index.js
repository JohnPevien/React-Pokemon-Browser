import _ from 'lodash';
import pokeapi from '../api/pokeapi';

export const fetchListOfPokemons = (offset) => async (dispatch) => _fetchListOfPokemons(offset, dispatch);

const _fetchListOfPokemons = _.memoize(async (offset, dispatch) => { 
    const response = await pokeapi.get(`/pokemon/?offset=${offset}&limit=9`)
    dispatch({ type: 'FETCH_ALL_POKEMON', payload: response.data.results });
});

export const fetchPokemonDetails = (name) => (dispatch) => _fetchPokemonDetails(name, dispatch);

const _fetchPokemonDetails = _.memoize(async (name, dispatch) => {
    const response = await pokeapi.get(`/pokemon/${name}`);
    dispatch({ type: 'FETCH_POKEMON_DETAILS', payload: response.data });
});


export const fetchListOfPokemonsAndPokemonDetails = (offset = 0) => async (dispatch, getState) => { 
    await dispatch(fetchListOfPokemons(offset));

    _.chain(getState().pokemons)
    .map('name')
    .uniq()
    .forEach(name => dispatch(fetchPokemonDetails(name)))
    .value() //use value() to execute chain

}