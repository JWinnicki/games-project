import React, { /* useState, useCallback */ } from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Header from '../components/Header/Header';
import Main from './Main/Main';
import Footer from '../components/Footer/Footer';
import MemoryMain from './MemoryGame/MemoryMain/MemoryMain';
import Modal from '../components/Modal/Modal';

const App = () => {

  return (
    <div className="App">
      <Modal />
      <header>
        <Header />
      </header>
      <main>
        <Route path='/MemoryGame' component={MemoryMain} />
        <Route path='/' exact component={Main} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

/* SVG authors
1. Memory card: <div>Icons made by <a href="https://www.flaticon.com/authors/ddara" title="dDara">dDara</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
2. Card backside: <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
3. Reset arrow: <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
4. Back arrow: <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flat7icon.com</a></div>
*/