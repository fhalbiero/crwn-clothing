import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionsTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

function* fetchCollectionAsync() {
    try{
        const collectionRef = firestore.collection('collections');
        const snapdhop = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapdhop);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error));
    }
}

function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionsTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}