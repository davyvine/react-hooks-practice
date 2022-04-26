import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';

export default function TodoForm() {
   const [todo, setTodo] = useState("")
   const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext)

   useEffect(() => {
      if (currentTodo.text) {
         setTodo(currentTodo.text)
      } else {
         setTodo("")
      }
   }, [currentTodo.id]) // add dependency, when id changes for current to do run effect function

   const handleSubmit = async e => {
      e.preventDefault();
      if (currentTodo.text) {
         const response = await axios.patch(`http://localhost:3001/todos/${currentTodo.id}`, {
            text: todo
         })
         dispatch({ type: "UPDATE_TODO", payload: response.data })
      } else {
         const response = await axios.post("http://localhost:3001/todos", {
            id: uuidv4(),
            text: todo,
            complete: false
         })
         dispatch({ type: "ADD_TODO", payload: response.data })
      }
      setTodo("")
   }

   return (
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
         <input
            type="text"
            className="border-black border-solid border-2"
            onChange={e => setTodo(e.target.value)}
            value={todo}
         />
      </form>
   )
}