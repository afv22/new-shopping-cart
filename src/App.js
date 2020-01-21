import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Container } from 'rbx';
import ProductShelf from './Components/ProductShelf';
import './Components/ProductShelf.css';
import Cart from './Components/Cart';
import './Components/Cart.css';

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
// const db = firebase.database().ref();

const App = () => {
    const [data, setData] = useState({});
    const products = Object.values(data);
    const [cartProducts, setCart] = useState({});
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('./data/products.json');
            const json = await response.json();
            setData(json);
        };
        fetchProducts();
    }, []);

    return (
        <Container className='page-wrap'>
            <ProductShelf cartProducts={ cartProducts } setCart={ setCart } products={ products } display={ display }/>
            <Cart cartProducts={ cartProducts } setCart={ setCart } display={ display } setDisplay={ setDisplay }/>
        </Container>
    );
};

export default App;

