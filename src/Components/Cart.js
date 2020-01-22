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
    setDirection,
    inventory,
    setInventory,
    db }) => {

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
                        setCart={setCart}
                        inventory={inventory}
                        setInventory={setInventory}
                        db={ db } />
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
    display,
    inventory,
    setInventory,
    db }) => {

    return (
        <Container>
            {Object.keys(cartProducts).map(product =>
                <CartProduct 
                    key={String(cartProducts[product].product.sku).concat('_', cartProducts[product].size)} 
                    display={display} 
                    product={cartProducts[product]} 
                    cartProducts={cartProducts} 
                    setCart={setCart}
                    inventory={inventory}
                    setInventory={setInventory}
                    db={ db } />
            )}
            <br/>
            <Content>Subtotal: ${Object.keys(cartProducts).map(product => {
                return cartProducts[product].product.price * cartProducts[product].count
            }).reduce((a, b) => a + b, 0).toFixed(2)}</Content>
        </Container>
    );
}

const CartProduct = ({ 
    product, 
    cartProducts, 
    setCart, 
    display, 
    inventory, 
    setInventory,
    db }) => {
    
    const RemoveItem = () => {
        if (!(String(product.product.sku).concat('_', product.size) in cartProducts)) {
            return;
        }
        
        var currInventory = inventory;
        var currCart = cartProducts;
        currCart[String(product.product.sku).concat('_', product.size)].count -= 1;
        if (currCart[String(product.product.sku).concat('_', product.size)].count < 1) {
            delete currCart[String(product.product.sku).concat('_', product.size)];
        }
        
        currInventory[String(product.product.sku)][product.size] += 1
        
        setInventory(currInventory);
        setCart(currCart);
        CartRender({ cartProducts, setCart, display, inventory, setInventory, db });

        console.log(db.child(product.product.sku).child(product.size));

        [].slice.call(document.getElementById(String(product.product.sku))
            .getElementsByClassName('size'))
            .find(element => { 
                return element.value === product.size
            }).disabled = false;
    }

    return (
        <Container className='cart-product'>
            <br/>
            <Button className='cart-product-button' onClick={ RemoveItem }>X</Button>>
            <Title className='cart-product-title' size={6}>{'Count: '.concat(product.count, ' - ', product.size, ' ', product.product.title, ' - ', product.product.currencyFormat, product.product.price)}</Title>
        </Container>
    );
}

const CartRender = ({ cartProducts, setCart, display, inventory, setInventory, db }) => {
    ReactDOM.render(<CartProductWrap 
                        cartProducts={ cartProducts } 
                        setCart={ setCart } 
                        display={ display }
                        inventory={ inventory }
                        setInventory={ setInventory }
                        db={ db }/>, 
                    document.getElementById('cart-product-wrap'))
}

export default Cart;
export { CartRender };