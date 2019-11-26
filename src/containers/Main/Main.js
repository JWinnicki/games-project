import React from 'react';

import MainMenuItem from '../../components/MainMenuItem/MainMenuItem';
import './Main.scss';

const Main = props => {
    return (
        <div className='Main'>
            <MainMenuItem icon='snake' title='Snake Game' to='/SnakeGame' />
            <MainMenuItem icon='card' title='Memory Game' to='/MemoryGame' />
            <MainMenuItem icon='tic-tac-toe' title='Tic Tac Game' to='/TicTacGame' />
        </div>
    );
}

export default Main;