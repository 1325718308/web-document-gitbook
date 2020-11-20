import { put, takeEvery } from 'redux-saga/effects'
import { GET_MYLIST } from './actionTypes';
import { getListAction } from './actionCreators';
import axios from 'axios';

// generate 函数 异步处理
function* mySaga() {
    yield takeEvery(GET_MYLIST, getList)
}

function* getList() {
    axios.get('https://www.easy-mock.com/mock/5fb495d7bae16b281b2fdc3f/example/getList').then(res => {
        const data = res.data;
        const action = getListAction(data);
        put(action)
    })
    const res = yield axios.get('https://www.easy-mock.com/mock/5fb495d7bae16b281b2fdc3f/example/getList')
    const action = getListAction(res.data);
    yield put(action);
}
export default mySaga;
