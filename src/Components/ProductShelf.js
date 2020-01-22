import React from 'react';
import 'rbx/index.css';
import { Container, Title, Content, Button } from 'rbx';
import { CartRender } from './Cart';

const ProductShelf = ({ products, cartProducts, setCart, display }) => {
    return (
        <Container className='product-shelf'>
            {products.map(product => 
                <ProductCard 
                    key={ product.sku } 
                    product={ product } 
                    cartProducts={ cartProducts } 
                    setCart={ setCart } 
                    display={ display } />
            )}
        </Container>
    );
}

const ProductCard = ({ 
    product, 
    cartProducts, 
    setCart, 
    display }) => {

    const sizes = ['S', 'M', 'L', 'XL'];

    const updateCart = (size) => {
        var currCart = cartProducts;

        if (String(product.sku).concat('_', size) in cartProducts) {
            currCart[String(product.sku).concat('_', size)].count += 1;
        } else {
            currCart[String(product.sku).concat('_', size)] = {product: product, count: 1, size: size};
        }
        
        setCart(currCart);
        CartRender({ cartProducts, setCart, display });
    }

    return (
        <Container className='product-card' id={String(product.sku)}>
            <img className='image' src={ 'data/products/'.concat(product.sku, '_1.jpg') } alt={product.title}/>
            <Title className='title' size={ 5 }>{product.title}</Title>
            <Content className='description'>{product.description}</Content>
            <Content className='price' size='large'>{product.currencyFormat.concat(product.price)}</Content>
            <Button.Group>
                {sizes.map(size =>
                    <Button className='size' 
                        key={ String(product.sku).concat('_', size) } 
                        onClick={ e => updateCart(e.target.value) } 
                        value={size}>{size}</Button>
                )}
            </Button.Group>
        </Container>
    );
}

export default ProductShelf;
