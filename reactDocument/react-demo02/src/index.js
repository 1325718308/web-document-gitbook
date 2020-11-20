import React from 'react';
import ReactDOM from 'react-dom';
// import TodoList from './TodoList';
import Index from './App';
import {Provider} from 'react-redux';
import store from './store'

const App = (
  <Provider store={store}>
    <React.StrictMode>
      <Index />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  App,
  document.getElementById('root')
);