import React from 'react';
import { connect } from 'react-redux';
import { fetchListOfPokemonsAndPokemonDetails } from '../actions';
import PokemonCard from './PokemonCard';

class PokemonGrid extends React.Component {
    state = { pokemonInfo: null };

    componentDidMount() { 
        this.props.fetchListOfPokemonsAndPokemonDetails();
    
    }

    renderPokemonList() {
        return this.props.pokemonDetails.map(({name, sprites}) => { 
            return (
                <PokemonCard key={name} name={name} imgsrc={sprites}/>
            )

        })
    }

    render() { 
        return (
            <div className="ui grid">
                { this.renderPokemonList() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { pokemons: state.pokemons, pokemonDetails: state.pokemonDetails };
}

export default connect(mapStateToProps, {fetchListOfPokemonsAndPokemonDetails})(PokemonGrid);