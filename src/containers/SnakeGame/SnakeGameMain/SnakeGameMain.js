import React, { useEffect, /* useState, */ useReducer, useCallback } from 'react';

import './SnakeGameMain.scss';
import SnakeFood from '../SnakeFood/SnakeFood';
import Snake from '../Snake/Snake';

const initialState = {
    foodPosition: [],
    direction: 'RIGHT',
    headPosition: [0, 4],
    snakeBody: [
        [0, 2]
    ]
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
                foodPosition: [],
                direction: 'RIGHT',
                headPosition: [0, 4],
                snakeBody: [
                    [0, 2],
                ]  
            }
        default:
            throw new Error('Should never get there!');
    }
}

const SnakeGameMain = props => {

    const [ snakeState, dispatch ] = useReducer(snakeReducer, initialState);
    const { foodPosition, direction, headPosition, snakeBody } = snakeState;

    //const [ foodPosition, setFoodPosition ] = useState([]);
    //const [ direction, setDirection ] = useState('RIGHT');
    //const [ headPosition, setHeadPosition ] = useState([0, 2]);
    //const [ snakeBody, setSnakeBody ] = useState([[0, 0]]);

    const getRandomNumber = useCallback(() => {
        let number1 = 0;
        let number2 = 0;
        const check = () => snakeBody.some(el => el[0] === number1 && el[1] === number2);
        let i = 0;
        do {
            number1 = Math.floor(Math.random() * 98);
            number2 = Math.floor(Math.random() * 98);
            if(number1 % 2 !== 0) {
                number1 = number1 + 1;
            }
            if(number2 % 2 !== 0) {
                number2 = number2 + 1;
            }
            i++;
            console.log(i);
        } while(check());
        
        return [number1, number2]
    }, [snakeBody]);

    const onKeyDownHandler = e => {
        if(e.code === 'ArrowRight') {
            //setDirection('RIGHT');
            dispatch({ type: 'SET_DIRECTION', direction: 'RIGHT' });
        } else if(e.code === 'ArrowLeft') {
            //setDirection('LEFT');
            dispatch({ type: 'SET_DIRECTION', direction: 'LEFT' });
        } else if(e.code === 'ArrowDown') {
            //setDirection('DOWN');
            dispatch({ type: 'SET_DIRECTION', direction: 'DOWN' });
        } else if(e.code === 'ArrowUp') {
            //setDirection('UP');
            dispatch({ type: 'SET_DIRECTION', direction: 'UP' });
        }
    }

    const checkIfHit = useCallback(() => {
        return snakeBody.some(el => el[0] === headPosition[0] && el[1] === headPosition[1]);
    }, [snakeBody, headPosition]);

    useEffect(()=> {
        dispatch({ type: 'RESET_GAME' });
        console.log('reset gry');
        return () => {}
    }, [])

    useEffect(() => { //Zbieranie jedzenia i losowanie nowej pozycji jedzienia
        if(foodPosition[0] === headPosition[0] && foodPosition[1] === headPosition[1]) {
            //setFoodPosition(getRandomNumber());
            //dispatch({ type: 'SET_FOOD_POSITION', foodPosition: getRandomNumber() });
            dispatch({ type: 'ADD_BODY_COMPONENT' });
        }
    }, [headPosition, foodPosition/* , getRandomNumber */]);

    useEffect(() => { // natychmiastowy ruch głowy w nowym kierunku
        //setSnakeBody([ [snakeState.headPosition[0], snakeState.headPosition[1]] ]);
        /* const checkIfHit = () => {
            return snakeBody.some(el => el[0] === headPosition[0] && el[1] === headPosition[1]);
        } */

        if(headPosition[0] >= 0 && headPosition[0] <= 98 && headPosition[1] >= 0 && headPosition[1] <= 98 && !checkIfHit()) {
            const snakeBodyElements = snakeBody;
            snakeBodyElements.unshift([headPosition[0], headPosition[1]]);
            snakeBodyElements.pop();
            dispatch({ type: 'SET_SNAKE_BODY', snakeBody: snakeBodyElements});
    
            if(direction === 'RIGHT') {
                //setHeadPosition(prev => [prev[0], prev[1] + 2]);
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] + 2] });
            } else if (direction === 'LEFT') {
                //setHeadPosition(prev => [prev[0], prev[1] - 2]);
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] - 2] });
            } else if (direction === 'UP') {
                //setHeadPosition(prev => [prev[0] - 2, prev[1]]);
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] - 2, headPosition[1]] });
            } else {
                //setHeadPosition(prev => [prev[0] + 2, prev[1]]);
                dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] + 2, headPosition[1]] });
            }
        }
        return () => {};
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction, snakeBody]);

    useEffect(() => { // ruch snake'a w czasie
        let interval = '';
        /* const checkIfHit = () => {
            return snakeBody.some(el => el[0] === headPosition[0] && el[1] === headPosition[1]);
        } */
        if(headPosition[0] >= 0 && headPosition[0] <= 98 && headPosition[1] >= 0 && headPosition[1] <= 98 && !checkIfHit()) {
            interval = setInterval(() => {
                //setSnakeBody([ [snakeState.headPosition[0], snakeState.headPosition[1]] ]);

                


                const snakeBodyElements = snakeBody;
                snakeBodyElements.unshift([headPosition[0], headPosition[1]]);
                snakeBodyElements.pop();
                dispatch({ type: 'SET_SNAKE_BODY', snakeBody: snakeBodyElements});


                if(direction === 'RIGHT') {
                    //setHeadPosition(prev => [prev[0], prev[1] + 2]);
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] + 2] });
                } else if (direction === 'LEFT') {
                    //setHeadPosition(prev => [prev[0], prev[1] - 2]);
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0], headPosition[1] - 2] });
                } else if (direction === 'UP') {
                    //setHeadPosition(prev => [prev[0] - 2, prev[1]]);
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] - 2, headPosition[1]] });
                } else {
                    //setHeadPosition(prev => [prev[0] + 2, prev[1]]);
                    dispatch({ type: 'SET_HEAD_POSITION', headPosition: [headPosition[0] + 2, headPosition[1]] });
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [headPosition, direction, snakeBody, checkIfHit]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        return () => document.removeEventListener('keydown', onKeyDownHandler)
    }, []);

    useEffect(() => {
        //setFoodPosition(getRandomNumber());
        dispatch({ type: 'SET_FOOD_POSITION', foodPosition: getRandomNumber() })
        //console.log('losowanie pozycji jedzenia');
    }, [getRandomNumber]);

    return (
        <div className='SnakeGameMain'>
            <div className='SnakeGameMain-container'>
                <div className='SnakeGameMain-playArea'>
                    <Snake top={headPosition[0]} left={headPosition[1]} body={snakeBody} />
                    <SnakeFood top={foodPosition[0]} left={foodPosition[1]} />
                </div>
            </div>
        </div>
    );
}

export default SnakeGameMain;