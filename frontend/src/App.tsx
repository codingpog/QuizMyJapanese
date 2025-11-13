import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import MyArticles from "./components/MyArticles";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-articles" element={<MyArticles />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
