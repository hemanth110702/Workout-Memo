import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
