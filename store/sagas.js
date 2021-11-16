import { call, take, put, all, select } from 'redux-saga/effects';
import { request } from '../commons/utils';
import { Alert } from 'react-native';

import {REQUEST_DATA} from './constants';

// import {selectData} from './selectors';

import * as actions from './actions'

//FUNCTIONS 8

function* requestData(){

    // const REQUEST_URL = yield select(selectRequestUrl());

    yield put(actions.setLoader(true))

    const data = yield call(
        request,
        'https://5fc9346b2af77700165ae514.mockapi.io/simpsons',
        '',
    );

    if (data) {
        yield put(actions.setLoader(false))
        if (data !== 'invalid') {
            yield put(actions.setData(JSON.parse(JSON.stringify(data))))
            yield put(actions.setStatus("requestSuccessful"))
        } else {
            Alert.alert(
              'Error code : 1',
              'Unable to connect to server. Please try again later!',
            );
        }
    } else {
        yield put(actions.setLoader(false));
        Alert.alert(
          'Error code : 2',
          'Unable to connect to server. Please try again later!',
        );
      }

}

function* reqLoginWatcher(){
    while (true) {
        const action = yield take(REQUEST_DATA);
        yield call(requestData);
    }
}

export default function* rootSaga() {
    yield all([
        reqLoginWatcher(),
    ]);
}
