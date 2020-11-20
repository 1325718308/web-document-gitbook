import {
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_INPUT,
    GET_LIST
} from './actionTypes'
const defaultStore = {
    inputValue: '',
    list: []
};
// reducer必须是一个纯函数
export default (state = defaultStore, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type) {
        case GET_LIST:
            newState.list = action.data.data.list;
            return newState;
        case CHANGE_INPUT:
            newState.inputValue = action.value;
            return newState;
        case ADD_ITEM:
            newState.list.push(newState.inputValue);
            newState.inputValue = null;
            return newState;
        case DELETE_ITEM:
            newState.list.splice(action.index, 1)
            return newState;
        default:
            return state;
    }
}