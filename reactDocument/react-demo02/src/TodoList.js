import React from 'react';
import {connect} from 'react-redux';

const TodoList = (props) => {
    const {
        inputChange,
        inputValue,
        submit,
        list
    } = props;
    return (<div>
        <div>
            <input 
                placeholder='writing somthing'
                onChange={inputChange}
                value={inputValue}/>
            <button onClick={submit}>提交</button>
        </div>
        {
            list.map((item, index) => (
            <li key={index}>{item}</li>
            ))
        }
    </div>);
}

const stateToProps = state => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
const dispatchToProps = dispatch => {
    return {
        inputChange(e) {
            const action = {
                type: 'inputChange',
                value: e.target.value
            }
            dispatch(action);
        },
        submit() {
            const action = {
                type: 'addItem'
            }
            dispatch(action)
        }
    }
}
export default connect(stateToProps, dispatchToProps)(TodoList);