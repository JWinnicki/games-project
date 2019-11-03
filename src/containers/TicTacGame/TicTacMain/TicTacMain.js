import React, { useState, useEffect, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './TicTacMain.scss';
import TicTacTile from '../TicTacTile/TicTacTile';
import { VictoryContext } from '../../../context/victory-context';

const TicTacMain = props => {

    const { getVictoryData, setShowModal } = useContext(VictoryContext);

    const [turn, setTurn] = useState('X');
    const [xArr, setXArr] = useState([]);
    const [oArr, setOArr] = useState([]);
    const [victory, setVictory] = useState(false);
    //const [winner, setWinner] = useState('');

    
    
    const checkIfVictory = useCallback(arr => {
        const correctConfiguration = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4 ,8],
            [2, 4 ,6]
        ];

        correctConfiguration.forEach(el => {
            if(arr.includes(el[0]) && arr.includes(el[1]) && arr.includes(el[2])) {
                setVictory(true);
                if(turn === 'X') {
                    //setWinner('O');
                    getVictoryData({ name: 'TicTac Game', player: 'O'});
                    console.log('wygrał O');
                } else {
                    //setWinner('X');
                    getVictoryData({ name: 'TicTac Game', player: 'X'});
                    console.log('wygrał X');
                }
                setShowModal(true);
            }
        });
    }, [turn, getVictoryData, setShowModal])

    useEffect(() => {
        /* console.log(xArr);
        console.log(oArr); */
        checkIfVictory(xArr);
        checkIfVictory(oArr);

        return () => {}
    }, [checkIfVictory, xArr, oArr]);

    const onClickHandler = id => {
        if(!victory) {
            if(turn === 'X') {
                setXArr(prev => [...prev, id]);
                setTurn('O');
            } else {
                setOArr(prev => [...prev, id]);
                setTurn('X');
            }
        }
    }

    const renderGrid = () => {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        //console.log(...arr);
        return arr.map(el => <TicTacTile victory={victory} id={el} onClickTile={onClickHandler} currentTurn={turn} key={el} />)
    }

    return (
        <div className='TicTacMain'>
            <div className='TicTacMain-container'>
                <div className='TicTacMain-controls'>
                    <div>Player 1</div>
                    <NavLink to='/' className='button TicTacMain-link'>Main Menu</NavLink>
                    <button className='button'>Reset</button>
                    <div>Player 2</div>
                </div>
                <div className='TicTacMain-grid'>
                    {renderGrid()}
                </div>
            </div>
        </div>
    );
}

export default TicTacMain;