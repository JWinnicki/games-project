import React, { useEffect, /* useState, */ useReducer, useCallback, useContext/* , useRef */ } from 'react';
import { NavLink } from 'react-router-dom';

import './SnakeGameMain.scss';
import SnakeFood from '../SnakeFood/SnakeFood';
import Snake from '../Snake/Snake';
import { VictoryContext } from '../../../context/victory-context';
import Icon from '../../../components/Icon/Icon';

const initialState = {
    foodPosition: [],
    direction: 'RIGHT',
    headPosition: [0, 2],
    snakeBody: [
        [0, 0]
    ],
    score: 0,
    levelNames: ['Slow', 'Medium', 'Fast'],
    levelValue: 1,
    start: false,
    finished: false,
    mobileControlsSide: 'right'
}

const snakeReducer = (prevState, action) => {
    switch(action.type) {
        case 'SET_FOOD_POSITION':
            return {
                ...prevState,
                foodPosition: action.foodPosition
            }
        case 'SET_DIRECTION':
            return {
                ...prevState,
                direction: action.direction
            }
        case 'SET_HEAD_POSITION':
            return {
                ...prevState,
                headPosition: action.headPosition
            }
        case 'SET_SNAKE_BODY':
            return {
                ...prevState,
                snakeBody: action.snakeBody
            }
        case 'ADD_BODY_COMPONENT':
            return {
                ...prevState,
                snakeBody: [...prevState.snakeBody, prevState.snakeBody[0]]
            }
        case 'RESET_GAME':
            return {
                ...prevState,
                foodPosition: [],
                direction: 'RIGHT',
                headPosition: [0, 2],
                snakeBody: [
                    [0, 0],
                ],
                score: 0,
                start: false,
                finished: false,
                mobileControlsSide: 'right'
            }
        case 'UPDATE_SCORE':
            return {
                ...prevState,
                score: prevState.score + 1
            }
        case 'SET_LEVEL':
            return {
                ...prevState,
                levelValue: prevState.levelValue + action.levelChange
            }
        case 'START_GAME':
            return {
                ...prevState,
                start: !prevState.start
            }
        case 'FINISH_GAME': {
            return {
                ...prevState,
                finished: true
            }
        }
        case 'CHANGE_MOBILE_SIDE': {
            return {
                ...prevState,
                mobileControlsSide: action.side
            }
        }
        default:
            throw new Error('Should never get there!');
    }
}

const SnakeGameMain = props => {

    //const playArea = useRef();
    const [ snakeState, dispatch ] = useReducer(snakeReducer, initialState);
    const { foodPosition, direction, headPosition, snakeBody, score, levelNames, levelValue, start, mobileControlsSide } = snakeState;

    const { getVictoryData, setShowModal } = useContext(VictoryContext);

    const getRandomNumber = useCallback(() => {
        let number1 = 0;
        let number2 = 0;
        const check = () => snakeBody.some(el => el[0] === number1 && el[1] === number2);
        do {
            number1 = Math.floor(Math.random() * 98);
            number2 = Math.floor(Math.random() * 98);
            if(number1 % 2 !== 0) {
                number1 = number1 + 1;
            }
            if(number2 % 2 !== 0) {
                number2 = number2 + 1;
            }
        } while(check());
        
        return [number1, number2]
    }, [snakeBody]);

    const onKeyDownHandler = e => {
        if(e.code === 'ArrowRight') {
            dispatch({ type: 'SET_DIRECTION', direction: 'RIGHT' });
        } else if(e.code === 'ArrowLeft') {
            dispatch({ type: 'SET_DIRECTION', direction: 'LEFT' });
        } else if(e.code === 'ArrowDown') {
            dispatch({ type: 'SET_DIRECTION', direction: 'DOWN' });
        } else if(e.code === 'ArrowUp') {
            dispatch({ type: 'SET_DIRECTION', direction: 'UP' });
        }
    }

    const checkIfHit = useCallback(() => {
        return snakeBody.some(el => el[0] === headPosition[0] && el[1] === headPosition[1]);
    }, [snakeBody, headPosition]);

    useEffect(()=> {
        dispatch({ type: 'RESET_GAME' });
        return () => {}
    }, [])

    useEffect(() => { //Zbieranie jedzenia i losowanie nowej pozycji jedzienia
        if(foodPosition[0] === headPosition[0] && foodPosition[1] === headPosition[1]) {
            dispatch({ type: 'ADD_BODY_COMPONENT' });
            dispatch({ type: 'UPDATE_SCORE' });
        }
    }, [headPosition, foodPosition]);

    useEffect(() => { // natychmiastowy ruch głowy w nowym kierunku
        if(headPosition[0] >= 0 && headPosition[0] <= 98 && headPosition[1] >= 0 && headPosition[1] <= 98 && !checkIfHit() && start) {
            
            if(direction === 'RIGHT') {
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] + 2] });
            } else if (direction === 'LEFT') {
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] - 2] });
            } else if (direction === 'UP') {
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] - 2, headPosition[1]] });
            } else if(direction === 'DOWN') {
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] + 2, headPosition[1]] });
            }

            const snakeBodyElements = snakeBody;
            snakeBodyElements.unshift([headPosition[0], headPosition[1]]);
            snakeBodyElements.pop();
            dispatch({ type: 'SET_SNAKE_BODY', snakeBody: snakeBodyElements});
        }
        return () => {};
        //only direction added on purpose
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction/* , snakeBody, start */]);

    useEffect(() => { // ruch snake'a w czasie
        let interval = '';
        let level = 0;
        if(levelValue === 0) {
            level = 200;
        } else if (levelValue === 1) {
            level = 100;
        } else {
            level = 50;
        }
        if(headPosition[0] >= 0 && headPosition[0] <= 98 && headPosition[1] >= 0 && headPosition[1] <= 98 && !checkIfHit() && start) {
            interval = setInterval(() => {
                
                if(direction === 'RIGHT') {
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] + 2] });
                } else if (direction === 'LEFT') {
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] - 2] });
                } else if (direction === 'UP') {
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] - 2, headPosition[1]] });
                } else {
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] + 2, headPosition[1]] });
                }

                const snakeBodyElements = snakeBody;
                snakeBodyElements.unshift([headPosition[0], headPosition[1]]);
                snakeBodyElements.pop();
                dispatch({ type: 'SET_SNAKE_BODY', snakeBody: snakeBodyElements});
            }, level);
        }
        return () => clearInterval(interval);
    }, [headPosition, direction, snakeBody, checkIfHit, levelValue, start]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        return () => document.removeEventListener('keydown', onKeyDownHandler)
    }, []);

    useEffect(() => {
        dispatch({ type: 'SET_FOOD_POSITION', foodPosition: getRandomNumber() })
    }, [getRandomNumber]);

    useEffect(() => { // Sprawdzenie czy koniec / pokazanie modala
        if(headPosition[0] < 0 || headPosition[0] > 98 || headPosition[1] < 0 || headPosition[1] > 98) {
            getVictoryData({ name: 'Snake Game', score: score });
            setShowModal(true);
        }
        const timeOut = setTimeout(() => {
            if(start && checkIfHit()) {
                getVictoryData({ name: 'Snake Game', score: score });
                setShowModal(true);
            }
        }, 300);

        return () => clearTimeout(timeOut);
    }, [headPosition, getVictoryData, setShowModal, score, checkIfHit, start]);

    const setLevelHandler = value => {
        if( (levelValue > 0 && levelValue < 2) || (levelValue === 2 && value === -1) || (levelValue === 0 && value === 1) ) {
            dispatch({ type: 'SET_LEVEL', levelChange: Number(value) });
        }
    }

    const onResetGame = () => {
        dispatch({ type: 'RESET_GAME' });
    }

    const onStartGame = () => {
        dispatch({ type: 'START_GAME' });
    }

    const onMobileControlsHandlng = direction => {
        dispatch({ type: 'SET_DIRECTION', direction: direction });
    }

    const onMobileControlsSideHandler = () => {
        if(mobileControlsSide === 'right') {
            dispatch({ type: 'CHANGE_MOBILE_SIDE', side: 'left' });
        } else {
            dispatch({ type: 'CHANGE_MOBILE_SIDE', side: 'right' });
        }
    }

    return (
        <div className='SnakeGameMain'>
            <div className='SnakeGameMain-container'>
                <div className='SnakeGameMain-controls'>
                    <button className='button' onClick={onStartGame}>{start ? 'Pause' : 'Start'}</button>
                    <button className='button' onClick={onResetGame}>Reset</button>
                    <NavLink className='link button' to='/'>Main Menu</NavLink>
                    <div className='SnakeGameMain-levelDiv'>
                        <button className='SnakeGameMain-LevelButton' onClick={() => setLevelHandler(-1)}>-</button>
                        <p className='SnakeGameMain-p'>{levelNames[levelValue]}</p>
                        <button className='SnakeGameMain-LevelButton' onClick={() => setLevelHandler(1)}>+</button>
                    </div>
                    <div className='SnakeGameMain-scoreDiv'>
                        <p className='SnakeGameMain-p'>Score: {score}</p>
                    </div>
                </div>
                <div className='SnakeGameMain-playArea'>
                    <Snake top={headPosition[0]} left={headPosition[1]} body={snakeBody} />
                    <SnakeFood top={foodPosition[0]} left={foodPosition[1]} />
                </div>
                <div className='SnakeGameMain-mobileControlsDiv' style={mobileControlsSide === 'right' ? {right: 0} : {left: 0}} >
                    <div className='SnakeGameMain-mobileControlsGrid'>
                        <button className='SnakeGameMain-mobileButton up' onClick={() => onMobileControlsHandlng('UP')}>
                            <Icon icon='arrow' size='tiny' rotate='deg270' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton left' onClick={() => onMobileControlsHandlng('LEFT')}>
                            <Icon icon='arrow' size='tiny' rotate='deg180' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton right' onClick={() => onMobileControlsHandlng('RIGHT')}>
                            <Icon icon='arrow' size='tiny' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton down' onClick={() => onMobileControlsHandlng('DOWN')}>
                            <Icon icon='arrow' size='tiny' rotate='deg90' color='white' />
                        </button>
                    </div>
                    <button className='SnakeGameMain-mobileToggleButton' onClick={onMobileControlsSideHandler}>Change side</button>
                </div>
                <div className='SnakeGameMain-mobileControlsDivBottom' >
                    <div className='SnakeGameMain-mobileControlsGrid'>
                        <button className='SnakeGameMain-mobileButton up' onClick={() => onMobileControlsHandlng('UP')}>
                            <Icon icon='arrow' size='tiny' rotate='deg270' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton left' onClick={() => onMobileControlsHandlng('LEFT')}>
                            <Icon icon='arrow' size='tiny' rotate='deg180' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton right' onClick={() => onMobileControlsHandlng('RIGHT')}>
                            <Icon icon='arrow' size='tiny' color='white' />
                        </button>
                        <button className='SnakeGameMain-mobileButton down' onClick={() => onMobileControlsHandlng('DOWN')}>
                            <Icon icon='arrow' size='tiny' rotate='deg90' color='white' />
                        </button>
                    </div>
                    <button className='SnakeGameMain-mobileToggleButton' onClick={onMobileControlsSideHandler}>Change side</button>
                </div>
            </div>
        </div>
    );
}

export default SnakeGameMain;