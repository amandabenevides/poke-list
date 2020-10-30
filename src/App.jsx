import React from 'react';
import './global.css';
import Main from './pages/Main.jsx';
import PokemonProvider from './context/PokemonContext';
import PokemonNavbar from './components/PokemonNavbar/PokemonNavbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PokemonProvider>
          <PokemonNavbar />
          <Main />
        </PokemonProvider>
      </header>
    </div>
  );
}

export default App;
