import React from 'react';

import './Snake.scss';

const Snake = props => {
    return (
        <div className='Snake' style={{top: `${props.top}%`, left: `${props.left}%`}}></div>
    );
}

export default Snake;