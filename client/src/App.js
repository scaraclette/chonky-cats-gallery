import React from 'react';
import './App.css';
import Cats from './components/cats'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chonky Cats Gallery</h1>
      </header>
      <Cats />
      <div className="footer-custom">
      <p><a href="https://github.com/scaraclette/chonky-cats-gallery">Chonky Cats Gallery</a> 2020</p>
        <p>Is there a picture that's not supposed to be here? <br/> Email me at gustiscarlett@gmail.com to let me know!</p>
      </div>
    </div>
  );
}

export default App;
