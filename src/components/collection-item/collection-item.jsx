import React from 'react';
import { connect } from 'react-redux';

import { CollectionItemContainer, BackgroundItemImage, CollectionFooterContainer, AddButton } from './collection-item-styles';

import { addItem } from '../../redux/cart/cart.action';


const CollectionItem = ({item, add}) => {
    const { name, price, imageUrl } = item
    return (
        <CollectionItemContainer>
            <BackgroundItemImage imageUrl={imageUrl} /> 
            <CollectionFooterContainer>
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </CollectionFooterContainer>
            <AddButton onClick={() => add(item)} inverted>ADD TO CART</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    add: item => dispatch(addItem(item))
}) 

export default connect(null, mapDispatchToProps)(CollectionItem);