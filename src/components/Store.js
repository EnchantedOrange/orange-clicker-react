import React from 'react';

function Store(props) {
    const display = props.display ? 'flex' : 'none';
    return(
        <div className="Store" style={{display: display}}>
            <div className="store-item">
                <p>+1 damage</p>
                <button id="buy_1_damage" onClick={props.handleBuy}>50 gold</button>
            </div>
        </div>
    );
}

export default Store;