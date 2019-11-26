import React from 'react';

import './AuthorsMain.scss';
import Icon from '../Icon/Icon';

const AuthorsMain = () => {
    return (
        <div className='AuthorsMain'>
            <div className='AuthorsMain-container'>
                <div className='IconInfo'>
                    <Icon icon='snake' size='medium' />
                    <div className='IconInfo-info'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
                <div className='IconInfo'>
                    <Icon icon='card' size='medium' />
                    <div className='IconInfo-info'>Icons made by <a href="https://www.flaticon.com/authors/ddara" title="dDara">dDara</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
                </div>
                <div className='IconInfo'>
                    <Icon icon='tic-tac-toe' size='medium' />
                    <div className='IconInfo-info'>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
                </div>
            </div>
        </div>
    );
}

export default AuthorsMain;