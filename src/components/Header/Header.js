import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
            <NavLink to='/' className='Header'>
                <h1 className='Header-h1'>Games Project</h1>
            </NavLink>
    );
}

export default Header;