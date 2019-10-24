import React from 'react';

import './Icon.scss';
import icons from '../../assets/icons.svg';

const Icon = props => {
    
    return (
        <svg 
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            className={`icon-${props.icon} ${props.color ? props.color : null} ${props.size} ${props.rotate ? props.rotate : null}`}
        >
            <use xlinkHref={`${icons}#${props.icon}`} />
        </svg>
    )
}

export default Icon;