import React from 'react';

import './Snake.scss';

const Snake = props => {
    //const { top, left, body } = props;
    //console.log(props.body[0][0]);
    return (
        <React.Fragment>
            <div className='Snake' style={{top: `${props.top}%`, left: `${props.left}%`}}></div>
            <div className='Snake' style={{top: `${props.body[0][0]}%`, left: `${props.body[0][1]}%`}}></div>
        </React.Fragment>
    );
}

export default Snake;