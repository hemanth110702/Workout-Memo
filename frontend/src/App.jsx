import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
