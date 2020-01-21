import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Container, Title, Message, Button } from 'rbx';
import ProductShelf from './Components/ProductShelf';
import './Components/ProductShelf.css';
import Cart from './Components/Cart'; 
import './Components/Cart.css';
import UserBanner from './Components/UserBanner';

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

const App = () => {
    const [data, setData] = useState({});
    const products = Object.values(data);
    const [cartProducts, setCart] = useState({});
    const [cartDisplay, setCartDisplay] = useState('none');
    const [arrowDirection, setArrowDirection] = useState('<');
    const [inventory, setInventory] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const dataResponse = await fetch('./data/products.json');
            const dataJson = await dataResponse.json();
            setData(dataJson);
        };
        fetchProducts();

        db.once('value').then( snap => {
            setInventory(snap.val());
        })
    }, []);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);

    return (
        <Container className='page-wrap'>
            <br/>
            <Title size={1}>SK8R BOI STYL</Title>
            <UserBanner user={ user }/>

            <ProductShelf 
                cartProducts={ cartProducts } 
                setCart={ setCart } 
                products={ products } 
                display={ cartDisplay }
                inventory={ inventory }
                setInventory={ setInventory }/>
            
            <Cart 
                cartProducts={ cartProducts } 
                setCart={ setCart } 
                display={ cartDisplay } 
                setDisplay={ setCartDisplay }
                direction={ arrowDirection }
                setDirection={ setArrowDirection }
                inventory={ inventory }
                setInventory={ setInventory }/>
        </Container>
    );
};

export default App;
