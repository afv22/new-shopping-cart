import React from 'react';
import 'rbx/index.css';
import { Container, Title, Content, Button } from 'rbx';

const ProductCard = ({ product }) => {
    const sizes = ['S', 'M', 'L', 'XL'];
    return (
        <Container class='product-card'>
        <img className='image' src={'data/products/'.concat(product.sku, '_1.jpg')}/>
        <Title className='title' size={ 5 }>{product.title}</Title>
        <Content className='description'>{product.description}</Content>
        <Content className='price' size='large'>{product.currencyFormat.concat(product.price)}</Content>
        <Button.Group>
            {sizes.map(size =>
                <Button className='size'>{size}</Button>
            )}
        </Button.Group>
        </Container>
    );
}

export default ProductCard;