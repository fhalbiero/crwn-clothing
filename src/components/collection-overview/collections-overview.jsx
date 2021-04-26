import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../collection-preview/collection-preview';

import { Container } from './styles';

const CollectionsOverview = ({ collections }) => (
    <Container>
        {collections.map( ({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}            
    </Container>
);

const mapStateToProps = createStructuredSelector({
   collections: selectCollectionsForPreview 
});

export default connect(mapStateToProps)( CollectionsOverview );