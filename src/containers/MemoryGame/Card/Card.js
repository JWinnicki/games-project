import React, { useState, useEffect } from 'react';

import './Card.scss';
//import Icon from '../../../components/Icon/Icon';

const Card = props => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(props.shouldHide && !props.guessedCards.some(el => el === props.color)) {
            setIsActive(false);
        } else if(props.shouldReset) {
            setIsActive(false);
        }
    }, [props.shouldHide, props.guessedCards, props.color, props.shouldReset]);

    

    const onClickHandler = () => {
        if(!props.disabled && !isActive) {
            setIsActive(prev => !prev);
            if(!isActive) {
                props.getCardInfo(props.color);
            }
        } else {
            //console.log('Nie można kliknąć')
        }
    }

    return (
        <div onClick={onClickHandler} className={`card ${isActive ? 'card-active' : ''}`} style={{animationName: props.animation}} >
            <div className='card-front'></div>
            <div className='card-back' style={{backgroundColor: props.color}}></div>
        </div>
    );
}

export default Card;