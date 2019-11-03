import React from 'react';

import MainMenuItem from '../../components/MainMenuItem/MainMenuItem';
import './Main.scss';

const Main = props => {
    return (
        <div className='Main'>
            <MainMenuItem icon='card' title='Memory game' to='/MemoryGame' />
            <MainMenuItem icon='tic-tac-toe' title='Tic Tac game' to='/TicTacGame' />
            <MainMenuItem icon='card' title='Memory game' to='/' />
        </div>
    );
}

export default Main;