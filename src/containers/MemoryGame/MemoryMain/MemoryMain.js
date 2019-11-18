import React, { useEffect, useContext, useReducer } from 'react';
import { NavLink } from 'react-router-dom';

import { VictoryContext } from '../../../context/victory-context';
import './MemoryMain.scss';
import Card from '../Card/Card';

const initialState = {
    colorsArr: ['red', 'green', 'yellow', 'purple', 'orange', 'black', 'grey', 'blue'],
    shuffledArr: [],
    picksArr: [],
    guessedCards: [],
    shouldHide: false,
    disabled: false,
    startTimer: false,
    timer: 0,
    shouldReset: false,
    counter: 0,
    victory: false
};

const memoryReducer = (prevState, action) => {
    switch(action.type) {
        case 'SHUFFLE_ARR':
            return {
                ...prevState,
                shuffledArr: action.array
            }
        case 'UPDATE_PICKS_ARR':
            return {
                ...prevState,
                picksArr: [...prevState.picksArr, action.cardInfo]
            }
        case 'RESET_PICKS_ARR':
            return {
                ...prevState,
                picksArr: []
            }
        case 'UPDATE_GUESSED_ARR':
            return {
                ...prevState,
                guessedCards: [...prevState.guessedCards, action.cardInfo]
            }
        case 'SET_SHOULD_HIDE': 
            return {
                ...prevState,
                shouldHide: action.shouldHide
            }
        case 'SET_DISABLED':
            return {
                ...prevState,
                disabled: action.disabled
            }
        case 'START_TIMER':
            return {
                ...prevState,
                startTimer: action.startTimer
            }
        case 'SET_TIMER':
            return {
                ...prevState,
                timer: prevState.timer + 1
            }
        case 'SET_RESET':
            return {
                ...prevState,
                shuffledArr: [],
                picksArr: [],
                guessedCards: [],
                shouldHide: false,
                disabled: false,
                startTimer: false,
                timer: 0,
                shouldReset: true,
                counter: 0,
                victory: false
            }
        case 'SET_SHOULD_RESET':
            return {
                ...prevState,
                shouldReset: action.shouldReset
            }
        case 'SET_COUNTER':
            return {
                ...prevState,
                counter: prevState.counter + 1
            }
        case 'SET_VICTORY':
            return {
                ...prevState,
                victory: action.setVictory
            }
        case 'RESET_COUNTER':
            return {
                ...prevState,
                counter: 0
            }
        case 'RESET_TIMER':
            return {
                ...prevState,
                timer: 0
            }
        default:
            throw new Error('Should never get there!');
    }   
}

const MemoryMain = props => {

    const [ memoryState, dispatch ] = useReducer(memoryReducer, initialState);


    const { getVictoryData, setShowModal } = useContext(VictoryContext);

    useEffect(() => {
        const colorsMerged = [...memoryState.colorsArr, ...memoryState.colorsArr];
        shuffleArray(colorsMerged);
        dispatch({ type: 'SET_SHOULD_RESET',  shouldReset: false});
    }, [memoryState.colorsArr, memoryState.shouldReset]);

    useEffect(() => {
        let timer2 = undefined;
        if(memoryState.startTimer) {
            timer2 = setInterval(() => {
                dispatch({ type: 'SET_TIMER' });
            }, 1000);
        }

        return () => clearInterval(timer2);
    }, [memoryState.startTimer]);

    useEffect(() => {
        if(memoryState.picksArr.length === 2) {
            dispatch({ type: 'SET_COUNTER' });
        }
    }, [memoryState.picksArr]);

    useEffect(() => {
        if(memoryState.guessedCards.length === memoryState.colorsArr.length) {
            dispatch({ type: 'START_TIMER', startTimer: false });
            dispatch({ type: 'SET_VICTORY', setVictory: true });
        };
    }, [memoryState.guessedCards, memoryState.colorsArr])

    useEffect(() => {
        if(memoryState.victory) {
            getVictoryData({ name: 'Memory Game', steps: memoryState.counter, time: memoryState.timer});
            setTimeout(() => {
                setShowModal(true);
            }, 500);
        }
        return () => {}
    }, [memoryState.victory, memoryState.timer, memoryState.counter, getVictoryData, setShowModal])

    const getCardInfo = cardInfo => {
        if(!memoryState.startTimer) {
            dispatch({ type: 'START_TIMER', startTimer: true });
        }
        if(memoryState.picksArr.length < 2) {
            dispatch({ type: 'UPDATE_PICKS_ARR', cardInfo: cardInfo });
            if(memoryState.picksArr[0] === cardInfo) {
                dispatch({ type: 'UPDATE_GUESSED_ARR', cardInfo: cardInfo });
                dispatch({ type: 'SET_DISABLED', disabled: true });
                setTimeout(() => {
                    dispatch({ type: 'SET_SHOULD_HIDE', shouldHide: true });
                    dispatch({ type: 'SET_DISABLED', disabled: false });
                }, 800);
            } else {
                if(memoryState.picksArr.length > 0) {
                    dispatch({ type: 'SET_DISABLED', disabled: true });
                    setTimeout(() => {
                        dispatch({ type: 'SET_SHOULD_HIDE', shouldHide: true });
                        dispatch({ type: 'SET_DISABLED', disabled: false });
                    }, 800);
                }
            }

        } else if(memoryState.picksArr.length === 2) {
            dispatch({ type: 'SET_SHOULD_HIDE', shouldHide: false });
            dispatch({ type: 'RESET_PICKS_ARR' });
            dispatch({ type: 'UPDATE_PICKS_ARR', cardInfo: cardInfo });
        }
    }

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        dispatch({ type: 'SHUFFLE_ARR', array: array });
    }

    const resetGame = () => {
        dispatch({ type: 'SET_RESET' });
    }

    const renderCards = () => {
        return memoryState.shuffledArr.map((el, index) => {
            let animation = '';
            if(index === 1 || index === 5 || index === 9 || index === 13) {
                animation = 'secondCard';
            } else if(index === 2 || index === 6 || index === 10 || index === 14) {
                animation = 'thirdCard';
            } else if (index === 3 || index === 7 || index === 11 || index === 15) {
                animation = 'lastCard'
            }
            return <Card key={index} color={el} animation={animation} getCardInfo={getCardInfo} pickedCards={memoryState.picksArr} shouldHide={memoryState.shouldHide} disabled={memoryState.disabled} guessedCards={memoryState.guessedCards} shouldReset={memoryState.shouldReset} />
        });
    };
    return (
        <div className='MemoryMain'>
            <div className='MemoryMain-container'>
                <div className='MemoryMain-controls'>
                    <NavLink className='link button' to='/'>Main Menu</NavLink>
                    <button onClick={resetGame} className='button'>Reset</button>
                    <div>
                        <p className='MemoryMain-text'>Steps: {memoryState.counter}</p>
                    </div>
                    <div>
                        <p className='MemoryMain-text'>Time: {memoryState.timer}</p>
                    </div>
                </div>
                <div className='MemoryMain-grid'>
                    {renderCards()}
                </div>
            </div>
        </div>
    );
}

export default MemoryMain;

/* 
<Icon icon='back-arrow' size='small' />
                        <div>
                            {<Icon icon='refresh' size='small' />}
                            {<p>Reset</p>}
                        </div> */


    /* const [colorsArr] = useState(['red', 'green', 'yellow', 'purple', 'orange', 'black', 'grey', 'blue']);
    const [shuffledArr, setShuffledArr] = useState([]);
    const [picksArr, setPicksArr] = useState([]);
    const [guessedCards, setGuessedCards] = useState([]);
    const [shouldHide, setShouldHide] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [timer, setTimer] = useState(0);
    const [shouldReset, setShouldReset] = useState(false);
    const [counter, setCounter] = useState(0);
    const [victory, setVictory] = useState(false); */