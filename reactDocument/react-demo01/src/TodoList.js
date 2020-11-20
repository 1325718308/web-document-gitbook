import React, { PureComponent } from 'react';
import store from './store';
import TodoListUI from './components/TodoListUI';
import {
    changeInputAction,
    addItemAction,
    deleteItemAction,
    getMyListAction
} from './store/actionCreators';

class TodoList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }
    render() {
        return (
        <TodoListUI 
            addItem={this.addItem}
            list={this.state.list}
            deleteItem={this.deleteItem}
            changeInputValue={this.changeInputValue}
            inputValue={this.state.inputValue}
        />);
    }
    componentDidMount() {
        store.subscribe(this.storeChange);
        const action = getMyListAction();
        // const action = getTodoList();
        store.dispatch(action);
    }
    storeChange = () => {
        this.setState(store.getState());
    }
    addItem = () => {
        store.dispatch(addItemAction());
    }
    deleteItem = (index) => {
        store.dispatch(deleteItemAction(index));
    }
    changeInputValue = (e) => {
        store.dispatch(changeInputAction(e.target.value));
    }
}

export default TodoList;