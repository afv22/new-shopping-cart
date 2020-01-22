import React from 'react';
import 'rbx/index.css';
import { Container, Title, Button, Content } from 'rbx';
import ReactDOM from 'react-dom';

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
                <Container id='cart-product-wrap'>
                    <CartProductWrap 
                        display={display} 
                        cartProducts={cartProducts} 
                        setCart={setCart} />
                </Container>
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
        <Container>
            {Object.keys(cartProducts).map(product =>
                <CartProduct 
                    key={String(cartProducts[product].product.sku).concat('_', cartProducts[product].size)} 
                    display={display} 
                    product={cartProducts[product]} 
                    cartProducts={cartProducts} 
                    setCart={setCart} />
            )}
        </Container>
    );
}

const CartProduct = ({ 
    product, 
    cartProducts, 
    setCart, 
    display }) => {

    return (
        <Container className='cart-product'>
            <br/>
            <Title className='cart-product-title' size={6}>{'Count: '.concat(product.count, ' - ', product.size, ' ', product.product.title, ' - ', product.product.currencyFormat, product.product.price)}</Title>
        </Container>
    );
}

const CartRender = ({ cartProducts, setCart, display, inventory, setInventory, db }) => {
    ReactDOM.render(<CartProductWrap 
                        cartProducts={ cartProducts } 
                        setCart={ setCart } 
                        display={ display }/>, 
                    document.getElementById('cart-product-wrap'))
}

export default Cart;
export { CartRender };