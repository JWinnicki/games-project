import React, { useEffect, useState } from 'react';

import './SnakeGameMain.scss';
import SnakeFood from '../SnakeFood/SnakeFood';
import Snake from '../Snake/Snake';

const SnakeGameMain = props => {

    const [ foodPosition, setFoodPosition ] = useState([]);
    const [ direction, setDirection ] = useState('RIGHT');
    const [ headPosition, setHeadPosition ] = useState([0, 2]);

    const getRandomNumber = () => {
        let number1 = Math.floor(Math.random() * 98);
        let number2 = Math.floor(Math.random() * 98);
        if(number1 % 2 !== 0) {
            number1 = number1 + 1;
        }
        if(number2 % 2 !== 0) {
            number2 = number2 + 1;
        }
        return [number1, number2]
    }

    const onKeyDownHandler = e => {
        if(e.code === 'ArrowRight') {
            setDirection('RIGHT');
        } else if(e.code === 'ArrowLeft') {
            setDirection('LEFT');
        } else if(e.code === 'ArrowDown') {
            setDirection('DOWN');
        } else if(e.code === 'ArrowUp') {
            setDirection('UP');
        }
    }

    useEffect(() => { //Zbieranie jedzenia i losowanie nowej pozycji jedzienia
        if(foodPosition[0] === headPosition[0] && foodPosition[1] === headPosition[1]) {
            setFoodPosition(getRandomNumber());
        }
    }, [headPosition, foodPosition])

    useEffect(() => { // natychmiastowy ruch w nowym kierunku
        if(direction === 'RIGHT') {
            setHeadPosition(prev => [prev[0], prev[1] + 2]);
        } else if (direction === 'LEFT') {
            setHeadPosition(prev => [prev[0], prev[1] - 2]);
        } else if (direction === 'UP') {
            setHeadPosition(prev => [prev[0] - 2, prev[1]]);
        } else {
            setHeadPosition(prev => [prev[0] + 2, prev[1]]);
        }
        
        return () => {};
    }, [direction]);

    useEffect(() => { // ruch snake'a w czasie
        let interval = ''
        if(headPosition[0] >= 0 && headPosition[0] <= 98 && headPosition[1] >= 0 && headPosition[1] <= 98) {
            interval = setInterval(() => {
                if(direction === 'RIGHT') {
                    setHeadPosition(prev => [prev[0], prev[1] + 2]);
                } else if (direction === 'LEFT') {
                    setHeadPosition(prev => [prev[0], prev[1] - 2]);
                } else if (direction === 'UP') {
                    setHeadPosition(prev => [prev[0] - 2, prev[1]]);
                } else {
                    setHeadPosition(prev => [prev[0] + 2, prev[1]]);
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [headPosition, direction]);

    /* useEffect(() => {
        const interval = setInterval(() => {
            setColor(prev => !prev);
            console.log(color);
        }, 1000)
        return () => clearInterval(interval);
    }, [color]) */

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        return () => document.removeEventListener('keydown', onKeyDownHandler)
    }, []);

    useEffect(() => {
        setFoodPosition(getRandomNumber());
        console.log('losowanie pozycji jedzenia');
    }, []);

    return (
        <div className='SnakeGameMain'>
            <div className='SnakeGameMain-container'>
                <div className='SnakeGameMain-playArea'>
                    <Snake top={headPosition[0]} left={headPosition[1]} />
                    <SnakeFood top={foodPosition[0]} left={foodPosition[1]} />
                </div>
            </div>
        </div>
    );
}

export default SnakeGameMain;