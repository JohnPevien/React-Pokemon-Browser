import React from 'react';
import PokemonGrid from './PokemonGrid';

class App extends React.Component {

    render() { 
        return (
            <div className="ui container">
                <PokemonGrid></PokemonGrid>
            </div>
        );
    }
}

export default App;