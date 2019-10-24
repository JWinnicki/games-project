import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainMenuItem.scss';
import Icon from '../Icon/Icon';
const MainMenuItem = props => {
    return (
        <NavLink to={`${props.to}`} className='MainMenuItem'>
            <div className='MainMenuItem-IconDiv'>
                <Icon icon={props.icon} size='medium' />
            </div>
            <div className='MainMenuItem-TitleDiv'>
                <h2 className='MainMenuItem-h2'>{props.title}</h2>
            </div>
        </NavLink>
    );
}

export default MainMenuItem;