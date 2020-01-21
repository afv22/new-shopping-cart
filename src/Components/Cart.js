import React, { useState } from 'react';
import 'rbx/index.css';
import { Container, Title, Button } from 'rbx';
import ReactDOM from 'react-dom'

const Cart = ({ 
    cartProducts, 
    setCart, 
    display, 
    setDisplay, 
    direction, 
    setDirection }) => {

    return (
        <Container className='cart'>
            <Arrow 
                direction={direction} 
                setDirection={setDirection} 
                setDisplay={setDisplay} />
            <Container className='cart-wrap' style={{ 'display': display }}>
                <Title className='title'>Cart</Title>
                <br/>
                <CartProductWrap 
                    display={display} 
                    cartProducts={cartProducts} 
                    setCart={setCart} />
            </Container>
        </Container>
    );
}

const Arrow = ({ 
    direction, 
    setDirection, 
    setDisplay }) => {

    const ButtonClick = () => {
        if (direction === '>') {
            setDirection('<');
            setDisplay('none');
        } else {
            setDirection('>');
            setDisplay('block');
        }
    };

    return (
        <Button className='cart-arrow' size='large' onClick={ButtonClick}>
            {direction}
        </Button>
    );
}

const CartProductWrap = ({ 
    cartProducts, 
    setCart, 
    display }) => {

    return (
        <Container id='cart-product-wrap'>
            {Object.keys(cartProducts).map(product =>
                <CartProduct key={cartProducts[product].product.sku} display={display} product={cartProducts[product]} cartProducts={cartProducts} setCart={setCart} />
            )}
        </Container>
    );
}

const CartProduct = ({ product, cartProducts, setCart, display }) => {
    const RemoveItem = () => {
        if (!(String(product.product.sku) in cartProducts)) {
            return;
        }

        var currCart = cartProducts;
        currCart[String(product.product.sku)].count -= 1;
        if (currCart[String(product.product.sku)].count < 1) {
            delete currCart[String(product.product.sku)];
        }
        setCart(currCart);
        CartRender({ cartProducts, setCart, display });
    }

    return (
        <Container className='cart-product'>
            <br/>
            <Button className='cart-product-button' onClick={ RemoveItem }>X</Button>>
            <Title className='cart-product-title' size={6}>{'Count: '.concat(product.count, ' - ', product.product.title, ' - ', product.product.currencyFormat, product.product.price)}</Title>
        </Container>
    );
}

const CartRender = ({ cartProducts, setCart, display }) => {
    ReactDOM.render(<CartProductWrap cartProducts={ cartProducts } setCart={ setCart } display={ display }/>, document.getElementById('cart-product-wrap'))
}

export default Cart;
export { CartRender };