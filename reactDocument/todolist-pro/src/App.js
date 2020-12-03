import './App.css';
import './assets/resets.css';
import './assets/common.css';
import './assets/ui.css';
import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';
import NoDataTip from './components/NoDataTip';

import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [isInputShow, setInputShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [isShowCheckModal, setShowCheckModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isShowEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [todoList])

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');
    setTodoList(todoData);
  }, [])

  const openCheckModal = useCallback(id => {
    _setCurrentData(todoList, id);
    setShowCheckModal(true);
  }, [todoList])

  const openEditModal = useCallback(id => {
    _setCurrentData(todoList, id);
    setShowEditModal(true);
  }, [todoList])

  const _setCurrentData = (todoList, id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0]);
  }

  const submitEdit = useCallback((newData, id) => {
    setTodoList(todoList =>
      todoList.map(item => {
        if (item.id === id) {
          item = newData;
        }
        return item;
      })
    )
    setShowEditModal(false);
  }, [])

  const addItem = useCallback(value => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    setTodoList((todoList) => [...todoList, dataItem]);
    setInputShow(false);
  }, [])

  const completeItem = useCallback(id => {
    setTodoList(todoList => todoList.map(item => {
      if (id === item.id) {
        item.completed = !item.completed;
      }
      return item;
    }))
  }, [])

  const deleteItem = useCallback(id => {
    setTodoList(todoList => todoList.filter(item => item.id !== id))
  }, [])

  return (
    <div className="App">
      <MyHeader openInput={() => setInputShow(!isInputShow)} />
      <AddInput addItem={addItem} isInputShow={isInputShow} />
      {
        !todoList || todoList.length === 0 ?
          <NoDataTip />
          : <ul className="todo-list">
            {
              todoList.map((item, index) => (
                <TodoItem
                  deleteItem={deleteItem}
                  completeItem={completeItem}
                  openEditModal={openEditModal}
                  openCheckModal={openCheckModal}
                  key={item.id}
                  data={item}
                />
              ))
            }
          </ul>
      }

      <CheckModal
        data={currentData}
        closeModal={() => setShowCheckModal(false)}
        isShowCheckModal={isShowCheckModal}
      />

      <EditModal
        submitEdit={submitEdit}
        isShowEditModal={isShowEditModal}
        data={currentData}
      />
    </div>
  );
}

export default App;
