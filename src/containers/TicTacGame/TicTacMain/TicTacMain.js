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
    const [shouldReset, setShouldReset] = useState(false);
    const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
    const [secondPlayerName, setSecondPlayerName] = useState('Player 2');
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
                    getVictoryData({ name: 'TicTac Game', player: secondPlayerName});
                } else {
                    getVictoryData({ name: 'TicTac Game', player: firstPlayerName});
                }
                setShowModal(true);
            }
        });
    }, [turn, getVictoryData, setShowModal, firstPlayerName, secondPlayerName])

    useEffect(() => {
        checkIfVictory(xArr);
        checkIfVictory(oArr);

        return () => {}
    }, [checkIfVictory, xArr, oArr]);

    useEffect(() => {
        if(shouldReset) {
            setShouldReset(false);
            setTurn('X');
            setXArr([]);
            setOArr([]);
            setVictory(false);
        }
    }, [shouldReset])

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
        return arr.map(el => <TicTacTile reset={shouldReset} victory={victory} id={el} onClickTile={onClickHandler} currentTurn={turn} key={el} />)
    }

    return (
        <div className='TicTacMain'>
            <div className='TicTacMain-container'>
                <div className='TicTacMain-controls'>
                    <div>
                        <input className={`TicTacMain-input ${turn === 'X' ? 'TicTacMain-input--active' : ''}`} value={firstPlayerName} onChange={e => setFirstPlayerName(e.target.value)} />
                    </div>
                    <NavLink to='/' className='button TicTacMain-link'>Main Menu</NavLink>
                    <button className='button' onClick={() => setShouldReset(true)}>Reset</button>
                    <div>
                        <input className={`TicTacMain-input ${turn === 'O' ? 'TicTacMain-input--active' : ''}`} value={secondPlayerName} onChange={e => setSecondPlayerName(e.target.value)} />
                    </div>
                </div>
                <div className='TicTacMain-grid'>
                    {renderGrid()}
                </div>
            </div>
        </div>
    );
}

export default TicTacMain;