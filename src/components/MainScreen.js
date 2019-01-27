import React from 'react';

function MainScreen(props) {
    return(
        <div className="MainScreen">
            <p>{props.data.isLoading ? 'Loading...' : `Enemy: ${props.data.enemyName}`}</p>
            <p>Enemy health: {props.data.health}</p>
            <p>Gold: {props.data.gold}</p>
            <p>Your damage: {props.data.damage}</p>
            <button onClick={props.handleClick}>Hit!</button>
        </div>
    );
}

export default MainScreen;