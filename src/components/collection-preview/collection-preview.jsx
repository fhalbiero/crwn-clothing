import React from 'react';
import CollectionItem from '../collection-item/collection-item'

import { Container } from './styles';

const CollectionPreview = ({ title, items }) => (
    <Container>
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {items
                .filter((item, idx) => idx < 4)
                .map( item => ( 
                    <CollectionItem key={item.id} item={item}/> 
            ))}
        </div>
    </Container>
);

export default CollectionPreview;