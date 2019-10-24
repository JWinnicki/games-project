import React, { useState, useCallback } from 'react';

export const VictoryContext = React.createContext({
    showModal: false,
    setShowModal: () => {},
    victoryData: {},
    getVictoryData: () => {}
});

const VictoryContextProvider = props => {

    const [ showModal, setShowModal ] = useState(false);
    const [ victoryData, setVictoryData ] = useState({ name: '' });

    const showModalHandler = useCallback(boolean => {
        setShowModal(boolean);
    }, [])

    const getVictoryData = useCallback(dataObj => {
        setVictoryData(dataObj)
    }, [])
    return (
        <VictoryContext.Provider value={{ setShowModal: showModalHandler, showModal: showModal, victoryData: victoryData, getVictoryData: getVictoryData }}>
            {props.children}
        </VictoryContext.Provider>
    );
}

export default VictoryContextProvider;