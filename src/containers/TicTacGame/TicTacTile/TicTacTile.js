import React, { useState, useEffect } from 'react';

import './TicTacTile.scss';

const TicTacTile = props => {
    const [isActive, setIsAcive] = useState(false);
    const [turn, setTurn] = useState('');
    const { reset } = props;

    const onClickHandler = () => {
        if(!isActive && !props.victory) {
            setIsAcive(true);
            setTurn(props.currentTurn);
            props.onClickTile(props.id);
        }
    }

    useEffect(() => {
        if(reset) {
            setIsAcive(false);
        }
    }, [reset])


    return (
        <div onClick={onClickHandler} className='TicTacTile'>
            <p className='TicTacTile-p'>
                {isActive ? turn : ''}
            </p>
        </div>
    );
}

export default TicTacTile;