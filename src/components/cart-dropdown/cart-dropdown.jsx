import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action';

import CartItem from '../cart-item/cart-item';
import CustomButton from '../custom-button/custom-button';


import { Container } from './styles';


const CartDropdown = ({cartItems, history, dispatch}) => (
    <Container>
        <div className='cart-items'>
            {cartItems.length ?
                cartItems.map( item => ( 
                    <CartItem key={item.id} item={item} />
                ))
                :
                <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            dispatch(toggleCartHidden());
            history.push('/checkout');
        }}>
            GO TO CHECKOUT
        </CustomButton>
    </Container>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter( connect(mapStateToProps)(CartDropdown) );