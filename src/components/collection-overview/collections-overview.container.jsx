import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CollectionOverview from '../../components/collection-overview/collections-overview';
import WithSpinner from '../../components/with-spinner/with-spinner';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;