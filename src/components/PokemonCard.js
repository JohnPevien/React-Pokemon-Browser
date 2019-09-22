import React from 'react';

const PokemonCard = (props) => {
    return (
        <div className="four wide column">
            <div className="ui card">
                <div className="image">
                    <img src={props.imgsrc.front_default} alt="text" />
                </div>
                <div className="content">
                    <div className="header">{props.name}</div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;