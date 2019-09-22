import _ from 'lodash';
import pokeapi from '../api/pokeapi';

export const fetchListOfPokemons = () => async (dispatch) => { 
    const response = await pokeapi.get('/pokemon/?limit=100')
    dispatch({ type: 'FETCH_ALL_POKEMON', payload: response.data.results });
}

export const fetchPokemonDetails = (name) => (dispatch) => _fetchPokemonDetails(name, dispatch);

const _fetchPokemonDetails = _.memoize(async (name, dispatch) => {
    const response = await pokeapi.get(`/pokemon/${name}`);
    dispatch({ type: 'FETCH_POKEMON_DETAILS', payload: response.data });
});


export const fetchListOfPokemonsAndPokemonDetails = () => async (dispatch, getState) => { 
    await dispatch(fetchListOfPokemons());

    _.chain(getState().pokemons)
    .map('name')
    .uniq()
    .forEach(name => dispatch(fetchPokemonDetails(name)))
    .value() //use value() to execute chain


}