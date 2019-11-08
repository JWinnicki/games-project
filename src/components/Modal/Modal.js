import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { VictoryContext } from '../../context/victory-context';
import './Modal.scss';

const Modal = props => {

    const { showModal, setShowModal, victoryData } = useContext(VictoryContext);

    const renderMessage = () => {
        if(victoryData) {
            if(victoryData.name === 'Memory Game') {
                return (
                    <React.Fragment>
                        <p className='Modal-message_p'>You finished {victoryData.name} in {victoryData.steps} steps and {victoryData.time} seconds!</p>
                    </React.Fragment>
                );
            } else if(victoryData.name === 'TicTac Game') {
                return (
                    <React.Fragment>
                        <p className='Modal-message_p'>{victoryData.player} won!</p>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <p className='Modal-message_p'>Lorem ipsum</p>
                    </React.Fragment>
                );
            }
        }
        
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className={`Modal ${showModal ? 'Modal-active' : ''}`}>
            <div className='Modal-backdrop' onClick={closeModal}></div>
            <div className='Modal-body'>
                <div className='Modal-titleDiv'>
                    <h1 className='Modal-h1'>Victory!</h1>
                </div>
                <div className='Modal-message'>
                    {renderMessage()}
                    <div className='Modal-controls'>
                        <NavLink className='button Modal-link' to='/' onClick={closeModal}>Main Menu</NavLink>
                        <button className='button' onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Modal;