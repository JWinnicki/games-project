import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <div className='Footer'>
            <Link to='/SVGAuthors' className='link SvgAuthorsLink'>SVG Authors</Link>
        </div>
    );
}

export default Footer;