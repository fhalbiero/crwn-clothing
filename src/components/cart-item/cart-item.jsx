import React from 'react';

import { Container } from './styles';

const CartItem = ({ item: { name, price, quantity, imageUrl } }) => (
  <Container>
      <img src={imageUrl} alt='item' />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} X ${price}</span>
      </div>
  </Container>
);

export default CartItem;