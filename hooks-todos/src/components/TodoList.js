import axios from 'axios';
import React, { useContext } from 'react';
import TodosContext from '../context';

// function declaration
export default function TodoList() {
   const { state, dispatch } = useContext(TodosContext)

   const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing to do!"

   return (
      <div className="container mx-auto max-w-md text-center font-mono">
         <h1 className="text-bold">{title}</h1>
         <ul className="list-reset text-white p-0">
            {state.todos.map(todo => (
               <li key={todo.id} className="flex bg-yellow-500 border-black border-dashed border-2 my-2 py-4 items-center">
                  <span onDoubleClick={async () => {
                     const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
                        complete: !todo.complete
                     })
                     dispatch({ type: "TOGGLE_TODO", payload: response.data })
                  }} className={`cursor-pointer flex-1 ml-12 ${todo.complete && "line-through text-gray-900"}`}>{todo.text}</span>
                  <button onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}>
                     <img src="https://www.flaticon.com/svg/vstatic/svg/1250/1250615.svg?token=exp=1617699774~hmac=42e3a3056394b8855af52c98d40fced1" alt="edit-icon" className="h-6 m-1" />
                  </button>
                  <button onClick={async () => {
                     await axios.delete(`http://localhost:3001/todos/${todo.id}`)
                     dispatch({ type: "REMOVE_TODO", payload: todo })

                  }}>
                     <img src="https://www.flaticon.com/svg/vstatic/svg/1345/1345823.svg?token=exp=1617699815~hmac=2731534855b9b77e2cee2c4476340353" alt="delete-icon" className="h-6 m-1" />
                  </button>
               </li>
            ))}
         </ul>
      </div>
   )
}