import React from 'react';
import './App.css';
import Main from './pages/Main.jsx';
import PokemonProvider from '../src/context/PokemonContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PokemonProvider>
        <Main />
      </PokemonProvider>
      </header>
    </div>
  );
}

export default App;
