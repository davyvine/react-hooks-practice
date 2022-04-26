// Implementing Login with Multiple State Value -- for managing unrelated pieces of state

import React, { useState } from 'react';

export default function Login() {

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [user, setUser] = useState(null)

   const handleSubmit = (e) => {
      e.preventDefault() // to make sure page is not reloaded
      const userData = {
         username,
         password
      }
      setUser(userData)
      setUsername("") // to clear out the input field upon submit
      setPassword("")
   }

   return (
      <div
         style={{
            textAlign: 'center'
         }}
      >
         <h2>Login</h2>
         <form
            style={{
               display: 'grid',
               alignItems: 'center',
               justifyItems: 'center'
            }}
            onSubmit={handleSubmit}
         >
            <input
               type="text"
               placeholder="username"
               onChange={e => setUsername(e.target.value)}
               value={username}
            />
            <input
               type="password"
               placeholder="password"
               onChange={e => setPassword(e.target.value)}
               value={password}
            />
            <button type="submit">Submit</button>
         </form>

         {user && JSON.stringify(user)}
      </div>
   )
}