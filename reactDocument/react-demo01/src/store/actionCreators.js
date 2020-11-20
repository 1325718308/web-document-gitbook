import { 
    ADD_ITEM, 
    DELETE_ITEM,
    CHANGE_INPUT, 
    GET_LIST,
    GET_MYLIST
} from './actionTypes';
import axios from 'axios';

export const changeInputAction = (value) => ({
    type: CHANGE_INPUT,
    value
})

export const addItemAction = () => ({
    type: ADD_ITEM,
})

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

export const getListAction = (data) => ({
    type: GET_LIST,
    data
})

// thunk
export const getTodoList = () => {
    return (dispatch) => {
        axios.get('https://www.easy-mock.com/mock/5fb495d7bae16b281b2fdc3f/example/getList').then(res => {
            const data = res.data;
            const action = getListAction(data);
            dispatch(action);
        })
    }
}

// saga
export const getMyListAction = () => ({
    type: GET_MYLIST
})
