import React, { useState } from 'react';
import 'rbx/index.css';
import { Container, Title, Button } from 'rbx';
import ReactDOM from 'react-dom'

const cartFuck = ({ cartProducts, setCart, display }) => {
    ReactDOM.render(<CartProductWrap cartProducts={ cartProducts } setCart={ setCart } display={ display }/>, document.getElementById('fuck-this'))
}

const Arrow = ({ direction, setDirection, setDisplay }) => {
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
        // cartFuck({ cartProducts, setCart, display });
    }

    return (
        <Container className='cart-product'>
            <Button onClick={ RemoveItem }>X</Button>>
            <Title size={6}>{'Count: '.concat(product.count, ' - ', product.product.title, ' - ', product.product.currencyFormat, product.product.price)}</Title>
        </Container>
    );
}

const CartProductWrap = ({ cartProducts, setCart, display }) => {
    return (
        <Container className='cart-product-wrap' style={{ 'display': display }}>
            <Title className='title'>Cart</Title>
            {Object.keys(cartProducts).map(product =>
                <CartProduct key={cartProducts[product].product.sku} display={display} product={cartProducts[product]} cartProducts={cartProducts} setCart={setCart} />
            )}
        </Container>
    );
}

const Cart = ({ cartProducts, setCart, display, setDisplay }) => {
    const [direction, setDirection] = useState('<');

    return (
        <Container className='cart'>
            <Arrow direction={direction} setDirection={setDirection} setDisplay={setDisplay} />
            <CartProductWrap display={display} cartProducts={cartProducts} setCart={setCart} />
        </Container>
    );
}

export default Cart;
export { cartFuck };
