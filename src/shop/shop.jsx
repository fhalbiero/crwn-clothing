import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CollectionOverview from '../components/collection-overview/collections-overview';
import CollectionPage from '../pages/collection/collection';
import { updateCollections } from '../../src/redux/shop/shop.actions';
import WithSpinner from '../../src/components/with-spinner/with-spinner';

import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
    
    state = {
        isLoading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        const { updateCollections } = this.props;
 
        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ isLoading: false});
        });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />} />            
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props} /> } />
            </div> )
    }

}  

const mapDispatchToProps = {
    updateCollections
}

export default connect(null, mapDispatchToProps)(ShopPage);