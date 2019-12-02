import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
            <div className='Header'>
                <h1 className='Header-h1'>
                    <NavLink to='/' className='link Header-link'>
                        Games Project
                    </NavLink>
                </h1>
            </div>
    );
}

export default Header;