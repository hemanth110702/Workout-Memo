import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
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
      <button disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
