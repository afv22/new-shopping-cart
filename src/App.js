import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD3HB4Nj8bbp5JaTxM0VyUee3o7L6u9oec",
    authDomain: "new-shopping-cart-998c8.firebaseapp.com",
    databaseURL: "https://new-shopping-cart-998c8.firebaseio.com",
    projectId: "new-shopping-cart-998c8",
    storageBucket: "new-shopping-cart-998c8.appspot.com",
    messagingSenderId: "926357769629",
    appId: "1:926357769629:web:42055e15ab7a4513497374"
};  

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
