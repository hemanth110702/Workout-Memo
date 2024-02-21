import React, { useState } from 'react'

const Login = () => {
  
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log(email, password);
   };

   return (
     <form onSubmit={handleSubmit}>
       <h1>Login</h1>
       <label htmlFor="email">Email</label>
       <input
         type="email"
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       />
       <label htmlFor="pwd">Password</label>
       <input
         type="text"
         id="pwd"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
       <button>Login</button>
     </form>
   );
}

export default Login