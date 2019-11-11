import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverviewContainer from '../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../pages/collection/collection.container';

import { fetchCollectionsStart } from '../../src/redux/shop/shop.actions';


class ShopPage extends React.Component {

    componentDidMount() {
        this.props.fetchCollectionsStart();
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionOverviewContainer} />            
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} />
            </div> )
    }

}  


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);