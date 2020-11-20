import React from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd';
const TodoListUI = (props) => {
    const {
        inputValue,
        changeInputValue,
        deleteItem,
        addItem,
        list
    } = props;

    return (<div>
        <div style={{ margin: '10px' }}>
            <Input
                value={inputValue}
                onChange={changeInputValue}
                style={{ width: '250px', marginRight: '10px' }}
                placeholder="write somthing" />
            <Button type='primary' onClick={addItem}>增加</Button>
        </div>
        <div style={{ margin: '10px', width: '300px' }}>
            <List
                dataSource={list}
                renderItem={(item, index) => (<List.Item onClick={() => deleteItem(index)}>{item}</List.Item>)}
                bordered={true}>
            </List>
        </div>
    </div>);
}
export default TodoListUI;