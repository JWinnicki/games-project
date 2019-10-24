import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import { HashRouter } from 'react-router-dom';

import VictoryContextProvider from './context/victory-context';

const app = (
    <HashRouter>
        <VictoryContextProvider>
            <App />
        </VictoryContextProvider>
    </HashRouter>
);

ReactDOM.render(app, document.getElementById('root'));

