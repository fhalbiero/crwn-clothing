import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import CollectionPage from '../../pages/collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
