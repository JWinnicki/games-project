import React from 'react';

import './SnakeFood.scss';

const SnakeFood = props => {
    return <div className='SnakeFood' style={{top: `${props.top}%`, left: `${props.left}%`}}></div>
}

export default SnakeFood;