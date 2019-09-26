import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ itemsCount }</span>
    </div>
)

const mapStateToProps = createStructuredSelector({ 
    itemsCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);