import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from "./serviceWorker";
//
import TodosContext from './context';
import todosReducer from './reducer';
//
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
//
import axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  }

  return data;
}

//reference for created context
//React.reateContext returns object with 2 values, we use one of them which is provider in order to grab value from context we need the consumer value
//export UserContext and use in App.js wrap the return in UserContext.Consumer and to receive the value need to add a return function
export const UserContext = React.createContext();

// Deleted the app.js file and move the funtion here
const App = () => {
  // initialState will come be returned from context todosContext function
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  //create custom hooks
  const savedTodos = useAPI("http://localhost:3001/todos")

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
  }, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
