const defaultState = {
    inputValue: '',
    list: []
}
export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type) {
        case 'inputChange':
            newState.inputValue = action.value;
            return newState;
        case 'addItem':
            newState.list.push(newState.inputValue);
            newState.inputValue = '';
            return newState;
        default:
            return state;
    }
}